// Initialize React
import React from "react";

// Import Third Party
import { BrowserRouter as Router, Route } from "react-router-dom";

// Routes Configuration
import routes from './models/system/routes-system';

// Componenets
import HeaderComponenet from './components/header/header-componenet';

const App = () => (
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
);

export default App;
