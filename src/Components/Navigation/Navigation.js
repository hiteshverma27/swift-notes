import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Navigation.css";

function Navigation() {
  const { isAuthenticated, userData } = useAuth();
  return (
    <nav className="flex-space_between-center w-100per px-2 bg-white p-2 navbar">
      <Link to={"/"}>
        <h3>Swift Notes</h3>
      </Link>
      <ul className="flex-space_between-center">
        {isAuthenticated ? (
          <li className="mx-2 flex-center-center">
            <span className="material-icons icon-s3">account_circle</span>{" "}
            <h4>{userData.firstName}</h4>
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

export default Navigation;
