import React, { Component } from 'react';
import services from '../../services/services';
import Contact from '../../models/class/contact-class';
import Loading from '../../components/loading/loading';
import configSystem from '../../models/system/config-system';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,
      user: ''
    }
  }

  componentDidMount() {

    // Enable Loading
    this.setState({ loadingStatus: true })

    services.getContact(this.props.match.params.id)
    .then(res => this.setState({
      user: new Contact(res.data),
      loadingStatus: false
    }))
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
          <div className="section-profile" key={this.state.user.id}>
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
                this.state.user.messages.length >= 0 &&
                this.state.user.messages.map((item, index) => (
                  <div className="profile-messages-text" key={index}>
                    {item.title}, {item.date}, {item.text}
                  </div>
                ))
              }

              {
                this.state.user.messages.length <= 0 &&
                <div className="profile-messages-text">{configSystem.lang.DONT_HAVE_MESSAGES}</div>
              }

              <div className="profile-messages-new">
                <button type="button" className="btn btn-primary">
                 <i className="fas fa-paper-plane"></i>
                  New Message
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
};

export default ProfilePage;
