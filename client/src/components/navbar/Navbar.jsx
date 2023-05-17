import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <NavLink to="/" className="link">
          <div className="navLogo">Reservition</div>
        </NavLink>
        <div className="navItems">
          {user ? (
            <div className="userContainer">
              <NavLink to={`user/${user._id}`} className="link">
                <div className="userInfo">
                  <img src={user.img} alt="" className="userImg myPhoto" />
                  <div className="userUsername">{user.username}</div>
                </div>
              </NavLink>
              <button className="navButton logOut" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="link">
              <button className="navButton">Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
