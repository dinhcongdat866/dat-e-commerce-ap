"use client";

import { useSelector } from "react-redux";
import { Typography, Stepper, Step, StepLabel } from "@mui/material";
import { StyledPaper } from "@/components";
import OrderStatus, { OrderStatusSteps } from "@/types/orderStatus";
import { RootState } from "@/store";

const OrderDeliveryStatus = () => {
    const orderDetails = useSelector((state: RootState) => state.orderDetails.orderDetails);
    const activeStep: number = orderDetails?.status ? OrderStatusSteps[orderDetails.status as keyof typeof OrderStatusSteps] : 0;

    return (
        <StyledPaper>
            <Typography variant="h6" gutterBottom>
                Order Status
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
                {Object.entries(OrderStatus).map(([key, label]) => (
                    <Step key={key}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </StyledPaper>
    );
};

export default OrderDeliveryStatus;