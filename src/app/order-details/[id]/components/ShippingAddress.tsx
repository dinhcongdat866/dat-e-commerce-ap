"use client";

import { useSelector } from "react-redux";
import { Card, CardContent, Typography } from "@mui/material";
import { RootState } from "@/store";

const ShippingAddress = () => {
    const orderDetails = useSelector((state: RootState) => state.orderDetails.orderDetails);

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Shipping Address
                </Typography>
                <Typography>{orderDetails?.shippingAddress.name}</Typography>
                <Typography>{orderDetails?.shippingAddress.street}</Typography>
                <Typography>
                    {orderDetails?.shippingAddress.city}, {orderDetails?.shippingAddress.state} {orderDetails?.shippingAddress.zipCode}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ShippingAddress;