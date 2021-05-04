const express = require("express");
const router = express.Router();
const { getController } = require("../controllers");
const { authenticate } = require('../middlewares/auth');

//TODO: Aggregate all services
//TODO: get documents from prescription, medication, lab, visit-uploaded docs, hcp-service, visits service

//docs matching patient Id
router.route("/getPatientDocuments").get(authenticate, getController.getPatientDocuments);

//docs matching patient id and hcp id
router.route("/getVisitDocuments").get(authenticate, getController.getVisitDocuments);

//docs matching hcp id
router.route("/getAuthoredDocuments").get(authenticate, getController.getAuthoredDocuments);

//TODO: docs by visit Id

//TODO: lab details (byPrescriptionId)

module.exports = router;
