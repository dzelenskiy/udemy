import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';


class App extends Component {

  state = {
    userName: 'username'
  }

  userNameInputHandler = (event) => {
    console.log('userNameInputHandler was triggered')
    this.setState({userName: event.target.value})
  }

  style = {
    margin: '5% 0 0 0'
  }

  render() {

    return (
      <div className="App">
        <h1>Hello World! Welcome to my first React App!</h1>
        <div style={this.style}>
          <UserInput userName={this.state.userName} changed={this.userNameInputHandler} />
          <UserOutput userName={this.state.userName} />
        </div>
        <div style={this.style}>
          <ol>
            <li>Create TWO new components: UserInput and UserOutput</li>
            <li>UserInput should hold an input element, UserOutput two paragraphs</li>
            <li>Output multiple UserOutput components in the App component (any paragraph texts of your choice)</li>
            <li>Pass a username (of your choice) to UserOutput via props and display it there</li>
            <li>Add state to the App component (=> the username) and pass the username to the UserOutput component</li>
            <li>Add a method to manipulate the state (=> an event-handler method)</li>
            <li>Pass the event-handler method reference to the UserInput component and bind it to the input-change event</li>
            <li>Ensure that the new input entered by the user overwrites the old username passed to UserOutput</li>
            <li>Add two-way-binding to your input (in UserInput) to also display the starting username</li>
            <li>Add styling of your choice to your components/ elements in the components - both with inline styles and stylesheets</li>
          </ol>
        </div>

      </div>
    );
  }
}

export default App;
