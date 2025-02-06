import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';
import orderReducer from './orderSlice';
import orderDetailsReducer from './orderDetailsSlice';
import orderHistoryReducer from './orderHistorySlice';
import profileReducer from './profileSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
    orderHistory: orderHistoryReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;