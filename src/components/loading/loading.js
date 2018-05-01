import React from 'react';
import loadingImage from '../../assets/images/components/loading/loading.svg';
import configSystem from '../../models/system/config-system';

const Loading = () => {
  return (
    <div className="loading flex-center">
      <img src={loadingImage} alt={configSystem.lang.LOADING}/>
    </div>
  )
}

export default Loading;
