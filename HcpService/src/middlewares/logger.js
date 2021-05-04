const winston  = require('winston');

const Format = winston.format.printf(info => {
    if(info instanceof Error){
        return `${info.timestamp} ${info.level}: ${info.message}  ${info.stack}`;
    }
    return `${info.timestamp} ${info.level}: ${info.message}`;
})

const logger = winston.createLogger({
    level: 'http',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD-MM-YYYY HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.simple()
    ),
    defaultMeta: { service: 'HcpService'},
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'service.log'})
    ]
})

module.exports = logger;