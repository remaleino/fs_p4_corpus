import React, { useState } from "react";
import ReactDOM from 'react-dom/client'
import Axios from "axios";
import './AddNew.css';
import Header from './Header';
//Routerin pääfunktio
function AddNew() {
    //Funktio lisää uuden kappaleen tietokantaan
    function addToDatab(event) {
        //Estetään tiedon toistuvuuden ja määritetään tarpeelliset muuttujat
        event.preventDefault();
        const lemma = event.target.new_lemma.value
        const pos = event.target.part_of_speech.value
        const dbItem = { word: lemma, pos: pos }
        const root = ReactDOM.createRoot(
            document.getElementById('status')
        );
        //Lähetetään axiosin kautta post-pyyntö
        Axios.post("http://localhost:3001/words/post", dbItem)
            .then(res => {
                root.render(res.data.message)
            })
            .catch(function (err) {
                root.render("An error occured while adding the item." + err);
            })
    }
    //Renderöidään sivuston ulkonäkö ja formi
    return (
        <div>
            <Header />
            <ul className="info-list">
                <h4>Adding a new word to the database</h4>
                <li>Here you can add a new word to the database.</li>
                <li>You need to write to input the lemma of the words, as, also, to choose the part of speech of the word.</li>
                <li>If you are unsure how to spell the word or to which POS group it belonges, we highly recommend to clarify that in Wiktionary.</li>
            </ul>
            <div className="container">
                <form onSubmit={addToDatab} className="search-form">
                    <div className="row">
                        <div className="col-25">
                            <label className="form_label" htmlFor="lemma">Word</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="new_lemma" name="new_lemma" placeholder="Add a new word to the database"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label className="form_label" htmlFor="part_of_speech">Part of scpeech</label>
                        </div>
                        <div className="col-75">
                            <select id="part_of_speech" name="part_of_speech">
                                <option value="noun">Noun</option>
                                <option value="verb">Verb</option>
                                <option value="adjective">Adjective</option>
                                <option value="adverb">Adverb</option>
                                <option value="pronoun">Pronoun</option>
                                <option value="preposition">Preposition</option>
                                <option value="conjunction">Conjunction</option>
                                <option value="interjextion">Interjection</option>
                                <option value="article">Article</option>
                            </select>
                        </div>
                        <div className="row">
                            <input id="new_input" type="submit" value="Submit"></input>
                        </div>
                        <div className="row" id="status"></div>
                    </div>
                </form>
            </div>
        </div>

    );
}
/*
<label>Word: </label>
      <input type="text" onChange={(e) => { setWord(e.target.value) }}></input>
      <label>POS: </label>
      <input type="text" onChange={(e) => { setPos(e.target.value) }}></input>
      <button onClick={addToList}>Add to list</button>
*/
export default AddNew;