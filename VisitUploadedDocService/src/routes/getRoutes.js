const express = require("express");
const router = express.Router();
const getController = require("../controllers/getRoutes.controller");

//docs by visit Id
router.route("/getVisitDocuments").get(getController.getVisitDocuments);

//TODO: docs by patient Id("/byPatientId")

module.exports = router;
