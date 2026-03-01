import React from 'react';
import { useNavigate } from 'react-router-dom';
import { saveEvent } from '../utils/storage';
import api from '../utils/api';
import { EventItem } from '../types';
import { TextField, Button, Stack, Typography, Paper } from '@mui/material';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [launchDate, setLaunchDate] = React.useState('');
  const [submissionStartDate, setSubmissionStartDate] = React.useState('');
  const [submissionEndDate, setSubmissionEndDate] = React.useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // prepare payload for API
    const payload = {
      title,
      status: 'CREATED',
      eventLaunchDate: launchDate,
      eventSubmissionStartDate: submissionStartDate,
      eventSubmissionEndDate: submissionEndDate,
    };
    try {
      await api.post('/api/event/add-event', payload);
      // optionally store locally as well for UI
      const ev: EventItem = {
        id: Date.now().toString(),
        title,
        launchDate,
        submissionStartDate,
        submissionEndDate,
      };
      saveEvent(ev);
      navigate('/');
    } catch (err: any) {
      alert(err.message || 'Failed to create event');
    }
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 700 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Create Event</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
          <TextField label="Launch Date" type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} InputLabelProps={{ shrink: true }} required />
          <TextField label="Submission Start Date" type="date" value={submissionStartDate} onChange={(e) => setSubmissionStartDate(e.target.value)} InputLabelProps={{ shrink: true }} required />
          <TextField label="Submission End Date" type="date" value={submissionEndDate} onChange={(e) => setSubmissionEndDate(e.target.value)} InputLabelProps={{ shrink: true }} required />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" type="submit">Create</Button>
            <Button variant="outlined" onClick={() => navigate('/')}>Cancel</Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
