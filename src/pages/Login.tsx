import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Stack, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth.isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await auth.login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login error');
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth />
          <Button variant="contained" type="submit">Login</Button>
        </Stack>
      </form>
    </Paper>
  );
}
