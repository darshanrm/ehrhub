const logger = require("../middlewares/logger");
const { visits } = require("../models");

const getVisitDetailsByPatientId = (req, res) => {
  visits
    .findAll({
      where: {
        patient_id: req.query.userId,
      },
    })
    .then((visitRecords) => {
      logger.log({
        level: "http",
        message:
          "Get all visit records where patient id is " +
          req.query.userId +
          " successful",
        metaData: {
          ip: req.ip,
          performedBy: req.query.userId,
        },
      });
      res.send(visitRecords);
    }).catch = (e) => {
    logger.log({
      level: "error",
      message:
        "Get all visit records where patient id is " +
        req.query.userId +
        " failed",
      metaData: {
        ip: req.ip,
        performedBy: req.query.userId,
      },
    });
    res.status(400).send("Some Error Occured!! Retry in some time");
  };
};

const getVisitDetailsByHcpId = (req, res) => {
  visits
    .findAll({
      where: {
        doctor_id: req.query.hcpId,
      },
    })
    .then((visitRecords) => {
      logger.log({
        level: "http",
        message:
          "Get all visit records where HCP id is " +
          req.query.hcpId +
          " successful",
        metaData: {
          ip: req.ip,
          performedBy: req.query.hcpId,
        },
      });
      res.send(visitRecords);
    }).catch = (e) => {
    logger.log({
      level: "error",
      message:
        "Get all visit records where HCP id is " + req.query.hcpId + " failed",
      metaData: {
        ip: req.ip,
        performedBy: req.query.hcpId,
      },
    });
    res.status(400).send("Some Error Occured!! Retry in some time");
  };
};

const getVisitDetailsByPatientIdAndHcpId = (req, res) => {
  visits
    .findAll({
      where: {
        patient_id: req.query.userId,
        doctor_id: req.query.hcpId,
      },
    })
    .then((visitRecords) => {
      logger.log({
        level: "http",
        message:
          "Get all visit records where patient id is " +
          req.query.userId +
          " and HCP id is " +
          req.query.hcpId +
          " successful",
        metaData: {
          ip: req.ip,
          performedBy: req.query.hcpId,
        },
      });
      res.send(visitRecords);
    }).catch = (e) => {
    logger.log({
      level: "error",
      message:
        "Get all visit records where patient id is " +
        req.query.userId +
        " and HCP id is " +
        req.query.hcpId +
        " failed",
      metaData: {
        ip: req.ip,
        performedBy: req.query.hcpId,
      },
    });
    res.status(400).send("Some Error Occured!! Retry in some time");
  };
};

const getVisitDetailsByVisitId = (req, res) => {
  visits
    .findAll({
      where: {
        id: req.query.visitId,
      },
    })
    .then((visitRecords) => {
      logger.log({
        level: "http",
        message:
          "Get all visit records where HCP id is " +
          req.query.hcpId +
          " successful",
        metaData: {
          ip: req.ip,
          performedBy: req.query.hcpId,
        },
      });
      res.send(visitRecords);
    }).catch = (e) => {
    logger.log({
      level: "error",
      message:
        "Get all visit records where HCP id is " + req.query.hcpId + " failed",
      metaData: {
        ip: req.ip,
        performedBy: req.query.hcpId,
      },
    });
    res.status(400).send("Some Error Occured!! Retry in some time");
  };
};

module.exports = {
  getVisitDetailsByPatientId,
  getVisitDetailsByHcpId,
  getVisitDetailsByPatientIdAndHcpId,
  getVisitDetailsByVisitId,
};
