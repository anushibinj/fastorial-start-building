## Overview

Build a scraper that pulls job listings from multiple sources — a couple of public job boards or RSS feeds work well — normalizes them into a common shape, and dedupes the same posting when it appears on more than one source. The unglamorous part is the point: real-world data is messy, the same job gets posted with slightly different titles and formatting across sites, and a pipeline that just appends everything to a list produces a feed full of near-duplicates within a day.

## Why it's worth building

Scraping itself is a solved problem in about twenty minutes; deduping and normalizing scraped data across sources is where the actual engineering lives, and it's a skill that transfers directly to any data pipeline work. This project forces you to design a normalized schema for inherently inconsistent input, build a dedup strategy that's smarter than exact string matching, and think about running the pipeline on a schedule without reprocessing everything from scratch every time.

## Build this

- Scrapers or feed parsers for at least two distinct job sources
- A normalization step that maps each source's fields into one common schema
- A dedup pipeline that catches near-duplicate postings (same role, same company, slightly different title or formatting) — not just exact matches
- Incremental runs: re-running the pipeline should only process new listings, not reprocess everything
- A simple browsable list of the deduped results, filterable by source or company

## The constraint that makes it real

Exact-match deduping catches almost nothing in real job data — "Senior Backend Engineer" and "Senior Backend Engineer (Remote)" from the same company are the same job, but a naive `title === title` check treats them as two. The real constraint is designing a similarity check (normalized title comparison, company + location matching, or a fuzzy-match threshold) that catches genuine duplicates without collapsing genuinely different roles into one — and being able to explain, with examples, why your threshold is where it is.

## What you'll practice

- Web scraping and/or feed parsing across heterogeneous sources
- Designing a normalized schema for messy, inconsistent input
- Fuzzy matching and dedup strategies, and reasoning about false positives vs. false negatives
- Incremental/idempotent pipeline design (don't reprocess what you've already seen)
- Scheduling and running a pipeline repeatedly without manual intervention
