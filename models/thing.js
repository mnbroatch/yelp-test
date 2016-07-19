const mongoose = require('mongoose');


const thingSchema = new mongoose.Schema({
  yelpId: String,
  numFavorites: Number,
  name: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});


const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;

