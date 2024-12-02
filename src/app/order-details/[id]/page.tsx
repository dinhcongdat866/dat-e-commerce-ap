"use client";

import React, { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import {
    LocalShipping as LocalShippingIcon, 
    Inventory as InventoryIcon, 
} from '@mui/icons-material';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import OrderStatus, { OrderStatusSteps } from "@/types/orderStatus";
import { useParams } from "next/navigation";
import { getOrderDetails } from "@/store/orderDetailsSlice";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3)
}));

const OrderDetailsPage = () => {
  const dispatch = useAppDispatch();
  const orderId = useParams().id as string;
  const orderDetails = useSelector((state: RootState) => state.orderDetails.orderDetails);

  const activeStep: number = orderDetails?.status ? OrderStatusSteps[orderDetails.status as keyof typeof OrderStatusSteps] : 0;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container sx={{ my: 4, flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Order Details
        </Typography>

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

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Order Items
              </Typography>
              {orderDetails?.products.map((product) => (
                <Card key={product.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3}>
                        <CardMedia
                          component="img"
                          height="100"
                          image={`https://${product.image}`}
                          alt={product.name}
                          sx={{ objectFit: "contain" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">{product.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {product.quantity}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="subtitle1" align="right">
                          ${product.price.toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography>Subtotal</Typography>
                    <Typography>${orderDetails?.summary.subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography>Shipping</Typography>
                    <Typography>${orderDetails?.summary.shipping.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography>Tax</Typography>
                    <Typography>${orderDetails?.summary.tax.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography>Discount</Typography>
                    <Typography color="error">-${orderDetails?.summary.discount.toFixed(2)}</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">${orderDetails?.summary.total.toFixed(2)}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

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

            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Payment Method
                </Typography>
                <Typography>{orderDetails?.paymentMethod}</Typography>
              </CardContent>
            </Card>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              startIcon={<InventoryIcon />}
            >
              Track Package
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "background.paper", py: 3, mt: "auto" }}>
        <Container>
          <Typography variant="body2" align="center" color="text.secondary">
            © 2024 E-Shop. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default OrderDetailsPage;
