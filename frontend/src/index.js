import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Static from "./components/Static";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/about" element={<Static item="about" />} />
        <Route path="/sign-up" element={<Static item="sign-up" />} />
        <Route path="/sign-in" element={<Static item="sign-in" />} />
         <Route path="/sign-out" element={<Static item="sign-out" />} />
        <Route path="/user:userId" element={<Static item="account" />} />
        <Route path="/post:postId" element={<Static item="single-post" />} />
        <Route path="/" element={<Static item="home" />} />
        <Route path="*" element={<Static item="notfound" />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
