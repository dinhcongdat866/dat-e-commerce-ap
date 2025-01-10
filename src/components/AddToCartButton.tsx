"use client";

import React, { useContext } from "react";
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { Product } from "@/store/productsSlice";
import { SnackbarContext } from "./context/SnackBarProvider";

interface AddToCartButtonProps {
  product: Product;
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined" | "text";
  fullWidth?: boolean;
}

const AddToCartButton = ({ product, size = "small", variant = "contained", fullWidth = false }: AddToCartButtonProps) => {
  const dispatch = useDispatch();
  const snackbarContext = useContext(SnackbarContext);

  const handleAddToCart = (product: Product) => {
    dispatch(addItem(product));
    snackbarContext?.showSnackbar(`${product.name} added to cart!`);
  };

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      startIcon={<ShoppingCartIcon />}
      onClick={() => handleAddToCart(product)}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;