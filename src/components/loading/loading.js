import React, { Component } from 'react';
import loadingImage from '../../assets/images/components/loading/loading.svg';
import configSystem from '../../models/system/config-system';
import { connect } from 'react-redux';

class Loading extends Component {
  render() {
    return (
      <div>
        {
          this.props.loadingStatus &&
          <div className="loading flex-center">
            <img src={loadingImage} alt={configSystem.lang.LOADING + this.props.loadingStatus}/>
          </div>
        }
      </div>
    )
  }
}
const mapStateToProps = state => ({ loadingStatus: state.loading });
export default connect(mapStateToProps)(Loading);
