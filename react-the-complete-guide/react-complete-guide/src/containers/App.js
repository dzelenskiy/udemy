import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import AuthContext from '../context/auth-context';

//for scripts version 2+ use syntax below
//import classes from './App.module.css';

//import Radium, { StyleRoot } from 'radium';
//import styled from 'styled-components';
//import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'abc1', name: 'Max', age: 28 },
      { id: 'def2', name: 'Manu', age: 29 },
      { id: 'ghi3', name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');  
  // }  

  componentDidMount() {
    console.log('[App.js] componentDidMount');  
  }

  shouldComponenUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }  

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  nameChangedHandler = ( newName, id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    //const person = Object.assign({}, this.state.persons[personsIndex]);
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = newName;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        //use prevState vs this.state.. when looking at values in setState 
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  deletePersonHandler = (personIndex) => {
    //copying array b/c setting equal to original
    //only creates a pointer and is mutable
    //const persons = personsState.persons.slice();
    //using spread operator instead
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }; 

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated} 
        />
      );
    }

    return (
        <React.Fragment>
          <button onClick={() => {
            this.setState({showCockpit: false});
          }}>Remove Cockpit</button>
          <AuthContext.Provider 
            value={{
              authenticated: this.state.authenticated,
              login: this.loginHandler
            }}
          >
            {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle} 
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
            />
            ) : null}  
            {persons}
          </AuthContext.Provider>
        </React.Fragment>
    );
  }
}

export default withClass(App, classes.App);