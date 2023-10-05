import React, { useState } from "react";

interface SearchBarProps {
  handleWeatherSearch: (cityName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleWeatherSearch }) => {
  const [cityName, setCityName] = useState("");

  const handleSearchClick = () => {
    handleWeatherSearch(cityName);
  };

  return (
    <div className="mt-8 p-4 text-center">
      <div className="container mx-auto">
        <div className="max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-md p-5 border-2 border-black shadow-xl"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button
            className="bg-black text-white p-2 rounded-xl mt-3 w-full md:w-[12rem] transition duration-300 ease-in-out hover:bg-gray-700"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
