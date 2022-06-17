import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import { useAuth } from "../../Context";
import { successToast } from "../../Utils/ToastUtils";
import { errorToast } from "../../Utils/ToastUtils/errorToast";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { setToken, setIsAuthenticated, setUserData, isAuthenticated } =
    useAuth();

  const signupHandler = (e) => {
    e.preventDefault();
    const formFieldsStates = [
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      validateEmail(email),
      checkPassword(password),
    ];
    const signupUser = async () => {
      try {
        await axios.post("/api/auth/signup", {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        });
        const userData = await axios.post("/api/auth/login", {
          email: email,
          password: password,
        });
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setToken(userData.data.encodedToken);
        setIsAuthenticated(true);
        setUserData(userData.data.foundUser);
        setIsAuthenticated(true);
        navigate("/home");
        successToast("Signup Success! Welcome onboard!");
      } catch (error) {
        error.response.status === 422
          ? errorToast(
              "Email already exists! Please login or choose a different email"
            )
          : errorToast("You are not registered, please sign up");
      }
    };

    formFieldsStates.every((i) => i)
      ? password !== confirmPassword
        ? errorToast("Passwords do not match!")
        : signupUser()
      : errorToast("Please fill all the fields");
  };
  const guestModeHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await axios.post("/api/auth/login", {
        email: "hiteshverma@gmail.com",
        password: "hitesh123",
      });
      setToken(userData.data.encodedToken);
      setIsAuthenticated(true);
      setUserData(userData.data.foundUser);
      setIsAuthenticated(true);
      navigate("/");
      successToast("Login Success!");
    } catch (error) {
      errorToast("You are not registered, please sign up");
    }
  };
  function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
  }
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="flex-center-center">
          <h2>You are already logged in!</h2>
          <Link className="btn-primary-confirm m-1" to={"/"}>
            Home
          </Link>
        </div>
      ) : (
        <div className="login-div flex flex-col center-div-method-2 h-70per w-40per m-auto p-3">
          <h2 className="my-2">Signup</h2>
          <form className="flex flex-col p-2 h-80per w-80per">
            <label className="bold" htmlFor="email">
              First Name
            </label>
            <br />
            <input
              type="text"
              required="required"
              className="w-100per input m-0"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <label className="bold" htmlFor="email">
              Last Name
            </label>
            <br />
            <input
              type="text"
              required="required"
              className="w-100per input m-0"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <label className="bold" htmlFor="email">
              Email Address
              {email !== "" ? (
                validateEmail(email) ? (
                  <span className="mx-1 material-icons-outlined color-green">
                    done
                  </span>
                ) : (
                  <span className="mx-1 material-icons-outlined color-red">
                    close
                  </span>
                )
              ) : null}
            </label>
            <br />
            <input
              type="email"
              required="required"
              className="w-100per input m-0"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label className="bold" htmlFor="password">
              Password
              {password !== "" ? (
                checkPassword(password) ? (
                  <span className="mx-1 material-icons-outlined color-green">
                    done
                  </span>
                ) : (
                  <span className="mx-1 material-icons-outlined color-red">
                    close
                  </span>
                )
              ) : null}
            </label>
            <br />
            <input
              type="password"
              required="required"
              className="w-100per input m-0"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label className="bold flex" htmlFor="password">
              Confirm Password
              {confirmPassword !== "" ? (
                password === confirmPassword ? (
                  <span className="mx-1 material-icons-outlined color-green">
                    done
                  </span>
                ) : (
                  <span className="mx-1 material-icons-outlined color-red">
                    close
                  </span>
                )
              ) : null}
            </label>
            <br />

            <input
              type="password"
              required="required"
              className="w-100per input m-0 "
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              className={`w-100per  ${
                email && password && confirmPassword
                  ? "btn-primary-confirm"
                  : "btn-secondary-confirm"
              } my-1`}
              onClick={signupHandler}
            >
              Signup
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
      )}
    </>
  );
}

export { Signup };
