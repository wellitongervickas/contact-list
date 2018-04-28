import React, { Component } from 'react';
import { NavLink  } from "react-router-dom";
import Contact from '../../models/class/contact-class';
import services from '../../services/services';

class ContactListComponent extends Component {
  constructor() {
    super();
    this.state = {
      contacts: []
    }
  };

  handleGetAllContacts() {
    services.getContacts()
    .then(res => this.setState({
      contacts: res.data.map(item => new Contact(item))
    }))
    .catch(err => console.error(err));
  };

  handleDeleteContact(id) {
    services.deleteContact(id)
    .then(res => {
      console.log(res)
      this.handleGetAllContacts();
    })
    .catch(err => console.error(err))
  };

  componentDidMount() {
    this.handleGetAllContacts();
  };

  render() {
    return (
      <div className="contact-list">
        <div className="contact-list-header flex-between-center">
          <h2>All Contacts</h2>
          <NavLink to="/" className="btn btn-primary btn-sm">
            Novo contato
          </NavLink >
        </div>
        {this.state.contacts.map((item, index) => (
          <div className="list-table-body flex-between-center" key={item.id}>
            <div className="list-table-body-item">{item.name}</div>
            <div className="list-table-body-item">{item.email}</div>
            <div className="list-table-body-item">{item.phone}</div>
            <div className="list-table-body-item list-actions flex-between-center">
              <i className="fas fa-edit pointer"></i>
              <i
                className="fas fa-trash pointer"
                onClick={(e) => this.handleDeleteContact(item.id)}>
              </i>
            </div>
          </div>
        ))}
      </div>
    );
  };
};

export default ContactListComponent;
