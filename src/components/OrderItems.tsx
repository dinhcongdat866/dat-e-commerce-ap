"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Stack,
    Typography,
    IconButton,
    TextField,
    Box,
} from "@mui/material";
import { Remove as RemoveIcon, Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { StyledPaper } from "@/components";
import { RootState } from "@/store";
import { removeItem, updateQuantity } from "@/store/cartSlice";

interface OrderItemsProps {
    isCart?: boolean;
    description?: string;
}

const OrderItems = ({ isCart = false, description }: OrderItemsProps) => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const handleQuantityChange = (id: number, action: string) => {
        const item = cartItems.find((item) => item.id === id);
        if (item) {
            const newQuantity = action === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const handleRemoveItem = (id: number) => {
        dispatch(removeItem(id));
    };

    return (
        <StyledPaper>
            <Typography variant="h6" gutterBottom>
                {description}
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
                            {isCart && (
                                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                    <IconButton onClick={() => handleQuantityChange(item.id, "decrease")} size="small">
                                        <RemoveIcon />
                                    </IconButton>
                                    <TextField value={item.quantity} inputProps={{ readOnly: true }} sx={{ width: "60px", mx: 1 }} size="small" />
                                    <IconButton onClick={() => handleQuantityChange(item.id, "increase")} size="small">
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleRemoveItem(item.id)} color="error" sx={{ ml: 2 }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </StyledPaper>
    );
};

export default OrderItems;