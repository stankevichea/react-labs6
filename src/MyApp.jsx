import React, { Component } from 'react';

import axios from 'axios'

import uuid from "uuid";
import PageEmployeesList from './PageEmployeesList';
import PageEmployee from './PageEmployee';

class MyApp extends Component {
  constructor() {
    super();
 
  
      
  }
 
  

  render() {

     
        return (
         <div> 
    <PageEmployee/>

    <PageEmployeesList/>
    </div> 
         
    )
  }
}

export default MyApp;
