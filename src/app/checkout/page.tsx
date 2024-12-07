"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  CardMedia,
  Alert
} from "@mui/material";
import { styled } from "@mui/system";
import { 
    CreditCard as CreditCardIcon, 
    AccountBalanceWallet as PaypalIcon, 
    Tag as TagIcon 
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { applyVoucher, getOrderSummary } from "@/store/orderSlice";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3)
}));

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const orderSummary = useSelector((state: RootState) => state.order.orderSummary);

  useEffect(() => {
    dispatch(getOrderSummary());
  }, [dispatch]);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleApplyVoucher = () => {
    if (voucherCode === "SAVE50") {
      setVoucherApplied(true);
      dispatch(applyVoucher(voucherCode));
    }
  };

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

            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Address"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="City"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>State</InputLabel>
                    <Select
                      label="State"
                      defaultValue=""
                    >
                      <MenuItem value="CA">California</MenuItem>
                      <MenuItem value="NY">New York</MenuItem>
                      <MenuItem value="TX">Texas</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="ZIP Code"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </StyledPaper>

            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <RadioGroup
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <Stack spacing={2}>
                  <FormControlLabel
                    value="credit-card"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CreditCardIcon style={{ marginRight: "8px" }} />
                        Credit Card
                      </Box>
                    }
                  />
                  {paymentMethod === "credit-card" && (
                    <Box sx={{ pl: 4 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            label="Card Number"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Expiry Date"
                            variant="outlined"
                            placeholder="MM/YY"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="CVV"
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PaypalIcon style={{ marginRight: "8px" }} />
                        PayPal
                      </Box>
                    }
                  />
                </Stack>
              </RadioGroup>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={4}>
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