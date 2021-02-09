import React from 'react';
import Person from './Person/Person';

// shortcut to include return statement in arrow function
const persons = props =>
    props.persons.map((person, index) => {
        return <Person
            click={() => props.clicked(index)} 
            key={person.id}
            name={person.name} 
            age={person.age}
            changed={(event) => props.changed(event.target.value, person.id)} />
      } );

export default persons;