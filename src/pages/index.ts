import { createBrowserRouter, RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    id: 'Login Page',
    path: '/',
    async lazy() {
      const module = await import('./Login/index.tsx');
      return module;
    },
    hydrateFallbackElement: null,
  },
];

const router = createBrowserRouter(routes);

export default router;
