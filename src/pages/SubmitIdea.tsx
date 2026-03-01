import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveIdea } from '../utils/storage';
import { IdeaItem, EventItem } from '../types';
import api from '../utils/api';
import { Paper, Typography, TextField, Button, Stack, MenuItem, Select, InputLabel, FormControl, CircularProgress, Alert } from '@mui/material';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SubmitIdea() {
  const navigate = useNavigate();
  const query = useQuery();
  const preEventId = query.get('eventId') || '';

  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [eventsLoading, setEventsLoading] = React.useState(false);
  const [eventsError, setEventsError] = React.useState<string | null>(null);
  const [eventId, setEventId] = React.useState(preEventId);
  const [ideator, setIdeator] = React.useState('');
  const [problemStatement, setProblemStatement] = React.useState('');
  const [proposedSolution, setProposedSolution] = React.useState('');
  const [githubLink, setGithubLink] = React.useState('');
  const [keywords, setKeywords] = React.useState('');

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEventsLoading(true);
        setEventsError(null);
        const resp = await api.get('/api/event/list');
        const loadedEvents = resp.data || [];
        setEvents(loadedEvents);
        if (preEventId) {
          setEventId(preEventId);
        } else if (loadedEvents.length > 0) {
          setEventId(loadedEvents[0].id);
        }
      } catch (err: any) {
        setEventsError(err.message || 'Failed to load events');
        setEvents([]);
      } finally {
        setEventsLoading(false);
      }
    };
    fetchEvents();
  }, [preEventId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const idea: IdeaItem = {
      id: Date.now().toString(),
      eventId,
      ideator,
      problemStatement,
      proposedSolution,
      githubLink,
      keywords,
    };
    saveIdea(idea);
    navigate('/ideas');
  }

  if (eventsLoading) {
    return <CircularProgress />;
  }

  if (eventsError) {
    return <Alert severity="error">{eventsError}</Alert>;
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 900 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Submit Idea</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="event-select-label">Event</InputLabel>
            <Select labelId="event-select-label" label="Event" value={eventId} onChange={(e) => setEventId(e.target.value)} required>
              <MenuItem value="">-- select event --</MenuItem>
              {events.map((ev: EventItem) => (
                <MenuItem key={ev.id} value={ev.id}>{ev.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Ideator" value={ideator} onChange={(e) => setIdeator(e.target.value)} required fullWidth />
          <TextField label="Problem Statement" value={problemStatement} onChange={(e) => setProblemStatement(e.target.value)} required fullWidth multiline minRows={3} />
          <TextField label="Proposed Solution" value={proposedSolution} onChange={(e) => setProposedSolution(e.target.value)} required fullWidth multiline minRows={3} />
          <TextField label="GitHub Link" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} fullWidth />
          <TextField label="Keywords (comma separated)" value={keywords} onChange={(e) => setKeywords(e.target.value)} fullWidth />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" type="submit">Submit Idea</Button>
            <Button variant="outlined" onClick={() => navigate('/')}>Cancel</Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
