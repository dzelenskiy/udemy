import React, { useState } from 'react';

import './AddPerson.css';

const addPerson = props => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const nameChangedHandler = event => {
        setName(event.target.value);
    }

    const ageChangedHandler = event => {
        setAge(event.target.value);
    }

    return(
        <div className="AddPerson">
            <input type="text" placeholder="Name" onChange={nameChangedHandler} value={name} />
            <input type="number" placeholder="Age" onChange={ageChangedHandler} value={age} />
            <button onClick={() => props.personAdded(name, age)}>Add Person</button>
        </div>
    );
};

export default addPerson;