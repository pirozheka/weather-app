import React from "react";
import "../styles/components/header.css";
import { FaSearch } from "react-icons/fa";

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="header">
                    <div className="header__title">Simple Weather App</div>
                    <div className="header__city">
                        <div>Поиск по городу:</div>
                        <div className="header__city-searchbox">
                            <input type="text" placeholder="Найти..." />
                            <button type="submit"><FaSearch /></button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;