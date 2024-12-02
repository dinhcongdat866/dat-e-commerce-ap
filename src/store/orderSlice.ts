import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface OrderSummary {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    discount: number;
}

const fetchOrderSummary = async (): Promise<OrderSummary> => {
    return new Promise<OrderSummary>((resolve) => {
        setTimeout(() => {
            resolve({
                subtotal: 999.97,
                shipping: 10.00,
                tax: 89.99,
                total: 1099.96,
                discount: 0
            });
        }, 1000);
    });
};

const fetchVoucher = async (voucher: string): Promise<OrderSummary> => {
    return new Promise<OrderSummary>((resolve) => {
        setTimeout(() => {
            resolve({
                subtotal: 999.97,
                shipping: 10.00,
                tax: 89.99,
                total: 1099.96,
                discount: 50,
            });
        }, 1000);
    });
};

export const getOrderSummary = createAsyncThunk('order/getOrderSummary', async () => {
    const response = await fetchOrderSummary();
    return response;
});

export const applyVoucher = createAsyncThunk('order/applyVoucher', async (voucher: string) => {
    const response = await fetchVoucher(voucher);
    return response;
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderSummary: null as OrderSummary | null,
        status: 'idle',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrderSummary.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrderSummary.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orderSummary = action.payload;
            })
            .addCase(getOrderSummary.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })

            .addCase(applyVoucher.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(applyVoucher.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orderSummary = action.payload;
            })
            .addCase(applyVoucher.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
    }
});

export default orderSlice.reducer;