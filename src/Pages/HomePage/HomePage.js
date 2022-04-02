import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

function HomePage() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [archiveNotes, setArchiveNotes] = useState([]);
  const [apiNotes, setApiNotes] = useState([]);
  const { token } = useAuth();

  const saveNoteHandler = async (e) => {
    e.preventDefault();
    // setSavedNotes((prev) => [
    //   ...prev,
    //   { title: title, note: note, id: uuid() },
    // ]);
    // setNote("");
    // setTitle("");
    try {
      const notes = await axios.post(
        "/api/notes",
        { note: { title: title, note: note } },
        {
          headers: { authorization: token },
        }
      );
      //   alert("get notes successful");
      //   console.log(notes.data.notes);
      setApiNotes(notes.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log(typeof token);
  const deleteNoteHandler = async (item) => {
    console.log(item._id);
    try {
      const notes = await axios.delete(`/api/notes/${item._id}`, {
        headers: { authorization: token },
      });
      //   console.log(notes.data);
      setApiNotes(notes.data.notes);
      alert(`Note with id ${item._id} successfully`);
    } catch (error) {
      console.log(error);
    }
  };

  const archiveNoteHandler = async (item) => {
    console.log("archive handler clicked");
    try {
      const notes = await axios.post(
        `/api/notes/archives/${item._id}`,
        { note: { title: title, note: note } },
        {
          headers: { authorization: token },
        }
      );
      //   console.log(notes.data.archives);
      setArchiveNotes(notes.data.archives);
      alert("Archive successfull!");
    } catch (error) {
      console.log(error);
    }
    try {
      const notes = await axios.delete(`/api/notes/${item._id}`, {
        headers: { authorization: token },
      });
      //   console.log(notes.data);
      setApiNotes(notes.data.notes);
      //   alert(`Note with id ${item._id} successfully`);
    } catch (error) {
      console.log(error);
    }
  };

  const testFunc = async () => {
    try {
      const notes = await axios.get("/api/notes", {
        headers: { authorization: token },
      });
      //   alert("get notes successful");
      console.log(notes.data.notes);
      setApiNotes(notes.data.notes);
    } catch (error) {
      console.log(error);
    }
    try {
      const archives = await axios.get("/api/archives", {
        headers: { authorization: token },
      });
      //   alert("get archives successful");
      console.log(archives.data.archives);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => testFunc(), []);

  return (
    <div>
      {/* User will enter a note */}
      <Link to={"/mock"}>
        <button>mockman</button>
      </Link>
      <form>
        <label>
          <input
            type={"text"}
            placeholder={"note title"}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type={"text"}
            placeholder={"Note body here"}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <button onClick={saveNoteHandler}>Save Note</button>
      </form>
      {/* show notes to the user */}
      <h1>Saved notes</h1>
      {apiNotes.map((item) => {
        return (
          <div key={item._id} style={{ border: "2px solid black" }}>
            <h2>Note Titile - {item.title}</h2>
            <p>Note Body - {item.note}</p>
            <p>Note id - {item._id}</p>
            <button onClick={() => deleteNoteHandler(item)}>Delete note</button>
            <button onClick={() => archiveNoteHandler(item)}>Archive</button>
          </div>
        );
      })}
      <h1>Archive notes</h1>
      {archiveNotes.map((item) => {
        return (
          <div key={item.id} style={{ border: "2px solid black" }}>
            <h2>Note Titile - {item.title}</h2>
            <p>Note Body - {item.note}</p>
            <button>Delete note</button>
            <button>Unarchive</button>
          </div>
        );
      })}
    </div>
  );
}

export default HomePage;
