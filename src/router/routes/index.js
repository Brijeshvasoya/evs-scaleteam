import { lazy } from 'react';

const DefaultRoute = "/state";
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
];

export {DefaultRoute, routes };
