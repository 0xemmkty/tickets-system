import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Alert
} from '@mui/material';
import { ticketsService } from '../../services/tickets';

type Category = 'concert' | 'sports' | 'movie';

interface TicketFormData {
  title: string;
  description: string;
  price: string;
  category: Category;
  venue: string;
  date: string;
  totalSeats: string;
}

const categories: { value: Category; label: string }[] = [
  { value: 'concert', label: 'Concert' },
  { value: 'sports', label: 'Sports' },
  { value: 'movie', label: 'Movie' }
];

const CreateTicket = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<TicketFormData>({
    title: '',
    description: '',
    price: '',
    category: 'concert',
    venue: '',
    date: '',
    totalSeats: ''
  });

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
      console.log('Current token:', localStorage.getItem('token'));
      
      await ticketsService.create({
        ...formData,
        price: parseFloat(formData.price),
        totalSeats: parseInt(formData.totalSeats),
        category: formData.category as Category,
        status: 'draft'
      });
      navigate('/tickets');
    } catch (err: any) {
      console.error('Create ticket error:', err);
      setError(err.response?.data?.errors?.[0]?.message || 'An error occurred');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Create New Ticket
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        name="title"
        label="Title"
        fullWidth
        required
        margin="normal"
        value={formData.title}
        onChange={handleChange}
      />

      <TextField
        name="description"
        label="Description"
        fullWidth
        required
        multiline
        rows={4}
        margin="normal"
        value={formData.description}
        onChange={handleChange}
      />

      <TextField
        name="price"
        label="Price"
        type="number"
        fullWidth
        required
        margin="normal"
        value={formData.price}
        onChange={handleChange}
      />

      <TextField
        name="category"
        select
        label="Category"
        fullWidth
        required
        margin="normal"
        value={formData.category}
        onChange={handleChange}
      >
        {categories.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="venue"
        label="Venue"
        fullWidth
        required
        margin="normal"
        value={formData.venue}
        onChange={handleChange}
      />

      <TextField
        name="date"
        label="Date"
        type="datetime-local"
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={formData.date}
        onChange={handleChange}
      />

      <TextField
        name="totalSeats"
        label="Total Seats"
        type="number"
        fullWidth
        required
        margin="normal"
        value={formData.totalSeats}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Create Ticket
      </Button>
    </Box>
  );
};

export default CreateTicket; 