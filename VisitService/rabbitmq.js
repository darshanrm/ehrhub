const amqp = require('amqplib');
const { getNewKeySet } = require('./src/middlewares/auth');

var consumerConnection = null;

const connection = async () => {
	const c_conn = await amqp.connect(process.env.RABBITMQ_URL);
	
	consumerConnection = c_conn;
}

const listenForMessages = async () => {
	const channel = await consumerConnection.createChannel();
	await channel.assertQueue('visit');
	await channel.bindQueue('visit', 'key-distribution', '');
	channel.consume('visit', async (msg) => {
		if(msg.content){
			const data = JSON.parse(msg.content.toString());
			await channel.ack(msg);
			getNewKeySet(data);
		}
	});

}

module.exports = {
	connection,
	listenForMessages
}