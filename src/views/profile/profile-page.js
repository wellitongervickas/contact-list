// React and third party
import React, { Component } from 'react';

// Helpers and libs
import services from '../../services/services';
import Contact from '../../models/class/contact-class';
import configSystem from '../../models/system/config-system';
import dateUtils from '../../models/utils/date-utils';


// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toastActions from '../../store/actions/toast';
import * as loadingActions from '../../store/actions/loading';

class ProfilePage extends Component {

  // Default States
  state = {
    newMessageStatus: false,
    messageFormTitle: '',
    messageFormText: '',
    user: ''
  }

  // Only clear form
  clearNewMessageForm = () => {
    this.setState({
      messageFormTitle: '',
      messageFormText: ''
    });
  };

  /**
    * When called that function remove one message from
    * messages list and update user again
  */

  handleDeleteMessage = (id) => {

    // Enable Loading
    this.props.toggleLoading(true);

    services.deleteMessage(this.props.match.params.id, id)
    .then(res => {

      // Sanitize messages
      let user = this.state.user;
      user.messages = user.messages.filter(item => item.id !== id);

      // Update Status
      this.setState({
        user,
        loadingStatus: false
      });

      // Create a toast
      this.props.addToast(configSystem.lang.MESSAGE_REMOVED_SUCCESS, 'success');

      this.clearNewMessageForm();

      // Disable loading
      this.props.toggleLoading(false);

    })
    .catch(err => {

      console.error('err: ', err);

      // Create a toast
      this.props.addToast(configSystem.lang.MESSAGE_REMOVED_FAIL, 'warning');

      // Disable loading
      this.props.toggleLoading(false);
    })
  };

  /**
    * When called this function new message is
    * submited and update contact profile
  */

  handleSubmitNewMessage = (e) => {
    e.preventDefault();

    // Enable Loading
    this.props.toggleLoading(true);

    // Create message object
    let newMessage = {
      title: this.state.messageFormTitle,
      date: new Date().getTime(),
      text: this.state.messageFormText
    };

    services.createMessage(this.props.match.params.id, newMessage)
    .then(res => {

      // Insert and update messages list
      let user = this.state.user;
      user.messages.push(res.data);

      this.setState({
        user,
        newMessageStatus: false,
      });

      // Create a toast
      this.props.addToast(configSystem.lang.NEW_MESSAGE_SUCCESS, 'success');

      this.clearNewMessageForm();

      // Disable loading
      this.props.toggleLoading(false);
    })
    .catch(err => {

      console.error('err: ', err);

      // Create a toast
      this.props.addToast(configSystem.lang.NEW_MESSAGE_FAIL, 'warning');

      // Disable loading
      this.props.toggleLoading(false);
    })
  };

  componentDidMount = () => {

    // Enable Loading
    this.props.toggleLoading(true);

    // Get contact info and messages
    services.getFullContact(this.props.match.params.id)
    .then(res => {

      this.setState({ user: new Contact(res[0].data, res[1].data) });
      this.clearNewMessageForm();

      // Disable loading
      this.props.toggleLoading(false);
    })
    .catch(err => {

      console.error('err: ', err);

      // Disable loading
      this.props.toggleLoading(false);
    })
  };

  render() {
    return (
      <div className="sections-content">

        {
          // Validate if got a user id
          this.state.user.id &&
          <div className="section-profile">
            <div className="profile-intro">
              <div className="profile-intro-item">
                <h3>{configSystem.lang.NAME}</h3>
                {this.state.user.name}
              </div>
              <div className="profile-intro-item">
                <h3>{configSystem.lang.ALIAS}</h3>
                {this.state.user.alias}
              </div>
              <div className="profile-intro-item">
                <h3>{configSystem.lang.EMAIL}</h3>
                {this.state.user.email}
              </div>
              <div className="profile-intro-item">
                <h3>{configSystem.lang.PHONE}</h3>
                {this.state.user.phone}
              </div>
            </div>

            <div className="profile-messages">

              {
                this.state.user.messages.length <= 0 ? (

                  <div className="profile-messages-text">
                    {configSystem.lang.DONT_HAVE_MESSAGES}
                  </div>

                ) : (

                  this.state.user.messages.length >= 0 &&
                  this.state.user.messages.map((item, index) => (
                    <div className="profile-messages-body" key={index}>
                      <div className="messages-body-item messages-body-title relative">
                        <h4>{configSystem.lang.TITLE}</h4>
                        {item.title}
                        <i
                          className="fas fa-trash pointer"
                          onClick={(e) => this.handleDeleteMessage(item.id)}>
                        </i>
                      </div>
                      <div className="messages-body-item messages-body-date">
                        <h4>{configSystem.lang.DATE}</h4>
                        {dateUtils.dateParse(item.date)}
                      </div>
                      <div className="messages-body-item messages-body-text">
                        <h4>{configSystem.lang.MESSAGE}</h4>
                        {item.text}
                      </div>
                    </div>
                  ))
                )
              }

              {
                this.state.newMessageStatus === true ? (
                  <form
                    className="profile-messages-form"
                    onSubmit={ (e) => this.handleSubmitNewMessage(e) }>
                    <h4 className="flex-center">{configSystem.lang.NEW_MESSAGE}</h4>
                    <div className="messages-form-item messages-form-title flex-start-column">
                      <input
                      className="input-default"
                      type="text"
                      placeholder={configSystem.lang.TYPE_TITLE}
                      value={this.state.messageFormTitle}
                      onChange={ (e) => this.setState({ messageFormTitle: e.target.value })}/>
                    </div>
                    <div className="messages-form-item messages-form-text flex-start-column">
                      <textarea
                      className="textarea-default"
                      placeholder={configSystem.lang.TYPE_MESSAGE}
                      value={this.state.messageFormText}
                      onChange={ (e) => this.setState({ messageFormText: e.target.value })}>
                      </textarea>
                    </div>
                    <div className="messages-form-item messages-form-buttons">
                      <button
                        type="submit"
                        disabled={
                          !this.state.messageFormTitle.length || !this.state.messageFormText.length
                        }
                        className="btn btn-success use-icon">
                        <i className="fas fa-paper-plane"></i>
                        {configSystem.lang.SEND_MESSAGE}
                      </button>
                      <button
                        type="button"
                        onClick={ (e) => this.setState({ newMessageStatus: false }) }
                        className="btn">
                        {configSystem.lang.CANCEL}
                      </button>
                    </div>
                  </form>

                ) : (

                  <div className="profile-messages-new">
                    <button
                      type="button"
                      onClick={ (e) => this.setState({ newMessageStatus: true }) }
                      className="btn btn-primary use-icon">
                      <i className="fas fa-comment-alt"></i>
                      {configSystem.lang.NEW_MESSAGE}
                    </button>
                  </div>
                )
              }
            </div>
          </div>
        }
      </div>
    )
  }
};

// Redux State Binds
const mapDispatchToProps = ((dispatch) => {
  return bindActionCreators(Object.assign({}, toastActions, loadingActions), dispatch)
});


export default connect(null, mapDispatchToProps)(ProfilePage);
