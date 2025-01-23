"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
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
import { getProfile, Profile, updateProfile, updateProfileAddress } from "@/store/profileSlice";
import { useSession } from "next-auth/react";
import EditProfileDialog from "@/components/EditProfileDialog";
import EditAddressDialog from "@/components/EditAddressDialog";
import ChangePasswordDialog from "@/components/ChangePasswordDialog";
import { StyledPaper } from "@/components/StyledPaper";

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
  const { data: session } = useSession();

  useEffect(() => {
    dispatch(getOrderHistory());
    dispatch(getProfile());
  }, [dispatch]);

  const openEditAddressDialog = (address: ProfileAddress) => {
    setSelectedAddress(address);
    setOpenEditAddress(true);
  };

  const onSaveProfile = (updatedProfile: Profile) => {
    dispatch(updateProfile(updatedProfile));
    setOpenEditProfile(false);
  };

  const onSaveAddress = () => {
    if (selectedAddress) {
      dispatch(updateProfileAddress(selectedAddress));
    }
    setOpenEditAddress(false);
  };

  const onSavePassword = () => {
    setOpenChangePassword(false);
  };

  return (
    <Container sx={{ my: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Box display="flex" flexDirection="column" alignItems="center">
              <ProfileAvatar src={`https://${profile?.image}`} alt={profile?.name}>
                {session?.user?.image ? <Avatar src={session.user.image} /> : <PersonIcon />}
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
                        <Typography component="div" display="flex" justifyContent="space-between" alignItems="center">
                          <Typography component="span" variant="subtitle1">{order.id}</Typography>
                          <Chip
                            label={order.status}
                            color={order.status === "Delivered" ? "success" : "primary"}
                            size="small"
                          />
                        </Typography>
                      }
                      secondary={
                        <Typography component="div" display="flex" justifyContent="space-between" mt={1}>
                          <Typography component="span" variant="body2">{order.date}</Typography>
                          <Typography component="span" variant="body2">${order.total}</Typography>
                        </Typography>
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

      {profile && 
      <EditProfileDialog
        isOpen={openEditProfile}
        onClose={() => setOpenEditProfile(false)}
        profile={profile}
        onSave={onSaveProfile} />
      }

      {selectedAddress && 
      <EditAddressDialog
        isOpen={openEditAddress}
        onClose={() => setOpenEditAddress(false)}
        address={selectedAddress}
        onSave={onSaveAddress} />
      }

      <ChangePasswordDialog
        isOpen={openChangePassword}
        onClose={() => setOpenChangePassword(false)} 
        onSave={onSavePassword} />
    </Container>
  );
};

export default UserProfile;