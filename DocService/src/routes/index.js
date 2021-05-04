const express = require('express');
const router = express.Router();
const getRoutes = require('./get.routes');
const postRoutes = require('./post.routes');

router.use('/get',getRoutes);
router.use('/post',postRoutes);

module.exports =  router;
