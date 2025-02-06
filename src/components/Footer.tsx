import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{ bgcolor: "background.paper", py: 3, mt: "auto" }}>
            <Container>
                <Typography variant="body2" align="center" color="text.secondary">
                    © 2024 E-Shop. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;