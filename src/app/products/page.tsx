"use client"

import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    InputBase,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
    Box,
    Menu,
    MenuItem,
    Fade,
    ThemeProvider
} from "@mui/material";
import { styled } from "@mui/system";
import {
    Search as SearchIcon,
    ShoppingCart as ShoppingCartIcon,
    Menu as MenuIcon,
    AccountCircle as AccountCircleIcon,
    Favorite as FavoriteIcon,
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon
} from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.25)" },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
    }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
        [theme.breakpoints.up("md")]: { width: "20ch" }
    }
}));

const ProductCard = styled(Card)(({ theme }) => ({
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
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartAnchorEl, setCartAnchorEl] = useState(null);
    const [cartItems] = useState(3);

    const products = [
        {
            id: 1,
            name: "Premium Headphones",
            price: "$299",
            image: "images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
            id: 2,
            name: "Smart Watch",
            price: "$199",
            image: "images.unsplash.com/photo-1523275335684-37898b6baf30"
        },
        {
            id: 3,
            name: "Wireless Earbuds",
            price: "$149",
            image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb"
        },
        {
            id: 4,
            name: "Digital Camera",
            price: "$599",
            image: "images.unsplash.com/photo-1516035069371-29a1b244cc32"
        },
        {
            id: 5,
            name: "Digital Camera",
            price: "$599",
            image: "images.unsplash.com/photo-1516035069371-29a1b244cc32"
        }
    ];

    const handleCartClick = (event: any) => {
        setCartAnchorEl(event.currentTarget);
    };

    const handleCartClose = () => {
        setCartAnchorEl(null);
    };

    const navigateToHome = () => {
        // router.push("/");
    };

    const navigateToProducts = () => {
        // router.push("/products");
    };

    const navigateToCategories = () => {
        // router.push("/categories");
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <AppBar position="sticky">
                    <Toolbar>
                        {isMobile && (
                            <IconButton
                                color="inherit"
                                edge="start"
                                onClick={() => setMobileMenuOpen(true)}
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: isMobile ? 0 : 1 }}
                            onClick={() => navigateToHome()}
                        >
                            E-Shop
                        </Typography>
                        {!isMobile && (
                            <>
                                <Button color="inherit" onClick={() => navigateToHome()}>Home</Button>
                                <Button color="inherit" onClick={() => navigateToProducts()}>Products</Button>
                                <Button color="inherit" onClick={() => navigateToCategories()}>Categories</Button>
                            </>
                        )}
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search products..." />
                        </Search>
                        <IconButton color="inherit" onClick={handleCartClick} aria-label="cart">
                            <Badge badgeContent={cartItems} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" aria-label="profile">
                            <AccountCircleIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Drawer
                    anchor="left"
                    open={mobileMenuOpen}
                    onClose={() => setMobileMenuOpen(false)}
                >
                    <List>
                        {["Home", "Products", "Categories", "Profile"].map((text) => (
                            <ListItem key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

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
                        <Button variant="contained" fullWidth>
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
                                            {product.price}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="contained" fullWidth>
                                            Add to Cart
                                        </Button>
                                        <IconButton size="small" aria-label="add to favorites">
                                            <FavoriteIcon />
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