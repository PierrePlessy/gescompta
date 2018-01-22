const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
require("./config.js");

const http = require('http')

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app/dist')));
app.use('/api', require('./api'));

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.get('/product/all', (req, res) => {
    res.render('product_all.ejs')
})
app.listen(process.env.PORT, function() {
    console.log('Le serveur répond sur le port: ' + process.env.PORT);
});
