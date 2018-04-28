import React, { Component } from 'react';
import loadingImage from '../../assets/images/components/loading/loading.svg';
import configSystem from '../../models/system/config-system';

class Loading  extends Component {
  render() {
    return (
      <div className="loading flex-center">
        <img src={loadingImage} alt={configSystem.lang.LOADING}/>
      </div>
    )
  }
};

export default Loading;
