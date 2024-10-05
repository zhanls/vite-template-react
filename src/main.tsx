import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom';
import { persistor, store } from './store/index.ts';
import theme from './theme/index.ts';
import router from './pages/index.ts';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PersistGate loading={null} persistor={persistor}>
            <CssBaseline />
            <RouterProvider router={router} />
          </PersistGate>
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
