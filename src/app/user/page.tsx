"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import { 
    Edit as EditIcon,
    VpnKey as KeyIcon,
    ShoppingBag as ShoppingBagIcon, 
    LocationOn as LocationOnIcon, 
    Person as PersonIcon 
} from "@mui/icons-material";
import { ProfileAddress } from "@/models/ProfileAddress";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { getOrderHistory } from "@/store/orderHistorySlice";
import { getProfile, updateProfileAddress } from "@/store/profileSlice";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3)
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2)
}));

const StyledCard = styled(Card)(() => ({
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    // boxShadow: theme.shadows[4]
  }
}));

const UserProfile = () => {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<ProfileAddress | null>(null);
  const dispatch = useAppDispatch();
  const { orderHistory } = useSelector((state: RootState) => state.orderHistory);
  const { profile } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getOrderHistory());
    dispatch(getProfile());
  }, [dispatch]);

  const openEditAddressDialog = (address: ProfileAddress) => {
    setSelectedAddress(address);
    setOpenEditAddress(true);
  };

  const onEditAddress = () => {
    if (selectedAddress) {
      dispatch(updateProfileAddress(selectedAddress));
    }
    setOpenEditAddress(false);
  };

  return (
    <Container sx={{ my: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Box display="flex" flexDirection="column" alignItems="center">
              <ProfileAvatar src={`https://${profile?.image}`} alt={profile?.name}>
                <PersonIcon />
              </ProfileAvatar>
              <Typography variant="h5" gutterBottom>
                {profile?.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {profile?.email}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {profile?.phone}
              </Typography>
              <Stack direction="row" spacing={2} mt={2}>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => setOpenEditProfile(true)}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<KeyIcon />}
                  onClick={() => setOpenChangePassword(true)}
                >
                  Change Password
                </Button>
              </Stack>
            </Box>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              <ShoppingBagIcon style={{ marginRight: "8px" }} />
              Order History
            </Typography>
            <List>
              {orderHistory.map((order) => (
                <React.Fragment key={order.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="subtitle1">{order.id}</Typography>
                          <Chip
                            label={order.status}
                            color={order.status === "Delivered" ? "success" : "primary"}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box display="flex" justifyContent="space-between" mt={1}>
                          <Typography variant="body2">{order.date}</Typography>
                          <Typography variant="body2">${order.total}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </StyledPaper>

          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              <LocationOnIcon style={{ marginRight: "8px" }} />
              Saved Addresses
            </Typography>
            <Grid container spacing={2}>
              {profile?.addresses.map((address) => (
                <Grid item xs={12} sm={6} key={address.id}>
                  <StyledCard variant="outlined" onClick={() => openEditAddressDialog(address)}>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {address.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {address.address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {address.city}, {address.state} {address.zip}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>

      <Dialog open={openEditProfile} onClose={() => setOpenEditProfile(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Full Name" defaultValue={profile?.name} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" defaultValue={profile?.email} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone" defaultValue={profile?.phone} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditProfile(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenEditProfile(false)}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openChangePassword} onClose={() => setOpenChangePassword(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenChangePassword(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenChangePassword(false)}>
            Update Password
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditAddress} onClose={() => setOpenEditAddress(false)}>
        <DialogTitle>Edit Address</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Type"
                defaultValue={selectedAddress?.type}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                defaultValue={selectedAddress?.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                defaultValue={selectedAddress?.city}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="State"
                defaultValue={selectedAddress?.state}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="ZIP Code"
                defaultValue={selectedAddress?.zip}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditAddress(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => onEditAddress()}>
            Save Address
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserProfile;