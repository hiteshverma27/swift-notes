import React, { useEffect } from "react";
import SideNav from "../../Components/SideNav/SideNav";
import { useAuth } from "../../Context/AuthContext";
import { useNote } from "../../Context/NoteContext";
import "./HomePage.css";
import axios from "axios";
import { AddNote } from "../AddNote/AddNote";
import { useNavigate } from "react-router-dom";
import { errorToast } from "../../Utils/ToastUtils/errorToast";

function HomePage() {
  const { token } = useAuth();
  const { setSavedNotes } = useNote();
  const navigate = useNavigate();
  const onLoad = async () => {
    try {
      const notes = await axios.get("/api/notes", {
        headers: { authorization: token },
      });
      setSavedNotes(notes.data.notes);
    } catch (error) {
      errorToast("Seems Like you are note logged in, please log in!");
      navigate("/login");
    }
  };
  useEffect(() => onLoad());
  return (
    <>
      <SideNav />
      <div className="main-content flex-center-center flex-col ">
        <AddNote />
      </div>
    </>
  );
}

export { HomePage };
