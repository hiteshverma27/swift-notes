import React from "react";
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <>
      <div className="app-navigation flex-space_between-center flex-col py-8">
        <Link to={"/home"}>
          <button className="flex-center-center p-2 ">
            <span className="material-icons icon-s5 pr-1">add</span> Add Note
          </button>
        </Link>
        <Link to={"/notes"}>
          <button className="flex-center-center p-2 ">
            <span className="material-icons icon-s5 pr-1">lightbulb</span> Saved
            Notes
          </button>
        </Link>
        <Link to={"/archives"}>
          <button className="flex-center-center p-2 ">
            <span className="material-icons icon-s5 pr-1">archive</span>{" "}
            Archives
          </button>
        </Link>
      </div>
      <div className="user-badge flex-space_between-center flex-col py-8">
        <button className="flex-center-center p-2 ">
          <span className="material-icons icon-s5 pr-1">person</span> Hitesh
          Verma
        </button>
      </div>
    </>
  );
}

export default SideNav;
