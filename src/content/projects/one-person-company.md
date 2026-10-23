---
title: 1PersonCompany
short: "Designing a team of agents that test ideas with real ad money before building anything."
tagline: An operating system for a one-person company — a chief-of-staff agent directing scout, builder, growth and sales agents that test ideas with real money before building.
role: Solo designer & builder
period: 2026 –
status: Designing
order: 4
featured: true
stack: [Python, Postgres + pgvector, Claude Agent SDK, Cloud Run, Terraform]
---

**Idea.** Building is cheap now; qualified traffic and the founder's attention are scarce.
So the system validates before it builds: market signals from 1,186 sources become themes,
themes become hypotheses, and hypotheses become small paid-ad experiments with kill thresholds
fixed in advance.

**Design choices I'm proud of.** Agents are config, not services. One task ledger is the bus.
Autonomy is enforced in code by capability class and taint, not in prompts. Approvals execute
the exact stored payload. "Done" requires evidence. Every mistake becomes a rule via a PR.

**Status.** Ledger, scheduler, idea-engine pipeline, agent configs with evals, landing-page
kit, Terraform and CI exist with tests. The agent runner and tool gateway are next.
