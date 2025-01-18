import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import dataSlice from './slices/dataSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    dataSlice: dataSlice,
    authSlice: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
