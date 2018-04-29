import React, { Component } from 'react';
import ContactList from '../../components/contacts-list/contact-list';

class HomePage extends Component {
  render() {
    return (
      <div className="sections-content home-page">
        <ContactList></ContactList>
      </div>
    );
  }
};

export default HomePage;
