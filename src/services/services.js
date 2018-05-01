import contacts from './contacts/contacts';

const services = (() => {

  function createContact(data) {
    return contacts.createContact(data);
  }

  function getContacts() {
    return contacts.getContacts();
  };

  function deleteContact(id) {
    return contacts.deleteContact(id)
  };

  function getContact(id) {
    return contacts.getContact(id);
  };

  function updateContact(id, data) {
    return contacts.updateContact(id, data);
  };

  function getFullContact(id) {
    return contacts.getFullContact(id);
  };

  function createMessage(parentId, data) {
    return contacts.createMessage(parentId, data);
  }

  function deleteMessage(parentId, id) {
    return contacts.deleteMessage(parentId, id);
  };

  return {
    createContact,
    getContacts,
    getContact,
    getFullContact,
    deleteContact,
    updateContact,
    deleteMessage,
    createMessage
  };
})();

export default services;
