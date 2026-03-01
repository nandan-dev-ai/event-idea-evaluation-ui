import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import SubmitIdea from './pages/SubmitIdea';
import IdeasList from './pages/IdeasList';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import './App.css';

const theme = createTheme();

function RequireAuth({ children }: { children: React.ReactElement }) : React.ReactElement | null {
  const auth = useAuth();
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Container sx={{ py: 4 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="/create-event" element={<RequireAuth><CreateEvent /></RequireAuth>} />
              <Route path="/submit-idea" element={<RequireAuth><SubmitIdea /></RequireAuth>} />
              <Route path="/ideas" element={<RequireAuth><IdeasList /></RequireAuth>} />
            </Routes>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
