const logger = require("../middlewares/logger");
const { lab_uploaded_docs } = require('../models');

const deleteDocument = (req, res) => {
  lab_uploaded_docs.findByPk(req.query.documentId).then((document) => {
    lab_uploaded_docs
      .destroy({
        where: {
          id: req.query.documentId,
        },
      })
      .then(
        logger.log({
          level: "http",
          message: `Delete request for document id ${req.query.documentId} by user ${req.query.userId} success`,
          metaData: {
            ip: req.ip,
            performedBy: req.query.userId,
          },
        })
      );
    res.status(200).send(`Deleted Successfully`);
  }).catch = (e) => {
    logger.log({
      level: "error",
      message: `Delete request for document id ${req.query.documentId} by user ${req.query.userId} failed`,
      metaData: {
        ip: req.ip,
        performedBy: req.query.userId,
      },
    });
    res.status(400).send("Some Error Occured!! Retry in some time");
  };
};

module.exports = {
  deleteDocument,
};
