import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const app = props => {
  const [ personsState, setPersonsState ] = useState({
      persons: [
        { name: 'Max', age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 26}
      ]
    });

  const [otherState, setOtherState] = useState('some other value');

  const [showPersons, setShowPersons] = useState(false);

  console.log(personsState, otherState);

  const switchNameHandler = (newName) => {
    setPersonsState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    });
  };
    
  const nameChangedHandler = (event) => {
    setPersonsState({
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26 }
      ]
    });      
  }

  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };

  const togglePersonsHandler = () => {
    const doesShow = showPersons;
    setShowPersons(!doesShow);
  }

  let persons = null;

  if (showPersons) {
    persons = (
      <div>
        <Person 
          name={personsState.persons[0].name} 
          age={personsState.persons[0].age} 
        />

        <Person 
          name={personsState.persons[1].name} 
          age={personsState.persons[1].age} 
          click={switchNameHandler.bind(this, 'Max!')}
          changed={nameChangedHandler}>
            My Hobbies: Racing
        </Person>

        <Person 
          name={personsState.persons[2].name} 
          age={personsState.persons[2].age} 
        />          
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