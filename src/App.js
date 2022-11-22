import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NotesState from "./context/Notes/NotesState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const show_alert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 2000)
  }

  return (
    <>
      <NotesState>
        <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home show_alert={show_alert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login show_alert={show_alert} />} />
              <Route exact path="/signup" element={<Signup show_alert={show_alert} />} />
            </Routes>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;