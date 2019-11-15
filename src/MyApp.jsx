import React, { Component } from 'react';
import FormToFill from './FormToFill';
import axios from 'axios'

import uuid from "uuid";

class MyApp extends Component {
  constructor() {
    super();
 
    this.state = {
        todos: [],
       loading:false,
       saving:false,
       showMessage:false,
        name: "",
            company:"",
            age:0,
            email:"",
            isActive:false,
            is_being_deleted : "",
            which_id_exactly:""
          }
          
    
        this.submitHandler=this.submitHandler.bind(this);
        this.changeHadler=this.changeHadler.bind(this);
        this.deleteTask=this.deleteTask.bind(this);
  }
 
  changeHadler =(e) =>{
    this.setState({[e.target.name]:e.target.value})
    
};

submitHandler =(e) =>{

e.preventDefault();
this.setState({
 
  saving:true
 
});
console.log("1")
var z={
 "id":uuid.v4(),
  "isActive":this.state.isActive,
  "age": this.state.age,
  "name": this.state.name.toString(),
  "company": this.state.company.toString(),
  "email": this.state.email.toString()
}

console.log(z);
console.log(this.state.name.toString());
    if(this.state.name!="")
   axios.post('http://localhost:3004/employees',z).
    then(response=>{console.log(response)}).catch(error=>{console.log(error)}).
    then(data => this.setState({isSaving : false}))
    .then( data => fetch('http://localhost:3004/employees')
    .then(response => response.json())
    .then(data => this.setState({todos : data , name : "", age : "", company : "", email: "", isActive : true,showMessage:false})));
  

  
    }
    
   
  componentDidMount() {
    fetch('http://localhost:3004/employees')
    .then(res => res.json())
    .then((data) => {
      this.setState({ todos: data,loading:true,saving:false})
      console.log(this.state.todos)
    })
    .catch(console.log)
    
 //   location.reload();
 

  }
  
  
  showForm = (bool) => {
    this.setState({
      showMessage: true
    });
  }

   deleteTask = task => {
     this.setState({which_id_exactly:task})
    this.setState({is_being_deleted: "done"})
     console.log(task);
    const { id } = task;
    fetch('http://localhost:3004/employees/'+task.toString(), {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then( data=>this.setState({is_being_deleted: "",which_id_exactly:""}))
    .then(data => fetch('http://localhost:3004/employees')
        .then(response => response.json())
        .then(data => this.setState({todos: data})))
        console.log(task);

  };
      Cancelled = (bool) => {
        this.setState({
          showMessage: false
        });
      }

  render() {
  if(this.state.saving){
    console.log("was here");
    console.log(this.state.todos);
   this.componentDidMount();
    return (
      <label>saving...</label>
     
  );
  }
      if(!this.state.loading){
        console.log("here here");
    //location.reload();
        

        return (
            <label>Loading...</label>
           
        );
      }
     
        return (
          
        <div className="container">
        <div className="col-xs-12">
            <button onClick={this.showForm}>Add employee</button>

            { (this.state.showMessage )&&(<div>
              <div>
                <label>ID: </label>
                
                 <input readOnly  name="id"  />
                 <br />
                 <label>Active?: </label>

                 <input type="text" name="isActive" value={this.state.isActive} onChange={this.changeHadler} />
                 <br />

                <label>Name: </label>
                <input type="text" name="name" value={this.state.name} onChange={this.changeHadler} />
                <br />
                <label>Company: </label>
                <input type="text" name="company" value={this.state.company} onChange={this.changeHadler} />
                <br />
                <label>Age: </label>
                <input type="text" name="age" value={this.state.age} onChange={this.changeHadler}/>
                <br />
                <label>Email: </label>
                <input type="text" name="email"  value={this.state.email}  onChange={this.changeHadler} />
                <br />
            </div>
            <button onClick={this.submitHandler}>Submit</button>
                      <button onClick={this.Cancelled}>Cancel</button>
                        </div>) }
                        {this.state.isSaving && <label> Is saving ... </label>}
        <h1>My Todos</h1>
        <table>
          
                <thead>
                    <tr>
                    <th>ID</th>
                        <th>First Name</th>
                        <th>Age</th>
                        <th>Company</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Button</th>
                    </tr>
                </thead>
                <tbody>
                        {this.state.todos.map(todo =>

                        <tr  key={todo.id==undefined?"111":todo.id}>
                        {todo.id !== this.state.id_which_was_deleted &&
                        <>
                      
                      <td>{todo.id==undefined?"111":todo.id+"  "}</td>
                                    <td>{todo.name+"  "}</td>
                                    <td>{todo.age+"  "}</td>
                                    <td>{todo.company+"  "}</td>
                                    <td>{todo.email+"  "}</td>
                                    <td>{todo.isActive.toString()+"  "}</td>
                                    <td onClick={() => this.deleteTask(todo.id==undefined?"111":todo.id)}> Delete </td>
                              
                        </> }
                        {   "done" == this.state.is_being_deleted && todo.id==this.state.which_id_exactly
                         && todo.id != undefined
                         &&
                      
                        <td> Deleting row </td>
                        }
                        </tr>)
                        }




                </tbody>                               
            </table>        





        </div>
       </div>)
  }
}

export default MyApp;
