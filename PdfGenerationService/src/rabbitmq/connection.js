const amqp = require('amqplib');

var consumerConnection = null;
var publisherConnection = null;
var visitDocumentPublishChannel = null;
var medicationPublishChannel = null;
var prescriptionPublishChannel = null;

const connection = async () => {
	const p_conn = await amqp.connect(process.env.RABBITMQ_URL);
	const c_conn = await amqp.connect(process.env.RABBITMQ_URL);
	
	publisherConnection = p_conn;
	consumerConnection = c_conn;

	//Channels for publishing (to avoid creating channels everytime we publish to these queues)
	//NOTE: consumer channels are created at their respcetive consumer function because they are only called once
	const visitDocumentCh = await p_conn.createChannel();
	await visitDocumentCh.assertQueue("VisitDocument", { durable: true });

	visitDocumentPublishChannel = visitDocumentCh;

	// Medication channel
	const medicationCh = await p_conn.createChannel();
	await medicationCh.assertQueue("medicationPDF", { durable: true });

	medicationPublishChannel = medicationCh;

	// Prescription Channel
	const prescriptionCh = await p_conn.createChannel();
	await prescriptionCh.assertQueue("prescriptionPDF", { durable: true });

	prescriptionPublishChannel = prescriptionCh;
}

module.exports = {
	connection,
	publisherConnection,
	consumerConnection,
	visitDocumentPublishChannel,
	medicationPublishChannel,
	prescriptionPublishChannel
}