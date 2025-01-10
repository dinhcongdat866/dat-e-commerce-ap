"use client";

import { useState, useCallback, useMemo } from "react";
import { Box, IconButton, CardContent, CardMedia, Card, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import { ITEMS_PER_SLIDER } from "@/constants";
import { Product } from "@/store/productsSlice";
import AddToCartButton from "./AddToCartButton";

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

const ScrollContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    overflowX: "hidden",
    padding: theme.spacing(2),
    position: "relative",
    scrollBehavior: "smooth"
}));

const ScrollList = ({ products }: { products: Product[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = useCallback(() => {
        if (currentIndex + ITEMS_PER_SLIDER < products.length) {
            setCurrentIndex(currentIndex + ITEMS_PER_SLIDER);
        } else {
            setCurrentIndex(0);
        }
    }, [products.length, currentIndex, ITEMS_PER_SLIDER]);

    const visibleProducts = useMemo(
        () => products.slice(currentIndex, currentIndex + ITEMS_PER_SLIDER),
        [products, currentIndex, ITEMS_PER_SLIDER]
    );

    return (
        <>
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
                            <AddToCartButton product={product} />
                        </CardContent>
                    </StyledCard>
                ))}
            </ScrollContainer>
            <ScrollButton onClick={handleNext}>
                <ChevronRightIcon />
            </ScrollButton>
        </>
    );
};

export default ScrollList;