const express = require("express");
const router = express.Router();
const { getPDFController } = require("../controllers/index");

//get prescription by visit id
router.route("/byVisitId").get(getPDFController.getByVisitId);

//get prescriptions by PatientId
router.route("/byPatientId").get(getPDFController.getByPatientId);

module.exports = router;
