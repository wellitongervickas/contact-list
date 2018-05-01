// Home Page
import HomePage from '../../views/home/home-page';
import ProfilePage from '../../views/profile/profile-page';
import EditPage from '../../views/edit/edit-page';
import EditMessagePage from '../../views/edit/edit-message-page';
import CreatePage from '../../views/create/create-page';

const routes = [
  {
    path: '/',
    exact: true,
    main: HomePage
  },
  {
    path: '/create',
    exact: true,
    main: CreatePage
  },
  {
    path: '/profile/:id',
    exact: true,
    main: ProfilePage
  },
  {
    path: '/edit/:id',
    exact: true,
    main: EditPage
  },
  {
    path: '/edit/:parentId/messages/:id',
    exact: true,
    main: EditMessagePage
  }
];

export default routes;
