const Yelp = require('yelp');
const yelp = new Yelp({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET,
});

const express = require('express');
const Thing = require('../models/thing');
const User = require('../models/user');

const router = express.Router();

router.route('/')
.get((req, res) => {
  console.log('req.query',req.query);
  return yelp.search({term:req.query.term, location:req.query.location})
  .then(data =>
    res.send(data)
  )
  .catch(err =>
    res.status(400).send(err)
  );
})

router.route('/:id')
.get((req, res) => {
  return yelp.business(req.params.id)
  .then(data =>
    res.send(data)
  )
  .catch(err =>
    res.status(400).send(err)
  );
})

module.exports = router;
