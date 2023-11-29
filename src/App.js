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
    backgroundColor:"black"
  });
  const [color ,setColor] = useState({
    color:"blue",
    backgroundColor:"black"

  })

  const [btntext , setBtntext] = useState("Enable Light Mode")

 const  togglestyle = ()=>{
    if(mystyle.color=="white"){
      setMystyle({
        color:"black",
        backgroundColor:"white"
      })
      setBtntext("Enable Dark Mode")
    }
    else if(color.color =="blue"){
     setColor({ color:"red",
     backgroundColor:"black"
    })
    }
    else{
      setMystyle({
        color:"white",
        backgroundColor:"black"
      })
      setBtntext("Enable Light Mode")
    }

  }
  return (
    <div className="Container" style={mystyle}>
      <button onClick={togglestyle}>{btntext}</button>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Articles />} style={mystyle} />
          <Route path="/blogs" element={<Blogs />}style={color} />
          <Route path="/reports" element={<Reports />}style={mystyle} />
          <Route path="bookmarks" element={<Bookmarks/>} style={mystyle} />
        </Routes>


    </div>
  );
}

export default App;