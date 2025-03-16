import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1
            }}
          >
            Ticket System
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/tickets"
            >
              Buy Tickets
            </Button>

            {user ? (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/orders"
                >
                  My Orders
                </Button>

                {user.role === 'admin' && (
                  <>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/tickets/new"
                    >
                      Create Ticket
                    </Button>
                    <IconButton
                      color="inherit"
                      onClick={handleMenuOpen}
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        component={RouterLink}
                        to="/admin/tickets"
                        onClick={handleMenuClose}
                      >
                        Ticket Management
                      </MenuItem>
                      <MenuItem
                        component={RouterLink}
                        to="/admin/orders"
                        onClick={handleMenuClose}
                      >
                        Order Management
                      </MenuItem>
                      <MenuItem
                        component={RouterLink}
                        to="/admin/users"
                        onClick={handleMenuClose}
                      >
                        User Management
                      </MenuItem>
                      <MenuItem
                        component={RouterLink}
                        to="/admin/reports"
                        onClick={handleMenuClose}
                      >
                        Reports
                      </MenuItem>
                    </Menu>
                  </>
                )}

                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  size="small"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/profile"
                    onClick={handleMenuClose}
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    signOut();
                  }}>
                    Sign Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/signin"
                >
                  Sign In
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/signup"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 