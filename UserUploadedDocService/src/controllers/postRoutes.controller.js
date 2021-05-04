const logger = require("../middlewares/logger");
const { user_uploaded_docs } = require('../models');

const storeDocument = (req, res) => {
  logger.log({
    level: "http",
    message: "Received Post request for document by user",
  });
  const fileBuffer = req.files.document.data;
  const document_name = req.body.document_name;
  user_uploaded_docs
    .create({
      patient_id: req.body.userId,
      visit_id: req.body.visitId,
      document_name: req.body.document_name,
      document_data: fileBuffer,
    })
    .then((data) => {
      try {
        logger.log({
          level: "http",
          message: "POST | storeDocument successful",
          metaData: {
            ip: req.ip,
            data: document_name,
            performedBy: req.body.userId,
          },
        });
        res.send("Document saved successfully");
      } catch (e) {
        logger.log({
          level: "error",
          message: "POST | storeDocument failed",
          metaData: {
            ip: req.ip,
            data: document_name,
            performedBy: req.body.userId,
          },
        });
        res.status(400).send("Error!!");
      }
    });
};

module.exports = {
  storeDocument,
};
