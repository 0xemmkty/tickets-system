import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Home';
import TicketList from './pages/tickets/TicketList';
import CreateTicket from './pages/tickets/CreateTicket';
import OrderList from './pages/orders/OrderList';
import OrderDetail from './pages/orders/OrderDetail';
import TicketDetail from './pages/tickets/TicketDetail';
import EditTicket from './pages/tickets/EditTicket';
import AdminTickets from './pages/admin/AdminTickets';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReports from './pages/admin/AdminReports';
import UserProfile from './pages/profile/UserProfile';

const theme = createTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'tickets', element: <TicketList /> },
      { path: 'tickets/new', element: <CreateTicket /> },
      { path: 'tickets/:id', element: <TicketDetail /> },
      { path: 'tickets/:id/edit', element: <EditTicket /> },
      { path: 'orders', element: <OrderList /> },
      { path: 'orders/:id', element: <OrderDetail /> },
      { path: 'admin/tickets', element: <AdminTickets /> },
      { path: 'admin/orders', element: <AdminOrders /> },
      { path: 'admin/users', element: <AdminUsers /> },
      { path: 'admin/reports', element: <AdminReports /> },
      { path: 'profile', element: <UserProfile /> }
    ]
  }
], {
  future: {
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 