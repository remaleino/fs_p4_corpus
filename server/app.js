//Ladataan tarvittavat lisäosat.
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
//Märitetään tietokannan routerin sijainnin.
const wordRoutes = require('./api/routes/words');
//Määritetään, mitä ohjelman pitä käyttää toiminnassa.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Luodaan yhteys tietokantaan.
mongoose.connect('mongodb+srv://remaleino:remaleino@cluster0.syy5n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
//Määritetään viittauksen.
app.use('/words', wordRoutes);
//Viedän nykyinen moduuli käyttöön.
module.exports = app;