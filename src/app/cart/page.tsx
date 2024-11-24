"use client"

import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Container,
  Grid,
  Card,
  CardMedia,
  Box,
  Button,
  Divider,
  TextField,
  Paper
} from "@mui/material";
import { styled } from "@mui/system";
import { 
    Remove as RemoveIcon, 
    Add as AddIcon, 
    Delete as DeleteIcon 
} from '@mui/icons-material';

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 120,
  width: 120,
  borderRadius: theme.shape.borderRadius,
  objectFit: "cover"
}));

const CartItemCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center"
}));

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image: "images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 2,
      image: "images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 89.99,
      quantity: 1,
      image: "images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    }
  ]);

  const handleQuantityChange = (id: number, action: string) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: action === "increase" 
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1)
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <CartItemCard key={item.id}>
                <ProductImage
                  image={`https://${item.image}`}
                />
                <Box sx={{ ml: 2, flexGrow: 1 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="h6" color="primary">
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <IconButton 
                      onClick={() => handleQuantityChange(item.id, "decrease")}
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      inputProps={{ readOnly: true }}
                      sx={{ width: "60px", mx: 1 }}
                      size="small"
                    />
                    <IconButton 
                      onClick={() => handleQuantityChange(item.id, "increase")}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
                <IconButton 
                  onClick={() => handleRemoveItem(item.id)}
                  color="error"
                  sx={{ ml: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              </CartItemCard>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography>Subtotal:</Typography>
                <Typography>${calculateTotal().toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography>Shipping:</Typography>
                <Typography>Free</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  ${calculateTotal().toFixed(2)}
                </Typography>
              </Box>

              <Button 
                variant="contained" 
                size="large" 
                fullWidth
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ShoppingCartPage;