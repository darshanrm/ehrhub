const router = require("express").Router();
const { getController } = require("../controllers");

//get visit details by patient id
router.route("/byPatientId").get(getController.getVisitDetailsByPatientId);

//get visit details by healthcare professional id
router.route("/byHcpId").get(getController.getVisitDetailsByHcpId);

//get visit details by both patient and healthcare professional id
router
  .route("/byPatientIdAndHcpId")
  .get(getController.getVisitDetailsByPatientIdAndHcpId);

//TODO: get visit details by visit Id
module.exports = router;
