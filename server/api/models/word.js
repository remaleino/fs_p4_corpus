//Ladataan tarvittavat lisäosat.
const mongoose = require('mongoose')
//Määritetään tietokannan arvojoukon skeema.
const wordSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    word: String,
    pos: String
});
//Viedän nykyinen moduuli käyttöön.
module.exports = mongoose.model('Word', wordSchema);