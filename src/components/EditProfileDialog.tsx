"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { Profile } from "@/store/profileSlice";

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  onSave: (updatedProfile: Profile) => void;
}

const EditProfileDialog = ({ isOpen, onClose, profile, onSave }: EditProfileDialogProps) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);

  const handleSave = () => {
    onSave({ ...profile, name, email, phone });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField fullWidth label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;