import AdminDashboard from './pages/Dashboard/AdminDashboard';
import StoreDashboard from './pages/Dashboard/OwnerDashboard';
import UserDashboard from './pages/Dashboard/UserDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

// Optional: you can also define a NotFound page
// import NotFound from './pages/NotFound';

const routes = [
  {
    path: '/login',
    element: <Login />,
    isPublic: true,
  },
  {
    path: '/register',
    element: <Register />,
    isPublic: true,
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
    allowedRoles: ['admin'],
  },
  {
    path: '/store',
    element: <StoreDashboard />,
    allowedRoles: ['store'],
  },
  {
    path: '/user',
    element: <UserDashboard />,
    allowedRoles: ['user'],
  },
  // You can handle the default route in App.js using Navigate
];

export default routes;
