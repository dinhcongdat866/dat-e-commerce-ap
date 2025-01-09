"use client"

import React, { useState } from "react";
import {
    Typography,
    IconButton,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    useTheme,
    Box,
    ThemeProvider,
    Snackbar,
    Alert,
    Slide
} from "@mui/material";
import { styled } from "@mui/system";
import {
    Favorite as FavoriteIcon,
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Product, toggleFavorite } from "@/store/productsSlice";
import { addItem } from "@/store/cartSlice";

const ProductCard = styled(Card)(() => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s",
    "&:hover": {
        transform: "scale(1.03)",
        // boxShadow: theme?.shadows?.[4]
    }
}));

const Footer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: theme.spacing(6, 0),
    marginTop: "auto"
}));

const ProductsPage = () => {
    const theme = useTheme();
    const [cartAnchorEl, setCartAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const products = useSelector((state: RootState) => state.products.items);
    const dispatch = useDispatch();

    const handleAddToCart = (product: Product) => {
        dispatch(addItem(product));
        setSnackbarMessage(`${product.name} added to cart!`);
        setOpen(true);
    };

    const handleAddToFavorites = (product: Product) => {
        dispatch(toggleFavorite(product.id));
    };

    const handleCartClose = () => {
        setCartAnchorEl(null);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <Container sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Featured Products
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        {products.map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={3}>
                                <ProductCard>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`https://${product.image}`}
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="h6" color="primary">
                                            ${product.price}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="contained" fullWidth onClick={() => {
                                            handleAddToCart(product);
                                        }}>
                                            Add to Cart
                                        </Button>
                                        <IconButton size="small" aria-label="add to favorites" onClick={() => handleAddToFavorites(product)}>
                                            <FavoriteIcon color={product.isFavorite ? "success" : "disabled"} />
                                        </IconButton>
                                    </CardActions>
                                </ProductCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    TransitionComponent={Slide}
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
                <Footer>
                    <Container>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h6" gutterBottom>
                                    About Us
                                </Typography>
                                <Typography variant="body2">
                                    We provide high-quality products at competitive prices.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h6" gutterBottom>
                                    Contact
                                </Typography>
                                <Typography variant="body2">
                                    Email: support@eshop.com
                                    <br />
                                    Phone: +1 234 567 890
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h6" gutterBottom>
                                    Follow Us
                                </Typography>
                                <IconButton color="inherit" aria-label="facebook"
                                    onClick={() => window.open("https://www.facebook.com", "_blank")}
                                >
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton color="inherit" aria-label="twitter"
                                    onClick={() => window.open("https://www.twitter.com", "_blank")}
                                >
                                    <TwitterIcon />
                                </IconButton>
                                <IconButton color="inherit" aria-label="instagram"
                                    onClick={() => window.open("https://www.instagram.com", "_blank")}
                                >
                                    <InstagramIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Typography
                            variant="body2"
                            align="center"
                            sx={{ mt: 4 }}
                        >
                            © 2024 E-Shop. All rights reserved.
                        </Typography>
                    </Container>
                </Footer>
            </Box>
        </ThemeProvider>
    );
};

export default ProductsPage;