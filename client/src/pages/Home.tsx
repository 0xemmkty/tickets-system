import React from 'react';
import { Typography, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome {user?.email}
      </Typography>
      <Typography variant="body1">
        This is a microservices-based ticket selling application.
      </Typography>
    </Box>
  );
};

export default Home; 