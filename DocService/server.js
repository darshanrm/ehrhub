const http = require('http');
const service = require('./src/service');
const logger = require('./src/middlewares/logger');
require('dotenv').config();
const amqp = require('amqplib');
const { connection, listenForMessages } = require('./rabbitmq');
const { getKeySet } = require('./src/middlewares/auth');

const server = http.createServer(service);
const PORT = process.env.SERVICE_PORT;

server.on('listening', async () => {
  logger.info(`DocService started at port ${PORT}`);
  await connection();
  logger.info('Connected to RabbitMQ server')
  await getKeySet();
  logger.info('New JWK keystore is accquired Successfully')
  listenForMessages();
})

server.listen(PORT);