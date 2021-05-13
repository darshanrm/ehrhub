const logger = require("../middlewares/logger");
const { visit_uploaded_docs } = require("../models");

//get report by visit id
const getVisitDocuments = (req, res) => {
  visit_uploaded_docs
    .findAll({
      where: {
        visit_id: req.query.visitIds,
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

//report by patient id
const byPatientId = (req, res) => {
  visit_uploaded_docs
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
      message:
        "Get all visit documents by user " + req.query.userId + " failed",
      metaData: {
        ip: req.ip,
        performedBy: req.body.userId,
      },
    });
    res.status(400).send("Some Error Occured!! Retry in some time");
  };
};

module.exports = {
  getVisitDocuments,
  byPatientId,
};
