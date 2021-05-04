const fs = require("fs");
const logger = require("../middlewares/logger");
const { visit_uploaded_docs }  = require('../models')

const storeDocument = (req, res) => {
  logger.log({
    level: "http",
    message: "Received Post request for document by user",
  });
  const file = req.files.document;
  file.mv(
    __dirname + "/../documentsToUpload/" + file.name,
    function (err, result) {
      if (err) throw err;
      var imageData = fs.readFileSync(
        __dirname + "/../documentsToUpload/" + file.name
      );
      visit_uploaded_docs
        .create({
          patient_id: req.body.userId,
          visit_id: req.body.visitId,
          document_name: req.body.document_name,
          document_data: imageData,
          uploaded_by: req.body.hcp_id,
        })
        .then((data) => {
          try {
            logger.log({
              level: "http",
              message: "POST | storeDocument successful",
              metaData: {
                ip: req.ip,
                data: document_name,
                performedBy: req.body.hcp_id,
              },
            });
            res.send("Report Generated");
          } catch (e) {
            logger.log({
              level: "error",
              message: "POST | storeDocument failed",
              metaData: {
                ip: req.ip,
                data: file.name,
                performedBy: req.body.hcp_id,
              },
            });
            res.status(400).send("Error!!");
          }
        });
    }
  );
};

module.exports = {
  storeDocument,
};
