import { useState } from "react";
import Main from "./Main";

const Header = () => {
  const date = new Date().toLocaleDateString().split("/").reverse().join("-");
  const [selectedDate, setSelectedDate] = useState();

  const dateToUnixTimestamp = (date) => {
    const newUnix = new Date(date).getTime();
    return newUnix;
  };

  const handleSearch = () => {
    const date = document.querySelector(".date-input").value;
    const unix = dateToUnixTimestamp(date);
    setSelectedDate(unix);
  };

  return (
    <div className="container">
      <div className="search">
        <h1>Daily Statistics for Covid-19 in Ireland</h1>
        <div className="input-div">
          <input
            className="date-input"
            type="date"
            min="2020-02-29"
            max={date}
          ></input>
          <button className="search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
      </div>
      <Main date={selectedDate} />
    </div>
  );
};

export default Header;
