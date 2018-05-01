// React and third party
import React, { Component } from 'react';
import { NavLink  } from "react-router-dom";

// Helpers and libs
import Contact from '../../models/class/contact-class';
import services from '../../services/services';
import configSystem from '../../models/system/config-system';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toastActions from '../../store/actions/toast';
import * as loadingActions from '../../store/actions/loading';

class HomePage extends Component {

  // Default States
  state = {
    contacts: []
  };

  /**
    * When called that function a contact is removed
    * from the list and update in service API
  */

  handleDeleteContact = (id) => {

    // Enable Loading
    this.props.toggleLoading(true);

    services.deleteContact(id)
    .then(res => {

      // Update Contact List
      this.setState({ contacts: this.state.contacts.filter(item => item.id !== id) });

      // Create a toast
      this.props.addToast(configSystem.lang.CONTACT_REMOVED_SUCCESS, 'success');

      // Disable loading
      this.props.toggleLoading(false);
    })
    .catch(err => {

      console.error('err: ', err);

      // Create a toast
      this.props.addToast(configSystem.lang.CONTACT_REMOVED_FAIL, 'warning');

      // Disable loading
      this.props.toggleLoading(false);
    })
  };

  componentDidMount = () => {

    // Enable Loading
    this.props.toggleLoading(true);

    services.getContacts()
    .then(res => {

      this.setState({ contacts: res.data.map(item => new Contact(item)) });

      // Disable loading
      this.props.toggleLoading(false);
    })
    .catch(err => {

      console.error('err: ', err);

      // Create a toast
      this.props.addToast(configSystem.lang.CONNECTION_ERROR, 'danger');

      // Disable loading
      this.props.toggleLoading(false);
    });
  };

  render() {
    return (
      <div className="sections-content section-home">
        <div className="contact-list">
          <div className="list-header flex-between-center">
            <h2>{configSystem.lang.ALL_CONTACTS}</h2>
            <NavLink to="/create" className="btn btn-primary btn-sm">
              {configSystem.lang.NEW_CONTACT}
            </NavLink >
          </div>

          {
            this.state.contacts.length <= 0 ? (

              <div className="list-table-body--empty">
                <i className="far fa-frown"></i><br/>
                {configSystem.lang.DONT_HAVE_CONTACTS}
              </div>

            ) : (

              this.state.contacts.map((item, index) => (
                <div className="list-table-body" key={item.id}>
                  <div className="list-table-body-item pointer">
                    <NavLink to={`/profile/${item.id}`}>
                      {item.name}
                    </NavLink >
                  </div>
                  <div className="list-table-body-item">{item.email}</div>
                  <div className="list-table-body-item">{item.phone}</div>
                  <div className="list-table-body-item list-actions flex-end">
                    <i className="fas fa-edit pointer"></i>
                    <i
                      className="fas fa-trash pointer"
                      onClick={(e) => this.handleDeleteContact(item.id)}>
                    </i>
                  </div>
                </div>
              ))
            )
          }
        </div>
      </div>
    );
  }
};

// Redux State Binds
const mapDispatchToProps = ((dispatch) => {
  return bindActionCreators(Object.assign({}, toastActions, loadingActions), dispatch)
});

export default connect(null, mapDispatchToProps)(HomePage);
