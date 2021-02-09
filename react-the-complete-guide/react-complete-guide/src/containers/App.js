import React, { useState } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

//for scripts version 2+ use syntax below
//import classes from './App.module.css';

//import Person from '../components/Persons/Person/Person';
//import Radium, { StyleRoot } from 'radium';
//import styled from 'styled-components';
//import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

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
    persons = <Persons 
          persons={personsState.persons}
          clicked={deletePersonHandler}
          changed={nameChangedHandler} />;
  }

  return (
    //<StyleRoot>
      <div className={classes.App}>
        <Cockpit 
          showPersons={showPersons}
          persons={personsState.persons}
          clicked={togglePersonsHandler} />
        {persons}
      </div>
    //</StyleRoot>
  );
}

//export default Radium(app);
export default app;