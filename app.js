require('dotenv').config();
const PORT = process.env.PORT || 8000;

const express = require('express');
const morgan = require('morgan');

const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yelptest', (err) => {
  console.log(err || 'Mongoose connected!');
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('client'));
app.use(morgan('dev'));
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, err => {
  console.log(err || `server started port ${PORT}`);
});
