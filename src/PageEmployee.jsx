import React from 'react'
import uuid from "uuid";
import axios from 'axios'
import {
  withRouter
} from "react-router-dom";
class PageEmployee extends React.Component {
    constructor(props) {
        super(props);

      
        this.state = {
            todos: [],
          
           saving:false,
           showMessage:false,
            name: "",
                company:"",
                age:0,
                email:"",
                isActive:false,
        
              }
              
    }
    changeHadler =(e) =>{
        this.setState({[e.target.name]:e.target.value})
        
    };
    
    submitHandler =(e) =>{
    
    e.preventDefault();
    this.setState({
     
      saving:true
     
    });
 
    var z={
     "id":uuid.v4(),
      "isActive":this.state.isActive,
      "age": this.state.age,
      "name": this.state.name.toString(),
      "company": this.state.company.toString(),
      "email": this.state.email.toString()
    }
    
   
        if(this.state.name!="")
       axios.post('http://localhost:3004/employees',z).
        then(response=>{console.log(response)}).catch(error=>{console.log(error)}).
        then(data => this.setState({isSaving : false}))
        .then( data => fetch('http://localhost:3004/employees')
        .then(response => response.json())
        .then(data => this.setState({todos : data , name : "", age : "", company : "", email: "", isActive : true,showMessage:false})).then(() => {
          this.props.history.push("/");
      })
      );
      
    
      
        }
        
      
      
      showForm = (bool) => {
        this.setState({
          showMessage: true
        });
      }
    
      
          Cancelled = (bool) => {
            this.setState({
              showMessage: false
            });
            this.props.history.push("/");
          }
          submitHandler(name, age, company, email, isActive) {
        fetch('http://localhost:3004/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isActive: isActive,
                age: age,
                name: name,
                company: company,
                email: email
            })
        })
    }
    
   
    render() {
      if(this.state.saving){
       
       
        return (
          <label>saving...</label>
         
      );
      }
        return (
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
      



        </div>
        )
    }
}

export default withRouter(PageEmployee)