const mongoose = require('mongoose');

const JWT_SECRET = process.env.JWT_SECRET;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  things: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thing' }],
});



userSchema.statics.authMiddleware = function (req, res, next) {
  const token = req.cookies.authtoken;

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).send(err);

    User.findById(payload._id, (err2, user) => {
      if (err2 || !user) return res.status(401).send(err2 || { error: 'User not found.' });
      req.user = user;
      return next();
    }).select('-password');
  });
};


userSchema.methods.generateToken = function () {
  const payload = {
    _id: this._id,
    username: this.username,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1 day' });
  return token;
};


userSchema.statics.register = function (userObj, cb) {
  this.findOne({ username: userObj.username }, (err, user) => {
    if (err || user) return cb(err || { error: 'Username already taken.' });

    bcrypt.hash(userObj.password, 12, (err2, hash) => {
      if (err2) return cb(err2);

      userObj.password = hash;

      this.create(userObj, err3 =>
        cb(err3)
      );
    });
  });
};


userSchema.statics.authenticate = function (userObj, cb) {
  this.findOne({ username: userObj.username })
  .exec((err, user) => {
    if (err) return cb(err);

    if (!user) {
      return cb({ error: 'Invalid username or password.' });
    }
    //           ( password attempt,   db hash )
    bcrypt.compare(userObj.password, user.password, (err2, isGood) => {
      if (err2 || !isGood) return cb(err2 || { error: 'Invalid username or password.' });

      user.password = null;

      return cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;

