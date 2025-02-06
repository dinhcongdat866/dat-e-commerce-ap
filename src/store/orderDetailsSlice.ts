import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderSummary } from "./orderSlice";
import { Address, ProductSale } from "@/models";

interface OrderDetails {
    orderId: string;
    orderDate: string;
    status: string;
    expectedDelivery: string;
    shippingAddress: Address;
    paymentMethod: string;
    products: ProductSale[];
    summary: OrderSummary;
}

export const fetchOrderDetails = async (orderId: string): Promise<OrderDetails> => {
    return new Promise<OrderDetails>((resolve) => {
        setTimeout(() => {
            resolve({
                orderId: orderId,
                orderDate: new Date().toISOString(),
                status: "OutForDelivery",
                expectedDelivery: '2024-01-25',
                shippingAddress: {
                    name: 'John Doe',
                    street: '123 Main Street',
                    city: 'New York',
                    state: 'NY',
                    zipCode: '10001'
                },
                paymentMethod: 'Credit Card (****1234)',
                products: [
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
                summary: {
                    subtotal: 999.97,
                    shipping: 10.00,
                    tax: 89.99,
                    total: 1099.96,
                    discount: 0
                }
            });
        }, 1000);
    });
};

export const getOrderDetails = createAsyncThunk('order/getOrderDetails', async (orderId: string) => {
    const response = await fetchOrderDetails(orderId);
    return response;
});

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: {
        orderDetails: null as OrderDetails | null,
        status: 'idle',
        error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrderDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orderDetails = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    }
});

export default orderDetailsSlice.reducer;