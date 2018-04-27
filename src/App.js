import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from './models/system/routes-system';
import HeaderComponenet from './components/header/header-componenet';

const App = () => (
  <Router>
    <div className="sections">
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
