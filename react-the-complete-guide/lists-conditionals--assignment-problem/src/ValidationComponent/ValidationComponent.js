import React, { Component } from 'react';

class ValidationComponent extends Component {

    state = {
        message: null
    }

    textLength = this.props.textLength;

    validateLength() {
        if(this.textLength < 5) {
            this.setState({message: "Text too short"})
        } else if (this.textLength > 10) {
            this.setState({message: "Text long enough"})
        }
    }

    render() {
        return (
            <div>
                <p>{this.validateLength}</p>
            </div>
        );
    }
}

export default ValidationComponent;