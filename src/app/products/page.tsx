import {
    Typography,
    Container,
    Grid,
    CardMedia,
    CardContent,
    CardActions,
    Box
} from "@mui/material";
import FavoriteButton from "@/components/FavoriteButton";
import AddToCartButton from "@/components/AddToCartButton";
import FollowUs from "@/components/FollowUs";
import { Product } from "../api/products/route";
import { ProductCard, FooterWrapper } from "@/components";

const ProductsPage = async () => {
    const products: Product[] = await fetch("http://localhost:3000/api/products").then((res) => res.json());

    return (
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
                                    <AddToCartButton product={product} size="small" fullWidth variant="contained" />
                                    <FavoriteButton product={product} />
                                </CardActions>
                            </ProductCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <FooterWrapper>
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
                            <FollowUs />
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
            </FooterWrapper>
        </Box>
    );
};

export default ProductsPage;