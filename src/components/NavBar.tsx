"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Button, 
    Badge, 
    Drawer, 
    List, 
    ListItem, 
    ListItemText, 
    Avatar, 
    Autocomplete, 
    debounce, 
    TextField, 
    Divider, 
    Menu, 
    MenuItem,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Box, Stack, styled } from '@mui/system';
import { 
    Menu as MenuIcon, 
    ShoppingCart as ShoppingCartIcon, 
    AccountCircle as AccountCircleIcon, 
    ExitToApp 
} from '@mui/icons-material';
import { SearchProductsResponse } from '@/app/api/search/route';
import { useNavigation } from '@/utils/useNavigation';
import { RootState } from '@/store';

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(255, 255, 255)",
    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.95)" },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
    },
    display: "flex",
    alignItems: "center",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
        [theme.breakpoints.up("md")]: { width: "20ch" }
    }
}));

const NavBar = () => {
    const { navigateToHome, navigateToProducts, navigateToCart, navigateToProfile, navigateToProductDetails } = useNavigation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.items.length);
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchProductsResponse>({
        total: 0,
        page: 0,
        limit: 0,
        products: []
    });

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleLogout = useCallback(() => {
        handleClose();
    }, [handleClose]);

    const fetchSearchResults = useCallback(debounce(async () => {
        const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}&page=1&limit=10`);
        const data = await response.json();
        setSearchResults(data);
    }, 500), [searchQuery]);

    useEffect(() => {
        fetchSearchResults();
    }, [searchQuery]);

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
                        </>
                    )}
                    <Search>
                        <Autocomplete
                            freeSolo
                            options={searchResults.products}
                            getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                            onChange={(_, value) => {
                                if (value && typeof value !== 'string') {
                                    navigateToProductDetails(value.id);
                                }
                            }}
                            renderInput={(params) => (
                                <StyledTextField
                                    {...params}
                                    placeholder="Search products..."
                                    variant="outlined"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
                                />
                            )}
                            style={{ width: 300 }}
                        />
                    </Search>
                    <IconButton color="inherit" onClick={navigateToCart} aria-label="cart">
                        <Badge badgeContent={cartItems} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit" onClick={handleProfileClick}>
                        {session ? <Avatar src={session.user?.image || ""} /> : <AccountCircleIcon />}
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                width: 250,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                }
                            },
                        }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        <Box sx={{ p: 2 }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                                <Avatar src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1">{session?.user?.name || ""}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {session?.user?.email || ""}
                                    </Typography>
                                </Box>
                            </Stack>
                            <Divider />
                            <MenuItem onClick={navigateToProfile}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <AccountCircleIcon />
                                    <Typography>My Profile</Typography>
                                </Stack>
                            </MenuItem>
                            <MenuItem onClick={handleLogout} sx={{ mt: 1 }}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <ExitToApp />
                                    <Typography>Logout</Typography>
                                </Stack>
                            </MenuItem>
                        </Box>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            >
                <List>
                    {["Home", "Products"].map((text) => (
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