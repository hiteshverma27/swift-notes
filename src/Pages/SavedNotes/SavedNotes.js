import React from "react";
import SideNav from "../../Components/SideNav/SideNav";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth, useNote } from "../../Context";
import { successToast } from "../../Utils/ToastUtils";
function SavedNotes() {
  const { savedNotes, setArchiveNotes, setSavedNotes } = useNote();
  const { token } = useAuth();

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
      console.log(error);
    }
    try {
      const notes = await axios.delete(`/api/notes/${item._id}`, {
        headers: { authorization: token },
      });
      setSavedNotes(notes.data.notes);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  return (
    <>
      <SideNav />

      <div className="main-content flex-center-center flex-col ">
        <h1>Saved Notes</h1>
        {savedNotes.length === 0 ? (
          <>
            <h2>No Notes saved</h2>
            <div className="flex">
              <Link to={"/home"}>
                <button className="btn-primary-confirm m-1">Take a note</button>
              </Link>
              <Link to={"/archives"}>
                <button className="btn-primary-confirm m-1">Archives</button>
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap ">
            {savedNotes.map((item) => (
              <div className="note-card m-2 notes-container" key={item._id}>
                <h2>{item.title}</h2>
                <p> {item.note}</p>
                <div className="flex-center-center px-2">
                  <button
                    className="btn-primary-confirm m-2"
                    onClick={() => archiveNoteHandler(item)}
                  >
                    Archive
                  </button>
                  <button
                    className="btn-primary-danger m-2"
                    onClick={() => deleteNoteHandler(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export { SavedNotes };
