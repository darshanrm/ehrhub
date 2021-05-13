const express = require("express");
const router = express.Router();
const { getPDFController } = require("../controllers/index");

router.route("/byVisitId").get(getPDFController.getByVisitId);

//get medication by patient id
router.route("/byPatientId").get(getPDFController.getByPatientId);

module.exports = router;
