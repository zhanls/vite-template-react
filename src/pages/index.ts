import { createBrowserRouter, RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    async lazy() {
      const module = await import('./login.tsx');
      return module;
    },
    hydrateFallbackElement: null,
  },
  {
    path: '/fix',
    async lazy() {
      const module = await import('./fix.tsx');
      return module;
    },
    hydrateFallbackElement: null,
  },
  {
    path: '/controlled-form',
    async lazy() {
      const module = await import('./controlledform.tsx');
      return module;
    },
    hydrateFallbackElement: null,
  },
  {
    path: '/react-form',
    async lazy() {
      const module = await import('./reacthookform.tsx');
      return module;
    },
    hydrateFallbackElement: null,
  },
];

const router = createBrowserRouter(routes);

export default router;
