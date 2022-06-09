import React from "react";
import { useAuth } from "../../Context/AuthContext";
// import { useNote } from "../../Context/NoteContext";
import "./HomePage.css";
// import axios from "axios";
import { AddNote } from "../AddNote/AddNote";
import { Link } from "react-router-dom";
import { SideNav } from "../../Components";
// import { errorToast } from "../../Utils/ToastUtils/errorToast";

function HomePage() {
  const { isAuthenticated } = useAuth();
  // const { setSavedNotes } = useNote();
  // const navigate = useNavigate();
  // const onLoad = async () => {
  //   try {
  //     const notes = await axios.get("/api/notes", {
  //       headers: { authorization: token },
  //     });
  //     setSavedNotes(notes.data.notes);
  //   } catch (error) {
  //     errorToast("Seems Like you are note logged in, please log in!");
  //     navigate("/login");
  //   }
  // };
  // useEffect(() => onLoad());
  return (
    <>
      <SideNav />
      <div className="main-content flex-center-center flex-col ">
        {isAuthenticated ? (
          <AddNote />
        ) : (
          <>
            <h1>Login to add a note</h1>
            <Link to={"/login"}>
              <button className="btn-primary-confirm m-1">Login</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export { HomePage };
