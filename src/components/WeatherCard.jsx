import React, { useState, useEffect } from "react";
import humidity from "../assets/humidity.png";
import windImg from "../assets/wind.png";
import sunWithCloud from "../assets/sun-with-cloud.png";
import rain from "../assets/rain.png";
import summerImg from "../assets/summer.png";
import winterImg from "../assets/winter.png";

function WeatherCard({ weather, timeUpdated, forecast, index, setBackground }) {
  const [date, setDate] = useState(new Date());
  const [weatherImage, setWeatherImage] = useState(sunWithCloud);
  const [formattedTime, setFormattedTime] = useState(
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );

  const GRADIENTS = {
    rain: "bg-gradient-to-b from-slate-400 via-sky-300 to-sky-200 ",
    snow: "bg-gradient-to-b from-slate-200 via-sky-50 to-indigo-50 ",
    clear: "bg-gradient-to-b from-sky-200 via-white to-amber-100 ",
    cloud: "bg-gradient-to-b from-slate-200 via-sky-100 to-slate-400 ",
    humidity: "bg-gradient-to-b from-cyan-200 via-sky-100 to-sky-100 ",
    wind: "bg-gradient-to-b from-sky-200 via-blue-50 to-slate-100 ",

    // Optional extras you might find useful:
  };

  useEffect(() => {
    if (!weather || !weather.description) return;
    console.log("this is weather", weather);
    const desc = weather.description.toLowerCase();
    if (desc.includes("rain")) {
      setWeatherImage(rain);
      setBackground(GRADIENTS.rain);
    } else if (desc.includes("snow")) {
      setWeatherImage(winterImg);
      setBackground(GRADIENTS.snow);
    } else if (desc.includes("clear")) {
      setWeatherImage(summerImg);
      setBackground(GRADIENTS.clear);
    } else if (desc.includes("cloud")) {
      setWeatherImage(sunWithCloud);
      setBackground(GRADIENTS.cloud);
    } else if (desc.includes("humidity")) {
      setWeatherImage(humidity);
      setBackground(GRADIENTS.humidity);
    } else if (desc.includes("wind")) {
      setWeatherImage(windImg);
      setBackground(GRADIENTS.wind);
    }
    setFormattedTime(timeUpdated);
    // setDate(dateUpdated);
  }, [weather]);

  useEffect(() => {
    if (!forecast || !forecast[index]) return;
    const stringDate = forecast[index].date;
    const newDate = new Date(stringDate);
    setDate(newDate);
  }, [index]);

  return (
    <div className="text-center p-6 mt-6 text-black">
      <h2 className="text-3xl font-bold capitalize tracking-wide">
        {weather["city"]}
      </h2>
      <h2 className="text-sm mt-2 uppercase text-gray-500 tracking-widest">
        {date.toLocaleDateString("en-US", {
          weekday: "long",
        })}{" "}
        {formattedTime}
      </h2>

      <div className="flex justify-center pt-7 ">
        <img src={weatherImage} alt="" />
      </div>
      <h1 className="text-5xl font-extrabold mt-8 text-sky-700">
        {weather.temp}°C
      </h1>
      <h2 className="text-4xl font-medium mt-10 capitalize italic mt-2">
        {weather.description}
      </h2>

      {/* //humidity and wind card */}

      <div className="flex gap-5 items-center mt-10 justify-center ">
        <div className="lex items-center gap-4 border border-sky-300 rounded-xl p-4 shadow-lg bg-white hover:shadow-xl transition">
          <div className="w-20">
            <img src={humidity} alt="" className="w-full" />
          </div>
          <div>
            <p className="font-medium">Humidity</p>
            <p className="font-bold text-blue-500 text-lg">
              {weather.humidity}%
            </p>
          </div>
        </div>

        <div className="lex items-center gap-4 border border-sky-300 rounded-xl p-4 shadow-lg bg-white hover:shadow-xl transition">
          <div className="w-20">
            <img src={weatherImage} alt="" className="w-full" />
          </div>
          <div>
            <p className="font-medium">Wind</p>
            <p className="font-bold text-blue-500 text-lg">
              {weather.wind_speed}m/s
            </p>
          </div>
        </div>
      </div>
      {/* //humidity and wind card ends here */}
    </div>
  );
}

export default WeatherCard;
