const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const dotenv = require('dotenv');
const cookies = require('cookie-parser')
dotenv.config();

var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.use(cookies());
app.use(router);

app.listen(process.env.APP_PORT, function () {
  console.log(`Server running on ${process.env.PORT}`);
});
