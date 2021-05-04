const logger = require("../middlewares/logger");
const { visits } = require('../models')

const deleteVisit = (req, res) => {
  visits.findByPk(req.query.visitId).then((document) => {
    visits
      .destroy({
        where: {
          id: req.query.visitId,
        },
      })
      .then(
        logger.log({
          level: "http",
          message: `Visit record with id ${req.query.visitId} deleted successfully`,
          metaData: {
            ip: req.ip,
            performedBy: "Deleted by system",
          },
        })
      );
    res
      .status(200)
      .send(` Visit record with id ${req.query.visitId} deleted Successfully`);
  }).catch = (e) => {
    logger.log({
      level: "error",
      message: `Visit record with id ${req.query.visitId} deletion failed`,
      metaData: {
        ip: req.ip,
        performedBy: req.query.hcpId,
      },
    });
    res.status(400).send("Some Error Occured!! Retry in some time");
  };
};

module.exports = { deleteVisit };
