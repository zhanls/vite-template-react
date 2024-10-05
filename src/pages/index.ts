import { createBrowserRouter, RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    id: 'Login Page',
    path: '/login',
    async lazy() {
      const module = await import('./Login');
      return module;
    },
  },
];

const router = createBrowserRouter(routes);

export default router;
