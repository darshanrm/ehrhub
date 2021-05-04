const amqp = require('amqplib');

var publisherConnection = null;
var channel = null;

const connection = async () => {
	const p_conn = await amqp.connect(process.env.RABBITMQ_URL);

	const keyDistributionChannel = await p_conn.createChannel();
	await keyDistributionChannel.assertExchange('key-distribution', 'fanout', { durable: true });

	publisherConnection = p_conn;
	channel = keyDistributionChannel;
}

const publishToQueue = (exchangeName, routingKey, data) => {
	channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data), 'utf-8'));
}

module.exports = {
	connection,
	publishToQueue
}