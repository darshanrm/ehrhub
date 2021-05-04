const router = require('express').Router();
const { body } = require('express-validator');
const { refreshController } = require('../controllers');

router
    .route('/')
    .post(
        body('token').isJWT(),
        refreshController.refresh
    )


module.exports = router;