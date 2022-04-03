import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [archiveNotes, setArchiveNotes] = useState([]);
  const [savedNotes, setSavedNotes] = useState([]);
  return (
    <NoteContext.Provider
      value={{ archiveNotes, setArchiveNotes, savedNotes, setSavedNotes }}
    >
      {children}
    </NoteContext.Provider>
  );
};

const useNote = () => useContext(NoteContext);
export { NoteProvider, useNote };
