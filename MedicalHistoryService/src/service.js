const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

const service = express();

service.use(cors());
service.use(express.json());
service.use(express.urlencoded({ extended: true }));
service.use(cookieParser());

service.use('/medical-history', routes);

service.use((req, res, next) => {
  next(new Error('404 page not'))
})

module.exports = service;