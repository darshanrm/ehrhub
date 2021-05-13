const amqp = require("amqplib");
const { getNewKeySet } = require("./src/middlewares/auth");

var consumerConnection = null;
var publisherConnection = null;
var reportChannel = null;
var prescriptionChannel = null;

const connection = async () => {
  const c_conn = await amqp.connect(process.env.RABBITMQ_URL);
  const p_conn = await amqp.connect(process.env.RABBITMQ_URL);

  consumerConnection = c_conn;
  publisherConnection = p_conn;

  reportChannel = await publisherConnection.createChannel();
  await reportChannel.assertQueue("VisitData", { durable: true });

  prescriptionChannel = await publisherConnection.createChannel();
  await prescriptionChannel.assertQueue("prescription", { durable: true });
};

const listenForMessages = async () => {
  const channel = await consumerConnection.createChannel();
  await channel.assertQueue("doc-service-queue");
  await channel.bindQueue("doc-service-queue", "key-distribution", "");
  channel.consume("doc-service-queue", async (msg) => {
    if (msg.content) {
      const data = JSON.parse(msg.content.toString());
      await channel.ack(msg);
      getNewKeySet(data);
    }
  });
};

const publishReport = async (data) => {
  try {
    reportChannel.sendToQueue("VisitData", Buffer.from(JSON.stringify(data)), {
      persistent: true,
    });
    logger.log({
      level: "http",
      message: `Visit report for patient ${data.patient_id} and healthcare professional ${data.hcp_id} has been submitted to the queue`,
      metaData: {
        performedBy: hcp_id,
      },
    });
    res.status(200).send(`Document submitted to the queue`);
  } catch (error) {
    logger.log({
      level: "error",
      message: `Some error occured while submitting the visit report for patient ${data.patient_id} and healthcare professional ${hcp_id} to the queue`,
      metaData: {
        performedBy: req.hcp_id,
      },
    });

    res.status(400).send(`Failed to submit the report. Please try again`);
  }
};

const publishPrescription = async (data) => {
  try {
    prescriptionChannel.sendToQueue(
      "prescription",
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    );
    logger.log({
      level: "http",
      message: `PDF generation request for lab visit id ${data.visitId} has been submitted to the queue`,
      metaData: {
        performedBy: data.hcpId,
      },
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: `Some error occured while submitting the PDF generation request for ${data.visitId} to the queue`,
      metaData: {
        performedBy: data.hcpId,
      },
    });
  }
};

module.exports = {
  connection,
  listenForMessages,
  publishReport,
  publishPrescription,
};
