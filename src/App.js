import React from "react";
import { Routes, Route } from "react-router-dom";
import Articles from "./Components/Articles";
import SpaceFacts from "./Components/SpaceFacts";
import Navigation from "./Components/Navigation";
import Bookmarks from "./Components/Bookmarks";
import Home from "./Components/Home";
import './App.css'

function App() {
  return (
    <div className="Container">
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/spaceFacts" element={<SpaceFacts />} />
          <Route path="bookmarks" element=<Bookmarks/> />
        </Routes>


    </div>
  );
}

export default App;