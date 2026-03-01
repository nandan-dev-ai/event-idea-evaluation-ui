import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { EventItem } from '../types';
import api from '../utils/api';
import { Typography, Button, Card, CardContent, Stack, Box, CircularProgress, Alert } from '@mui/material';

export default function Home() {
  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const resp = await api.get('/api/event/list');
        setEvents(resp.data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Events</Typography>
        <Button variant="contained" component={RouterLink} to="/create-event">Create event</Button>
      </Stack>

      {loading && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      )}

      {!loading && !error && (
        <Box sx={{ mt: 2, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          {events.length === 0 && (
            <Box>
              <Typography>No events yet.</Typography>
            </Box>
          )}
          {events.map((e) => (
            <Card key={e.id}>
              <CardContent>
                <Typography variant="h6">{e.title}</Typography>
                <Typography color="text.secondary">Launch: {e.launchDate}</Typography>
                <Typography color="text.secondary">Submission: {e.submissionStartDate} → {e.submissionEndDate}</Typography>
                <Button size="small" sx={{ mt: 1 }} component={RouterLink} to={`/submit-idea?eventId=${e.id}`}>
                  Submit idea for this event
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
}
