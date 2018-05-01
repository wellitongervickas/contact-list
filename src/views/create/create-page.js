import React, { Component } from 'react';

// Helpers and libs
import services from '../../services/services';
import configSystem from '../../models/system/config-system';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toastActions from '../../store/actions/toast';
import * as loadingActions from '../../store/actions/loading';

class CreatePage extends Component {

  state = {
    inputName: '',
    inputAlias: '',
    inputPhone: '',
    inputEmail: ''
  }

  // Only clear form
  clearToNewContact = () => {
    this.setState({
      inputName: '',
      inputAlias: '',
      inputPhone: '',
      inputEmail: ''
    });
  };

  handleSubmitNewContact(e) {
    e.preventDefault();

    // Enable Loading
    this.props.toggleLoading(true);

    services.createContact({
      name: this.state.inputName,
      email: this.state.inputEmail,
      phone: this.state.inputPhone,
      alias: this.state.inputAlias
    })
    .then(res => {

      console.log('res: ', res);
      this.clearToNewContact();

      // Disable loading
      this.props.toggleLoading(false);

      // Create a toast
      this.props.addToast(configSystem.lang.NEW_CONTACT_SUCCESS, 'success');
    })
    .catch(err => {

      console.error('err: ', err);
      this.clearToNewContact();

      // Create a toast
      this.props.addToast(configSystem.lang.NEW_CONTACT_FAIL, 'warning');

      // Disable loading
      this.props.toggleLoading(false);
    })
  }

  render() {
    return (
      <div className="sections-content section-create">
        <div className="section-create-header">
          <h2>Create New Contact</h2>
        </div>
        <div className="section-create-form">
          <form className="create-form" onSubmit={ (e) => this.handleSubmitNewContact(e)}>
            <div className="create-form-item flex-start-column">
              <label htmlFor="input-name">Name</label>
              <input
              className="input-default"
              id="input-name"
              type="text"
              value={this.state.inputName}
              onChange={ (e) => this.setState({inputName: e.target.value}) }/>
            </div>
            <div className="create-form-item flex-start-column">
              <label htmlFor="input-alias">Alias</label>
              <input
              className="input-default"
              id="input-alias"
              type="text"
              value={this.state.inputAlias}
              onChange={ (e) => this.setState({inputAlias: e.target.value}) }/>
            </div>
            <div className="create-form-item flex-start-column">
              <label htmlFor="input-phone">Phone</label>
              <input
              className="input-default"
              id="input-phone"
              type="text"
              value={this.state.inputPhone}
              onChange={ (e) => this.setState({inputPhone: e.target.value}) }/>
            </div>
            <div className="create-form-item flex-start-column">
              <label htmlFor="input-email">Email</label>
              <input
              className="input-default"
              id="input-email"
              type="text"
              value={this.state.inputEmail}
              onChange={ (e) => this.setState({inputEmail: e.target.value}) }/>
            </div>
            <div>
              <button className="btn btn-primary use-icon">
                <i className="fas fa-external-link-alt"></i>
                Create Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

// Redux State Binds
const mapDispatchToProps = ((dispatch) => {
  return bindActionCreators(Object.assign({}, toastActions, loadingActions), dispatch)
});


export default connect(null, mapDispatchToProps)(CreatePage);
