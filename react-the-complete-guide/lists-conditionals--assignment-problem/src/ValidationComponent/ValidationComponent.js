import React, { Component } from 'react';
import reactDom from 'react-dom';

class ValidationComponent extends Component {

    validationStyle = {
        color: 'red'
    }

    render() {

        let validationMessage = null;
    
        if(this.props.textLength < 5 && this.props.textLength > 0) {
            this.validationMessage = "Text too short";
        } else if (this.props.textLength > 10) {
            this.validationMessage = "Text long enough";
        } else {
            this.validationMessage = null;
        }

        return (
            <span style = {this.validationStyle}>
                {this.validationMessage}
            </span>
        );
    }
}

export default ValidationComponent;