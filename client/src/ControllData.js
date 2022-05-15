import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import './App.css';
import Header from './Header';

function ControllData() {
    const [fullList, setFullList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await Axios.get("http://localhost:3001/words/");

            setFullList(result.data);
        };

        fetchData();
    }, []);
    function manipulateDatab(event) {
        const action = event.nativeEvent.submitter.name
        const word = event.target.lemma.value;
        const pos = event.target.pos.value;
        const id = event.currentTarget.getAttribute('data-id')
        if (action === "update") {
            const dbItem = [{ propName: "word", value: word }, { propName: "pos", value: pos }]
            Axios.patch("http://localhost:3001/words/patch/" + id, dbItem)
                .then(res => {
                    //console.log(res.data.message)
                })
                .catch(function (err) {
                    //root.render("An error occured while adding the item." + err);
                })
        }
        if (action === "delete") {
            Axios.delete("http://localhost:3001/words/" + id)
                .then(res => {
                    //console.log(res.data.message)
                })
                .catch(function (err) {
                    //root.render("An error occured while adding the item." + err);
                })
        }
    }
    return (
        <div>
            <Header />
            <div>
                <ul className="info-list">
                    <h4>Data management</h4>
                    <li>Here You can manage the saved in the database items.</li>
                    <li>By pressing 'Update' you can update item values.</li>
                    <li>By pressing 'Delete' you can delete item from the database.</li>
                </ul>
            </div>
            <ol className="data-list">
                {fullList.map((row, i) => {
                    return (
                        <form onSubmit={manipulateDatab} data-id={row._id}>
                            <li key="{i}">
                                <input type="text" id="lemma" name="lemma" defaultValue={row.word} />
                                <select name="pos" defaultValue={row.pos}>
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
                                <button type="submit" name="update">Update</button>
                                <button type="submit" name="delete">Delete</button>
                                <p name="status"></p>
                            </li>
                        </form>
                    )
                })}
            </ol>
        </div>

    );
}
export default ControllData;