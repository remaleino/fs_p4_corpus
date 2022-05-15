import React from "react";

export default function Header() {
    return (

        <div>
            <div className="home-menu">
                <lable>English Corpus - Basing on "The Brothers Karamazov" by Fyodor Dostoyevsky</lable>
                <ul className="menu-list">
                    <li className="menu-item"><a href="/" className="menu-link">Home</a></li>
                    <li className="menu-item"><a href="/add_new" className="menu-link">Add a New Word</a></li>
                    <li className="menu-item"><a href="/controll_data" className="menu-link">Controle Data</a></li>
                </ul>
            </div>
        </div>
    )
}
