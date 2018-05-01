import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toastActions from '../../store/actions/toast';

class Toast extends Component {

  /**
    * When called this function a message of toast
    * has removed from redux state
  */

  handleRemoveToast = (id) => {
    this.props.removeToast(id);
  };

  handleAutoRemoveToast = () => {
    setInterval(() => {
      this.props.autoRemove()
    }, 500)
  };

  componentDidMount = () => {
    this.handleAutoRemoveToast()
  }

  render() {
    return (
      <div className="toasts-content">
        {
          this.props.toasts.length >= 1 &&
          <ul className="toasts-list unstyled-list flex-center-column">
            {this.props.toasts.map((item, index) => (
              <li
                className={`toasts-list-item toast-${item.toastType} relative`}
                key={item.id} data-time={ item.timetoleave }>
                <span className="toasts-item-title">{item.text}</span>
                <span onClick={ (e) => this.handleRemoveToast(item.id) } className="toasts-item-remove">x</span>
              </li>
            ))}
          </ul>
        }
      </div>
    )
  }
}

// Redux State Binds
const mapStateToProps = state => ({ toasts: state.toast });
const mapDispatchToProps = dispatch => bindActionCreators(toastActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
