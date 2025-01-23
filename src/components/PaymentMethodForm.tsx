import { useState } from "react";
import { Grid, TextField, Box, Radio, FormControlLabel, Stack, Typography, RadioGroup } from "@mui/material";
import {
    CreditCard as CreditCardIcon,
    AccountBalanceWallet as PaypalIcon,
} from "@mui/icons-material";
import { StyledPaper } from "@/components/StyledPaper";

const PaymentMethodForm = () => {
    const [paymentMethod, setPaymentMethod] = useState("credit-card");

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <StyledPaper>
            <Typography variant="h6" gutterBottom>
                Payment Method
            </Typography>
            <RadioGroup
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
            >
                <Stack spacing={2}>
                    <FormControlLabel
                        value="credit-card"
                        control={<Radio />}
                        label={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <CreditCardIcon style={{ marginRight: "8px" }} />
                                Credit Card
                            </Box>
                        }
                    />
                    {paymentMethod === "credit-card" && (
                        <Box sx={{ pl: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Card Number"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Expiry Date"
                                        variant="outlined"
                                        placeholder="MM/YY"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="CVV"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                    <FormControlLabel
                        value="paypal"
                        control={<Radio />}
                        label={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <PaypalIcon style={{ marginRight: "8px" }} />
                                PayPal
                            </Box>
                        }
                    />
                </Stack>
            </RadioGroup>
        </StyledPaper>
    );
};

export default PaymentMethodForm;