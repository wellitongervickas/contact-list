import React, { Component } from 'react';
import ContactListComponent from '../../components/contacts-list/contact-list-component';

class HomePage extends Component {
  render() {
    return (
      <div className="sections-content home-page">
        <ContactListComponent></ContactListComponent>
      </div>
    );
  }
};

export default HomePage;
