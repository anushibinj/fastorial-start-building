## Overview

Take a project you've already built — ideally one with real tests — and wire up a genuine CI/CD pipeline for it: every push runs lint, typecheck, and tests automatically; every merge to your main branch builds and deploys without you touching a terminal. This isn't a toy pipeline against a hello-world repo; it's the actual automation layer in front of code you care about, which means a broken pipeline has a real cost and a passing one has a real payoff.

## Why it's worth building

CI/CD is infrastructure almost every developer relies on and very few have configured from scratch, because most jobs hand you a pipeline someone else already built. Setting one up yourself — choosing what gates a merge, deciding what triggers a deploy, handling a deploy that partially fails — builds an intuition for the tradeoffs that reading a YAML file someone else wrote never will. It's also one of the most immediately practical projects on this list: you'll use the skill on every team you ever join.

## Build this

- A pipeline that runs on every push: install dependencies, lint, typecheck, run the test suite
- Branch protection so merges to main are blocked if the pipeline fails
- A deploy stage triggered on merge to main, deploying to a real environment (a static host, a small VM, or a platform's free tier)
- Secrets management for anything the deploy needs (API keys, deploy tokens) that never ends up committed to the repo
- A rollback path — either automatic on a failed health check, or a documented one-command manual rollback

## The constraint that makes it real

A pipeline that only handles the successful case isn't done — the real test is what happens when a deploy fails halfway through, or when a bad commit slips past the tests and breaks production anyway. You need a rollback strategy you've actually exercised, not just described, and branch protection that genuinely blocks a failing pipeline from merging rather than just showing a red X that people learn to ignore. The goal is a pipeline you'd trust to gate a project other people depend on, not one that merely runs.

## What you'll practice

- CI pipeline configuration (GitHub Actions, GitLab CI, or similar) from scratch
- Branch protection and merge gating tied to pipeline status
- Automated deployment to a real environment
- Secrets management in a CI context
- Designing and testing a rollback path, not just a happy-path deploy
