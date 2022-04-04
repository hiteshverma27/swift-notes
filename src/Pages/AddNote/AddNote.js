import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { useNote } from "../../Context/NoteContext";
import { successToast } from "../../Utils/ToastUtils/successToast";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddNote.css";
import { quillModules } from "../../Utils/ReactQuillUtils/QuillModules";
import { errorToast } from "../../Utils/ToastUtils/errorToast";

function AddNote() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const { token } = useAuth();

  const { setSavedNotes } = useNote();

  const navigate = useNavigate();

  const saveNoteHandler = (e) => {
    e.preventDefault();
    const postNote = async () => {
      try {
        const notes = await axios.post(
          "/api/notes",
          {
            note: {
              title: title,
              note: note,
              date: new Date(Date.now()).toLocaleString().split(","[0]),
            },
          },
          {
            headers: { authorization: token },
          }
        );
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
    title === "" || note === ""
      ? errorToast("Neither of the fields can be empty!")
      : postNote();
  };

  return (
    <div className="main-conten">
      <h1 className="m-2 ml-0">Add Note</h1>
      <label>
        <input
          type={"text"}
          placeholder={"Title"}
          className="input m-0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <ReactQuill
        placeholder="Start taking a note..."
        theme="snow"
        onChange={(e) => setNote(e.replaceAll(`"`, ""))}
        value={note}
        modules={quillModules}
        className="quill"
      />
      <button className="btn-primary-confirm" onClick={saveNoteHandler}>
        Save Note
      </button>
    </div>
  );
}

export { AddNote };
