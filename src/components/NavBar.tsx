"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Badge, InputBase, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, ShoppingCart as ShoppingCartIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';
import { useNavigation } from '@/utils/useNavigation';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const NavBar = () => {
    const { navigateToHome, navigateToProducts, navigateToCategories, navigateToCart } = useNavigation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.items.length);

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

    return (
        <>
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
                    onClick={navigateToHome}
                >
                    E-Shop
                </Typography>
                {!isMobile && (
                    <>
                        <Button color="inherit" onClick={navigateToHome}>Home</Button>
                        <Button color="inherit" onClick={navigateToProducts}>Products</Button>
                        <Button color="inherit" onClick={navigateToCategories}>Categories</Button>
                    </>
                )}
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search products..." />
                </Search>
                <IconButton color="inherit" onClick={navigateToCart} aria-label="cart">
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
        </>
    );
};

export default NavBar;