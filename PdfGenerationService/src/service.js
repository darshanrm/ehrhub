const express = require('express');
const cors = require('cors');
const service = express();

service.use(cors());
service.use(express.json());
service.use(express.urlencoded({ extended: true }));

service.use((req, res, next) => {
  next(new Error('404 page not found from PS'))
})

module.exports = service;