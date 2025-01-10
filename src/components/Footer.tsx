"use client";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

const Footer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: theme.spacing(6, 0),
    marginTop: "auto"
}));

export default Footer;