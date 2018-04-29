import axios from 'axios';
import configSystem from '../../models/system/config-system';

const contacts = (() => {
  function getAll() {
    return axios.get(configSystem.endpoint.contacts);
  };

  function deleteById(id) {
    return axios.delete(`${configSystem.endpoint.contacts}/${id}`);
  };

  function getById(id) {
    return axios.get(`${configSystem.endpoint.contacts}/${id}`);
  };

  function updateContact(id, data) {
    return axios.put(`${configSystem.endpoint.contacts}/${id}`, {
      headers: {
        'Content-type': 'application/json'
      },
      data
    });
  };

  return {
    getAll,
    getById,
    updateContact,
    delete: deleteById
  };
})();

export default contacts;
