export interface EventItem {
  id: string;
  title: string;
  launchDate: string;
  submissionStartDate: string;
  submissionEndDate: string;
}

export interface IdeaItem {
  id: string;
  eventId: string;
  ideator: string;
  problemStatement: string;
  proposedSolution: string;
  githubLink?: string;
  keywords?: string;
}
