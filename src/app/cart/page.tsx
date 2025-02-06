"use client"

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { OrderItems, OrderSummary } from "@/components";

const CartPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <OrderItems isCart />
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary isCart />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CartPage;