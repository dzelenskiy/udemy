import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const app = props => {

  const [ personsState, setPersonsState ] = useState({
      persons: [
        { id: 'abc1', name: 'Max', age: 28 },
        { id: 'def2', name: 'Manu', age: 29 },
        { id: 'ghi3', name: 'Stephanie', age: 26}
      ]
    });

  const [showPersons, setShowPersons] = useState(false);

  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };

  const nameChangedHandler = ( newName, id ) => {
    const personIndex = personsState.persons.findIndex(p => {
      return p.id === id;
    });

    //const person = Object.assign({}, personsState.persons[personsIndex]);
    const person = {
      ...personsState.persons[personIndex]
    };

    person.name = newName;

    const persons = [...personsState.persons];
    persons[personIndex] = person;

    setPersonsState( {persons: persons});
  }

  const deletePersonHandler = (personIndex) => {
    //copying array b/c setting equal to original
    //only creates a pointer and is mutable
    //const persons = personsState.persons.slice();
    //using spread operator instead
    const persons = [...personsState.persons];
    persons.splice(personIndex, 1);
    setPersonsState({persons: persons});
  }

  const togglePersonsHandler = () => {
    const doesShow = showPersons;
    setShowPersons(!doesShow);
  }

  let persons = null;

  if (showPersons) {
    persons = (
      <div>
        {
          personsState.persons.map((person, index) => {
            return <Person
              click={() => deletePersonHandler(index)} 
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => nameChangedHandler(event.target.value, person.id)} />
          })
        }       
      </div> 
    );  
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button 
        style={style}
        onClick={togglePersonsHandler}>Toggle Persons</button>
        {persons}
    </div>
  );
}

export default app;