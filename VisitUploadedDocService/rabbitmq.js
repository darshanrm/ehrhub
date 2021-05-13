const amqp = require("amqplib");
const logger = require("./src/middlewares/logger");
const { getNewKeySet } = require("./src/middlewares/auth");
const { visit_uploaded_docs } = require("./src/models");
var consumerConnection = null;

const connection = async () => {
  const c_conn = await amqp.connect(process.env.RABBITMQ_URL);

  consumerConnection = c_conn;
};

const listenForMessages = async () => {
  const channel = await consumerConnection.createChannel();
  await channel.assertQueue("visit-uploaded-doc");
  await channel.bindQueue("visit-uploaded-doc", "key-distribution", "");
  channel.consume("visit-uploaded-doc", async (msg) => {
    if (msg.content) {
      const data = JSON.parse(msg.content.toString());
      await channel.ack(msg);
      getNewKeySet(data);
    }
  });

  const visitDocumentChannel = await consumerConnection.createChannel();
  await visitDocumentChannel.assertQueue("VisitDocument");
  visitDocumentChannel.consume("VisitDocument", (message) => {
    const data = JSON.parse(message.content.toString());
    logger.log({
      level: "http",
      message: `Visit report for patient ${data.patient_id} written by healthcare professional ${data.hcp_id} received in the message queue`,
    });
    var imageData = data.pdfBuffer.data;

    visit_uploaded_docs
      .create({
        patient_id: data.patient_id,
        visit_id: data.visitId,
        document_name: data.document_name,
        document_data: imageData,
        uploaded_by: data.hcp_id,
      })
      .then((data) => {
        try {
          logger.log({
            level: "http",
            message: "POST | storeDocument successful",
            metaData: {
              data: document_name,
              performedBy: "Visit Uploaded Doc Service",
            },
          });
        } catch (e) {
          logger.log({
            level: "error",
            message: "POST | storeDocument failed",
            metaData: {
              data: file.name,
              performedBy: "Visit Uploaded Doc Service",
            },
          });
        }
      });
    channel.ack(message);
  });
};

module.exports = {
  connection,
  listenForMessages,
};
