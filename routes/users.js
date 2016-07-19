const express = require('express');
const User = require('../models/user');

const router = express.Router();


router.route('/')
.get((req, res) => {
  User.find({}, (err, users) => {
    res.status(err ? 400 : 200).send(err || users);
  });
})
.post((req, res) => {
  const user = new User(req.body);
  user.save((err, savedUser) => {
    res.status(err ? 400 : 200).send(err || savedUser);
  });
});

router.route('/:id')
.get((req, res) => {
  User.find({ _id: req.params.id }, (err, user) => {
    res.status((err || !user) ? 400 : 200).send(err || user[0]);
  });
})
.put((req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, savedUser) => {
    res.status(err ? 400 : 200).send(err || savedUser);
  });
})
.delete((req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    res.status(err ? 400 : 200).send(err);
  });
});

router.route('/removeThing/:id')
.put((req, res) => {
  console.log('thi',req.body.thing);
  User.findById(req.params.id, (err,user) => {
    user.things.splice(user.things.indexOf(req.body.thing._id),1);
    user.save();
    return res.send();
  })
})



module.exports = router;

