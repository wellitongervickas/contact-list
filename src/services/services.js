import contacts from './contacts/contacts';

const services = (() => {

  function getContacts() {
    return contacts();
  };

  return {
    getContacts
  };
})();

export default services;
