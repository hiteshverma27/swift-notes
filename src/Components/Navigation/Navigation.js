import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { guestModeHandler } from "../../Services/AuthServices/GuestLogin";
import "./Navigation.css";

function Navigation() {
  const {
    isAuthenticated,
    userData,
    setIsAuthenticated,
    setUserData,
    setToken,
  } = useAuth();
  const currentLocation = useLocation();
  return (
    <nav className="flex-space_between-center w-100per px-2 bg-white p-2 navbar">
      <Link to={isAuthenticated ? "/home" : "/"}>
        <h3 className="navbar bold flex-center-center mx-1">
          LightsOut{" "}
          <span className="mx-1 material-icons-outlined">video_library</span>
        </h3>
      </Link>

      <ul className="flex-space_between-center navbar">
        {isAuthenticated || (
          <li className="mx-2 flex-center-center navbar">
            <button
              className="btn-primary-confirm"
              onClick={(e) => {
                guestModeHandler(e, setToken, setUserData, setIsAuthenticated);
              }}
            >
              One Tap login
            </button>
          </li>
        )}
        {isAuthenticated ? (
          <li className="mx-2 flex-center-center navbar">
            <Link to={"/profile"} className="flex">
              <span className="material-icons icon-s3 navbar mx-1">
                account_circle
              </span>{" "}
              <h4 className="navbar">{`Hi ${userData.firstName}`}</h4>
            </Link>
          </li>
        ) : (
          <li className="mx-2">
            {currentLocation.pathname === "/login" ? (
              <Link to={"/signup"}>
                <button className="btn-primary-confirm">Signup</button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="btn-primary-confirm">Login</button>
              </Link>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export { Navigation };
