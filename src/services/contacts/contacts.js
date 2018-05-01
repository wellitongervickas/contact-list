import axios from 'axios';
import configSystem from '../../models/system/config-system';

const contacts = (() => {

  function createContact(data) {
    return axios.post(`${configSystem.endpoint.contacts}`, data);
  }

  function getContacts() {
    return axios.get(configSystem.endpoint.contacts);
  };

  function deleteContact(id) {
    return axios.delete(`${configSystem.endpoint.contacts}/${id}`);
  };

  function getContact(id) {
    return axios.get(`${configSystem.endpoint.contacts}/${id}`);
  };

  function getFullContact(id) {
    return axios.all([ getContact(id), getMessages(id) ])
  };

  function updateContact(id, data) {
    return axios.put(`${configSystem.endpoint.contacts}/${id}`, data);
  };

  function getMessages(parentId) {
    return axios.get(`${configSystem.endpoint.contacts}/${parentId}/messages`)
  };

  function getMessageById(parentId, id) {
    return axios.get(`${configSystem.endpoint.contacts}/${parentId}/messages/${id}`)
  };

  function createMessage(parentId, data) {
    return axios.post(`${configSystem.endpoint.contacts}/${parentId}/messages`, data)
  }

  function deleteMessage(parentId, id) {
    return axios.delete(`${configSystem.endpoint.contacts}/${parentId}/messages/${id}`)
  };

  function updateMessage(parentId, id, data) {
    return axios.put(`${configSystem.endpoint.contacts}/${parentId}/messages/${id}`, data)
  };

  return {
    createContact,
    getContacts,
    getContact,
    getFullContact,
    updateContact,
    deleteContact,
    createMessage,
    getMessageById,
    deleteMessage,
    updateMessage
  };
})();

export default contacts;
