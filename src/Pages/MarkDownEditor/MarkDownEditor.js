import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideNav from "../../Components/SideNav/SideNav";
import { useAuth } from "../../Context/AuthContext";
import "./MarkDownEditor.css";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

function MarkDownEditor() {
  const { isAuthenticated } = useAuth();
  const [markdown, setMarkdown] = useState("");

  return (
    <>
      <SideNav />
      <div className="main-content">
        {isAuthenticated ? (
          <>
            <h1>MarkDown Editor</h1>
            <div className="flex flex-wrap flex-space_between-center">
              <div className=" h-70vh mx-1 my-4 w-100per md-editor-container">
                <h3 className="flex-center-center">Editor</h3>
                <hr />
                <textarea
                  className="h-100per w-100per p-2 md-editor-input"
                  onChange={(e) => setMarkdown(e.target.value)}
                  placeholder="Start writing markdown"
                ></textarea>
              </div>
              <div className=" h-70vh mx-1 my-4 react-markdown-container w-100per react-md-component">
                <h3 className="flex-center-center">Preview</h3>
                <hr />
                <div>
                  <ReactMarkdown
                    className="font-size-s2 p-2 "
                    remarkPlugins={[gfm]}
                  >
                    {markdown}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>Login to edit markdown</h1>
            <Link to={"/login"}>
              <button className="btn-primary-confirm m-1">Login</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export { MarkDownEditor };
