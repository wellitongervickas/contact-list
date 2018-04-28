import contacts from './contacts/contacts';

const services = (() => {

  function getContacts() {
    return contacts.get();
  };

  function deleteContact(id) {
    return contacts.delete(id)
  };

  return {
    getContacts,
    deleteContact
  };
})();

export default services;
