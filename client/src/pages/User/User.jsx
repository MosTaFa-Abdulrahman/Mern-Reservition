import "./user.css";
import axios from "axios";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethod";
import { AuthContext } from "../../context/AuthContext";

function User({ currentUser }) {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dkqpzws52/image/upload",
        data
      );
      const { url } = uploadRes.data;

      const updateUser = { ...info, img: url };
      await publicRequest.put(`user/update/${userId}`, updateUser);
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (error) {
      alert("Enter All Fields Please Sir 🥰");
      console.log(error.message);
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1 className="updateTitle">Update User</h1>
        </div>

        <div className="bottom updateBottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : currentUser.img}
              alt=""
              className="updateImg"
            />
          </div>

          <div className="right">
            <form className="updateForm">
              <div className="formInput">
                <label htmlFor="img" className="updateLabel">
                  Image: <i className="fa-regular fa-image icon"></i>
                </label>
                <input
                  type="file"
                  id="img"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Username</label>
                <input
                  className="updateInput"
                  id="username"
                  placeholder={currentUser.username}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  className="updateInput"
                  id="email"
                  placeholder={currentUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  placeholder="Password"
                  className="updateInput"
                  id="password"
                  type="password"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Country</label>
                <input
                  className="updateInput"
                  id="country"
                  placeholder={currentUser.country}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>City</label>
                <input
                  className="updateInput"
                  placeholder={currentUser.city}
                  id="city"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  className="updateInput"
                  placeholder={currentUser.phone}
                  id="phone"
                  onChange={handleChange}
                />
              </div>

              <button className="updateBtn" onClick={handleClick}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
