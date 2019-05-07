import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import FirstLevel from "./components/FirstLevel";

class App extends Component {
  render() {
    return (
      <div className="App">
        <FirstLevel />
      </div>
    );
  }
}

export default App;
