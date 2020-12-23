
//All Import Statements
import './App.css';
import React, { useState } from 'react';
import Login from "./components/Login.js";
import Chatroom from "./components/Chatroom.js"
import MenuBar from "./components/MenuBar.js"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Create a functional React Componenet
function App() {
  //Create a hook for the login details, to be passed to chatroom.js
  const [loginDetails, setLoginDetails] = useState(["", ""])

  //Function for login.js to use to pass over the login Details
  const sendDetails = (data) => {
    setLoginDetails(data);
  }
  
  //Render
  return (
    <div className="App">
      <MenuBar />
      <Router>
        <Switch>
          <Route path = "/chat" exact component = {() => <Login sendDetails = {sendDetails} />} />
          <Route path = "/chatroom" exact component = {() => <Chatroom loginDetails = {loginDetails}/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
