import React, { Component } from 'react';
import './UserOutput.css';

class UserOutput extends Component {
    render() {
        return (
            <div className="UserOutput">
                <p>My name is: {this.props.userName}</p>
                <p>This is {this.props.userName}'s' first paragraph</p>
                <p>This is {this.props.userName}'s' second paragraph</p>
            </div>
        );
    }
}

export default UserOutput;