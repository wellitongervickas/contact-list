import contacts from './contacts/contacts';

const services = (() => {

  function getContacts() {
    return contacts.getAll();
  };

  function deleteContact(id) {
    return contacts.delete(id)
  };

  function getContact(id) {
    return contacts.getById(id);
  };

  function updateContact(id, data) {
    return contacts.updateContact(id, data);
  }

  return {
    getContacts,
    getContact,
    deleteContact,
    updateContact
  };
})();

export default services;
