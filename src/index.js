// Create a new React App

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './models/system/service-worker-system';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
