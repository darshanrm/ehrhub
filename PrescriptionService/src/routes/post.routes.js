const express = require("express");
const router = express.Router();
const { postController } = require("../controllers/index");

router.route("/newPrescription").post(postController.createNewPrescription);

module.exports = router;
