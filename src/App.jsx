import { useState, useEffect } from "react";

import "./App.css";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import Forecasting from "./components/Forecasting";
import Time from "./components/Time";

function App() {
  //states
  const [city, setCity] = useState("Mumbai");
  const [background, setBackground] = useState(
    "bg-gradient-to-b from-sky-200 via-white to-sky-100"
  );
  const [time, setTime] = useState("12:00 PM");
  const [index, setIndex] = useState(0);
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  //const variable
  // const API_KEY = "";
  const API_KEY = import.meta.env.VITE_API_KEY;

  //functions
  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      const today = data.list[0];
      const date = today.dt_txt.split(" ")[0];
      const time = today.dt_txt.split(" ")[1];
      setWeather({
        city: city,
        ...today["main"],
        ...today.weather[0],
        ...today.clouds,
        wind_speed: today.wind.speed,
        visibility: today.visibility,
      });

      //created an object of
      const daily = data.list.reduce((acc, item) => {
        const date = item.dt_txt.split(" ")[0];
        const time = item.dt_txt.split(" ")[1];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      }, {});

      const dailyForecast = Object.keys(daily).map((date) => ({
        date: date,
        entries: daily[date],
      }));

      setForecast(dailyForecast);
    } catch (e) {
      console.log("Error Occured :", e);
    }
  };
  console.log(forecast);
  useEffect(() => {
    fetchWeather(city);
  }, [city]);
  useEffect(() => {
    if (!forecast[index]) return;
    const entry = forecast[index].entries.find(
      (e) => e.dt_txt.split(" ")[1] === time
    );
    if (!entry) return;
    setWeather({
      city: city,
      date: forecast[index].date,
      description: entry.weather[0].description,
      temp: entry.main.temp,
      humidity: entry.main.humidity,
      wind_speed: entry.wind.speed,
    });
  }, [index, time, city, forecast]);

  useEffect(() => {
    console.log("here is weather", weather);
  }, [weather]);

  return (
    <>
      <div
        className={`bg-white flex flex-col items-center min-h-screen px-5 ${background}`}
      >
        <div className="flex w-full items-center justify-between">
          <h1 className="text-blue-500 text-2xl font-bold mt-6">
            Weather Forecast
          </h1>
          <SearchBox onSearch={fetchWeather} />
        </div>
        <WeatherCard
          weather={weather}
          timeUpdated={time}
          forecast={forecast}
          index={index}
          setBackground={setBackground}
        />
        <Time setTime={setTime} forecast={forecast} index={index} />
        <Forecasting forecast={forecast} setIndex={setIndex} />
      </div>
    </>
  );
}

export default App;
