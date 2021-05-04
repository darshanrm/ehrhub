const express = require('express');
const router = express.Router();
const { postController } = require('../controllers');

router.route('/newVisit').post(postController.createNewVisit);

module.exports = router;