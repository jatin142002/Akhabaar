import './App.css';

import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
      <div>

        <NavBar/>

        <Switch>
          <Route exact path="/">
           <News key="general" pagesize={6} category="general"/>
          </Route>
          <Route exact path="/business">
           <News key="business" pagesize={6} category="business"/>
          </Route>
          <Route exact path="/entertainment">
           <News key="entertainment" pagesize={6} category="entertainment"/>
          </Route>
          <Route exact path="/health">
           <News key="health" pagesize={6} category="health"/>
          </Route>
          <Route exact path="/science">
           <News key="science" pagesize={6} category="science"/>
          </Route>
          <Route exact path="/sports">
           <News key="sports" pagesize={6} category="sports"/>
          </Route>
          <Route exact path="/technology">
           <News key="technology" pagesize={6} category="technology"/>
          </Route>
        </Switch>

      </div>
      </Router>
    )
  }
}


