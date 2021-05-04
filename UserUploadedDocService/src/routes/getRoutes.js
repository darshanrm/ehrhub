const express = require('express');
const router = express.Router();
const getController = require('../controllers/getRoutes.controller');


//docs uploaded by user(userid)
router.route('/getUserDocuments').get(getController.getUserDocuments);

module.exports = router;