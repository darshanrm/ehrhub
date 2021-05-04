const http = require('http');
const service = require('./src/service');
const logger = require('./src/middlewares/logger');
require('dotenv').config();
const { connection } = require('./src/rabbitmq/connection');
const visitConsumer = require('./src/rabbitmq/consumers/visitConsumer');
const medicationConsumer = require('./src/rabbitmq/consumers/medicationConsumer');
const prescriptionConsumer = require('./src/rabbitmq/consumers/prescriptionConsumer');

const server = http.createServer(service);
const PORT = process.env.SERVICE_PORT;

server.on('listening', async () => {
  logger.info(`PdfGeneration Service started at port ${PORT}`);
  await connection();
  logger.info('Connected to RabbitMQ server')
  visitConsumer();
  medicationConsumer();
  prescriptionConsumer();
})

server.listen(PORT);