import { EventItem, IdeaItem } from '../types';

const EVENTS_KEY = 'iep_events_v1';
const IDEAS_KEY = 'iep_ideas_v1';

export function getEvents(): EventItem[] {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveEvent(e: EventItem) {
  const events = getEvents();
  events.unshift(e);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

export function getIdeas(): IdeaItem[] {
  try {
    const raw = localStorage.getItem(IDEAS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveIdea(i: IdeaItem) {
  const ideas = getIdeas();
  ideas.unshift(i);
  localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
}

// token helpers
const TOKEN_KEY = 'iep_token';

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

