import React, { Component } from 'react';
import { NavLink  } from "react-router-dom";
import configSystem from '../../models/system/config-system';

class HeaderComponenet extends Component {
  render() {
    return (
      <div className="header-section flex-between-center">
        <div className="header-section-title relative uppercase flex-center">
          <span className="title-icon">
            <i className="fas fa-comment-alt"></i>
          </span>
          <span className="title-text">{configSystem.lang.PROJECT_NAME}</span>
        </div>
        <div className="header-section-menu">
          <ul className="unstyled-list flex-start-center">
            <li>
              <NavLink to="/">Home</NavLink >
            </li>
            <li>
              <NavLink to="/contacts">Contacts</NavLink >
            </li>
            <li>
              <NavLink to="/messages">Messages</NavLink >
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

export default HeaderComponenet;