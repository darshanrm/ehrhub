const logger = require("../../middlewares/logger");
const {
  createPrescription,
} = require("../../middlewares/generatePrescription");

const prescriptionConsumer = async (consumerConnection) => {
  try {
    const channel = await consumerConnection.createChannel();
    // here the queue name should be (generatePrescriptionPdf)
    await channel.assertQueue("prescription");
    channel.consume("prescription", (message) => {
      const data = JSON.parse(message.content.toString());
      logger.log({
        level: "http",
        message: `Visit data for patient ${data.patient_id} written by healthcare professional ${data.hcpId} received in the message queue`,
      });
      createPrescription(data);
      channel.ack(message);
    });
  } catch (error) {
    logger.error(`RabbitMQError | error while consuming from queue`);
  }
};

module.exports = prescriptionConsumer;
