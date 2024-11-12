"use client";

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
  CardContent,
  Box,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { styled } from "@mui/system";
import { 
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  ChevronRight as ChevronRightIcon
} from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 280,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s",
  marginRight: theme.spacing(2),
  "&:hover": {
    transform: "scale(1.03)",
    // boxShadow: theme.shadows[4]
  }
}));

const ProductImage = styled(CardMedia)(() => ({
  paddingTop: "100%",
  position: "relative"
}));

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "hidden",
  padding: theme.spacing(2),
  position: "relative",
  scrollBehavior: "smooth"
}));

const ScrollButton = styled(IconButton)(() => ({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "#383838",
  color: "white",
  "&:hover": {
    backgroundColor: "#fff"
  },
  zIndex: 1000
}));

const HomePage = () => {
  const [cartItems] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "$299.99",
      image: "images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: "$399.99",
      image: "images.unsplash.com/photo-1546868871-7041f2a55e12"
    },
    {
      id: 3,
      name: "Professional Camera",
      price: "$899.99",
      image: "images.unsplash.com/photo-1516035069371-29a1b244cc32"
    },
    {
      id: 4,
      name: "Wireless Earbuds",
      price: "$159.99",
      image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb"
    },
    {
      id: 5,
      name: "Smart Speaker",
      price: "$199.99",
      image: "images.unsplash.com/photo-1545454675-3531b543be5d"
    },
    {
      id: 6,
      name: "Laptop Pro",
      price: "$1299.99",
      image: "images.unsplash.com/photo-1496181133206-80ce9b88a853"
    }
  ];

  const handleNext = () => {
    if (currentIndex + itemsPerPage < featuredProducts.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    } else {
      setCurrentIndex(0);
    }
  };

  const visibleProducts = featuredProducts.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-Shop
          </Typography>
          <TextField
            size="small"
            placeholder="Search products..."
            sx={{ mr: 2, backgroundColor: "white", borderRadius: 1, width: "300px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Stack direction="row" spacing={2}>
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
            <IconButton color="inherit">
              <FavoriteIcon />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={cartItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          backgroundImage: `url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Container>
          <Paper sx={{ p: 4, maxWidth: 500, backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
            <Typography variant="h3" gutterBottom>
              New Season Arrivals
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Check out the latest products with amazing deals
            </Typography>
            <Button variant="contained" size="large">
              Shop Now
            </Button>
          </Paper>
        </Container>
      </Box>

      <Container sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom>
          Featured Products
        </Typography>
        <Box sx={{ position: "relative" }}>
          <ScrollContainer>
            {visibleProducts.map((product) => (
              <StyledCard key={product.id}>
                <ProductImage
                  image={`https://${product.image}`}
                  title={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    startIcon={<ShoppingCartIcon />}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </StyledCard>
            ))}
          </ScrollContainer>
          <ScrollButton onClick={handleNext}>
            <ChevronRightIcon />
          </ScrollButton>
        </Box>
      </Container>

      <Box sx={{ bgcolor: "background.paper", py: 6, mt: "auto" }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2">
                We are committed to providing the best shopping experience with top-quality products and excellent customer service.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Products" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Contact" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton>
                  <FacebookIcon />
                </IconButton>
                <IconButton>
                  <TwitterIcon />
                </IconButton>
                <IconButton>
                  <InstagramIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ mt: 4, textAlign: "center" }}>
            © 2024 E-Shop. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;