import React from 'react'
import ListofEmp from './ListofEmp';
import {
    Link
  } from "react-router-dom";

class PageEmployeesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                 <Link to="/new">
                    <button>Create new employee</button>
                </Link>
                <ListofEmp />
            </div>
        )
    }
}

export default PageEmployeesList
