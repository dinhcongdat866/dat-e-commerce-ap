import { Paper } from "@mui/material";
import { styled } from "@mui/system";

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }));