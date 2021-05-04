const router = require('express').Router();
const details = require('./details.route');
const vitals = require('./vitals.route');

router.use('/details', details)
router.use('/vitals', vitals);
//Home routeTODO
module.exports = router;