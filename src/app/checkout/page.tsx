"use client";

import { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import {
  ShippingInfoForm,
  PaymentMethodForm,
  OrderSummary,
  OrderItems,
  Footer,
} from "@/components";
import { useAppDispatch } from "@/store";
import { getOrderDetails } from "@/store/orderDetailsSlice";

const CheckoutPage = () => {
  // TODO: When use API for order details, can make this component as a server component
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrderDetails("12"));
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container sx={{ my: 4, flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <OrderItems isCart={false} />
            <ShippingInfoForm />
            <PaymentMethodForm />
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary isCheckout />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default CheckoutPage;