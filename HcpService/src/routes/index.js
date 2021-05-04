const router = require('express').Router();
const doctor = require('./doctor.route');
const facility = require('./facility.route');
const pharmacy = require('./pharmacy.route');
const lab = require('./lab.route');

router.use('/doctor', doctor);
router.use('/facility', facility);
router.use('/pharmacy', pharmacy);
router.use('/lab', lab);
module.exports = router;