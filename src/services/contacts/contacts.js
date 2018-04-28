import axios from 'axios';
import configSystem from '../../models/system/config-system';

export default function() {
  return axios.get(configSystem.endpoint.contacts);
}
