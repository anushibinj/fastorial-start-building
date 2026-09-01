## Overview

A CLI habit tracker is the anti-tutorial project: no framework, no routing, no component tree to hide logic bugs behind. You run a command, it does one thing, and either the logic is right or it isn't. Build a command-line tool where a user can define habits, check them off day by day, and see their current streak — with everything persisted to a local file between runs, since there's no database and no server keeping state alive for you.

## Why it's worth building

Most beginners learn inside a framework that quietly handles state, persistence, and rendering for them. This project strips all of that away and leaves you with the actual problem: reading and writing structured data to disk correctly, computing a streak from a list of dates without off-by-one errors, and designing a command interface that's pleasant to use from a terminal. It's a great forcing function for understanding what a framework was doing for you all along, and it produces something you can genuinely use every day.

## Build this

- Commands to add a habit, mark it done for today, and list all habits with their current status
- A streak calculation that correctly handles gaps, today-not-yet-done, and multi-day breaks
- Local persistence to a JSON or plain-text file, loaded fresh on every run
- A `stats` view showing longest streak, current streak, and completion rate over the last N days
- Sensible error handling for a corrupted or missing data file, instead of a stack trace

## The constraint that makes it real

Streaks look simple until you have to define them precisely: does marking a habit done on Monday and Wednesday, but missing Tuesday, count as a 1-day streak or a broken one? What does "current streak" mean if today hasn't been marked yet — do you count it as pending or as a break? There's no framework abstraction to paper over an ambiguous definition here; you have to pick a precise rule, write it down, and make the code match it exactly, because every date-math edge case will surface the first time you actually use the tool for a week.

## What you'll practice

- File I/O and choosing a serialization format that's easy to reason about
- Date and streak logic with real edge cases (gaps, timezones, "today" ambiguity)
- Designing a command-line interface with subcommands and clear output
- Defensive parsing of your own persisted data
- Thinking in terms of pure functions you can test without a UI in the way
