"use client";

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, Button } from "@mui/material";
import { ProfileAddress } from "@/models";

interface EditAddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  address: ProfileAddress;
  onSave: (updatedAddress: ProfileAddress) => void;
}

const EditAddressDialog = ({ isOpen, onClose, address, onSave }: EditAddressDialogProps) => {
  const [type, setType] = useState(address.type);
  const [street, setStreet] = useState(address.address);
  const [city, setCity] = useState(address.city);
  const [state, setState] = useState(address.state);
  const [zip, setZip] = useState(address.zip);

  const handleSave = () => {
    onSave({ ...address, type, address: street, city, state, zip });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Address</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField fullWidth label="Address Type" value={type} onChange={(e) => setType(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Street Address" value={street} onChange={(e) => setStreet(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="City" value={city} onChange={(e) => setCity(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="State" value={state} onChange={(e) => setState(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="ZIP Code" value={zip} onChange={(e) => setZip(e.target.value)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save Address
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAddressDialog;