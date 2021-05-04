const amqp = require('amqplib');
const { getNewKeySet } = require('./src/middlewares/auth');

var consumerConnection = null;

const connection = async () => {
	const c_conn = await amqp.connect(process.env.RABBITMQ_URL);
	
	consumerConnection = c_conn;
}

const listenForMessages = async () => {
	const channel = await consumerConnection.createChannel();
	await channel.assertQueue('user-uploaded-doc');
	await channel.bindQueue('user-uploaded-doc', 'key-distribution', '');
	channel.consume('user-uploaded-doc', async (msg) => {
		if(msg.content){
			const data = JSON.parse(msg.content.toString());
			await channel.ack(msg);
			getNewKeySet(data);
		}
	});

	const userDocChannel = await consumerConnection.createChannel();
	await userDocChannel.assertQueue("UserDocument");
	userDocChannel.consume("UserDocument", (message) => {
      const data = JSON.parse(message.content.toString());
      logger.log({
        level: "http",
        message: `Visit report for patient ${data.userId} written by healthcare professional ${data.hcp_id} received in the message queue`,
      });
      var imageData = data.pdfBuffer.data;
      user_uploaded_docs
        .create({
          visit_id: data.visitId,
          document_name: data.document_name,
          document_data: imageData,
        })
        .then((data) => {
            logger.log({
              level: "http",
              message: "POST | storeDocument successful",
              metaData: {
                data: document_name,
                performedBy: `User ${req.query.userId}`,
              },
            });
           }).catch(err => {
           		logger.log({
              level: "error",
              message: "POST | storeDocument failed",
              metaData: {
                data: document_name,
                performedBy: `User ${req.query.userId}`,
              },
            });
           })
 
      channel.ack(message);

  	});

}

module.exports = {
	connection,
	listenForMessages
}