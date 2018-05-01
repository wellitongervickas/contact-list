// Home Page
import HomePage from '../../views/home/home-page';
import ProfilePage from '../../views/profile/profile-page';
import EditPage from '../../views/edit/edit-page';
import EditMessagePage from '../../views/edit/edit-message-page';
import CreatePage from '../../views/create/create-page';
import configSystem from './config-system';

const routes = [
  {
    path: configSystem.base ,
    exact: true,
    main: HomePage
  },
  {
    path: configSystem.base + 'create',
    exact: true,
    main: CreatePage
  },
  {
    path: configSystem.base + 'profile/:id',
    exact: true,
    main: ProfilePage
  },
  {
    path: configSystem.base + 'edit/:id',
    exact: true,
    main: EditPage
  },
  {
    path: configSystem.base + 'edit/:parentId/messages/:id',
    exact: true,
    main: EditMessagePage
  }
];

export default routes;
