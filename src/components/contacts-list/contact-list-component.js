import React, { Component } from 'react';
import Contact from '../../models/class/contact-class';
import services from '../../services/services';

class ContactListComponent extends Component {
  constructor() {
    super();
    this.state = {
      contacts: []
    }
  };

  componentDidMount() {
    services.getContacts()
    .then(res => this.setState({
      contacts: res.data.map(item => new Contact(item))
    }))
    .catch(err => console.error(err))
  };

  render() {
    return (
      <div className="contact-list">
        {this.state.contacts.map((item, index) => (
          <div className="list-table-body flex-between-center " key={item.id}>
            <div className="list-table-body-item pointer">{item.name}</div>
            <div className="list-table-body-item list-actions flex-between-center">
              <i className="fas fa-edit pointer"></i>
              <i className="fas fa-trash pointer"></i>
            </div>
          </div>
        ))}
      </div>
    );
  };
};

export default ContactListComponent;
