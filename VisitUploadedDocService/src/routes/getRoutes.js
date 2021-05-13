const express = require("express");
const router = express.Router();
const getController = require("../controllers/getRoutes.controller");

//docs by visit Id
router.route("/getVisitDocuments").get(getController.getVisitDocuments);

//docs by patient Id
router.route("/byPatientId").get(getController.byPatientId);

module.exports = router;
