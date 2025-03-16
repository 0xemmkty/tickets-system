import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Tooltip,
  IconButton
} from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import WeekendIcon from '@mui/icons-material/Weekend';
import ChairIcon from '@mui/icons-material/Chair';

interface SeatSelectorProps {
  totalSeats: number;
  selectedSeats: string[];
  bookedSeats: string[];
  onSeatSelect: (seat: string) => void;
}

const SeatSelector = ({ totalSeats, selectedSeats, bookedSeats, onSeatSelect }: SeatSelectorProps) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = Math.ceil(totalSeats / rows.length);

  const getSeatStatus = (seat: string) => {
    if (selectedSeats.includes(seat)) return 'selected';
    if (bookedSeats.includes(seat)) return 'booked';
    return 'available';
  };

  const getSeatColor = (status: string): 'primary' | 'inherit' | 'default' | undefined => {
    switch (status) {
      case 'selected':
        return 'primary';
      case 'booked':
        return 'inherit';
      default:
        return 'default';
    }
  };

  const getSeatStyle = (status: string) => {
    switch (status) {
      case 'selected':
        return { color: '#1976d2' }; // primary color
      case 'booked':
        return { color: '#bdbdbd' }; // disabled color
      default:
        return { color: '#757575' }; // action color
    }
  };

  const getSeatIcon = (status: string) => {
    switch (status) {
      case 'selected':
        return <WeekendIcon />;
      case 'booked':
        return <ChairIcon />;
      default:
        return <EventSeatIcon />;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Select Your Seats
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <EventSeatIcon sx={{ mr: 1, color: '#757575' }} />
              <Typography variant="body2">Available</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <WeekendIcon sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body2">Selected</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ChairIcon sx={{ mr: 1, color: '#bdbdbd' }} />
              <Typography variant="body2">Booked</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        {/* Stage */}
        <Paper 
          sx={{ 
            width: '80%',
            py: 2,
            bgcolor: 'grey.200',
            textAlign: 'center',
            mb: 4
          }}
        >
          <Typography variant="body2" color="text.secondary">
            STAGE
          </Typography>
        </Paper>

        {/* Seats */}
        {rows.map((row) => (
          <Box 
            key={row}
            sx={{
              display: 'flex',
              gap: 1,
              width: '100%',
              justifyContent: 'center'
            }}
          >
            <Typography
              sx={{
                width: 30,
                textAlign: 'center',
                lineHeight: '40px'
              }}
            >
              {row}
            </Typography>
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const seat = `${row}${i + 1}`;
              const status = getSeatStatus(seat);
              return (
                <Tooltip 
                  key={seat} 
                  title={status === 'booked' ? 'Seat not available' : seat}
                >
                  <span>
                    <IconButton
                      onClick={() => onSeatSelect(seat)}
                      disabled={status === 'booked'}
                      color={getSeatColor(status)}
                      size="large"
                      sx={{
                        ...getSeatStyle(status),
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: status !== 'booked' ? 'scale(1.1)' : 'none'
                        }
                      }}
                    >
                      {getSeatIcon(status)}
                    </IconButton>
                  </span>
                </Tooltip>
              );
            })}
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Selected Seats: {selectedSeats.join(', ') || 'None'}
        </Typography>
      </Box>
    </Paper>
  );
};

export default SeatSelector; 