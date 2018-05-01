import React, { Component } from 'react';

// Helpers and libs
import services from '../../services/services';
import configSystem from '../../models/system/config-system';
import validateForm from '../../models/utils/validate-form';

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
    inputEmail: '',
    formErros: []
  }

  // Only clear form
  clearToNewContact = () => {
    this.setState({
      inputName: '',
      inputAlias: '',
      inputPhone: '',
      inputEmail: '',
      formErros: []
    });
  };

  /**
    * This function listener all fields to validate
    * all values before submit new contact
  */

  validateForm = () => {

    let name = validateForm.isEmpty(this.state.inputName);
    let alias = validateForm.isEmpty(this.state.inputAlias);
    let phone = validateForm.isEmpty(this.state.inputPhone);
    let email = validateForm.isEmpty(this.state.inputEmail);
    let validEmail = validateForm.isValidEmail(this.state.inputEmail);

    if (name && alias && phone && email && validEmail) {
      return false;
    } else {
      return true;
    }
  }

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
          <h2>{configSystem.lang.CREATE_NEW_CONTACT}</h2>
        </div>
        <div className="section-create-form">
          <form className="create-form" onSubmit={ (e) => this.handleSubmitNewContact(e)}>
            <div className="create-form-item flex-start-column">
              <label htmlFor="input-name">{configSystem.lang.NAME}</label>
              <input
              className="input-default"
              id="input-name"
              type="text"
              maxLength="20"
              value={this.state.inputName}
              onChange={ (e) => this.setState({inputName: e.target.value}) }/>
            </div>
            <div className="create-form-item flex-start-column">
              <label htmlFor="input-alias">{configSystem.lang.ALIAS}</label>
              <input
              className="input-default"
              id="input-alias"
              type="text"
              maxLength="20"
              value={this.state.inputAlias}
              onChange={ (e) => this.setState({inputAlias: e.target.value}) }/>
            </div>
            <div className="create-form-item flex-start-column">
              <label htmlFor="input-phone">{configSystem.lang.PHONE}</label>
              <input
              className="input-default"
              id="input-phone"
              type="text"
              maxLength="15"
              value={this.state.inputPhone}
              onChange={ (e) => this.setState({inputPhone: e.target.value}) }/>
            </div>
            <div className="create-form-item flex-start-column">
              <label htmlFor="input-email">{configSystem.lang.EMAIL}</label>
              <input
              className="input-default"
              id="input-email"
              type="text"
              maxLength="100"
              value={this.state.inputEmail}
              onChange={ (e) => this.setState({inputEmail: e.target.value}) }/>
            </div>
            <div className="create-form-btn">
              <button
                disabled={this.validateForm()}
                className="btn btn-primary use-icon">
                <i className="fas fa-external-link-alt"></i>
                {configSystem.lang.CREATE_CONTACT}
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
