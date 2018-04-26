import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import routes from './models/system/routes-system';

const App = () => (
 <Router>
    <div style={{ display: "flex" }}>
      <div>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/messages">messages</Link>
          </li>
          <li>
            <Link to="/contacts">contacts</Link>
          </li>
        </ul>
      </div>
      <div>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </Router>
);

export default App;
