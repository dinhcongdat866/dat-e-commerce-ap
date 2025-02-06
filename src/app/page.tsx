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
  const products = await fetch("http://localhost:3000/api/products").then((res) => res.json());

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