import React, { Component } from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import Auxil from './hoc/Auxil/Auxil';
import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import './App.css';

class App extends Component {
  render () {
    return (
      <Auxil>
        <header className="Header">
          <p style={{fontSize: '2em', color: 'lightgray'}}>Student App</p>
          <div className="App" style={{width: '75%', margin: '0 auto'}}>
            <ol style={{textAlign: 'left', color: 'gray'}}>
              <li>Add Routes to load "Users" and "Courses" on different pages (by entering a URL, without Links)</li>
              <li>Add a simple navigation with two links => One leading to "Users", one leading to "Courses"</li>
              <li>Make the courses in "Courses" clickable by adding a link and load the "Course" component in the place of "Courses" (without passing any data for now)</li>
              <li>Pass the course ID to the "Course" page and output it there</li>
              <li>Pass the course title to the "Course" page - pass it as a param or score bonus points by passing it as query params (you need to manually parse them though!)</li>
              <li>Load the "Course" component as a nested component of "Courses"</li>
              <li>Add a 404 error page and render it for any unknown routes</li>
              <li>Redirect requests to /all-courses to /courses (=> Your "Courses" page)</li>
            </ol>
          </div>
          <nav className="NavBar">
            <ul>
              <li>
                <NavLink to="/users">Users</NavLink>
              </li>
              <li>
                <NavLink to="/courses">Courses</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/courses" component={Courses} />
          <Route path="/users" exact component={Users} />
          <Redirect from="/all-courses" to="courses" />
          <Redirect from="/" exact to="courses" />
          <Route 
            render={
              () => 
                <h3 style={{textAlign: 'center', color: 'pink'}}>
                  Sorry. The the page you were looking for was not found.
                </h3>} 
          />          
        </Switch>
      </Auxil>
    );
  }
}

export default App;
