// Home Page
import HomePage from '../../views/home/home-page';
import ProfilePage from '../../views/profile/profile-page';
import EditPage from '../../views/edit/edit-page';
import CreatePage from '../../views/create/create-page';

const routes = [
  {
    path: '/',
    exact: true,
    main: HomePage
  },
  {
    path: '/create',
    main: CreatePage
  },
  {
    path: '/profile/:id',
    main: ProfilePage
  },
  {
    path: '/edit/:id',
    main: EditPage
  }
];

export default routes;
