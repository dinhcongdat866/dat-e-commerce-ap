"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Card, CardContent, Typography, Box, Divider, TextField, Button, Alert } from "@mui/material";
import { Tag as TagIcon } from "@mui/icons-material";
import { RootState, useAppDispatch } from "@/store";
import { applyVoucher } from "@/store/orderSlice";

interface OrderSummaryProps {
    isCheckout?: boolean;
    isCart?: boolean;
}

const OrderSummary = ({ isCheckout = false, isCart = false }: OrderSummaryProps) => {
    const dispatch = useAppDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const orderDetails = useSelector((state: RootState) => state.orderDetails.orderDetails);
    const [voucherCode, setVoucherCode] = useState("");
    const [voucherApplied, setVoucherApplied] = useState(false);

    const handleApplyVoucher = () => {
        if (voucherCode === "SAVE50") {
            setVoucherApplied(true);
            dispatch(applyVoucher(voucherCode));
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Order Summary
                </Typography>
                <Box sx={{ mt: 2 }}>
                    {isCheckout && (
                        <>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <TextField
                                    size="small"
                                    label="Voucher Code"
                                    value={voucherCode}
                                    onChange={(e) => setVoucherCode(e.target.value)}
                                    sx={{ flex: 1 }}
                                />
                                <Button
                                    variant="outlined"
                                    onClick={handleApplyVoucher}
                                    startIcon={<TagIcon />}
                                >
                                    Apply
                                </Button>
                            </Box>
                            {voucherApplied && (
                                <Alert severity="success">Voucher applied successfully!</Alert>
                            )}
                        </>
                    )}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography>Subtotal</Typography>
                        <Typography>${orderDetails?.summary.subtotal.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography>Shipping</Typography>
                        <Typography>${orderDetails?.summary.shipping.toFixed(2)}</Typography>
                    </Box>
                    {!isCart && (
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography>Tax</Typography>
                            <Typography>${orderDetails?.summary.tax.toFixed(2)}</Typography>
                        </Box>
                    )}
                    {(!isCart && !isCheckout) && (
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography>Discount</Typography>
                            <Typography color="error">-${orderDetails?.summary.discount.toFixed(2)}</Typography>
                        </Box>
                    )}
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6">Total</Typography>
                        {isCart ? <Typography variant="h6">${calculateTotal().toFixed(2)}</Typography> : <Typography variant="h6">${orderDetails?.summary.total.toFixed(2)}</Typography>}
                    </Box>
                    {isCart && (
                        <Link href="/checkout" passHref>
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </Button>
                        </Link>
                    )}
                    {isCheckout && (
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Place Order
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default OrderSummary;