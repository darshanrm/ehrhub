const express = require("express");
const router = express.Router();
const { deleteController } = require("../controllers/index");

router.route("/byId").delete(deleteController.deleteById);

module.exports = router;
