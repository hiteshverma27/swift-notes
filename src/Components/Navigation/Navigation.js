import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="flex-space_between-center w-100per px-2 bg-white p-2 navbar">
      <Link to={"/"}>
        <h3>Swift Notes</h3>
      </Link>
      <ul className="flex-space_between-center">
        <li className="mx-2">
          <Link to={"/login"}>
            <button className="btn-primary-confirm">Login</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
