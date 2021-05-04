const express = require("express");
const router = express.Router();
const { getPDFController } = require("../controllers/index");

router.route("/byVisitId").get(getPDFController.getByVisitId);

//TODO: get docs by patient id ("/byPatientId")

module.exports = router;
