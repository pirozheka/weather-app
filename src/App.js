import React, { useState } from "react";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import "./styles/variables.css";
import "./styles/global.css";

function App() {
  const [city, setCity] = useState(""); 

  const handleCityChange = (newCity) => {
    setCity(newCity); 
  };

  return (
    <div className="App">
      <Header onCityChange={handleCityChange} /> 
      <WeatherCard city={city} /> 
    </div>
  );
}

export default App;
