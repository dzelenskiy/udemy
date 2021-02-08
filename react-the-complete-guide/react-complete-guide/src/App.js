import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';
//import Radium, { StyleRoot } from 'radium';
//import styled from 'styled-components';

// const StyledButton = styled.button`
//   background-color: ${props => props.alt ? 'red' : 'green'};
//   color: white;
//   font: inherit;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
//     color: black;
//   }
// `;

const app = props => {

  const [ personsState, setPersonsState ] = useState({
      persons: [
        { id: 'abc1', name: 'Max', age: 28 },
        { id: 'def2', name: 'Manu', age: 29 },
        { id: 'ghi3', name: 'Stephanie', age: 26}
      ]
    });

  const [showPersons, setShowPersons] = useState(false);

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

  const classes = [];
  if (personsState.persons.length <= 2) {
    classes.push('red');

  }
  if(personsState.persons.length <= 1) {
    classes.push('bold');
  }

  return (
    //<StyleRoot>
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        {/* <StyledButton 
          alt={showPersons}  */}
        <button
          className="button"
          onClick={togglePersonsHandler}>
            Toggle Persons
        </button>
        {/* </StyledButton> */}
        {persons}
      </div>
    //</StyleRoot>
  );
}

//export default Radium(app);
export default app;