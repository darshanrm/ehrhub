const express = require('express');
const router = express.Router();
const postController = require('../controllers/postRoutes.controller');

router.route('/postDocument').post(postController.storeDocument);

module.exports = router;