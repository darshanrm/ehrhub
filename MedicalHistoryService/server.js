const http = require('http');
const models = require('./src/models');
const service = require('./src/service');
const logger = require('./src/middlewares/logger');
require('dotenv').config();

const { getKeySet } = require('./src/middlewares/auth');
const { connection, listenForMessages } = require('./rabbitmq');

const server = http.createServer(service);
const PORT = process.env.SERVICE_PORT;

server.on('listening', async () => {
  logger.info(`Medical-History Service started at port ${PORT}`);
  await connection();
  logger.info('Connected to RabbitMQ server')
  await getKeySet();
  logger.info('New JWK keystore is accquired Successfully')
  listenForMessages();
})

models.sequelize.sync().then(() => {
  logger.info('Connected to MySql Database');
  server.listen(PORT);
})