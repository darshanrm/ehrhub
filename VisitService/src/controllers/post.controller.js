const logger = require("../middlewares/logger");
const { visits } = require("../models");

const createNewVisit = (req, res) => {
  visits
    .create({
      patient_id: req.body.patient_id,
      doctor_id: req.body.hcpId,
      facility_id: req.body.facilityId,
      vitals_id: req.body.vitalsId,
      follow_up_visit: req.body.visitId,
    })
    .then((visitRecord) => {
      logger.log({
        level: "http",
        message: "visit created successful",
        metaData: {
          ip: req.ip,
          performedBy: req.body.hcpId,
        },
      });
      res.send(visitRecord);
    }).catch = (e) => {
    logger.log({
      level: "error",
      message: "Document creation failed",
      metaData: {
        ip: req.ip,
        data: file.name,
        performedBy: req.body.hcp_id,
      },
    });
    res.send("visit creation failed");
  };
};

module.exports = { createNewVisit };
