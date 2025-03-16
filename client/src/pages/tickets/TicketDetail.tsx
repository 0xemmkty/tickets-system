import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Chip,
  Alert,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { ticketsService } from '../../services/tickets';
import { ordersService } from '../../services/orders';
import SeatSelector from '../../components/SeatSelector';
import { useAuth } from '../../contexts/AuthContext';

interface Ticket {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  venue: string;
  date: string;
  totalSeats: number;
  availableSeats: number;
  status: string;
}

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTicket();
  }, [id]);

  const loadTicket = async () => {
    try {
      const response = await ticketsService.getOne(parseInt(id!));
      setTicket(response.data);
      // TODO: 从后端获取已预订的座位
      setBookedSeats(['A1', 'A2', 'B5']);
    } catch (err) {
      setError('Failed to load ticket');
    }
  };

  const handleSeatSelect = (seat: string) => {
    setSelectedSeats(prev => {
      if (prev.includes(seat)) {
        return prev.filter(s => s !== seat);
      }
      return [...prev, seat];
    });
  };

  const handlePurchase = async () => {
    if (!user) {
      navigate('/signin');
      return;
    }

    if (!ticket || selectedSeats.length === 0) return;

    try {
      await ordersService.create({
        ticketId: ticket.id,
        seats: selectedSeats,
        amount: ticket.price * selectedSeats.length
      });
      navigate('/orders');
    } catch (err: any) {
      setError(err.response?.data?.errors?.[0]?.message || 'Failed to create order');
    }
  };

  if (!ticket) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {ticket.title}
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Chip label={ticket.category} color="primary" sx={{ mr: 1 }} />
              <Chip label={ticket.status} color="secondary" />
            </Box>

            <Typography variant="body1" paragraph>
              {ticket.description}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Venue</Typography>
                <Typography variant="body1">{ticket.venue}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Date</Typography>
                <Typography variant="body1">
                  {new Date(ticket.date).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ mt: 3 }}>
            <SeatSelector
              totalSeats={ticket.totalSeats}
              selectedSeats={selectedSeats}
              bookedSeats={bookedSeats}
              onSeatSelect={handleSeatSelect}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Price per ticket</Typography>
                <Typography variant="h5">${ticket.price}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Selected seats</Typography>
                <Typography variant="body1">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2">Total amount</Typography>
                <Typography variant="h4">
                  ${ticket.price * selectedSeats.length}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={selectedSeats.length === 0}
                onClick={handlePurchase}
              >
                {user ? 'Purchase Now' : 'Sign in to Purchase'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TicketDetail; 