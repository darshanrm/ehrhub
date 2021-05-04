const { validationResult } = require('express-validator');
const { users } = require('../models');
const logger = require('../middlewares/logger');

const signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    users.create({
        email: req.body.email,
        password: req.body.password,
        full_name: req.body.full_name,
        role: req.body.role
    }).then((newUser) => {
        res.json({
            email: newUser.email,
            full_name: newUser.full_name,
            role: newUser.role
        });
        logger.http(`POST | New User Created`, { ip: req.ip, newUser});
    })
    .catch(err => {
        res.json({ message: "Server Error", error: err })
    })
}

module.exports = {
    signup
}