import React from "react";
import { Routes, Route } from "react-router-dom";
import Reports from "./Components/Reports";
import Articles from "./Components/Articles";
import Blogs from "./Components/Blogs";
import Navigation from "./Components/Navigation";
import Bookmarks from "./Components/Bookmarks";
import './App.css'

function App() {
  return (
    <div className="Container">
        <Navigation/>
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="bookmarks" element=<Bookmarks/> />
        </Routes>


    </div>
  );
}

export default App;