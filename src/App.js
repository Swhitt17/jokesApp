import React from "react";
import './App.css';
import JokeList from "./JokeList";

function App() {
  return (
    <div className="App">
      <JokeList numJokes={5}/>
    </div>
  );
}

export default App;
