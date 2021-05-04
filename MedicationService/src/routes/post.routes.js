const express = require("express");
const router = express.Router();
const { postController } = require("../controllers/index");

router.route("/newMedication").post(postController.createNewMedication);

module.exports = router;
