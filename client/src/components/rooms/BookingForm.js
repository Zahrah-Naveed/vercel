import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, TextField, Button, Typography, IconButton, Snackbar } from '@mui/material';
import { Close } from '@mui/icons-material';

const BookingForm = ({ open, onClose }) => {
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle booking form submission
    console.log('Form submitted');
    setBookingSuccess(true);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Booking Form
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField required label="Name" fullWidth margin="normal" />
          <TextField required label="Email" fullWidth margin="normal" />
          <TextField required label="Phone" fullWidth margin="normal" />
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </DialogContent>
      {/* Display Snackbar for booking success message */}
      <Snackbar
          open={bookingSuccess}
          autoHideDuration={6000}
          onClose={() => setBookingSuccess(false)}
          message="The room has been added successfully"
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setBookingSuccess(false)}>
              <Close fontSize="small" />
            </IconButton>
          }
        />
    </Dialog>
  );
};

export default BookingForm;
