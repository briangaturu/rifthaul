import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/api/authApi';
import { userApi } from './features/api/userApi';
import { truckApi } from './features/api/truckApi';
import { shipmentApi } from './features/api/shipmentApi';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [truckApi.reducerPath]: truckApi.reducer,
    [shipmentApi.reducerPath]: shipmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      truckApi.middleware,
      shipmentApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;