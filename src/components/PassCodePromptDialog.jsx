import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const PassCodePromptDialog = ({ open, onClose, onSubmit }) => {
  const [passCode, setPassCode] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setPassCode(e.target.value);
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!passCode) {
      setError("Passcode is required.");
      return;
    }

    if (passCode.length < 6 || passCode.length > 20) {
      setError("Passcode must be between 6 and 20 characters.");
      return;
    }

    try {
      await onSubmit(passCode);
    } catch (err) {
      console.log(err);

      if(err.response.data.status === 400) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Enter pass code to access try on application</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            type="password"
            label="Passcode"
            variant="outlined"
            fullWidth
            value={passCode}
            onChange={handleChange}
            error={!!error}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PassCodePromptDialog;
