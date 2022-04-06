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
  const [noteColor, setNoteColor] = useState();

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
              noteColor: noteColor,
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
        setNoteColor("white");
      } catch (error) {
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
          className="input m-0 w-90per"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <ReactQuill
        placeholder="Start taking a note..."
        style={{ backgroundColor: noteColor }}
        theme="snow"
        onChange={(e) =>
          setTimeout(() => {
            setNote(e.replaceAll(`"`, ""));
          })
        }
        value={note}
        modules={quillModules}
        className="quill w-90per"
      />
      <div className="flex-wrap flex">
        <div
          className="note-color-selector m-1"
          onClick={() => setNoteColor("white")}
          style={{ backgroundColor: "white", border: "2px solid black" }}
        ></div>
        <div
          className="note-color-selector m-1"
          onClick={() => setNoteColor("#5CCEFF")}
          style={{ backgroundColor: "#5CCEFF" }}
        ></div>
        <div
          className="note-color-selector m-1"
          onClick={() => setNoteColor("#F09993")}
          style={{ backgroundColor: "#F09993" }}
        ></div>
        <div
          className="note-color-selector m-1"
          onClick={() => setNoteColor("#E4DDE2")}
          style={{ backgroundColor: "#E4DDE2" }}
        ></div>
        <div
          className="note-color-selector m-1"
          onClick={() => setNoteColor("#FFBB5C")}
          style={{ backgroundColor: "#FFBB5C" }}
        ></div>
        <div
          className="note-color-selector m-1"
          onClick={() => setNoteColor("#85FFB1")}
          style={{ backgroundColor: "#85FFB1" }}
        ></div>
      </div>
      <button className="btn-primary-confirm" onClick={saveNoteHandler}>
        Save Note
      </button>
    </div>
  );
}

export { AddNote };
