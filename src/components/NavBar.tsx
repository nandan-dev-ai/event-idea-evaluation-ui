import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Event Evaluator
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Events
          </Button>
          <Button color="inherit" component={RouterLink} to="/create-event">
            Create Event
          </Button>
          <Button color="inherit" component={RouterLink} to="/submit-idea">
            Submit Idea
          </Button>
          <Button color="inherit" component={RouterLink} to="/ideas">
            Ideas
          </Button>
          {auth.isAuthenticated && (
            <Button color="inherit" onClick={() => { auth.logout(); navigate('/login'); }}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
