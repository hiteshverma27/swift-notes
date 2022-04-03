import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { useNote } from "../../Context/NoteContext";
import { successToast } from "../../Utils/ToastUtils/successToast";
import { useNavigate } from "react-router-dom";

function AddNote() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const { token } = useAuth();

  const { setSavedNotes } = useNote();

  const navigate = useNavigate();

  const saveNoteHandler = async (e) => {
    e.preventDefault();
    try {
      const notes = await axios.post(
        "/api/notes",
        { note: { title: title, note: note } },
        {
          headers: { authorization: token },
        }
      );
      // alert("Add note successful");
      //   console.log(notes.data.notes);
      setSavedNotes(notes.data.notes);
      successToast("Note added successfully");
      setNote("");
      setTitle("");
    } catch (error) {
      console.log(error);
      successToast("Seems like you are note logged in, log in first!");
      navigate("/login");
    }
  };

  return (
    <div className="main-content">
      <h1 className="m-2 ml-0">Add Note</h1>
      <form>
        <label>
          <input
            type={"text"}
            placeholder={"Title"}
            className="input m-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            rows="4"
            cols="50"
            type={"text"}
            placeholder={"Enter note here"}
            className="input m-0"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <button className="btn-primary-confirm" onClick={saveNoteHandler}>
          Save Note
        </button>
      </form>
    </div>
  );
}

export { AddNote };
