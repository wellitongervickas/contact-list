export default class Contact {
	constructor(contact, messages) {
    this.id = contact.id;
    this.name = contact.name;
    this.email = contact.email;
    this.phone = contact.phone
    this.alias = contact.alias
    this.messages = messages;
  }
};
