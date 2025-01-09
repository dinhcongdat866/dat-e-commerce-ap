"use client"

import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Container,
    Grid,
    Card,
    CardMedia,
    Box,
    Button,
    Rating,
    Divider,
    Avatar,
    TextField,
    Stack,
    Paper
} from "@mui/material";
import { styled } from "@mui/system";
import {
    ShoppingCart as ShoppingCartIcon,
    Remove as RemoveIcon,
    Add as AddIcon,
    AccountCircle as AccountCircleIcon
} from "@mui/icons-material";

const ProductImage = styled(CardMedia)(({ theme }) => ({
    height: 500,
    borderRadius: theme.shape.borderRadius,
    objectFit: "cover"
}));

const ReviewCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
}));

const ProductDetailPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [cartItems] = useState(3);

    const product = {
        id: 1,
        name: "Premium Wireless Headphones",
        price: "$299.99",
        description: "Experience crystal-clear sound quality with our premium wireless headphones. Features include active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music enthusiasts and professionals alike.",
        image: "images.unsplash.com/photo-1505740420928-5e560c06d30e",
        rating: 4.5,
        stockStatus: "In Stock"
    };

    const reviews = [
        {
            id: 1,
            user: "John Doe",
            rating: 5,
            date: "2024-01-15",
            comment: "Excellent sound quality and very comfortable for long listening sessions."
        },
        {
            id: 2,
            user: "Jane Smith",
            rating: 4,
            date: "2024-01-10",
            comment: "Great headphones, but the price is a bit high."
        }
    ];

    const handleQuantityChange = (action: string) => {
        if (action === "increase") {
            setQuantity(prev => prev + 1);
        } else if (action === "decrease" && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Container sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <ProductImage
                            image={`https://${product.image}`}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            {product.name}
                        </Typography>
                        <Rating value={product.rating} precision={0.5} readOnly />
                        <Typography variant="h4" color="primary" sx={{ my: 2 }}>
                            {product.price}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            {product.description}
                        </Typography>
                        <Typography variant="subtitle1" color="success.main" sx={{ mb: 2 }}>
                            {product.stockStatus}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ mr: 2 }}>
                                Quantity:
                            </Typography>
                            <IconButton onClick={() => handleQuantityChange("decrease")}>
                                <RemoveIcon />
                            </IconButton>
                            <TextField
                                value={quantity}
                                slotProps={{ input: { readOnly: true } }}
                                sx={{ width: "60px", mx: 1 }}
                                size="small"
                            />
                            <IconButton onClick={() => handleQuantityChange("increase")}>
                                <AddIcon />
                            </IconButton>
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingCartIcon />}
                            fullWidth
                        >
                            Add to Cart
                        </Button>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" gutterBottom>
                        Customer Reviews
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Stack spacing={2}>
                        {reviews.map((review) => (
                            <ReviewCard key={review.id}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <Avatar sx={{ mr: 2 }}>
                                        <AccountCircleIcon />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1">{review.user}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {review.date}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Rating value={review.rating} readOnly size="small" />
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    {review.comment}
                                </Typography>
                            </ReviewCard>
                        ))}
                    </Stack>

                    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Write a Review
                        </Typography>
                        <Rating sx={{ mb: 2 }} />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Share your thoughts about this product..."
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained">
                            Submit Review
                        </Button>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
};

export default ProductDetailPage;
