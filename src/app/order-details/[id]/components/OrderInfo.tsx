"use client";

import { useSelector } from "react-redux";
import { Grid, Typography, Chip } from "@mui/material";
import { LocalShipping as LocalShippingIcon } from "@mui/icons-material";
import { StyledPaper } from "@/components";
import OrderStatus from "@/types/orderStatus";
import { RootState } from "@/store";

const OrderSummary = () => {
    const orderDetails = useSelector((state: RootState) => state.orderDetails.orderDetails);

    return (
        <StyledPaper>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Order #{orderDetails?.orderId}</Typography>
                    <Typography color="text.secondary">
                        Placed on {orderDetails?.orderDate}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
                    <Chip
                        label={OrderStatus[orderDetails?.status as keyof typeof OrderStatus]}
                        color="primary"
                        icon={<LocalShippingIcon />}
                    />
                    <Typography sx={{ mt: 1 }}>
                        Expected Delivery: {orderDetails?.expectedDelivery}
                    </Typography>
                </Grid>
            </Grid>
        </StyledPaper>
    );
};

export default OrderSummary;
