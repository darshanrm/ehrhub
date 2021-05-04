const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.route("/postDocument").post(postController.storeDocument);

//TODO: post prescription as well as document

module.exports = router;
