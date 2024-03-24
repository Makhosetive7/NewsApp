import React from "react";
import { Routes, Route } from "react-router-dom";
import Reports from "./Components/Reports";
import Articles from "./Components/Articles";
import Blogs from "./Components/Blogs";
import Navigation from "./Components/Navigation";
import Bookmarks from "./Components/Bookmarks";
import './App.css'
import { useState } from "react";

function App() {
  const [mystyle , setMystyle] = useState({
    color:"white",
    backgroundColor:"black",
   
  });
  const [Color ,setColor] = useState({
    color:"blue",
    backgroundColor:"black"

  })

  const [btntext , setBtntext] = useState("Light")

 const  togglestyle = ()=>{
    if(mystyle.color=="white"){
      setMystyle({
        color:"black",
        backgroundColor:"white",
        
      })
      setBtntext("Dark ")
    }
  
    else{
      setMystyle({
        color:"white",
        backgroundColor:"black",
        
      })
      setBtntext("Light")
    }

  }
  return (
    <div className="Container" style={mystyle}>
      <button onClick={togglestyle}>{btntext}</button>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Articles />} style={Color} />
          <Route path="/blogs" element={<Blogs />}style={mystyle} />
          <Route path="/reports" element={<Reports />}style={mystyle} />
          <Route path="bookmarks" element={<Bookmarks/>} style={mystyle} />
        </Routes>


    </div>
  );
}

export default App;