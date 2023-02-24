import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import TrancriptShare from "./TrancriptShare";
import Transcript from './Transcript'
import TranscriptIssue from "./TranscriptIssue";
import TranscriptVerify from "./TranscriptVerify";
const Navigation = () => {

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg " >
          <div className="container-fluid">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={"nav-link"} to="/">
                  Transcript
                </Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link"} to="/transcript-share">
                  Trancript Share
                </Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link"} to="/transcript-issue">
                  Transcript Issue
                </Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link"} to="/transcript-verify">
                  Transcript Verify
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Transcript />} ></Route>
        <Route path="/transcript-share" element={<TrancriptShare />} ></Route>
        <Route path="/transcript-issue" element={<TranscriptIssue />} ></Route>
        <Route path="/transcript-verify" element={<TranscriptVerify />} ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
