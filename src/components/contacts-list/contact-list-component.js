import React, { Component } from 'react';
import { NavLink  } from "react-router-dom";
import Contact from '../../models/class/contact-class';
import services from '../../services/services';
import configSystem from '../../models/system/config-system';
import Loading from '../loading/loading';

class ContactListComponent extends Component {
  constructor() {
    super();
    this.state = {
      loadingStatus: false,
      contacts: []
    }
  };

  handleGetAllContacts() {

    this.setState({ loadingStatus: true })

    services.getContacts()
    .then(res => this.setState({
      contacts: res.data.map(item => new Contact(item)),
      loadingStatus: false
    }))
    .catch(err => console.error(err));
  };

  handleDeleteContact(id) {
    services.deleteContact(id)
    .then(res => {
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
          <h2>{configSystem.lang.ALL_CONTACTS}</h2>
          <NavLink to="/" className="btn btn-primary btn-sm">
            {configSystem.lang.NEW_CONTACT}
          </NavLink >
        </div>

        {
          this.state.loadingStatus === true &&
          <Loading></Loading>
        }

        {this.state.contacts.map((item, index) => (
          <div className="list-table-body" key={item.id}>
            <div className="list-table-body-item pointer">{item.name}</div>
            <div className="list-table-body-item">{item.email}</div>
            <div className="list-table-body-item">{item.phone}</div>
            <div className="list-table-body-item list-messages">
              <i className="fas fa-envelope pointer"></i>
              {item.messages.length}
            </div>
            <div className="list-table-body-item list-actions flex-end">
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
