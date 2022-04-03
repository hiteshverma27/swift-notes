import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useNote } from "../../Context/NoteContext";
import "./SideNav.css";

function SideNav() {
  const { savedNotes, archiveNotes } = useNote();
  const { userData, isAuthenticated } = useAuth();
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
            Notes <span className="number-badge">{savedNotes.length}</span>
          </button>
        </Link>
        <Link to={"/archives"}>
          <button className="flex-center-center p-2 ">
            <span className="material-icons icon-s5 pr-1">archive</span>{" "}
            Archives <span className="number-badge">{archiveNotes.length}</span>
          </button>
        </Link>
      </div>
      <div className="user-badge flex-space_between-center flex-col py-8">
        <button className="flex-center-center p-2 ">
          <span className="material-icons icon-s5 pr-1">person</span>{" "}
          {isAuthenticated ? (
            <h3>
              {userData.firstName} {userData.lastName}
            </h3>
          ) : (
            <h3>Login</h3>
          )}
        </button>
      </div>
    </>
  );
}

export default SideNav;
