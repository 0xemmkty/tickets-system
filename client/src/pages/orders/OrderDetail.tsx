import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { ordersService } from '../../services/orders';

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  amount: number;
  seats: string[];
  createdAt: string;
  refundReason?: string;
}

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const response = await ordersService.getOrder(parseInt(id!));
        setOrder(response.data);
      } catch (err) {
        setError('Failed to load order');
      }
    };
    loadOrder();
  }, [id]);

  const handleRefund = async () => {
    try {
      const response = await ordersService.processRefund(parseInt(id!), reason);
      setOrder(response.data);
      setDialogOpen(false);
    } catch (err) {
      setError('Failed to request refund');
    }
  };

  if (!order) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Order Details
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Order Number</Typography>
            <Typography variant="body1">{order.orderNumber}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Status</Typography>
            <Chip label={order.status} color="primary" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Amount</Typography>
            <Typography variant="body1">${order.amount}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Date</Typography>
            <Typography variant="body1">
              {new Date(order.createdAt).toLocaleString()}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">Seats</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {order.seats.map((seat) => (
                <Chip key={seat} label={seat} />
              ))}
            </Box>
          </Grid>

          {order.refundReason && (
            <Grid item xs={12}>
              <Typography variant="subtitle2">Refund Reason</Typography>
              <Typography variant="body1">{order.refundReason}</Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/orders')}
              >
                Back to Orders
              </Button>
              {order.status === 'paid' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setDialogOpen(true)}
                >
                  Request Refund
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Request Refund</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Reason"
            fullWidth
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleRefund} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderDetail; 