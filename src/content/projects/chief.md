---
title: Chief
short: "An AI chief of staff on Telegram that remembers every commitment and picks my top 3 each morning."
tagline: An AI chief of staff on Telegram and the terminal. It remembers every commitment, picks today's top 3, and follows up until things close.
role: Solo builder
period: 2026 –
status: In daily use
order: 1
featured: true
stack: [Python, Gemini, SQLite, Telegram, Gmail & Calendar APIs, GCP, GitHub Actions]
---

**Problem.** Productivity loss mostly comes from two failures: forgetting commitments, and not
deciding what matters today. To-do apps store tasks but never decide, never chase, and never
notice drift.

**What I built.** One agent loop with a small set of tools (tasks, calendar, email, memory),
with Telegram and the terminal as thin channels. Ranking is deterministic code with reasons;
the model explains and phrases. A morning brief, an evening wrap-up, a weekly review, and an
autopilot that prepares research and drafts but never sends without approval.

**Shipped.** Tracker, priority scoring, daily brief, Telegram bot, Gmail and Calendar with
preview-before-send, CI/CD to a small GCP VM with automatic rollback, and capture evals.
