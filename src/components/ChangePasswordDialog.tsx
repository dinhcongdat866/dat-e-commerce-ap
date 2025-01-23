import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, Button } from "@mui/material";
import { useState } from "react";

interface ChangePasswordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

const ChangePasswordDialog = ({ isOpen, onClose, onSave }: ChangePasswordDialogProps) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleSave = () => {
        onSave();
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Current Password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Confirm New Password"
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>
                    Update Password
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordDialog;