import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [
        {
            id: 1,
            name: "Premium Wireless Headphones",
            price: 299.99,
            quantity: 1,
            image: "images.unsplash.com/photo-1505740420928-5e560c06d30e",
            isFavorite: false
        },
        {
            id: 2,
            name: "Smart Fitness Watch",
            price: 199.99,
            quantity: 2,
            image: "images.unsplash.com/photo-1523275335684-37898b6baf30",
            isFavorite: false
        },
        {
            id: 3,
            name: "Bluetooth Speaker",
            price: 89.99,
            quantity: 1,
            image: "images.unsplash.com/photo-1608043152269-423dbba4e7e1",
            isFavorite: false
        }
    ],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;