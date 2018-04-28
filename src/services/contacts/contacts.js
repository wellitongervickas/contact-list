import axios from 'axios';
import configSystem from '../../models/system/config-system';

const contacts = (() => {
  function getAll() {
    return axios.get(configSystem.endpoint.contacts);
  };

  function deleteById(id) {
    return axios.delete(`${configSystem.endpoint.contacts}/${id}`);
  };

  return {
    get: getAll,
    delete: deleteById
  }
})();

export default contacts;
