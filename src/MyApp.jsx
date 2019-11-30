import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import PageEmployeesList from './PageEmployeesList';
import PageEmployee from './PageEmployee';

class MyApp extends Component {
  constructor() {
    super();
 
  
      
  }
 
  

  render() {

     
        return (
          <Router>
          <Switch>
            <Route exact path="/">
              <PageEmployeesList />
            </Route>
            <Route exact path="/new">
              <PageEmployee />
            </Route>
          </Switch>
        </Router>
         
    )
  }
}

export default MyApp;
