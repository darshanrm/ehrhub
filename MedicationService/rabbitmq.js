const amqp = require('amqplib');
const { getNewKeySet } = require('./src/middlewares/auth');
const logger = require('./src/middlewares/logger');
const { medication_pdf } = require('./src/models');

var consumerConnection = null;
var publisherConnection = null;
var publisherChannel = null;

const connection = async () => {
	const p_conn = await amqp.connect(process.env.RABBITMQ_URL);
	const c_conn = await amqp.connect(process.env.RABBITMQ_URL);
	
	consumerConnection = c_conn;
	publisherConnection = p_conn;
	const publisherChannel = await p_conn.createChannel();
	// here the queue name should be (generateMedicationPdf)
	await publisherChannel.assertQueue('medication', { durable: true });
}

// Publisher
const publishToQueue = (medication) => {
	try {
      publisherChannel.sendToQueue(
        "medication",
        Buffer.from(JSON.stringify(medication)),
        { persistent: true }
      );
      logger.log({
        level: "http",
        message: `PDF generation request for lab visit id ${medication.visitId} has been submitted to the queue`,
        metaData: {
          performedBy: medication.hcpId,
        },
      });
    } catch (error) {
      logger.log({
        level: "error",
        message: `Some error occured while submitting the PDF generation request for ${medication.visitId} to the queue`,
        metaData: {
          performedBy: medication.hcpId,
        },
      });
}

// Consumer
const listenForMessages = async () => {
	// Channel for Key-Distribution queue
	const channel = await consumerConnection.createChannel();
	await channel.assertQueue('medicationKey');
	await channel.bindQueue('medicationKey', 'key-distribution', '');
	channel.consume('medicationKey', async (msg) => {
		if(msg.content){
			const data = JSON.parse(msg.content.toString());
			await channel.ack(msg);
			getNewKeySet(data);
		}
	});

	// Channel for MedicationPDF
    const medicationPdfChannel = await consumerConnection.createChannel();
    await medicationPdfChannel.assertQueue("medicationPDF");
    medicationPdfChannel.consume("medicationPDF", (message) => {
      const data = JSON.parse(message.content.toString());
      logger.log({
        level: "http",
        message: `PDF of medication for patient ${data.userId} written by healthcare professional ${data.hcpId} received in the message queue`,
      });
      var pdfData = data.pdfBuffer.data;

      try{
      	medication_pdf.create({
	      	patient_id: data.userId,
	        hcp_id: data.hcpId,
	        visit_id: data.visitId,
	        medication: pdfData,
      	}).then(data => {
      		logger.log({
              level: "http",
              message: "POST | storeDocument successful",
              metaData: {
                performedBy: "Prescription Service",
              },
            });
      	})
      } catch(err){
      		logger.log({
              level: "error",
              message: "POST | storeDocument failed",
              metaData: {
                performedBy: "Prescription Service",
              },
            });
      }
      channel.ack(message);
    });
}

module.exports = {
	connection,
	publishToQueue,
	listenForMessages
}