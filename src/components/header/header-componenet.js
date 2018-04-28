import React, { Component } from 'react';
import { NavLink  } from "react-router-dom";
import configSystem from '../../models/system/config-system';

class HeaderComponenet extends Component {
  render() {
    return (
      <div className="header-section flex-between-center">
        <div className="header-section-title relative uppercase flex-center">
          <span className="title-icon">
            <i className="fas fa-address-book"></i>
          </span>
          <span className="title-text">
            <NavLink to="/">
              {configSystem.lang.PROJECT_NAME}
            </NavLink >
          </span>
        </div>
        <div className="header-section-menu">
          <ul className="unstyled-list flex-start-center">
            <li>
              <NavLink to="/contacts">
                <i className="fas fa-users"></i> 
                <span>Contacts</span>
              </NavLink >
            </li>
            <li className="menu-item">
              <NavLink to="/messages">
                <i className="fas fa-envelope"></i> 
                <span>Messages</span>
              </NavLink >
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

export default HeaderComponenet;