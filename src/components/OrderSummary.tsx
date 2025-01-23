import { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Stack, Box, TextField, Button, Alert, Divider } from "@mui/material";
import { Tag as TagIcon } from "@mui/icons-material";
import { RootState, useAppDispatch } from "@/store";
import { applyVoucher } from "@/store/orderSlice";

const OrderSummary = () => {
    const orderSummary = useSelector((state: RootState) => state.order.orderSummary);
    const dispatch = useAppDispatch();
    const [voucherCode, setVoucherCode] = useState("");
    const [voucherApplied, setVoucherApplied] = useState(false);

    const handleApplyVoucher = () => {
        if (voucherCode === "SAVE50") {
            setVoucherApplied(true);
            dispatch(applyVoucher(voucherCode));
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Order Summary
                </Typography>
                <Stack spacing={2}>
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
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>Subtotal</Typography>
                        <Typography>${orderSummary?.subtotal.toFixed(2) || 0}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>Shipping</Typography>
                        <Typography>${orderSummary?.shipping.toFixed(2) || 0}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>Tax</Typography>
                        <Typography>${orderSummary?.tax.toFixed(2) || 0}</Typography>
                    </Box>
                    {voucherApplied && (
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography>Discount</Typography>
                            <Typography color="error">-${orderSummary?.discount.toFixed(2) || 0}</Typography>
                        </Box>
                    )}
                    <Divider />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h6">${orderSummary?.total.toFixed(2) || 0}</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Place Order
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default OrderSummary;