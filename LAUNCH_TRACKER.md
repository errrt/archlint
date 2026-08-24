# ArchLint Launch Tracker

This document tracks product signals after the first public launch. Update it at
24 hours, 7 days, and 30 days after posting. Numbers are useful, but direct user
feedback and repeated usage matter more than impressions alone.

## Baseline

Recorded on 2026-08-24 (JST), before the first launch posts.

| Metric | Baseline |
| --- | ---: |
| npm version | 0.1.1 |
| GitHub stars | 0 |
| GitHub forks | 0 |
| Open GitHub issues | 0 |
| npm weekly downloads | Not yet available from the npm downloads API (new package) |

## Launch posts

Add the final URL and exact posting time immediately after each post goes live.

| Channel | Planned time (JST) | Posted at | URL |
| --- | --- | --- | --- |
| Hacker News | 2026-08-25 21:00 |  |  |
| X | 2026-08-26 21:00 |  |  |
| Reddit | 2026-08-27 21:00 |  |  |

## Checkpoints

| Checkpoint | Confirmed repositories using ArchLint | Weekly active repositories | Concrete rule requests | Willing to pay | npm downloads | GitHub stars | Notes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Baseline | 0 | 0 | 0 | 0 | N/A | 0 | Before launch |
| 24 hours |  |  |  |  |  |  |  |
| 7 days |  |  |  |  |  |  |  |
| 30 days |  |  |  |  |  |  |  |

### How to count

- **Confirmed repositories using ArchLint:** repositories whose owners report
  using it, or public repositories where its configuration/workflow is visible.
- **Weekly active repositories:** confirmed repositories that ran ArchLint in
  the preceding seven days. Do not treat npm downloads as active usage.
- **Concrete rule requests:** specific enforceable constraints users want, not
  general praise or feature ideas.
- **Willing to pay:** users who explicitly ask for pricing, a paid plan, or say
  they would pay for a named capability.
- **npm downloads, stars, and impressions:** discovery signals only. They are
  supporting evidence, not proof of retained usage.

## Feedback log

Copy the user's wording as closely as possible. One comment can contain more
than one signal.

| Date | Channel | User/repository | Signal | Exact wording or link | Follow-up/action |
| --- | --- | --- | --- | --- | --- |
|  |  |  | `NEW_RULE` / `FALSE_POSITIVE` / `LANGUAGE_REQUEST` / `INTEGRATION_REQUEST` / `SEMANTIC_RULE` / `TEAM_FEATURE` / `OTHER` |  |  |

## Decision guide after 30 days

- **Continue:** around 100 confirmed repositories, 10 weekly active
  repositories, 5 concrete rule requests, and 2 users willing to pay for
  semantic or team features.
- **Iterate:** 30-99 confirmed repositories with some genuine usage, but a
  clear retention, onboarding, or positioning problem.
- **Stop or reposition:** fewer than 30 confirmed repositories, weak repeat
  usage, and very few concrete rule requests after deliberate outreach.

These are decision prompts, not automatic rules. Record what happened and why
before deciding what to build next.
