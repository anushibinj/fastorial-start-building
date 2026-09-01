## Overview

Instead of writing tests against an existing framework, build the framework itself: page objects, reusable fixtures, a runner, and a reporter that produces output a team could actually read. Pick a small real target to test against (a public demo site or an app you've already built), then build the scaffolding around it — the part of test automation that usually comes pre-built and that you've probably only ever consumed, never constructed.

## Why it's worth building

You've likely written plenty of tests using someone else's framework — Selenium wrappers, Cypress, Playwright test runners. This project flips that: you build the abstraction layer, which means every design decision a framework author makes (how page objects should be structured, how fixtures set up and tear down state, what a useful failure report looks like) becomes yours to make and defend. That's exactly the skill gap between "writes tests" and "builds testing infrastructure," and it's a direct, visible way to show that QA experience translates into engineering.

## Build this

- A page object layer that encapsulates selectors and actions, not raw locators scattered through test files
- A fixture system for setup/teardown (test data, authenticated sessions, clean state between tests)
- A test runner that executes a suite and collects pass/fail/error results
- An HTML or console reporter that shows failures with enough context to debug without re-running (screenshots, logs, or diffs, depending on target)
- At least one full test suite against a real target, using only your own framework

## The constraint that makes it real

A framework is only as good as its failure reports — a test suite that just prints "3 failed" tells you nothing, and a team that has to re-run tests locally to find out what actually broke will stop trusting the suite within a week. The real constraint is designing the reporter to capture enough context at the moment of failure (what step failed, what was expected, what actually happened, ideally a screenshot or state dump) that someone can diagnose the failure from the report alone. That's the part that turns "a script that runs tests" into "a framework a team could actually adopt."

## What you'll practice

- Framework design: abstraction layers, page objects, and fixture/lifecycle management
- Building a test runner and result-collection system from scratch
- Designing failure output for debuggability, not just pass/fail
- Applying QA judgment (what actually needs testing, what a good failure report looks like) to a building problem
- Structuring a codebase to be extended by other people, not just used by you
