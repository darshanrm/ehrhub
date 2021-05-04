const express = require("express");
const router = express.Router();
const getController = require("../controllers/getRoutes.controller");

//docs uploaded by user(userid)
router.route("/byPatientId").get(getController.getDocumentsByPatientId);
router.route("/byHcpId").get(getController.getDocumentsByHcpId);
router
  .route("/byPatientIdAndHcpId")
  .get(getController.getDocumentsByPatientIdAndHcpId);

//TODO: get docs by visit id ("/byVisitId");

module.exports = router;
