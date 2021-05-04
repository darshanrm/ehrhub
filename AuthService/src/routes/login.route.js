const router = require('express').Router();
const { users } = require('../models');
const { body } = require('express-validator');
const { loginController } = require('../controllers');

router
    .route('/')
    .post(
        body('email').isEmail().custom(value => {
            return users.findOne({ where: { email: value }}).then(user => {
                if(!user){
                    return Promise.reject("Not a Registered Email");
                }
            })
        }),
        loginController.login
    )

module.exports = router;