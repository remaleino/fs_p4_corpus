//Ladataan tarvittavat lisäosat.
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const Word = require('../models/word');
const text = 'api/models/data.txt';
const { spawn } = require('child_process');


//Haetaan kaikki tietokannan arvojoukot.
router.get('/', (req, res, next) => {
    Word.find().exec().then(doc => {
        if (doc.length >= 0) {
            res.status(200).json(doc)
        } else {
            res.status(404).json({
                message: 'No entries found in the database'
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    });
});
//Lisätään uusi arvojoukko tietokantaan.
router.post('/post', (req, res, next) => {
    const word = new Word({
        _id: new mongoose.Types.ObjectId(),
        word: req.body.word,
        pos: req.body.pos
    });
    word.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    res.status(201).json({
        message: 'Could add a new item to the database.',
        createdWord: word
    });
});
//Etsitään lemmalla arvojoukko tietokannasta.
router.get('/:word', (req, res, next) => {
    const word = req.params.word
    word.toLowerCase()
    Word.find({ word: word }).exec().then(doc => {
        /* Täällä erikseen määritetään toiminnot olemassa olevalle,
        muttei tyhjälle tietokannalle.*/
        if (doc.length) {
            /*Vastaanotettu data analysoidaa erikseen olevalla
            Python-tiedostolla. Tätä varten määritetään tiedoston sijainti
            ja napataan se, minkä jälkeen määritetäään tiedoston aukaisemisen
            ja sulkemisen toiminnot. Lisäksi määritetään errorien vastaanottamisen.*/
            let dataList = [];
            const python = spawn('python3', ['api/routes/script.py', word]);
            python.stdout.on('data', function (data) {
                dataList.push(data.toString());
            });
            python.stderr.on('data', function (data) {
                dataList.push(data.toString());
            });
            python.on('close', (code) => {
                console.log(`child process close all stdio with code ${code}`)
                dataList = dataList[0].split("\n");
                dataList.pop()
                res.status(200).send({ word: doc[0], value: dataList })
            });
        } else {
            res.status(404).json({
                message: 'The item not found in the database'
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
//Muokataan id:llä arvojoukkon arvoja.
router.patch('/patch/:wordID', (req, res, next) => {
    const id = req.params.wordID;
    const ops = {};
    for (const o of req.body) {
        ops[o.propName] = o.value;
    }
    Word.updateOne({ _id: id }, { $set: ops }).exec().then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
//Poistetaan id:llä arvojoukko tietokannasta.
router.delete('/:wordID', (req, res, next) => {
    const id = req.params.wordID;
    Word.remove({ _id: id }).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
//Viedän nykyinen moduuli käyttöön.
module.exports = router;