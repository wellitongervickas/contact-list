import React from 'react';
import { connect } from 'react-redux';

const Toast = (props) => (
  <div className="toasts-content">
    <ul>
      {props.toasts.map((item, index) => (
        <li key={item.id} data-time={ item.timetoleave }> {item.text} </li>
      ))}
    </ul>
  </div>
);

// Redux State Binds
const mapStateToProps = state => ({ toasts: state.toast });

export default connect(mapStateToProps)(Toast);
