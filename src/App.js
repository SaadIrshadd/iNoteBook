import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const [alert, setAlert] = useState(null)

  const ShowAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
    <NoteState>
        
        <Router>
          
          <Navbar/>
          <Alert alert={alert}/>
            <div className="container">

              <Routes>
                <Route path="/" element={<Home ShowAlert={ShowAlert}/>}></Route>
                <Route path="/about" element={<About ShowAlert={ShowAlert}/>}></Route>
                <Route path="/login" element={<Login ShowAlert={ShowAlert}/>}></Route>
                <Route path="/signup" element={<SignUp ShowAlert={ShowAlert}/>}></Route>
              </Routes>
            
            </div>
        
        </Router>
      
      </NoteState>
    </>
  );
}

export default App;
