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

class EditMessagePage extends Component {

  // Default States
  state = {
    inputTitle: '',
    inputText: '',
  };

  /**
    * This function listener all fields to validate
    * all values before submit update contact
  */

 validateForm = () => {
    let title = validateForm.isEmpty(this.state.inputTitle);
    let text = validateForm.isEmpty(this.state.inputText);

    if (title && text) {
      return false;
    } else {
      return true;
    }
  };

  /**
    * This function submit new update message
    * and update in API
    *
  */

  handleUpdateMessage = (e) => {
    e.preventDefault();

    // Enable Loading
    this.props.toggleLoading(true);

    services.updateMessage(this.props.match.params.parentId, this.props.match.params.id, {
      title: this.state.inputTitle,
      text: this.state.inputText
    })
    .then(res => {

      // Disable loading
      this.props.toggleLoading(false);

      // Create a toast
      this.props.addToast(configSystem.lang.MESSAGE_UPDATE_SUCCESS, 'success');
    })
    .catch(err => {

      console.error('err: ', err);

      // Create a toast
      this.props.addToast(configSystem.lang.MESSAGE_UPDATE_FAIL, 'warning');

      // Disable loading
      this.props.toggleLoading(false);
    });
  };

  componentDidMount = () => {

    // Enable Loading
    this.props.toggleLoading(true);

    services.getMessageById(this.props.match.params.parentId, this.props.match.params.id)
    .then(res => {

      this.setState({
        inputTitle: res.data.title,
        inputText: res.data.text
      });

      // Disable loading
      this.props.toggleLoading(false);
    })
    .catch(err => {

      console.error('err: ', err);

      // Create a toast
      this.props.addToast(configSystem.lang.CANNOT_GET_MESSAGE, 'warning');

      // Disable loading
      this.props.toggleLoading(false);
    });
  };

  render() {
    return (
      <div className="sections-content section-message">
        <div className="section-message-header">
          <h2>{configSystem.lang.UPDATE_MESSAGE}</h2>
        </div>
        <div className="section-message-form">
          <form onSubmit={ (e) => this.handleUpdateMessage(e) }>
            <div className="message-form-item flex-start-column">
              <label htmlFor="input-name">{configSystem.lang.TITLE}</label>
              <input
              className="input-default"
              id="input-title"
              type="text"
              maxLength="50"
              value={this.state.inputTitle}
              onChange={ (e) => this.setState({inputTitle: e.target.value}) }/>
            </div>
            <div className="message-form-item flex-start-column">
              <label htmlFor="input-message">{configSystem.lang.MESSAGE}</label>
              <textarea
              id="input-message"
              className="textarea-default"
              value={this.state.inputText}
              onChange={ (e) => this.setState({ inputText: e.target.value })}>
              </textarea>
            </div>
            <div className="message-form-btn">
              <button
                disabled={this.validateForm()}
                type="submit"
                className="btn btn-primary use-icon">
                <i className="fas fa-external-link-alt"></i>
                {configSystem.lang.UPDATE_MESSAGE}
              </button>
              <button
                type="button"
                onClick={ (e) => this.props.history.goBack() }
                className="btn btn-default">
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


export default connect(null, mapDispatchToProps)(EditMessagePage);
