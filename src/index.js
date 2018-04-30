// Create a new React App
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './models/system/service-worker-system';

// Third Party
import 'normalize.css';

// Stylesheets
import './assets/styles/app.css';

// Initialize React App
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
