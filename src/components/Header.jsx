import React, { useState } from "react";
import "../styles/components/header.css";
import { FaSearch } from "react-icons/fa";

const Header = ({ onCityChange }) => {  
    const [city, setCity] = useState("");

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSearch = () => {
        if (city.trim()) {
            onCityChange(city);
            setCity(""); 
        }
    };

    return (
        <header>
            <div className="container">
                <div className="header">
                    <div className="header__title">Simple Weather App</div>
                    <div className="header__city">
                        <div>Поиск по городу:</div>
                        <div className="header__city-searchbox">
                            <input
                                type="text"
                                placeholder="Найти..."
                                value={city}
                                onChange={handleInputChange}
                            />
                            <button type="button" onClick={handleSearch}>
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
