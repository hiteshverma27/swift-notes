import React from "react";
import { Link } from "react-router-dom";
import SideNav from "../../Components/SideNav/SideNav";
import { useAuth } from "../../Context/AuthContext";
import { useNote } from "../../Context/NoteContext";
import axios from "axios";
import { successToast } from "../../Utils/ToastUtils/successToast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Archives() {
  const { archiveNotes, setArchiveNotes, setSavedNotes } = useNote();
  const { token } = useAuth();

  const deleteArchiveNote = async (item) => {
    try {
      const notes = await axios.delete(`/api/archives/delete/${item._id}`, {
        headers: { authorization: token },
      });
      setArchiveNotes(notes.data.archives);
      successToast("Note deleted from archive");
    } catch (error) {
      console.log(error);
    }
  };

  const restoreArchive = async (item) => {
    try {
      const notes = await axios.post(
        `/api/archives/restore/${item._id}`,
        { note: { title: item.title, note: item.note } },
        {
          headers: { authorization: token },
        }
      );
      setSavedNotes(notes.data.notes);
      setArchiveNotes(notes.data.archives);
      successToast("Note restored");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SideNav />
      <div className="main-content flex-center-center flex-col ">
        <h1>Archives</h1>
        {archiveNotes.length === 0 ? (
          <>
            <h2>No Archive notes</h2>
            <div className="flex">
              <Link to={"/home"}>
                <button className="btn-primary-confirm m-1">Take a note</button>
              </Link>
              <Link to={"/notes"}>
                <button className="btn-primary-confirm m-1">Saved Notes</button>
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap">
            {archiveNotes.map((item) => (
              <div className="note-card m-2 notes-container" key={item._id}>
                <h2>{item.title}</h2>
                <ReactQuill
                  key={item._id}
                  theme="snow"
                  className="quill"
                  readOnly
                  value={item.note}
                />
                <div className="flex-center-center px-2">
                  <button className=" m-2" onClick={() => restoreArchive(item)}>
                    <span className="material-icons icon-s4">unarchive</span>
                  </button>
                  <button
                    className="m-2"
                    onClick={() => deleteArchiveNote(item)}
                  >
                    <span className="material-icons icon-s4 color-red">
                      delete
                    </span>
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

export { Archives };
