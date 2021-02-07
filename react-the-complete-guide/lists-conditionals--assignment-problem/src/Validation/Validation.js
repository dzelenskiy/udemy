import React from 'react';

const validation = (props) => {

    const validationStyle = {
        color: 'red',
        marginBottom: '1%',
        minHeight: '1.2rem'
    }

    let validationMessage = null;

    if(props.textLength < 5 && props.textLength > 0) {
        validationMessage = "Text too short";
    } else if (props.textLength > 10) {
        validationMessage = "Text long enough";
    } else {
        validationMessage = null;
    }

    return (
        <div style = {validationStyle}>
            {validationMessage}
        </div>
    );
    
}

export default validation;