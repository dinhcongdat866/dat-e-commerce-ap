"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { OrderItems, OrderSummary, Footer } from "@/components";
import {
  OrderInfo,
  OrderDeliveryStatus,
  ShippingAddress,
  PaymentMethod,
} from "./components";
import { useAppDispatch } from "@/store";
import { getOrderDetails } from "@/store/orderDetailsSlice";

const OrderDetailsPage = () => {
  // TODO: When use API for order details, can make this component as a server component
  const dispatch = useAppDispatch();
  const orderId = useParams().id as string;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container sx={{ my: 4, flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Order Details
        </Typography>

        <OrderInfo />
        <OrderDeliveryStatus />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <OrderItems isCart={false} />
          </Grid>

          <Grid item xs={12} md={4}>
            <OrderSummary isCheckout={false} isCart={false} />
            <ShippingAddress />
            <PaymentMethod />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default OrderDetailsPage;
