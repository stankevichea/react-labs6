import React from 'react'

class FormToFill extends React.Component {
    constructor(props) {
        super(props);

      
    }

  
    render() {
        return (
            <div>
                <label>ID: </label>
                
                 <input readOnly  name="id" value={this.props.key} />
                 <br />
                 <label>Active?: </label>

                 <input type="text" name="isActive" />
                 <br />

                <label>Name: </label>
                <input type="text" name="name" />
                <br />
                <label>Company: </label>
                <input type="text" name="company" />
                <br />
                <label>Age: </label>
                <input type="text" name="age" />
                <br />
                <label>Email: </label>
                <input type="text" name="email" />
                <br />
            </div>
        )
    }
}

export default FormToFill