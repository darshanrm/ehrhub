const logger = require('../../middlewares/logger');
const { createMedication } = require('../../middlewares/generateMedication');

const medicationConsumer = async (consumerConnection) => {
	try {
		const channel = await consumerConnection.createChannel();
		// here the queue name should be (generateMedicationPdf)
		await channel.assertQueue("medication");
		channel.consume("medication", (message) => {
			const data = JSON.parse(message.content.toString());
		    logger.log({
		    	level: "http",
		        message: `Visit data for patient ${data.userId} written by healthcare professional ${data.hcpId} received in the message queue`,
		    });
		    createMedication(data);
		    channel.ack(message);
		})
	} catch(error){
		logger.error(`RabbitMQError | error while consuming from queue`)
	}
}

module.exports = medicationConsumer;