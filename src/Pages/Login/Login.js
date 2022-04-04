import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Login.css";
import axios from "axios";
import { successToast } from "../../Utils/ToastUtils/successToast";
import { errorToast } from "../../Utils/ToastUtils/errorToast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setIsAuthenticated, setUserData } = useAuth();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });
      setToken(userData.data.encodedToken);
      setIsAuthenticated(true);
      setUserData(userData.data.foundUser);
      setIsAuthenticated(true);
      successToast("Login Success!");
      navigate("/home");
    } catch (error) {
      errorToast("You are not registered, please sign up");
      console.log(error);
    }
  };
  const guestModeHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await axios.post("/api/auth/login", {
        email: "adarshbalika@gmail.com",
        password: "adarshBalika123",
      });
      setToken(userData.data.encodedToken);
      setIsAuthenticated(true);
      setUserData(userData.data.foundUser);
      setIsAuthenticated(true);
      successToast("Login Success!");
      navigate("/home");
      console.log(userData.status);
    } catch (error) {
      errorToast("You are not registered, please sign up");
      console.log(error);
    }
  };

  return (
    <div className="login-div flex flex-col center-div-method-2 h-70per w-40per m-auto p-3">
      <h2 className="my-2">Login</h2>
      <form className="flex flex-col p-2 h-80per w-80per">
        <label className="bold" htmlFor="email">
          Email Address
        </label>
        <br />
        <input
          type="email"
          className="w-100per input m-0"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label className="bold" htmlFor="password">
          Password
        </label>
        <br />
        <input
          type="password"
          className="w-100per input m-0"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div className="flex-space_between-center">
          <div className="flex-center-center">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me" className="mx-1">
              Remember me
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-100per btn-primary-confirm my-1"
          onClick={loginHandler}
        >
          Log In
        </button>
        <button
          type="submit"
          className="w-100per btn-primary-confirm my-1"
          onClick={guestModeHandler}
        >
          Use Guest Mode
        </button>
      </form>
    </div>
  );
}

export { Login };
