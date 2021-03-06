import { Route, Routes } from "react-router-dom";
import "./App.css";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  Archives,
  HomePage,
  LandingPage,
  Login,
  MarkDownEditor,
  NotFound,
  SavedNotes,
  Signup,
} from "./Pages";
import MockmanEs from "mockman-js";
import { Navigation } from "./Components";
toast.configure();

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/notes" element={<SavedNotes />} />
        <Route path="/markdown" element={<MarkDownEditor />} />
        <Route path="/mock" element={<MockmanEs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
