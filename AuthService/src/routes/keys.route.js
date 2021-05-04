const router = require('express').Router();
const { getKeySet } = require('../middlewares/jwt');

router.get('/', (req, res) => {
        res.send(getKeySet())
    })

module.exports = router;