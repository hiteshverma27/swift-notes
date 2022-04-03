import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import LandingPageImg from "../../Assests/LandingPageImg.svg";

function Header() {
  return (
    <div className="main-content flex-center-center flex-col">
      <h1>Take notes swiftly</h1>
      <Link to={"/login"}>
        <button className="btn-primary-confirm">Login</button>
      </Link>
      <img src={LandingPageImg} alt="landing-page-img" />
    </div>
  );
}

export default Header;
