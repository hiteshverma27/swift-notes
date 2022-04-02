import React from "react";
import SideNav from "../../Components/SideNav/SideNav";
import AddNote from "../AddNote/AddNote";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <SideNav />
      <div className="main-content flex-center-center flex-col ">
        <AddNote />
      </div>
    </>
  );
}

export default HomePage;
