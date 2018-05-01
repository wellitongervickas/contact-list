import { combineReducers } from 'redux';
import toast from './reducers/toast';
import loading from './reducers/loading';

export default combineReducers({
  loading,
  toast
});
