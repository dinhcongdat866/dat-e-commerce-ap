"use client";

import { useSelector } from "react-redux";
import { Card, CardContent, Typography } from "@mui/material";
import { RootState } from "@/store";

const PaymentMethod = () => {
    const orderDetails = useSelector((state: RootState) => state.orderDetails.orderDetails);

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Payment Method
                </Typography>
                <Typography>{orderDetails?.paymentMethod}</Typography>
            </CardContent>
        </Card>
    );
};

export default PaymentMethod;
