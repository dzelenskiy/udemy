import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {

  state = {
    inputLength: "",
    charArray: null
  }

  countInputLength = (textLength) => {  
    this.setState({inputLength: textLength})
  }

  displayCharacters = (textInput) => {
    this.setState({charArray: textInput.split('')})
  }

  textInputHandler = (event) => {
    this.countInputLength(event.target.value.length);
    this.displayCharacters(event.target.value);
  }

  deleteCharHandler = (index) => {
     console.log("deleteCHarHandler called with index: " + index);
     const newCharArray = [...this.state.charArray];
     newCharArray.splice(index, 1);
     this.setState({charArray: newCharArray});
     console.log("charArray is now: " + this.state.charArray);
  }

  charComponentDiv = null;
  textInputString = "";

  render() {

    if(this.state.charArray != null && this.state.charArray.length > 0) {
      this.charComponentDiv = (
        <div>
          {
            this.state.charArray.map((character, index) => {
              return <CharComponent
                      key={'id' + character + index} 
                      character={character} 
                      click={() => this.deleteCharHandler(index)} />
            })
          }
        </div>
      );
      this.textInputString = this.state.charArray.join('');
    } else { 
      this.charComponentDiv = null;
      this.textInputString = "";
      this.state.inputLength = "";
    }


    //textInputString = this.state.charArray.join('');


    return(
    <div className="App">
        <h1>List Conditionals Assignment Problem</h1>
        <br />
        {this.charComponentDiv}
        <br />
        <span>{this.state.inputLength}</span>
        <input type="text"
          id="user-input-box" 
          value={this.textInputString}
          onChange={(event) => this.textInputHandler(event)} />
        <ValidationComponent textLength={this.state.inputLength} />
        <div className="instructions-div">
          <h2>Instructions</h2>
          <ol>
            <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
            <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
            <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
            <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
            <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
            <li>When you click a CharComponent, it should be removed from the entered text.</li>
          </ol>
          <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        </div>

    </div>
    );
  }
}

export default App;
