import React from "react";

function AddNote() {
  return (
    <div className="main-content">
      <h1 className="m-2 ml-0">Add Note</h1>
      <form>
        <label>
          <input type={"text"} placeholder={"Title"} className="input m-0" />
          <br />
          <textarea
            rows="4"
            cols="50"
            type={"text"}
            placeholder={"Enter note here"}
            className="input m-0"
          />
        </label>
        <button className="btn-primary-confirm">Save Note</button>
      </form>
    </div>
  );
}

export default AddNote;
