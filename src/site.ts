// Everything personal about the site lives here. Edit freely.
export const site = {
  name: 'Sudhakar Reddy Alla',
  shortName: 'Sudhakar',
  title: 'Sudhakar Reddy Alla — AI product manager & builder',
  description:
    'AI product manager and former founder. I build AI agents, measure them with evals, and write about shipping AI products.',
  location: 'Bengaluru, India',
  email: 'reddysudhakaralla@gmail.com',
};

// Shown as icons in the header. Leave a url empty ('') to hide it.
export const socials = [
  { label: 'X', icon: 'x', url: 'https://x.com/sudhakar__reddy' },
  { label: 'GitHub', icon: 'github', url: 'https://github.com/reddyallasudhakar' },
  { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/sudhakarreddyalla' },
  { label: 'Email', icon: 'email', url: `mailto:${site.email}` },
].filter((s) => s.url) as { label: string; icon: 'x' | 'github' | 'linkedin' | 'email'; url: string }[];
