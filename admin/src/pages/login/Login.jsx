import "./login.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { adminRequest } from "../../requestMethod";

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const navigate = useNavigate();
  const { error, loading, dispatch } = useContext(AuthContext);

  const handleLoginChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "AUTH_START" });
    try {
      const res = await adminRequest.post("auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "AUTH_SUCCES", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "AUTH_FAILURE",
          payload: { message: "You arn not Admin ~!!" },
        });
        alert("You are not Admin ~!!");
      }
    } catch (err) {
      dispatch({ type: "AUTH_FAILURE", payload: err.response.data });
      alert(err.message);
    }
  };

  return (
    <div className="loginContainer">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form className="loginForm">
        <h3>Login Admin</h3>

        <label htmlFor="username" className="myLabel">
          Username
        </label>
        <input
          className="loginInput"
          type="text"
          placeholder="Username..."
          id="username"
          required
          onChange={handleLoginChange}
        />

        <label htmlFor="password" className="myLabel">
          Password
        </label>
        <input
          className="loginInput"
          type="password"
          placeholder="Password..."
          id="password"
          required
          onChange={handleLoginChange}
        />

        <button className="loginBtn" onClick={handleLogin} disabled={loading}>
          Log In
        </button>

        {error && (
          <div
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "20px",
              fontSize: "25px",
            }}
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
