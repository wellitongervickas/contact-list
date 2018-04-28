import React, { Component } from 'react';
import services from '../../services/services';

class ContactListComponent extends Component {
  constructor() {
    super();
    this.state = {
      contacts: []
    }
  }

  componentDidMount() {
    services.getContacts()
    .then(res => this.setState({contacts: res.data}))
    .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <ul className="unstyled-list">
          {this.state.contacts.map((item, index) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
};

export default ContactListComponent;
