import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Axios from "axios";
import './Results.css';
import Header from './Header';

function Results() {
    //Muuttujien määritystä. Tässä location:in avulla vastaanotetaan Home:sta dataa.
    const location = useLocation();
    const word = location.state[0].word
    const list = location.state[0].value;
    /*
    Sivusto palauttaa ulkonäön sekä muodostaa listan datan objekteista.
    Pääsana eli hakusana ensin haetaan riviltä, korostetaan sitä ja lopuksi
    muodostetaan uusi rivi alkuperäisen rivin osista.
    */
    return (
        <div>
            <Header />
            <div>
                <ul className="info-list">
                    <h4>Search results in the corpus</h4>
                    <li>Lemma: "{word.word}", POS: {word.pos}</li>
                    <li>Found {list.length} contexts</li>
                </ul>
            </div>
            <ol className="data-list">
                {list.map((row, i) => {
                    row = row.split(word.word)
                    return (
                        <li key={i}>{row[0]}<b className="main-word">{word.word}</b>{row[1]}</li>)
                })}
            </ol>
        </div>

    );
}
export default Results;