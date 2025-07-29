import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";
import wind from "./../assets/windmill-removebg-preview (1).png"

export default function Weather() {

    const [city, setCity] = useState("Shrigonda");
    const [weather, setWeather] = useState();

    const date = Date();

    useEffect(
        () => {
            fetchWeather()
        }, []
    )

    useEffect(
        () => {
            fetchWeather()
        }, [city]
    )

    const fetchWeather = async () => {
        try {
            const result = await axios.get(
                `http://api.weatherapi.com/v1/current.json?key=04c625ba14324c838f092139242506&q=${city}&aqi=no`
            );
            setWeather(result.data);
            console.log(weather);
        } catch (error) {
            console.error("fetching ", error);
        }
    };

    let temp;

    weather && (temp = weather.current.temp_c)

    if (temp < 20) {
        document.getElementById("main").classList.add("background-cloudy")
        document.getElementById("main").classList.remove("background-rain")
        document.getElementById("main").classList.remove("background-sunny")
    }
    else if ((temp > 21) && (temp < 33)) {
        document.getElementById("main").classList.add("background-rain")
        document.getElementById("main").classList.remove("background-sunny")
        document.getElementById("main").classList.remove("background-cloudy")
    }
    else if (temp > 34) {
        document.getElementById("main").classList.add("background-sunny")
        document.getElementById("main").classList.remove("background-rain")
        document.getElementById("main").classList.remove("background-cloudy")
    }


    return (
        <>
            <section className="weather" id="main">

                <div className="inp">

                    <input
                        type="text"
                        className="input color bg-ip"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                        }}
                    />


                    {weather && <div className="box">
                        <p className="city color">{city} </p>

                        <p className="location color"><span className="head">Temp:</span> {weather.current.temp_c} ℃</p>

                        <p className="humidity color"><span className="head">Humidity:</span> {weather.current.humidity} % <br /></p>

                    </div>
                    }

                </div>
                {weather &&
                    <div className="cards">
                        <div className="card">
                            {/* <img src={wind} alt="" className="wind"/> */}
                            <p className="info color">{weather.current.wind_kph} kph <br /><br />
                                <span className="heading">Wind</span></p>
                        </div>

                        <div className="card">
                            <p className="info color">{weather.current.cloud}<br /><br />
                                <span className="heading">Cloud</span></p>
                        </div>

                        <div className="card">
                            <p className="info color">{weather.current.pressure_in}<br /><br />
                                <span className="heading">Pressure</span></p>
                        </div>

                        <div className="card">
                            <p className="info color">{date}<br /><br /></p>
                        </div>
                    </div>
                }
            </section>
        </>
    );
}
