const amqp = require('amqplib');
const { getNewKeySet } = require('./src/middlewares/auth');

var consumerConnection = null;

const connection = async () => {
  const c_conn = await amqp.connect(process.env.RABBITMQ_URL);

  consumerConnection = c_conn;
}

const listenForMessages = async () => {
  const channel = await consumerConnection.createChannel();
  await channel.assertQueue('medical-history-service-queue');
  await channel.bindQueue('medical-history-service-queue', 'key-distribution', '');
  channel.consume('medical-history-service-queue', async (msg) => {
    if(msg.content){
      const data = JSON.parse(msg.content.toString());
      getNewKeySet(data);
      await channel.ack(msg);
    }
  })
}

module.exports = {
  connection,
  listenForMessages
}