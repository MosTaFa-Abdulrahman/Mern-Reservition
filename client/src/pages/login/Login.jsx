import "./login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethod";

function Login() {
  const [credentialsLogin, setCredentialsLogin] = useState({
    username: undefined,
    password: undefined,
  });

  const [credentialsRegister, setCredentialsRegister] = useState({
    username: undefined,
    email: undefined,
    country: undefined,
    city: undefined,
    phone: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  //  Login
  const handleLoginChange = (e) => {
    setCredentialsLogin((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "AUTH_START" });
    try {
      const res = await publicRequest.post("auth/login", credentialsLogin);
      dispatch({ type: "AUTH_SUCCES", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "AUTH_FAILURE", payload: err.response.data });
      alert(err.message);
    }
  };

  // Register
  const handleRegisterChange = (e) => {
    setCredentialsRegister((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch({ type: "AUTH_START" });
    try {
      const res = await publicRequest.post(
        "auth/register",
        credentialsRegister
      );
      dispatch({ type: "AUTH_SUCCES", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "AUTH_FAILURE", payload: err.response.data });
      alert(err.message);
    }
  };

  return (
    <div className="loginContainer">
      <div className="main">
        <input
          className="loginInput"
          type="checkbox"
          id="chk"
          aria-hidden="true"
        />

        <div className="signup">
          <form>
            <label className="loginLabel" htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="loginInput"
              id="username"
              type="text"
              placeholder="Username"
              onChange={handleRegisterChange}
              required
            />
            <input
              className="loginInput"
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleRegisterChange}
              required
            />
            <input
              className="loginInput"
              id="password"
              type="password"
              placeholder="Password"
              onChange={handleRegisterChange}
              required
            />
            <input
              className="loginInput"
              id="country"
              type="text"
              placeholder="Country"
              onChange={handleRegisterChange}
              required
            />
            <input
              className="loginInput"
              id="city"
              type="text"
              placeholder="City"
              onChange={handleRegisterChange}
              required
            />
            <input
              className="loginInput"
              id="phone"
              type="text"
              placeholder="Phone"
              onChange={handleRegisterChange}
              required
            />

            <button
              className="myButton"
              onClick={handleRegister}
              disabled={loading}
            >
              Sign up
            </button>
            {error && (
              <div
                style={{ color: "red", textAlign: "center", marginTop: "20px" }}
              >
                {error}
              </div>
            )}
          </form>
        </div>

        <div className="login">
          <form>
            <label className="loginLabel" htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              className="loginInput"
              id="username"
              type="text"
              placeholder="Username"
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="loginInput"
              onChange={handleLoginChange}
              required
            />
            <button
              className="myButton"
              onClick={handleLogin}
              disabled={loading}
            >
              Login
            </button>
            {error && (
              <div
                style={{ color: "red", textAlign: "center", marginTop: "20px" }}
              >
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
