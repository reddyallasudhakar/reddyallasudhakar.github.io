// Things I've read and keep coming back to. Newest first.
// Add an entry: title, who wrote it, year, link, and one line on what I took from it.
export type Reading = {
  title: string;
  by: string;
  year: number;
  url: string;
  takeaway: string;
};

export const reading: Reading[] = [
  {
    title: 'Who Validates the Validators?',
    by: 'Shankar et al.',
    year: 2024,
    url: 'https://arxiv.org/abs/2404.12272',
    takeaway: 'You only find out what "good" means by grading real outputs. Your criteria will drift, and that is normal.',
  },
  {
    title: 'Your AI Product Needs Evals',
    by: 'Hamel Husain',
    year: 2024,
    url: 'https://hamel.dev/blog/posts/evals/',
    takeaway: 'Read your traces and name the failures before you write a single metric.',
  },
  {
    title: 'Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools',
    by: 'Magesh et al.',
    year: 2024,
    url: 'https://arxiv.org/abs/2405.20362',
    takeaway: 'Retrieval does not make legal AI trustworthy on its own. The closest study to the claims work I did.',
  },
  {
    title: 'SPADE: Synthesizing Data Quality Assertions for LLM Pipelines',
    by: 'Shankar et al.',
    year: 2024,
    url: 'https://arxiv.org/abs/2401.03038',
    takeaway: 'The edits people make to a prompt are a map of what they are afraid of. Turn them into checks.',
  },
  {
    title: 'AI Agents That Matter',
    by: 'Kapoor, Narayanan et al.',
    year: 2024,
    url: 'https://arxiv.org/abs/2407.01502',
    takeaway: 'Report cost next to accuracy. A slightly better agent at many times the cost is usually worse.',
  },
  {
    title: 'MemGPT: Towards LLMs as Operating Systems',
    by: 'Packer et al.',
    year: 2023,
    url: 'https://arxiv.org/abs/2310.08560',
    takeaway: 'Manage an agent\'s memory the way an operating system pages memory. Shaped how I think about Chief.',
  },
];
