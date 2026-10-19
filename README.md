# Gym Me Coach

A web app that builds and adapts a personal triathlon training plan, with an AI coach that explains
it.

> **Status:** early setup (phase F0). No application code yet.

## The idea

- **Seven quick questions** (goal race, current level, available time, equipment, health check,
  food habits, date event) produce a week-by-week plan up to race day
- A **rule-based engine** (`PlanEngine`) builds the plan: same answers, same plan, every rule
  covered by automated tests
- After each session the athlete logs three things in ten seconds (done or skipped, duration,
  effort); the engine adapts the plan every week
- An **AI coach** (Claude API, server side only) explains sessions and suggests changes. Every
  suggestion is checked against the engine's rules before the athlete sees it, and the athlete
  accepts or rejects it

**The engine decides, the AI explains and advises, the athlete approves.**

## Planned stack

- **Backend:** ASP.NET Core on .NET 10 (LTS), REST API, EF Core + PostgreSQL, ASP.NET Identity + JWT,
  FluentValidation, Serilog, xUnit
- **Engine:** standalone .NET library with no database or web dependencies
- **Frontend:** Angular (standalone components, signals) + PrimeNG, installable as a PWA
- **Hosting:** Azure App Service and Azure Static Web Apps, EU region

## Roadmap

| Version | Scope |
|---|---|
| v0.1 | Plan engine with tests |
| v0.5 | Personal use: setup questions, Today, Plan, Log, Progress |
| v1.0 | MVP: nutrition, AI coach, privacy and consent, demo data |
| v1.1 | Public opening after a privacy review |

## Disclaimer

Training plans and meal examples are indicative. They do not replace a doctor, a qualified coach
or a nutritionist.
