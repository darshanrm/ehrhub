const express = require("express");
const router = express.Router();
const { getController } = require("../controllers/index");

router.route("/byPrescriptionId").get(getController.getByPrescriptionId);
router.route("/byVisitId").get(getController.getByVisitId);
router.route("/byPatientId").get(getController.getByPatientId);
router.route("/byHcpId").get(getController.getByHcpId);
router.route("/byPatientIdAndHcpId").get(getController.getByPatientIdAndHcpId);

module.exports = router;
