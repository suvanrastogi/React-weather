import React, { useState } from "react";

function SearchBox({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() === "") {
      return;
    } else {
      onSearch(city);
    }
  };
  return (
    <>
      <div className=" flex gap-2 mt-6">
        <input
          type="text"
          placeolder="Enter city name..."
          value={city}
          className="border-b p-2 border-gray-300  w-60 outline-none bg-gray-100"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-5 py-1 hover:bg-blue-600 cursor-pointer"
        >
          Search
        </button>
      </div>
    </>
  );
}

export default SearchBox;
