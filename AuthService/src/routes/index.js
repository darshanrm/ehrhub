const router = require('express').Router();
const signup = require('./signup.route');
const login = require('./login.route');
const keys = require('./keys.route');
const refresh = require('./refresh.route');

router.use('/signup', signup)
router.use('/login', login)
router.use('/keys', keys)
router.use('/refresh', refresh)

module.exports = router;