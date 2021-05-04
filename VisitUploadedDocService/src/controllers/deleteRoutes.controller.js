const logger = require("../middlewares/logger");
const { visit_uploaded_docs }  = require('../models')

const deleteDocument = (req, res) => {
  visit_uploaded_docs.findByPk(req.query.documentId).then((document) => {
    if (document.uploaded_by == req.query.hcpId) {
      visit_uploaded_docs
        .destroy({
          where: {
            id: req.query.documentId,
          },
        })
        .then(
          logger.log({
            level: "http",
            message: `Delete request for document id ${req.query.documentId} by hcp person ${req.query.hcpId} success`,
            metaData: {
              ip: req.ip,
              performedBy: req.query.hcpId,
            },
          })
        );
      res.status(200).send(`Deleted Successfully`);
    }
  }).catch = (e) => {
    logger.log({
      level: "error",
      message: `Delete request for document id ${req.query.documentId} by hcp person ${req.query.hcpId} failed`,
      metaData: {
        ip: req.ip,
        performedBy: req.query.hcpId,
      },
    });
    res.status(400).send("Some Error Occured!! Retry in some time");
  };
};

module.exports = {
  deleteDocument,
};
