const router = require('express').Router();
const { deleteController } = require('../controllers');

router.route('/deleteVisit').delete(deleteController.deleteVisit);

module.exports = router;