"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";

export default function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}