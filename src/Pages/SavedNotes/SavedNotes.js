import React from "react";
import SideNav from "../../Components/SideNav/SideNav";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth, useNote } from "../../Context";
import { successToast } from "../../Utils/ToastUtils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { errorToast } from "../../Utils/ToastUtils/errorToast";
function SavedNotes() {
  const { savedNotes, setArchiveNotes, setSavedNotes } = useNote();
  const { token, isAuthenticated } = useAuth();

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
  return (
    <>
      <SideNav />

      <div className="main-content flex-center-center flex-col ">
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
              <div className="flex flex-wrap ">
                {savedNotes.map((item) => (
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
                          <span className="material-icons icon-s4">
                            archive
                          </span>
                        </button>
                        <button
                          onClick={() => deleteNoteHandler(item)}
                          title="Delete Note"
                        >
                          <span className="material-icons icon-s4 color-red">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
