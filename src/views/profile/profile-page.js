import React, { Component } from 'react';
import services from '../../services/services';
import Contact from '../../models/class/contact-class';
import Loading from '../../components/loading/loading';
import configSystem from '../../models/system/config-system';
import dateUtils from '../../models/utils/date-utils';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,
      newMessageStatus: false,
      messageFormTitle: '',
      messageFormText: '',
      user: ''
    }

    // Create a binds
    this.handleNewMessageStatus = this.handleNewMessageStatus.bind(this)
    this.handleSubmitNewMessage = this.handleSubmitNewMessage.bind(this)
    this.handleNewMessageTitle = this.handleNewMessageTitle.bind(this)
    this.handleNewMessageText = this.handleNewMessageText.bind(this)
    this.handleDeleteMessage = this.handleDeleteMessage.bind(this)
  }

  clearNewMessageForm() {
    this.setState({
      messageFormTitle: '',
      messageFormText: ''
    });
  }

  /**
    * When called that function, remove one message from
    * messages list
  */

  handleDeleteMessage(id) {

    // Enable Loading
    this.setState({ loadingStatus: true })

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

      this.clearNewMessageForm();

    })
    .catch(err => {

      this.setState({ loadingStatus: false })
      console.error(err)
    })
  }

  /**
    * When called that function, state of new message won
    * new state based in old value
  */

  handleNewMessageStatus() {
    let actualState = this.state.newMessageStatus;
    this.setState({ newMessageStatus: !actualState })
  }

  /**
    * When called that function, new message is
    * submited and update contact profile
  */

  handleSubmitNewMessage(e) {
    e.preventDefault();

    // Enable Loading
    this.setState({ loadingStatus: true })

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
        loadingStatus: false,
        newMessageStatus: false,
      });

      this.clearNewMessageForm();
    })
    .catch(err => {
      console.error(err)
      this.setState({ loadingStatus: true })
    })
  }

  /**
    * When called that function, bind a text and
    * change state values
  */

  handleNewMessageTitle(e) {
    this.setState({
      messageFormTitle: e.target.value
    })
  }

  /**
    * When called that function, bind a text and
    * change state values
  */

  handleNewMessageText(e) {
    this.setState({
      messageFormText: e.target.value
    })
  }

  componentDidMount() {

    // Enable Loading
    this.setState({ loadingStatus: true })

    // Get contact info and messages
    services.getFullContact(this.props.match.params.id)
    .then(res => {
      this.setState({
        user: new Contact(res[0].data, res[1].data),
        loadingStatus: false
      });

      this.clearNewMessageForm();
    })
    .catch(err => {
      console.error(err)
      this.setState({ loadingStatus: false })
    })
  };

  render() {
    return (
      <div className="sections-content">
        {
          // Validate if loading is enabled
          this.state.loadingStatus === true &&
          <Loading></Loading>
        }

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
                // If have messages
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
              }

              {
                // If messages is empty
                this.state.user.messages.length <= 0 &&
                <div className="profile-messages-text">
                  {configSystem.lang.DONT_HAVE_MESSAGES}
                </div>
              }

              {
                // When new message form is enabled
                this.state.newMessageStatus === true &&
                <form
                  className="profile-messages-form"
                  onSubmit={this.handleSubmitNewMessage}>
                  <h4 className="flex-center">{configSystem.lang.NEW_MESSAGE}</h4>
                  <div className="messages-form-item messages-form-title flex-start-column">
                    <input
                    className="input-default"
                    type="text"
                    placeholder={configSystem.lang.TYPE_TITLE}
                    value={this.state.messageFormTitle}
                    onChange={this.handleNewMessageTitle}/>
                  </div>
                  <div className="messages-form-item messages-form-text flex-start-column">
                    <textarea
                    className="textarea-default"
                    placeholder={configSystem.lang.TYPE_MESSAGE}
                    value={this.state.messageFormText}
                    onChange={this.handleNewMessageText}>
                    </textarea>
                  </div>
                  <div className="messages-form-item messages-form-buttons">
                    <button
                      type="submit"
                      disabled={
                        !this.state.messageFormTitle.length || !this.state.messageFormText.length
                      }
                      className="btn btn-success">
                      <i className="fas fa-paper-plane"></i>
                      {configSystem.lang.SEND_MESSAGE}
                    </button>
                    <button
                      type="button"
                      onClick={this.handleNewMessageStatus}
                      className="btn">
                      {configSystem.lang.CANCEL}
                    </button>
                  </div>
                </form>
              }

              {
                // When new message form is disabled
                this.state.newMessageStatus === false &&
                <div className="profile-messages-new">
                  <button
                    type="button"
                    onClick={this.handleNewMessageStatus}
                    className="btn btn-primary">
                    {configSystem.lang.NEW_MESSAGE}
                  </button>
                </div>
              }
            </div>
          </div>
        }
      </div>
    )
  }
};

export default ProfilePage;
