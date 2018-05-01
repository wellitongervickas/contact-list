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

class EditPage extends Component {

  state = {
    inputName: '',
    inputAlias: '',
    inputPhone: '',
    inputEmail: ''
  };

  /**
    * This function listener all fields to validate
    * all values before submit update contact
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
  };

  /**
    * This function submit new update to contact
    * and update in API
    *
  */

  handleSubmitUpdate(e) {
    e.preventDefault();

    // Enable Loading
    this.props.toggleLoading(true);

    services.updateContact(this.props.match.params.id, {
      name: this.state.inputName,
      email: this.state.inputEmail,
      phone: this.state.inputPhone,
      alias: this.state.inputAlias
    })
    .then(res => {

      // Disable loading
      this.props.toggleLoading(false);

      // Create a toast
      this.props.addToast(configSystem.lang.UPDATE_CONTACT_SUCCESS, 'success');
    })
    .catch(err => {

      console.error('err: ', err);
      this.clearToNewContact();

      // Create a toast
      this.props.addToast(configSystem.lang.UPDATE_CONTACT_FAIL, 'warning');

      // Disable loading
      this.props.toggleLoading(false);
    })
  };

  componentDidMount = () => {

    // Enable Loading
    this.props.toggleLoading(true);

    services.getContact(this.props.match.params.id)
    .then(res => {

      this.setState({
        inputName: res.data.name,
        inputAlias: res.data.alias,
        inputPhone: res.data.phone,
        inputEmail: res.data.email,
      });

      // Disable loading
      this.props.toggleLoading(false);
    })
    .catch(err => {
      console.error('err: ', err);

      // Create a toast
      this.props.addToast(configSystem.lang.CANNOT_GET_CONTACT, 'success');

      // Disable loading
      this.props.toggleLoading(false);
    })
  };

  render() {
    return (
      <div className="sections-content section-edit">
        <div className="section-edit-header">
          <h2>{configSystem.lang.UPDATE_CONTACT}</h2>
        </div>
        <div className="section-edit-form">
          <form className="edit-form" onSubmit={ (e) => this.handleSubmitUpdate(e)}>
            <div className="edit-form-inputs">
              <div className="edit-form-item flex-start-column">
                <label htmlFor="input-name">{configSystem.lang.NAME}</label>
                <input
                className="input-default"
                id="input-name"
                type="text"
                maxLength="20"
                value={this.state.inputName}
                onChange={ (e) => this.setState({inputName: e.target.value}) }/>
              </div>
              <div className="edit-form-item flex-start-column">
                <label htmlFor="input-alias">{configSystem.lang.ALIAS}</label>
                <input
                className="input-default"
                id="input-alias"
                type="text"
                maxLength="20"
                value={this.state.inputAlias}
                onChange={ (e) => this.setState({inputAlias: e.target.value}) }/>
              </div>
              <div className="edit-form-item flex-start-column">
                <label htmlFor="input-phone">{configSystem.lang.PHONE}</label>
                <input
                className="input-default"
                id="input-phone"
                type="text"
                maxLength="15"
                value={this.state.inputPhone}
                onChange={ (e) => this.setState({inputPhone: e.target.value}) }/>
              </div>
              <div className="edit-form-item flex-start-column">
                <label htmlFor="input-email">{configSystem.lang.EMAIL}</label>
                <input
                className="input-default"
                id="input-email"
                type="text"
                maxLength="100"
                value={this.state.inputEmail}
                onChange={ (e) => this.setState({inputEmail: e.target.value}) }/>
              </div>
            </div>
            <div className="edit-form-btn">
              <button
                type="submit"
                disabled={this.validateForm()}
                className="btn btn-primary use-icon">
                <i className="fas fa-external-link-alt"></i>
                {configSystem.lang.UPDATE_CONTACT}
              </button>
              <button
                type="button"
                onClick={ (e) => this.props.history.goBack() }
                className="btn btn-default use-icon">
                {configSystem.lang.GO_BACK}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

// Redux State Binds
const mapDispatchToProps = ((dispatch) => {
  return bindActionCreators(Object.assign({}, toastActions, loadingActions), dispatch)
});


export default connect(null, mapDispatchToProps)(EditPage);
