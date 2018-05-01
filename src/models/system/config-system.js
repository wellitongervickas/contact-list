import lang from '../../languages/en-GB.json';

const configSystem = {
    lang,
    base: (process.env.NODE_ENV === 'production') ? '/contact-list/build/' : '/',
    endpoint: {
      contacts: 'http://5ae3b92d34b5970014d2ee37.mockapi.io/contacts'
    }
};

export default configSystem;
