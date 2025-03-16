import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container component="main" maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout; 