import React from 'react'
import './App.css';
import MainGame from './containers/MainGame';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Rules from './components/Rules';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/main-game">
            <MainGame />
          </Route>
          <Route path="/rules">
            <Rules />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
