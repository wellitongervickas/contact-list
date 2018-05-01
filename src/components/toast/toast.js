import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toastActions from '../../store/actions/toast';

class Toast extends Component {

  constructor(props) {
    super(props)

    console.log(props)
  }

  // Default State
  state = {
    toastText: ''
  }

  /**
    * When called this function  add new toast
    * to list and after 5 seconds hide oldest
    * item from the list
    *
  */

  addNewToast = () => {

    this.props.addToast(this.state.toastText);
    this.setState({ toastText: '' });
  };

  render() {
    return (
      <div>
        <ul>
          {this.props.toasts.map((item, index) => (
            <li key={item.id}> {item.text} </li>
          ))}
        </ul>
        <input
        value={ this.state.toastText }
        onChange={ (e) => this.setState({ toastText: e.target.value }) }
        type="text"/>
        <button onClick={ this.addNewToast }>Add Toast</button>
      </div>
    )
  };
};

// Redux
const mapDispatchToProps = dispatch => bindActionCreators(toastActions, dispatch);
const mapStateToProps = state => ({ toasts: state.toast });

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
