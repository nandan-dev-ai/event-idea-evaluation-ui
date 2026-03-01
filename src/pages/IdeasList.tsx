import React from 'react';
import { getIdeas, getEvents } from '../utils/storage';
import { IdeaItem, EventItem } from '../types';
import { Typography, Card, CardContent, Link, Box } from '@mui/material';

export default function IdeasList() {
  const [ideas] = React.useState<IdeaItem[]>(() => getIdeas());
  const [events] = React.useState<EventItem[]>(() => getEvents());

  const findEventTitle = (id: string) => events.find((e) => e.id === id)?.title ?? 'Unknown event';

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>Submitted Ideas</Typography>
      {ideas.length === 0 && <Typography>No ideas submitted yet.</Typography>}
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        {ideas.map((i) => (
          <Card key={i.id}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">{findEventTitle(i.eventId)}</Typography>
              <Typography variant="h6">{i.ideator}</Typography>
              <Typography><strong>Problem:</strong> {i.problemStatement}</Typography>
              <Typography><strong>Solution:</strong> {i.proposedSolution}</Typography>
              {i.githubLink && <Typography><strong>GitHub:</strong> <Link href={i.githubLink} target="_blank" rel="noreferrer">{i.githubLink}</Link></Typography>}
              {i.keywords && <Typography><strong>Keywords:</strong> {i.keywords}</Typography>}
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
}
