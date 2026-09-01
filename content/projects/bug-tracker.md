## Overview

A simple bug tracker is a CRUD app on the surface, but built from the tester's side of the fence it becomes a workflow problem: bugs have statuses that can only move in certain directions, priorities that should drive what shows up first, and a triage view that has to make sense to someone scanning it under pressure. Build a tracker where users can file a bug with a title, description, severity, and status, move it through a defined workflow (say, `open → in progress → in review → closed`, plus a `reopened` path), and filter/sort the list the way an actual QA team would need to.

## Why it's worth building

If you've worked in QA, you already know what makes a bug tracker useful or useless in practice — the state transitions that should be blocked, the fields people skip if you let them, the sort order that actually matters when triaging twenty new bugs at once. That knowledge is a real advantage here: most beginners building a bug tracker just build a generic CRUD list, but you can build one that encodes real workflow rules, because you've lived on the other side of a badly designed one.

## Build this

- Bug creation with title, description, severity, and reporter
- A status workflow with enforced valid transitions (no jumping straight from `open` to `closed` without a reason)
- A `reopened` path that's distinct from a fresh bug, and shows in its history
- A triage view sortable by severity and filterable by status
- A basic activity log per bug (status changes, at minimum) so you can see how it got where it is

## The constraint that makes it real

The workflow has to be enforced, not just displayed — the whole point is that a bug in `open` shouldn't be movable straight to `closed` without passing through `in review`, because that's exactly the kind of shortcut that causes real bugs to slip through in real trackers. That means your data model needs a notion of valid transitions, your API needs to reject invalid ones with a clear error, and your UI needs to only offer the moves that are actually legal from the current state. It's a small state machine, and getting it right is the difference between a toy list and something that models how triage actually works.

## What you'll practice

- Modeling a state machine and enforcing valid transitions at the data layer, not just the UI
- Designing list views for scanning under pressure (sort, filter, severity-first ordering)
- Building an activity/audit log tied to state changes
- Translating domain knowledge (how triage actually works) into product decisions
- Writing validation that gives a specific, useful error instead of a generic rejection
