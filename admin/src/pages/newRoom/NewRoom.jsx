import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { adminRequest } from "../../requestMethod";

function NewRoom({ inputs, title }) {
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState(undefined);
  const { data, loading } = useFetch("hotel/get");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    // console.log(roomNumbers);
    try {
      await adminRequest.post(`room/create/${hotelId}`, {
        ...info,
        roomNumbers,
      });
      navigate("/room");
    } catch (error) {
      alert("Enter All Fields Please Sir 🥰");
      console.log(error.message);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    id={input.id}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Please Give Comma Between Room Numbers ☻"
                />
              </div>

              <div className="formInput">
                <label>Choose Hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                  className="selectHotelId"
                >
                  {loading
                    ? "Wait Loading 🙄"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>

              <button onClick={handleClick}>Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRoom;
