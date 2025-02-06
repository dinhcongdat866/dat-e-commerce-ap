import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import {
  ReduxProvider,
  SessionProviderWrapper,
  SnackbarProvider,
  CustomThemeProvider,
} from "@/components";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dat E Commerce App",
  description: "A simple e-commerce app built with Next.js, MUI, and Redux.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProviderWrapper>
          <ReduxProvider>
            <CustomThemeProvider>
              <NavBar />
              <SnackbarProvider>
                {children}
              </SnackbarProvider>
            </CustomThemeProvider>
          </ReduxProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
