import "./header.css";
import { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { NavLink, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

function Header({ type }) {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const handleSearch = () => {
    if (destination && date) {
      dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
      navigate("/hotels", { state: { destination, date, options } });
    } else alert("Please Enter Your (( Destination + Date )) ☻♥");
  };

  return (
    <div className="header">
      <div
        className={
          type === "hotelss" ? "headerContainer hotelsMode" : "headerContainer"
        }
      >
        <div className="headerLists">
          <div className="headerListItem active">
            <i className="fa-solid fa-bed"></i>
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <i className="fa-solid fa-plane"></i>
            <span>Fligths</span>
          </div>
          <div className="headerListItem">
            <i className="fa-solid fa-car"></i>
            <span>Car</span>
          </div>
          <div className="headerListItem">
            <i className="fa-solid fa-bed"></i>
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <i className="fa-solid fa-taxi"></i>
            <span>Taxi</span>
          </div>
        </div>

        {type !== "hotelss" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Darshbooking account
            </p>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <i className="fa-solid fa-location-dot headerIcon"></i>
                <input
                  type="text"
                  placeholder="where are you going ?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <i className="fa-solid fa-calendar-days headerIcon"></i>
                <span
                  className="headerSearchText"
                  onClick={() => setOpenDate(!openDate)}
                >{`${format(date[0].startDate, "MM/dd/yyy")} to  ${format(
                  date[0].endDate,
                  "MM/dd/yyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    minDate={new Date()}
                    className="dateRange"
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <i className="fa-solid fa-person headerIcon"></i>
                <span
                  className="headerSearchText"
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  {`${options.adult} adult  ${options.children} children  ${options.room} room`}
                </span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCountContainer">
                        <button
                          className="optionCountBtn"
                          onClick={() => handleOption("adult", "d")}
                          disabled={options.adult <= 1}
                        >
                          -
                        </button>
                        <span className="optionCountNum">{options.adult}</span>
                        <button
                          className="optionCountBtn"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCountContainer">
                        <button
                          className="optionCountBtn"
                          onClick={() => handleOption("children", "d")}
                          disabled={options.children <= 0}
                        >
                          -
                        </button>
                        <span className="optionCountNum">
                          {options.children}
                        </span>
                        <button
                          className="optionCountBtn"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCountContainer">
                        <button
                          className="optionCountBtn"
                          onClick={() => handleOption("room", "d")}
                          disabled={options.room <= 1}
                        >
                          -
                        </button>
                        <span className="optionCountNum">{options.room}</span>
                        <button
                          className="optionCountBtn"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerButton" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
