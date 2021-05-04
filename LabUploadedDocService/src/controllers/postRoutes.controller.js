const logger = require("../middlewares/logger");
const { lab_uploaded_docs, lab_visits } = require('../models');


const storeDocument = (req, res) => {
  console.log(req.body);
  logger.log({
    level: "http",
    message: `Received Post request for Lab Document storage from HCP with id ${req.body.hcpId}`,
  });
  const fileBuffer = req.files.document.data;
  lab_visits
    .create({
      patient_id: req.body.userId,
      hcp_id: req.body.hcpId,
    })
    .then((visit) => {
      console.log("Visit created");
      lab_uploaded_docs
        .create({
          visit_id: visit.id,
          document_data: fileBuffer,
          document_name: req.files.document.name,
        })
        .then(() => {
          logger.log({
            level: "http",
            message: "POST | Document stored successful",
            metaData: {
              ip: req.ip,
              data: req.files.document_name,
              performedBy: req.body.hcpId,
            },
          });
          res.send("Document Stored Successfully");
        })
        .catch((err) => {
          logger.log({
            level: "error",
            message: "POST | Document Creation failed",
            metaData: {
              ip: req.ip,
              data: req.files.document_name,
              performedBy: req.body.hcpId,
            },
          });
          if (err) throw err;
          res.status(400).send("Error!!");
        });
    })
    .catch((err) => {
      logger.log({
        level: "error",
        message: "POST | Document Creation failed",
        metaData: {
          ip: req.ip,
          data: req.files.document_name,
          performedBy: req.body.hcpId,
        },
      });
      if (err) throw err;
      res.status(400).send("Error!!");
    });
};

module.exports = {
  storeDocument,
};
