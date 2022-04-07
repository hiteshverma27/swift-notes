import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useNote } from "../../Context/NoteContext";
import "./SideNav.css";

function SideNav() {
  const { savedNotes, archiveNotes } = useNote();
  const { setIsAuthenticated, setToken } = useAuth();
  return (
    <>
      <div className="app-navigation flex-space_between-center flex-col py-8">
        <Link to={"/home"}>
          <button className="flex-center-center p-2 " title="Add Note">
            <span className="material-icons icon-s5 pr-1">add</span>
            {/* Add Note */}
          </button>
        </Link>
        <Link to={"/notes"}>
          <button className="flex-center-center p-2 " title="Saved Notes">
            <span className="material-icons icon-s5 pr-1">lightbulb</span>
            {/* Saved Notes */}
            <span className="number-badge">{savedNotes.length}</span>
          </button>
        </Link>
        <Link to={"/archives"}>
          <button className="flex-center-center p-2 " title="Archives">
            <span className="material-icons icon-s5 pr-1">archive</span>{" "}
            {/* Archives */}
            <span className="number-badge">{archiveNotes.length}</span>
          </button>
        </Link>
      </div>
      <div className="user-badge flex-space_between-center flex-col py-8">
        <button
          className="flex-center-center p-2 "
          onClick={() => {
            setToken("");
            setIsAuthenticated(false);
          }}
          title="Logout"
        >
          <span className="material-icons icon-s5 pr-1">logout</span>{" "}
        </button>
      </div>
    </>
  );
}

export default SideNav;
