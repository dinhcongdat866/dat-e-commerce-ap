"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Typography,
  IconButton,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
  Stack,
  Paper,
  List,
  ListItem,
} from "@mui/material";
import { styled, ThemeProvider } from "@mui/system";
import {
  ShoppingCart as ShoppingCartIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  ChevronRight as ChevronRightIcon
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Product } from "@/store/productsSlice";
import { addItem } from "@/store/cartSlice";
import theme from "@/styles/theme";

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
    backgroundColor: "#000000"
  },
  zIndex: 1000
}));

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    } else {
      setCurrentIndex(0);
    }
  };

  const onAddToCart = (product: Product) => {
    dispatch(addItem(product));
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
              <Link href="/products">
                Shop Now
              </Link>
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
                      ${product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => onAddToCart(product)}
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
                    <Link href="/">
                      Home
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link href="/products">
                     Products
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link href="/profile">
                     Profile
                    </Link>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Follow Us
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton onClick={() => window.open("https://www.facebook.com", "_blank")}>
                    <FacebookIcon />
                  </IconButton>
                  <IconButton onClick={() => window.open("https://www.twitter.com", "_blank")}>
                    <TwitterIcon />
                  </IconButton>
                  <IconButton onClick={() => window.open("https://www.instagram.com", "_blank")}>
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
    </ThemeProvider>
  );
};

export default HomePage;