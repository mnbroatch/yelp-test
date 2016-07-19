const express = require('express');
const Thing = require('../models/thing');
const User = require('../models/user');

const router = express.Router();

router.route('/yelpId/:id')
.get((req, res) => {
  Thing.find({yelpId: req.params.id}, (err, things) => {
    res.status(err ? 400 : 200).send(err || things[0]);
  });
})

router.route('/:id')
.get((req, res) => {
  User.findById(req.params.id)
  .populate(['things'])
  .exec((err, user) => {
    res.status((err || !user) ? 400 : 200).send(err || user);
  });
})
.put((req, res) => {
  Thing.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, savedThing) => {
    res.status(err ? 400 : 200).send(err || savedThing);
  });
})
.delete((req, res) => {
  Thing.findById(req.params.id, (err,thing) => {
    if(thing){
      thing.numFavorites--;
      return thing.save();
    }
    else return null;
  })
})

router.route('/')
.get((req, res) => {
  Thing.find({}, (err, things) => {
    res.status(err ? 400 : 200).send(err || things);
  });
})
.post((req, res) => {
  Thing.find({yelpId: req.body.thing.id})
  .then(things => {
    if (!things[0]){
      const thing = new Thing();
      thing.numFavorites = 1;
      thing.yelpId = req.body.thing.id;
      thing.name = req.body.thing.name;
      if(thing.users.indexOf(req.body.user._id) < 0)
        thing.users.push(req.body.user._id);
      return thing.save();
    }
    else {

      //  check here if user already favorites item

      if(things[0].users.indexOf(req.body.user._id) < 0)
        things[0].users.push(req.body.user._id);
      things[0].numFavorites++;
      return things[0].save(); 
    }
  })
  .then(savedThing => {
    console.log(req.body.user._id);
    User.findByIdAndUpdate(req.body.user._id, { $push: { things: savedThing._id } }, err => {
      res.status(err ? 400 : 200).send(err || savedThing);
    });
  })
});

module.exports = router;
