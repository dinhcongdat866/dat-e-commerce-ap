import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface OrderHistory {
    id: string;
    date: string;
    total: number;
    status: string;
}

const fetchOrderHistory = async (): Promise<OrderHistory[]> => {
    return new Promise<OrderHistory[]>((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: "#ORD001",
                    date: "2024-01-15",
                    total: 299.99,
                    status: "Delivered"
                }
            ]);
        }, 1000);
    });
};

export const getOrderHistory = createAsyncThunk('orderHistory/fetchOrderHistory', async () => {
    const response = await fetchOrderHistory();
    return response;
});

const orderHistorySlice = createSlice({
    name: "orderHistory",
    initialState: {
        orderHistory: [] as OrderHistory[],
        status: 'idle',
        error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrderHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrderHistory.fulfilled, (state, action) => {
                state.status = 'idle';
                state.orderHistory = action.payload;
            })
            .addCase(getOrderHistory.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || 'An error occurred';
            });
    }
});

export default orderHistorySlice.reducer;
