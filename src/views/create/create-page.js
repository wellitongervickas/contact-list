import React, { Component } from 'react';

class CreatePage extends Component {
  constructor() {
    super();
    this.state = {
      contact: {}
    }
  }

  render() {
    return (
      <div className="sections-content">Hello from create!</div>
    )
  }
}

export default CreatePage;
