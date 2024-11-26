import React, { useState, useEffect } from "react";
import axios from "axios";
import { WiSnow } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import { WiDayCloudy } from "react-icons/wi";
import "../styles/components/weathercard.css";

const WeatherCard = ({ city }) => {
    const [averageTemperature, setAverageTemperature] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getWeatherIcon = (temperature) => {
        if (temperature < 0) {
            return <WiSnow size={64} />;
        } else if (temperature > 15) {
            return <WiDaySunny size={64} />;
        } else {
            return <WiDayCloudy size={64} />;
        }
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                if (!city) {
                    setError("Город не может быть пустым.");
                    setLoading(false);
                    return;
                }

                const geoResponse = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
                    params: { name: city },
                });
                console.log("Ответ геокодера:", geoResponse.data);

                if (geoResponse.data.results && geoResponse.data.results.length > 0) {
                    const { latitude, longitude, name } = geoResponse.data.results[0];
                    console.log(`Используем город: ${name} с координатами (${latitude}, ${longitude})`);

                    const weatherResponse = await axios.get("https://api.open-meteo.com/v1/forecast", {
                        params: {
                            latitude,
                            longitude,
                            hourly: "temperature_2m",
                        },
                    });

                    console.log("Ответ от API погоды:", weatherResponse.data);

                    const { hourly } = weatherResponse.data;
                    if (hourly && hourly.temperature_2m) {
                        const avgTemp = hourly.temperature_2m.reduce((sum, temp) => sum + temp, 0) / hourly.temperature_2m.length;
                        console.log("Средняя температура:", avgTemp);
                        setAverageTemperature(avgTemp);
                    } else {
                        setError("Не удалось получить данные о температуре.");
                    }
                } else {
                    setError(`Город "${city}" не найден.`);
                }
            } catch (err) {
                console.error("Ошибка при получении данных:", err);
                setError("Не удалось загрузить данные о погоде.");
            } finally {
                setLoading(false);
            }
        };

        if (city) {
            fetchWeatherData();
        }
    }, [city]); 

  
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>; 

    return (
        <main>
            <div className="container">
                <div className="weather-card">
                    <div className="weather-card__title">
                        Погода для города <span>{city}</span>
                    </div>
                    <div className="weather-card__date">
                        {new Date().toLocaleDateString("ru-RU")}
                    </div>
                    <div className="weather-card__content">
                        <div className="icon">
                            {averageTemperature !== null && getWeatherIcon(averageTemperature)} 
                        </div>
                        <div className="temperature">
                            {averageTemperature !== null ? `${averageTemperature}°C` : 'Данные о температуре недоступны'}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WeatherCard;
