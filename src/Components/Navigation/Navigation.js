import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Navigation.css";

function Navigation() {
  const { isAuthenticated, userData } = useAuth();
  return (
    <nav className="flex-space_between-center w-100per px-2 bg-white p-2 navbar">
      <Link to={"/"}>
        <h3 className="navbar flex-center-center">Swift Notes<span className="material-icons icon-s3 navbar p-1">
              description
            </span></h3>
      </Link>
      <ul className="flex-space_between-center navbar">
        {isAuthenticated ? (
          <li className="mx-2 flex-center-center navbar">
            <span className="material-icons icon-s3 navbar">
              account_circle
            </span>{" "}
            <h4 className="navbar">{userData.firstName}</h4>
          </li>
        ) : (
          <li className="mx-2">
            <Link to={"/login"}>
              <button className="btn-primary-confirm">Login</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export {Navigation};
