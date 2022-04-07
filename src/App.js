import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Archives, HomePage, LandingPage, Login, SavedNotes } from "./Pages";
import MockmanEs from "mockman-js";
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
        <Route path="/mock" element={<MockmanEs />} />
        <Route path="*" element={<MockmanEs />} />
      </Routes>
    </>
  );
}

export default App;
