import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { ticketsService } from '../../services/tickets';

interface Ticket {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  venue: string;
  date: string;
  availableSeats: number;
  status: string;
  imageUrl?: string;
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'concert', label: 'Concert' },
  { value: 'sports', label: 'Sports' },
  { value: 'movie', label: 'Movie' }
];

const TicketList = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await ticketsService.getAll();
      console.log('Tickets:------------------', response.data);
      setTickets(response.data);
    } catch (err) {
      console.error('Failed to load tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesCategory = category === 'all' || ticket.category === category;
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'soldout':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Tickets
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {filteredTickets.map((ticket) => (
          <Grid item key={ticket.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                  transition: 'all 0.3s'
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={ticket.imageUrl || 'https://via.placeholder.com/400x200'}
                alt={ticket.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={ticket.category}
                    size="small"
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={ticket.status}
                    size="small"
                    color={getStatusColor(ticket.status) as any}
                  />
                </Box>

                <Typography variant="h6" gutterBottom>
                  {ticket.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {ticket.description.slice(0, 100)}...
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ mr: 1 }}>
                    Venue:
                  </Typography>
                  <Typography variant="body2">
                    {ticket.venue}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mr: 1 }}>
                    Date:
                  </Typography>
                  <Typography variant="body2">
                    {new Date(ticket.date).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ mt: 'auto', pt: 2 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    ${ticket.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Available: {ticket.availableSeats} seats
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate(`/tickets/${ticket.id}`)}
                      disabled={ticket.status === 'soldout'}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate(`/tickets/${ticket.id}?action=select-seats`)}
                      disabled={ticket.status === 'soldout'}
                      startIcon={<EventSeatIcon />}
                    >
                      Select Seats
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredTickets.length === 0 && !loading && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          bgcolor: 'background.paper',
          borderRadius: 1
        }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No tickets found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter criteria
          </Typography>
        </Box>
      )}

      {loading && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          py: 8 
        }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default TicketList; 