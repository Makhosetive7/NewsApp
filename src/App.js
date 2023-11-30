import React from "react";
import { Routes, Route } from "react-router-dom";
import Reports from "./Components/Reports";
import Articles from "./Components/Articles";
import Blogs from "./Components/Blogs";
import Navigation from "./Components/Navigation";
import Bookmarks from "./Components/Bookmarks";
import './App.css'
import Login from "./Components/Login";
import PrivateRoute from "./Routing/PrivateRoute"

function App() {
 return (
  <div className="Container">
      <Navigation/>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/reports" element={<Reports />} />
        <PrivateRoute path="/bookmarks" element={Bookmarks} />
      </Routes>
  </div>
 );
}

export default App;
