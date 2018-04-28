import homePage from '../../views/home/home-page';
import MessagesPage from '../../views/messages/messages-page';

const routes = [
  {
    path: "/",
    exact: true,
    main: homePage
  },
  {
    path: "/messages",
    main: MessagesPage
  }
];

export default routes;
