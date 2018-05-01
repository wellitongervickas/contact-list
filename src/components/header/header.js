import React from 'react';
import { NavLink  } from "react-router-dom";
import configSystem from '../../models/system/config-system';

const Header = () => {
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
    </div>
  );
}

export default Header;
