import homePage from '../../views/home/home-page';
import MessagesPage from '../../views/messages/messages-page';
import ContactsPage from '../../views/contacts/contacts-page';

const routes = [
  {
    path: "/",
    exact: true,
    main: homePage
  },
  {
    path: "/messages",
    main: MessagesPage
  },
  {
    path: "/contacts",
    main: ContactsPage
  }
];

export default routes;