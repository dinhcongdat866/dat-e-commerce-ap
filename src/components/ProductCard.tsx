"use client";

import { Card } from "@mui/material";
import { styled } from "@mui/system";

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

export default ProductCard;