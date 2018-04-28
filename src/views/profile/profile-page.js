import React, { Component } from 'react';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ''
    }
  }

  componentDidMount() {
    console.log('oi...')
    console.log(this.props.match.params.id)
  };

  render() {
    let user = this.props.match.params.id;

    return (
      <div className="sections-content"> Hello from profile {user}</div>
    )
  }
};

export default ProfilePage;
