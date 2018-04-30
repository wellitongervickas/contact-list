// Home Page
import HomePage from '../../views/home/home-page';

// Contact Page
import ProfilePage from '../../views/profile/profile-page';

// Create Page
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
  }
];

export default routes;
