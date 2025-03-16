import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ticketsService } from '../../services/tickets';

interface Ticket {
  id: number;
  title: string;
  price: number;
  category: string;
  venue: string;
  date: string;
  totalSeats: number;
  availableSeats: number;
  status: string;
}

const AdminTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await ticketsService.getAll();
      setTickets(response.data);
    } catch (err) {
      console.error('Failed to load tickets:', err);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, ticketId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticketId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTicket(null);
  };

  const handleStatusChange = async (status: string) => {
    if (!selectedTicket) return;
    try {
      await ticketsService.updateStatus(selectedTicket, status);
      loadTickets();
    } catch (err) {
      console.error('Failed to update ticket status:', err);
    }
    handleMenuClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'default';
      case 'soldout':
        return 'error';
      case 'cancelled':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Ticket Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/tickets/new"
        >
          Create New Ticket
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Available Seats</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.category}</TableCell>
                <TableCell>${ticket.price}</TableCell>
                <TableCell>{ticket.venue}</TableCell>
                <TableCell>{new Date(ticket.date).toLocaleString()}</TableCell>
                <TableCell>
                  {ticket.availableSeats} / {ticket.totalSeats}
                </TableCell>
                <TableCell>
                  <Chip
                    label={ticket.status}
                    color={getStatusColor(ticket.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, ticket.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          component={RouterLink}
          to={`/tickets/${selectedTicket}/edit`}
          onClick={handleMenuClose}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('published')}>
          Publish
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('draft')}>
          Set as Draft
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('cancelled')}>
          Cancel
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminTickets; 