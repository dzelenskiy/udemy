import React, { Component } from 'react';
import './UserInput.css';

class UserInput extends Component {

    style = {
        color: 'white'
    }

    render() {

        
        return (
            <div className="UserInput">
                <label htmlFor="userNameInput" style={this.style}>Username: </label>
                <input id="userNameInput" 
                    type="text" value={this.props.userName}  
                    onChange={this.props.changed} />  
            </div>
        );
    }
}

export default UserInput;