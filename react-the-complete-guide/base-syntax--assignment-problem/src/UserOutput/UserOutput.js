import React, { Component } from 'react';
import './UserOutput.css';

class UserOutput extends Component {
    render() {
        return (
            <div className="UserOutput">
                <p>Hi, I am UserOutput paragraph #1. My name is: {this.props.userName}</p>
                <p>Hi, I am UserOutput paragraph #2</p>
            </div>
        );
    }
}

export default UserOutput;