const express = require("express");
const router = express.Router();
const { getPDFController } = require("../controllers/index");

router.route("/byVisitId").get(getPDFController.getByVisitId);

//TODO
//byPatientId

module.exports = router;
