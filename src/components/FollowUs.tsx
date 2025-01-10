"use client";

import { IconButton, Stack, Typography } from "@mui/material";
import { Facebook as FacebookIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from "@mui/icons-material";

const FollowUs = () => {
  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Follow Us
      </Typography>
      <Stack direction="row" spacing={2}>
        <IconButton onClick={() => openLink("https://www.facebook.com")}>
          <FacebookIcon />
        </IconButton>
        <IconButton onClick={() => openLink("https://www.twitter.com")}>
          <TwitterIcon />
        </IconButton>
        <IconButton onClick={() => openLink("https://www.instagram.com")}>
          <InstagramIcon />
        </IconButton>
      </Stack>
    </div>
  );
};

export default FollowUs;