import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Archives, HomePage, LandingPage, Login, SavedNotes } from "./Pages";
toast.configure();

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/notes" element={<SavedNotes />} />
      </Routes>
    </>
  );
}

export default App;
