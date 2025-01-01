import { lazy } from 'react';

const DefaultRoute = "/";
const routes = [
  {
    path: '/',
    element: lazy(() => import('../../ui/pages/SignIn')),  
    layout: 'user',
  },
  {
    path: '/forgot-password',
    element: lazy(() => import('../../ui/pages/ForgotPassword')),  
    layout: 'user',
  },
  {
    path: '/signup',
    element: lazy(() => import('../../ui/pages/SignUp')),  
    layout: 'user',
  },
  {
    path: '/dashboard',
    element: lazy(() => import('../../ui/pages/Dashboard')),  
  },
  {
    path: '/events',
    element: lazy(() => import('../../ui/pages/Events')),  
  },
  {
    path: '/participate/:id',
    element: lazy(() => import('../../ui/pages/Participate')),  
  },
  {
    path: '/profile',
    element: lazy(() => import('../../ui/pages/Profile')),  
  },
  {
    path: '/admin-profile',
    element: lazy(() => import('../../ui/pages/Profile')),  
    layout:'admin'
  },
  {
    path: '/user',
    element: lazy(() => import('../../ui/pages/User')),
    layout:'admin'  
  },
  {
    path: '/admin-dashboard',
    element: lazy(() => import('../../ui/pages/Admin-Dashboard')), 
    layout:'admin' 
  },
  {
    path: '/userevent',
    element: lazy(() => import('../../ui/pages/UserEvent')),
    layout:'admin'  
  },
];

export {DefaultRoute, routes };
