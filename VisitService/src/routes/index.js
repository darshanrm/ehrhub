const router = require('express').Router();
const getRoutes = require('./get.routes');
const postRoutes = require('./post.routes');
const deleteRoutes = require('./delete.routes');

router.use('/get',getRoutes);
router.use('/post',postRoutes);
router.use('/delete',deleteRoutes);

module.exports = router;