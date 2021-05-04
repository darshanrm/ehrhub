const { Router } = require("express");
const express = require("express");
const router = express.Router();
const getRoutes = require("./getRoutes");
const postRoutes = require("./postRoutes");
const deleteRoutes = require("./deleteRoutes");

router.use("/get", getRoutes);
router.use("/post", postRoutes); //Not Needed this functionality is implemented using rabbitMQ consumer
router.use("/delete", deleteRoutes);

module.exports = router;
