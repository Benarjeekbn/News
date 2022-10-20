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

var server_port = process.env.YOUR_PORT || process.env.PORT;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
