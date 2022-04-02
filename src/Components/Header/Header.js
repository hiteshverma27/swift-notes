import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="main-content flex-center-center flex-col">
      <h1>Take notes swiftly</h1>
      <img
        src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQNoTk4hSaFoZmyigIsDrrO1o-DoIssEbao5kIirV6xVEF1mwUy"
        alt="landing-page-img"
      />
      <Link to={"/login"}>
        <button className="btn-primary-confirm">Login</button>
      </Link>
    </div>
  );
}

export default Header;
