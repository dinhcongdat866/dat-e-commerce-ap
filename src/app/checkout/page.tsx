"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  CardMedia,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ShippingInfoForm from "@/components/ShippingInfoForm";
import PaymentMethodForm from "@/components/PaymentMethodForm";
import { StyledPaper } from "@/components/StyledPaper";
import OrderSummary from "@/components/OrderSummary";

const CheckoutPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container sx={{ my: 4, flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Order Items
              </Typography>
              <Stack spacing={2}>
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3}>
                          <CardMedia
                            component="img"
                            height="100"
                            image={`https://${item.image}`}
                            alt={item.name}
                            sx={{ objectFit: "contain" }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="subtitle1" align="right">
                            ${item.price.toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </StyledPaper>
            <ShippingInfoForm />
            <PaymentMethodForm />
          </Grid>

          <Grid item xs={12} md={4}>
            <OrderSummary />
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

export default CheckoutPage;