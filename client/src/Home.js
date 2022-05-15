import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import './App.css';
import Header from './Header';
import Results from './Results';

function Home() {
    const [word, setWord] = useState("");
    //const [pos, setPos] = useState("");
    const dataServer = []
    const navigate = useNavigate();
    function searchInDatab(event) {
        event.preventDefault();
        Axios.get("http://localhost:3001/words/" + word)
            .then(res => {
                dataServer.push(res.data);
            })
            .catch(function (err) {
                console.log(err);
            })
            .finally(() => navigate(('/results_' + dataServer[0].word._id), { replace: true, state: dataServer }));
    }
    return (
        <div>
            <Header />
            <form onSubmit={searchInDatab} className="search-form">
                <label>Word:
                    <input type="text" onChange={(e) => { setWord(e.target.value) }}></input></label>
                <button>Seacrh</button>
            </form>
        </div>

    );
}

export default Home;