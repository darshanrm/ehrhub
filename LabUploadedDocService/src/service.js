const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const express_upload = require("express-fileupload");

const service = express();
service.use(express_upload());
service.use(cors());
service.use(express.json());
service.use(express.urlencoded({ extended: true }));
service.use(cookieParser());

service.use("/Documents", routes);

service.use((req, res, next) => {
  next(new Error('404 page not found from'))
})

module.exports = service;
