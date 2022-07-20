import RichTextEditor from "@mantine/rte";
import axios from "axios";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useNote } from "../../Context/NoteContext";
import { errorToast } from "../../Utils/ToastUtils/errorToast";
import { successToast } from "../../Utils/ToastUtils/successToast";
import "./AddNote.css";

function AddNote() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [noteColor, setNoteColor] = useState();
  const [tag, setTag] = useState([]);

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
              tags: tag.map((item) => item.value),
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
  const tags = [
    { id: 1, value: "Work" },
    { id: 2, value: "School" },
    { id: 3, value: "Teams" },
  ];

  return (
    <div className="main-conten">
      <h1 className="m-2 ml-0">Add Note</h1>
      <label>
        <input
          type={"text"}
          placeholder={"Title"}
          className="input m-0 w-90per p-1 font-size-large font-weight-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <RichTextEditor
        placeholder="Start taking a note..."
        style={{ backgroundColor: noteColor }}
        theme="snow"
        onChange={(e) =>
          setTimeout(() => {
            setNote(e.replaceAll(`"`, ""));
          })
        }
        value={note}
        className="quill w-90per"
      />
      {tags.map((item) => (
        <label key={item.id}>
          <input
            type={"checkbox"}
            className="m-1"
            value={item.value}
            onClick={(e) =>
              e.target.checked
                ? setTag((prev) => [...prev, item])
                : setTag((prev) => [prev.filter((item) => !item.id)])
            }
          />
          {item.value}
        </label>
      ))}
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
