import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Archives from "./Pages/Archives/Archives";
import HomePage from "./Pages/HomePage/HomePage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/Login/Login";
import SavedNotes from "./Pages/SavedNotes/SavedNotes";

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
