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
    Menu,
    MenuItem,
    Fade,
    ThemeProvider
} from "@mui/material";
import { styled } from "@mui/system";
import {
    Favorite as FavoriteIcon,
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon
} from "@mui/icons-material";
import { useNavigation } from "@/utils/useNavigation";
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
    const { navigateToCart } = useNavigation();
    const theme = useTheme();
    const [cartAnchorEl, setCartAnchorEl] = useState(null);

    const products = useSelector((state: RootState) => state.products.items);
    const dispatch = useDispatch();

    const handleAddToCart = (product: Product) => {
        dispatch(addItem(product));
    };

    const handleAddToFavorites = (product: Product) => {
        dispatch(toggleFavorite(product.id));
    };

    const handleCartClose = () => {
        setCartAnchorEl(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <Menu
                    anchorEl={cartAnchorEl}
                    open={Boolean(cartAnchorEl)}
                    onClose={handleCartClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem>Cart Item 1</MenuItem>
                    <MenuItem>Cart Item 2</MenuItem>
                    <MenuItem>Cart Item 3</MenuItem>
                    <MenuItem>
                        <Button variant="contained" fullWidth onClick={navigateToCart}>
                            View Cart
                        </Button>
                    </MenuItem>
                </Menu>

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
                                        <Button size="small" variant="contained" fullWidth onClick={() => handleAddToCart(product)}>
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
                                <IconButton color="inherit" aria-label="facebook">
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton color="inherit" aria-label="twitter">
                                    <TwitterIcon />
                                </IconButton>
                                <IconButton color="inherit" aria-label="instagram">
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