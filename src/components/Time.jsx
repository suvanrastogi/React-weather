import React from "react";

function Time({ setTime, forecast, index }) {
  function handleClick(time) {
    setTime(time);
  }

  return (
    <div className=" text-whit flex justify-center gap-6 p-6">
      {console.log(forecast)}

      {forecast[index] &&
        forecast[index].entries &&
        forecast[index].entries.map((individualTime) => (
          <button
            key={individualTime.dt_txt.split(" ")[1]} // always add a key when mapping
            onClick={() => handleClick(individualTime.dt_txt.split(" ")[1])}
            className="border border-blue-500 bg-blue-500/20 hover:bg-blue-500/40 px-4 py-2 rounded-lg shadow-md transition "
          >
            {individualTime.dt_txt.split(" ")[1]}
          </button>
        ))}
    </div>
  );
}

export default Time;
