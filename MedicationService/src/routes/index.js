const getRoutes = require("./get.routes");
const getPDFRoutes = require("./getPDF.routes");
const postRoutes = require("./post.routes");
const deleteRoutes = require("./delete.routes");
const express = require("express");
const router = express.Router();

router.use("/get", getRoutes);
router.use("/getPDF", getPDFRoutes);
router.use("/post", postRoutes);
router.use("/delete", deleteRoutes);

module.exports = router;
