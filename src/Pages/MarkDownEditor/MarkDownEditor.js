import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import SideNav from "../../Components/SideNav/SideNav";
import { useAuth } from "../../Context/AuthContext";

function MarkDownEditor() {
  const { token } = useAuth();
  const [markdown, setMarkdown] = useState("");

  return (
    <div className="main-content">
      <SideNav />
      <h1>MarkDown Editor</h1>
      <div className="flex">
        <div className="w-50per h-70vh mx-1">
          <h3 className="flex-center-center">Editor</h3>
          <hr />
          <textarea
            style={{ height: "100%", width: "100%" }}
            onChange={(e) => setMarkdown(e.target.value)}
          ></textarea>
        </div>
        <div className="w-50per h-70vh mx-1">
          <h3 className="flex-center-center">Preview</h3>
          <hr />
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export { MarkDownEditor };
