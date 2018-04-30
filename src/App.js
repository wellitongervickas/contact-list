// Initialize React
import React from "react";

// Import Third Party
import { BrowserRouter as Router, Route } from "react-router-dom";

// Redux
import { Provider } from 'react-redux';
import store from './store/store';

// Routes Configuration
import routes from './models/system/routes-system';

// Componenets
import HeaderComponenet from './components/header/header-componenet';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="sections container-fluid">
        <HeaderComponenet></HeaderComponenet>
        {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
        ))}
      </div>
    </Router>
  </Provider>
);

export default App;
