import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethod";

function Reserve({ setOpenModal, hotelId }) {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`hotel/rooms/${hotelId}`);
  const { date } = useContext(SearchContext);
  const navigate = useNavigate();

  // Get Dates Range
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const list = [];

    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return list;
  };

  const allDates = getDatesInRange(date[0].startDate, date[0].endDate);

  const isAvilable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  // Handle Select
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  // Handle Reserve
  const handleReserve = async (e) => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = publicRequest.put(`room/update/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpenModal(false);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="reserve">
      <div className="reserveContainer">
        <i
          className="fa-sharp fa-solid fa-circle-xmark reserveClose"
          onClick={() => setOpenModal(false)}
        ></i>
        <h3>Select Your Rooms:</h3>
        {data.map((item) => (
          <div className="reserveItem" key={item._id}>
            <div className="reserveItemInfo">
              <div className="reserveTitle">{item.title}</div>
              <div className="reserveDesc">{item.desc}</div>
              <div className="reserveMaxPeople">
                maxPeople: <b>{item.maxPeople}</b>
              </div>
              <div className="reservePrice">
                <h4>Price: </h4> <h3>{item.price}$</h3>
              </div>
            </div>

            <div className="reserveSelectRooms">
              {item.roomNumbers.map((rN) => (
                <div className="room">
                  <label>{rN.number}</label>
                  <input
                    type="checkbox"
                    value={rN._id}
                    onChange={handleSelect}
                    disabled={!isAvilable(rN)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="reserveBtn" onClick={handleReserve}>
          Book 😇
        </button>
      </div>
    </div>
  );
}

export default Reserve;
