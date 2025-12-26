import React from "react";
import forecastImg from "../assets/image.png"

function Forecasting({ forecast, setIndex }) {
  console.log("here is forecast", forecast);
  return (
    <div className=" grid grid-cols-2 md:grid-cols-6 gap-4 my-6">
      {forecast.map((day, index) => (
        // <div key={index} className="bg-white shadow-sm py-5 px-5 rounded-lg text-center text-black cursor-pointer" onClick={()=>setIndex(index)}>
        //     <p>{new Date(day.date).toLocaleDateString("en-US", {weekday: "long",})}</p>
        //     <img src="src/assets/image.webp" alt="" className="mx-auto"/>
        //     <p>{day.entries[index].main.temp}°C</p>
        //     <p>{day.entries[0].weather[0].description}</p>
        // </div>

        <div
          key={index}
          onClick={() => setIndex(index)}
          className="bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 text-center text-gray-800 cursor-pointer border border-gray-200"
        >
          <p className="text-lg font-semibold text-blue-600 mb-2">
            {new Date(day.date).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </p>

          <img
            src={forecastImg}
            alt="Weather icon"
            className="mx-auto w-20 h-20 object-contain mb-4"
          />

          <p className="text-3xl font-bold text-gray-900 mb-1">
            {day.entries[0].main.temp}°C
          </p>

          <p className="text-md italic capitalize text-gray-600">
            {day.entries[0].weather[0].description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Forecasting;
