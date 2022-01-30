import './App.css';
import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apikey = "ed36f16e328e4f1fbcd791acdd9ec499";

  state={
    progress : 0,
  }

  setProgress = (progress)=>{
    this.setState({progress:progress});
  }

  render() {
    return (
      <Router>
      <div>

        <NavBar/>

        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        />

        <Switch>
          <Route exact path="/">
           <News setProgress={this.setProgress} apikey={this.apikey} key="general" pagesize={6} category="general"/>
          </Route>
          <Route exact path="/business">
           <News setProgress={this.setProgress} apikey={this.apikey} key="business" pagesize={6} category="business"/>
          </Route>
          <Route exact path="/entertainment">
           <News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pagesize={6} category="entertainment"/>
          </Route>
          <Route exact path="/health">
           <News setProgress={this.setProgress} apikey={this.apikey} key="health" pagesize={6} category="health"/>
          </Route>
          <Route exact path="/science">
           <News setProgress={this.setProgress} apikey={this.apikey} key="science" pagesize={6} category="science"/>
          </Route>
          <Route exact path="/sports">
           <News setProgress={this.setProgress} apikey={this.apikey} key="sports" pagesize={6} category="sports"/>
          </Route>
          <Route exact path="/technology">
           <News setProgress={this.setProgress} apikey={this.apikey} key="technology" pagesize={6} category="technology"/>
          </Route>
        </Switch>

      </div>
      </Router>
    )
  }
}


