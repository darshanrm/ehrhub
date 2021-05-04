const express = require('express');
const router = express.Router();
const deleteController = require('../controllers/deleteRoutes.controller');

router.route('/deleteDocument').delete(deleteController.deleteDocument);

module.exports = router;