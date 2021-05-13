const amqp = require("amqplib");
const { getNewKeySet } = require("./src/middlewares/auth");
const logger = require("./src/middlewares/logger");
const { prescription_pdf } = require("./src/models");

var consumerConnection = null;
var publisherConnection = null;
var publisherChannel = null;

const connection = async () => {
  const p_conn = await amqp.connect(process.env.RABBITMQ_URL);
  const c_conn = await amqp.connect(process.env.RABBITMQ_URL);

  consumerConnection = c_conn;
  publisherConnection = p_conn;
  const publisherChannel = await p_conn.createChannel();
  // here the queue name should be (generatePrescriptionPdf)
  await publisherChannel.assertQueue("prescription", { durable: true });
};

// Publisher
const publishToQueue = (prescription) => {
  try {
    publisherChannel.sendToQueue(
      "prescription",
      Buffer.from(JSON.stringify(prescription)),
      { persistent: true }
    );
    logger.log({
      level: "http",
      message: `PDF generation request for lab visit id ${prescription.visitId} has been submitted to the queue`,
      metaData: {
        performedBy: prescription.hcpId,
      },
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: `Some error occured while submitting the PDF generation request for ${prescription.visitId} to the queue`,
      metaData: {
        performedBy: prescription.hcpId,
      },
    });
  }
};

// Consumer
const listenForMessages = async () => {
  // Channel for Key-Distribution queue
  const channel = await consumerConnection.createChannel();
  await channel.assertQueue("prescriptionKey");
  await channel.bindQueue("prescriptionKey", "key-distribution", "");
  channel.consume("prescriptionKey", async (msg) => {
    if (msg.content) {
      const data = JSON.parse(msg.content.toString());
      await channel.ack(msg);
      getNewKeySet(data);
    }
  });

  // Channel for MedicationPDF
  const prescriptionPdfChannel = await consumerConnection.createChannel();
  await prescriptionPdfChannel.assertQueue("prescriptionPDF");
  medicationPdfChannel.consume("prescriptionPDF", (message) => {
    const data = JSON.parse(message.content.toString());
    logger.log({
      level: "http",
      message: `PDF of prescription for patient ${data.patient_id} written by healthcare professional ${data.hcpId} received in the message queue`,
    });
    var pdfData = data.pdfBuffer.data;

    try {
      prescription_pdf
        .create({
          patient_id: data.patient_id,
          hcp_id: data.hcpId,
          visit_id: data.visitId,
          prescription: pdfData,
        })
        .then((data) => {
          logger.log({
            level: "http",
            message: "POST | storeDocument successful",
            metaData: {
              performedBy: "Prescription Service",
            },
          });
        });
    } catch (err) {
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
};

module.exports = {
  connection,
  publishToQueue,
  listenForMessages,
};
