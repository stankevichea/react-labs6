import React, { Component } from 'react';

class ListofEmp extends Component {
  constructor() {
    super();
 
    this.state = {
        todos: [],
       loading:false,
     

      
           
            is_being_deleted : "",
            which_id_exactly:""
          }
          
    
    
        this.deleteTask=this.deleteTask.bind(this);
  }

    
   
  componentDidMount() {
    fetch('http://localhost:3004/employees')
    .then(res => res.json())
    .then((data) => {
      this.setState({ todos: data,loading:true,saving:false})
     
    })
    .catch(console.log)
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

      if(!this.state.loading){
        return (
            <label>Loading...</label>
           
        );
      }
     
        return (
          
        <div className="container">
        <div className="col-xs-12">
       
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

                        <tr  key={todo.id}>
                        {todo.id !== this.state.id_which_was_deleted &&
                        <>
                      
                      <td>{todo.id+"  "}</td>
                                    <td>{todo.name+"  "}</td>
                                    <td>{todo.age+"  "}</td>
                                    <td>{todo.company+"  "}</td>
                                    <td>{todo.email+"  "}</td>
                                    <td>{todo.isActive.toString()+"  "}</td>
                                    <td onClick={() => this.deleteTask(todo.id)}> Delete </td>
                              
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

export default ListofEmp;
