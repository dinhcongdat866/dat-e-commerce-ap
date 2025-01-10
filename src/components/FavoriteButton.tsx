"use client";

import { Product } from "@/app/api/products/route";
import { IconButton } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import { toggleFavorite } from "@/store/productsSlice";
import { useDispatch } from "react-redux";

const FavoriteButton = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();
    const handleAddToFavorites = (product: Product) => {
        dispatch(toggleFavorite(product.id));
    };
    return (
        <IconButton aria-label="add to favorites" onClick={() => handleAddToFavorites(product)}>
            <FavoriteIcon color={product.isFavorite ? "success" : "disabled"} />
        </IconButton>
    );
};

export default FavoriteButton;