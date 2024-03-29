import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(<BrowserRouter basename="/student-app"><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
