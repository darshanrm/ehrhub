const logger = require("../../middlewares/logger");
const { createPdf } = require("../../middlewares/generate");

const visitConsumer = async (consumerConnection) => {
  try {
    const channel = await consumerConnection.createChannel();
    await channel.assertQueue("VisitData");
    channel.consume("VisitData", (message) => {
      const data = JSON.parse(message.content.toString());
      logger.log({
        level: "http",
        message: `Visit data for patient ${data.patient_id} written by healthcare professional ${data.hcp_id} received in the message queue`,
      });
      createPdf(data);
      channel.ack(message);
    });
  } catch (error) {
    logger.error(`RabbitMQError | error while consuming Visit Data from queue`);
  }
};

module.exports = visitConsumer;
