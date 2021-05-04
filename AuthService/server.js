const http = require('http');
const models = require('./src/models');
const service = require('./src/service');
const logger = require('./src/middlewares/logger');
const { generateKeys, getKeySet } = require('./src/middlewares/jwt');
const { publishToQueue, connection } = require('./rabbitmq');

require('dotenv').config()

const server = http.createServer(service);
const PORT = process.env.SERVICE_PORT;

server.on('listening', async () => {
    logger.info(`Auth Service started at port ${PORT}`);
    await connection();
    logger.info('Connected to RabbitMQ server')
    // Generate the keys
    await generateKeys();
    logger.info('New JWK keystore is generated Successfully')
    const keyStore = await getKeySet();
    publishToQueue('key-distribution', '', keyStore);
    logger.info(`RabbitMQ || published new message to key-distribution exchange`);
})

models.sequelize.sync().then(() => {
    logger.info('Connected to MySql Database')
    server.listen(PORT);
});