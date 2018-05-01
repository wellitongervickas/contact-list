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
import Header from './components/header/header';
import Toast from './components/toast/toast';
import Loading from './components/loading/loading';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="sections container-fluid">
        <Loading></Loading>
        <Toast></Toast>
        <Header></Header>
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
