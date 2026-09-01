## Overview

An expense tracker sounds like the most boring project on this list — until you add the constraint that makes it real: budget alerts. You're not just logging rows in a table anymore; you're aggregating spending by category and time window, comparing it against a budget the user actually set, and deciding, correctly, when to warn them. That's the difference between a CRUD form and a tool someone would keep open. Store transactions with amount, category, and date, let the user define a monthly budget per category, and surface an alert the moment they're projected to go over — not just after they already have.

## Why it's worth building

Every beginner builds a CRUD app at some point, and most of them are forgettable because the logic stops at "save to database, display in a list." This one forces you past that, because the interesting part — figuring out whether someone is on track to overspend before the month is out — can't be faked with a static query. You have to think about partial months, categories with no spending yet, and what "on track" even means mathematically. It's a small project with a genuinely non-trivial core, which is exactly the sweet spot for a first real portfolio piece.

## Build this

- A form to log an expense with amount, category, and date
- Per-category monthly budgets the user can set and edit
- A dashboard view showing spend-to-budget per category, updated live as expenses are added
- A projected-overspend warning that estimates month-end spend from the current pace, not just current total
- A history view filterable by category and date range

## The constraint that makes it real

The alert can't just fire when `spent > budget` — by then it's too late to be useful. The real constraint is projecting forward: if it's day 10 of a 30-day month and someone's already spent 40% of their grocery budget, that's a different situation than spending 40% on day 25. You have to pick a projection method (linear pace is fine to start), defend why it's reasonable, and handle the edge cases — a category with one expense on day 1, a budget set mid-month, a category with no budget at all. Getting this logic right, and explaining your reasoning for it, is what turns this from a form into a small piece of engineering.

## What you'll practice

- Data aggregation and grouping (by category, by time window)
- Designing a data model that supports both transactions and budgets cleanly
- Writing and testing logic with real edge cases, not just the happy path
- Basic date math (partial months, day-of-month pacing)
- Turning a vague product idea ("warn me before I overspend") into a precise, testable rule
