import React from "react";
import NoteCard from "../../Components/NoteCard/NoteCard";
import SideNav from "../../Components/SideNav/SideNav";

function Archives() {
  return (
    <>
      <SideNav />
      <div className="main-content flex-center-center flex-col ">
        <h1 className="p-3">Archives</h1>
        <div className="flex flex-wrap">
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
        </div>
      </div>
    </>
  );
}

export default Archives;
