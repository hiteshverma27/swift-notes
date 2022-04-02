import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await axios.post("/api/auth/login", {
        email: "adarshbalika@gmail.com",
        password: "adarshBalika123",
      });
      // alert("logged in successfully");
      setToken(userData.data.encodedToken);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form>
        <label>
          {" "}
          Enter User Name
          <input
            type={"text"}
            placeholder="Enter username"
            value={"adarshbalika@gmail.com"}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <p>{userName}</p>
        <label>
          {" "}
          Enter Password
          <input
            type={"password"}
            placeholder="Enter password"
            value={"adarshBalika123"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <p>{password}</p>
        <button onClick={loginHandler}>Login</button>
      </form>
    </div>
  );
}

export default Login;
