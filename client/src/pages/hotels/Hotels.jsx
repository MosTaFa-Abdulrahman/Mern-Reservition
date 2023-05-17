import "./hotels.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

function Hotels() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, reFetch } = useFetch(
    `hotel/get?city=${destination}&min=${min || 1}&max=${max || 1000}`
  );

  const handleSearch = () => {
    reFetch();
  };

  return (
    <>
      <Navbar />
      <Header type="hotelss" />

      <div className="hotelsContainer">
        <div className="hotelsWrraper">
          <div className="hotelsSearch">
            <h1 className="hotelsTitle">Search</h1>
            <div className="hotelsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                onChange={(e) => setDestination(e.target.value)}
                type="text"
              />
            </div>
            <div className="hotelsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>

            <div className="hotelsItem">
              <label>Options</label>
              <div className="hotelsOptionItem">
                <span className="hotelsOptionText">
                  Min price <small>per night</small>
                </span>
                <input
                  type="number"
                  className="hotelsOptionInput"
                  min={1}
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
              <div className="hotelsOptionItem">
                <span className="hotelsOptionText">
                  Max price <small>per night</small>
                </span>
                <input
                  type="number"
                  className="hotelsOptionInput"
                  min={1}
                  max={1000}
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
              <div className="hotelsOptionItem">
                <span className="hotelsOptionText">Adult</span>
                <input
                  type="number"
                  min={1}
                  className="hotelsOptionInput"
                  placeholder={options.adult}
                />
              </div>
              <div className="hotelsOptionItem">
                <span className="lsOptionText">Children</span>
                <input
                  type="number"
                  min={0}
                  className="hotelsOptionInput"
                  placeholder={options.children}
                />
              </div>
              <div className="hotelsOptionItem">
                <span className="lsOptionText">Room</span>
                <input
                  type="number"
                  min={1}
                  className="hotelsOptionInput"
                  placeholder={options.room}
                />
              </div>
            </div>
            <button className="searchBtn" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="hotelsResult">
            {loading ? (
              "Please Wait For Loading ☻♥"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hotels;
