import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Chip
} from '@mui/material';
import { ticketsService } from '../../services/tickets';

type Category = 'concert' | 'sports' | 'movie';
type Status = 'draft' | 'published' | 'soldout' | 'cancelled';

interface TicketFormData {
  title: string;
  description: string;
  price: string;
  category: Category;
  venue: string;
  date: string;
  totalSeats: string;
  status: Status;
}

const categories = [
  { value: 'concert', label: 'Concert' },
  { value: 'sports', label: 'Sports' },
  { value: 'movie', label: 'Movie' }
];

const statuses = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'soldout', label: 'Sold Out' },
  { value: 'cancelled', label: 'Cancelled' }
];

const EditTicket = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TicketFormData>({
    title: '',
    description: '',
    price: '',
    category: 'concert',
    venue: '',
    date: '',
    totalSeats: '',
    status: 'draft'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const response = await ticketsService.getOne(parseInt(id!));
        const ticket = response.data;
        setFormData({
          title: ticket.title,
          description: ticket.description,
          price: ticket.price.toString(),
          category: ticket.category as Category,
          venue: ticket.venue,
          date: ticket.date.split('T')[0],
          totalSeats: ticket.totalSeats.toString(),
          status: ticket.status as Status
        });
      } catch (err) {
        setError('Failed to load ticket');
      }
    };

    if (id) {
      loadTicket();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ticketData = {
        ...formData,
        price: parseFloat(formData.price),
        totalSeats: parseInt(formData.totalSeats)
      };

      if (id) {
        await ticketsService.update(parseInt(id), ticketData);
      } else {
        await ticketsService.create(ticketData);
      }
      navigate('/tickets');
    } catch (err: any) {
      setError(err.response?.data?.errors?.[0]?.message || 'An error occurred');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Ticket' : 'Create Ticket'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Title"
              fullWidth
              required
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              fullWidth
              required
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="price"
              label="Price"
              type="number"
              fullWidth
              required
              value={formData.price}
              onChange={handleChange}
              InputProps={{
                startAdornment: <Typography>$</Typography>
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                label="Category"
                onChange={handleChange as any}
              >
                {categories.map(cat => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="venue"
              label="Venue"
              fullWidth
              required
              value={formData.venue}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="date"
              label="Date"
              type="date"
              fullWidth
              required
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="totalSeats"
              label="Total Seats"
              type="number"
              fullWidth
              required
              value={formData.totalSeats}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange as any}
              >
                {statuses.map(status => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/tickets')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {id ? 'Update' : 'Create'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditTicket; 