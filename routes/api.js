const express = require('express');

const router = express.Router();

router.use('/users', require('./users'));
router.use('/things', require('./things'));
router.use('/auth', require('./auth'));
router.use('/yelp', require('./yelp'));

module.exports = router;

