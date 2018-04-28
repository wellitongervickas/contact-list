// Home Page
import HomePage from '../../views/home/home-page';

// Contact Page
import ProfilePage from '../../views/profile/profile-page';

const routes = [
  {
    path: "/",
    exact: true,
    main: HomePage
  },
  {
    path: "/profile/:id",
    main: ProfilePage
  }
];

export default routes;
