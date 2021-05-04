const router = require('express').Router();
const { body } = require('express-validator');
const { signupController } = require('../controllers')

// SignUp Request

router
    .route('/')
    .post(
        body('email').isEmail(),
        body('password').isLength({ min: 8 }),
        signupController.signup
    )

module.exports = router;