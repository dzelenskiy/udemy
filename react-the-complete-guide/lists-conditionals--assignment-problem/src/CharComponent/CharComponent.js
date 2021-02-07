import React, { Component } from 'react';
import './CharComponent.css';

class CharComponent extends Component {

    render() {
        let cssClassName = "CharComponent";

        if(this.props.character === ' ') {
            cssClassName = "CharComponent-with-space"
        }

        return(
            <span className={cssClassName} onClick={this.props.click}>
                {this.props.character}
            </span>
        );
    }

}

export default CharComponent;