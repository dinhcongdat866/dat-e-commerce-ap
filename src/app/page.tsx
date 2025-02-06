import Link from "next/link";
import {
  Typography,
  Container,
  Grid,
  Box,
  Paper,
  List,
  ListItem,
} from "@mui/material";
import { ScrollList, FollowUs, Footer } from "@/components";

const HomePage = async () => {
  const products = [
    { id: 1, name: "Premium Headphones", price: 299, image: "images.unsplash.com/photo-1505740420928-5e560c06d30e", isFavorite: false },
    { id: 2, name: "Smart Watch", price: 199, image: "images.unsplash.com/photo-1523275335684-37898b6baf30", isFavorite: false },
    { id: 3, name: "Wireless Earbuds", price: 149, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb", isFavorite: false },
    { id: 4, name: "Digital Camera", price: 599, image: "images.unsplash.com/photo-1516035069371-29a1b244cc32", isFavorite: false }
  ];
  // = await fetch("http://localhost:3000/api/products").then((res) => res.json());

  return (
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
          <ScrollList products={products} />
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
              <FollowUs />
            </Grid>
          </Grid>
          <Footer />
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;