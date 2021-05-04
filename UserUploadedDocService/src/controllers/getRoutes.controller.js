const logger = require("../middlewares/logger");
const { user_uploaded_docs } = require('../models');

//get report by visit id
const getUserDocuments = (req, res) => {
  user_uploaded_docs
    .findAll({
      where: {
        patient_id: req.query.userId,
      },
    })
    .then((documents) => {
      logger.log({
        level: "http",
        message:
          "Get all visit documents by user " + req.query.userId + " successful",
        metaData: {
          ip: req.ip,
          performedBy: req.userId,
        },
      });
      res.send(documents);
    }).catch = (e) => {
    logger.log({
      level: "error",
      message: "Get all visit documents by user " + req.query.hcpId + " failed",
      metaData: {
        ip: req.ip,
        performedBy: req.body.userId,
      },
    });
    res.status(400).send("Some Error Occured!! Retry in some time");
  };
};

module.exports = {
  getUserDocuments,
};
