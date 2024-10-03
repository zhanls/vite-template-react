import { Middleware, combineReducers, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { authSlice } from './authSlice';
import { api } from "@/services";

// const persistFilterTransform = createFilter('auth', ['userinfo', 'token']);

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice.reducer,
});

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  // transforms: [persistFilterTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const globalHandle = debounce(
//   (middlewareApi: MiddlewareAPI, action) => {
//     const status = action.payload?.data?.status;
//     if (!LOCAL_STATUS.includes(status)) {
//       let title;
//       let contentText;
//       if (status === 5053) {
//         title = 'Application.Bulk Folder.Blocking Header Label';
//         contentText = 'Application.Bulk Folder.Blocking Text Label1';
//       } else if (status === 5070) {
//         title = 'Application.Bulk Folder.Blocking Header Label';
//         contentText = 'Application.Bulk Folder.Blocking Text Label2';
//       } else {
//         title = 'Login.Warning.Pop-up Header Label2';
//         contentText = 'Login.Warning.Pop-up Text Label2';
//       }
//       middlewareApi.dispatch(
//         setDialog({
//           open: true,
//           title,
//           contentText,
//           confirmButtonProps: {
//             text: 'General.All Page.Ok',
//           },
//         }),
//       );
//     }
//   },
//   1000,
//   {
//     leading: true,
//   },
// );

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!', action);
    // globalHandle(middlewareApi, action);
  }
  return next(action);
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(api.middleware)
      .concat(rtkQueryErrorLogger),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
