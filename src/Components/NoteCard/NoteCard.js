import React from "react";
import "./NoteCard.css";

function NoteCard(item) {
  return (
    <div className="note-card m-2 ">
      <h2>{item.noteTitle}</h2>
      <p> {item.noteBody}</p>
      <div className="flex-center-center px-2">
        <button className="btn-primary-confirm m-2">Archive</button>
        <button className="btn-primary-danger m-2">Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;
