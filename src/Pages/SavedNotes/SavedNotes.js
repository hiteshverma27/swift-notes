import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useNote } from "../../Context";
import { successToast } from "../../Utils/ToastUtils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { errorToast } from "../../Utils/ToastUtils/errorToast";
import { Modal, SideNav } from "../../Components";
import { quillModules } from "../../Components/ReactQuillUtils/QuillModules";
import "./SavedNotes.css";

function SavedNotes() {
  const { savedNotes, setArchiveNotes, setSavedNotes } = useNote();
  const { token, isAuthenticated } = useAuth();
  const [editNoteInput, setEditNoteInput] = useState("");
  const [editNoteTitle, setEditNoteTitle] = useState("");
  const [editNoteId, setEditNoteId] = useState("");
  const [noteColor, setNoteColor] = useState();
  const [tag, setTag] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const archiveNoteHandler = async (item) => {
    try {
      const notes = await axios.post(
        `/api/notes/archives/${item._id}`,
        { note: { title: item.title, note: item.note } },
        {
          headers: { authorization: token },
        }
      );
      setArchiveNotes(notes.data.archives);
      successToast("Note archived");
    } catch (error) {
      errorToast("Something went wrong!");
    }
    try {
      const notes = await axios.delete(`/api/notes/${item._id}`, {
        headers: { authorization: token },
      });
      setSavedNotes(notes.data.notes);
    } catch (error) {
      errorToast("Something went wrong!");
    }
  };
  const deleteNoteHandler = async (item) => {
    try {
      const notes = await axios.delete(`/api/notes/${item._id}`, {
        headers: { authorization: token },
      });
      setSavedNotes(notes.data.notes);
      successToast("Note deleted");
    } catch (error) {
      errorToast("Something went wrong!");
    }
  };

  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };
  const closeModal = () => {
    modalRef.current.close();
  };

  const editNoteHandler = (item) => {
    setEditNoteTitle(item.title);
    setEditNoteInput(item.note);
    setEditNoteId(item._id);
    openModal();
  };

  const saveChangesHandler = async (e, itemId) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/notes",
        {
          note: {
            title: editNoteTitle,
            note: editNoteInput,
            noteColor: noteColor,
            date: new Date(Date.now()).toLocaleString().split(","[0]),
            tags: tag.map((item) => item.value),
          },
        },
        {
          headers: { authorization: token },
        }
      );
      const notes = await axios.delete(`/api/notes/${itemId}`, {
        headers: { authorization: token },
      });
      setSavedNotes(notes.data.notes);
      successToast("Note edited successfully");
      setEditNoteTitle("");
      setEditNoteInput("");
      closeModal();
    } catch (error) {
      successToast("Seems like you are note logged in, log in first!");
      navigate("/login");
    }
  };
  const tags = [
    { id: 1, value: "Work" },
    { id: 2, value: "School" },
    { id: 3, value: "Teams" },
  ];

  return (
    <>
      <SideNav />

      <Modal ref={modalRef}>
        <h2>{editNoteTitle}</h2>
        <ReactQuill
          placeholder="Start taking a note..."
          style={{ backgroundColor: noteColor }}
          theme="snow"
          onChange={(e) =>
            setTimeout(() => {
              setEditNoteInput(e.replaceAll(`"`, ""));
            })
          }
          value={editNoteInput}
          modules={quillModules}
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
        <button
          className="btn-primary-confirm"
          onClick={(e) => saveChangesHandler(e, editNoteId)}
        >
          Save Note
        </button>
      </Modal>
      <div className="main-content flex-center-center flex-col">
        {isAuthenticated ? (
          <>
            <h1>Saved Notes</h1>
            {savedNotes.length === 0 ? (
              <>
                <h2>No Notes saved</h2>
                <div className="flex">
                  <Link to={"/home"}>
                    <button className="btn-primary-confirm m-1">
                      Take a note
                    </button>
                  </Link>
                  <Link to={"/archives"}>
                    <button className="btn-primary-confirm m-1">
                      Archives
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex-center-center w-100per">
                  <input
                    type={"search"}
                    onChange={(e) => setSearchTerm(e.target.value.toString())}
                    className="p-1 w-40per search-bar"
                    placeholder="Search notes..."
                  />
                </div>
                <div className="flex flex-wrap my-3">
                  {savedNotes
                    .filter(
                      (item) =>
                        item.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        item.note
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                    .map((item) => (
                      <div key={item._id}>
                        <div
                          className="m-2 savednote-container w-70vw"
                          style={{ backgroundColor: item.noteColor }}
                        >
                          <h2>{item.title}</h2>
                          <ReactQuill
                            key={item._id}
                            theme="snow"
                            readOnly
                            value={item.note}
                          />
                          <p>created - {item.date}</p>
                          {item.tags
                            ? item.tags.map((item) => (
                                <button
                                  className="mx-1"
                                  style={{
                                    backgroundColor: "orange",
                                    borderRadius: "2rem",
                                    border: "2px solid black",
                                    padding: "0.5rem",
                                  }}
                                  key={item}
                                >
                                  {item}
                                </button>
                              ))
                            : null}
                          <div className="flex-center-center">
                            <button
                              onClick={() => archiveNoteHandler(item)}
                              title="Archive Note"
                            >
                              <span className="material-icons icon-s4 m-1">
                                archive
                              </span>
                            </button>
                            <button
                              onClick={() => editNoteHandler(item)}
                              title="Edit Note"
                            >
                              <span className="material-icons icon-s4 m-1">
                                edit
                              </span>
                            </button>
                            <button
                              onClick={() => deleteNoteHandler(item)}
                              title="Delete Note"
                            >
                              <span className="material-icons icon-s4 m-1 color-red">
                                delete
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <h1>Login to see saved notes</h1>
            <Link to={"/login"}>
              <button className="btn-primary-confirm m-1">Login</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export { SavedNotes };
