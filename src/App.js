import React from "react";
import "./App.css";
//import FirstApp from "./Components/FirstApp";
//import ReduxTest from "./Components/ReduxTest";
import { Link, Route } from "react-router-dom";
import GameForm from "./Components/GameForm";
import GamePage1 from "./Components/GamePage";
import TestForm from "./Components/testForm";
function App() {
  return (
    <div className="ui container">
      <div className="ui three item menu">
        <Link className="item" activeclassname="active" to="/games/home">
          Home
        </Link>
        <Link className="item" activeclassname="active" to="/games">
          Games
        </Link>
        <Link className="item" activeclassname="active" to="/games/new">
          Add New Game
        </Link>
      </div>
      {/* <FirstApp Test="Magesh" Test1="bala" />
        <hr />
      <Link to="/games">Games</Link>
      <hr />*/}
      <Route path="/games" exact component={GamePage1} />
      <Route path="/games/new" exact component={GameForm} />
      <Route path="/games/home" exact component={TestForm} />
      <Route path="/game/:id" exact component={GameForm} />
    </div>
  );
}

export default App;
