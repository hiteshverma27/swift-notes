import React from "react";
import { Link } from "react-router-dom";
import SideNav from "../../Components/SideNav/SideNav";
import { useAuth } from "../../Context/AuthContext";
import { useNote } from "../../Context/NoteContext";
import axios from "axios";
import { successToast } from "../../Utils/ToastUtils/successToast";

function Archives() {
  const { archiveNotes, setArchiveNotes } = useNote();
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
                <p> {item.note}</p>
                <div className="flex-center-center px-2">
                  <button
                    className="btn-primary-danger m-2"
                    onClick={() => deleteArchiveNote(item)}
                  >
                    Delete Archive
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
