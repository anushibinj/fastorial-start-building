## Overview

A URL shortener is a classic beginner project, but the version worth building isn't just "long URL in, short code out." Add expiry and click analytics, and suddenly you're dealing with collision-resistant code generation, a redirect path that has to check expiry before it does anything else, and an analytics pipeline that has to record a click without slowing the redirect down. Users submit a URL and optionally an expiry window; the app generates a short code, stores the mapping, and every hit to that short code either redirects and logs the click or returns a clean "this link has expired" page.

## Why it's worth building

It's deceptively small in surface area but touches a handful of real concerns: generating short, unique, non-guessable-enough codes; designing a redirect that's fast because redirects are latency-sensitive by nature; and building even a minimal analytics view (clicks over time, referrers if you can get them) without over-engineering it into a full BI tool. It's also one of the few beginner projects where you can genuinely reason about scale — what happens at a thousand short codes, what happens at a million — even if you never actually hit those numbers.

## Build this

- A submission form that accepts a long URL and an optional expiry (e.g. 24 hours, 7 days, never)
- Short code generation that avoids collisions without just retrying forever
- A redirect route that checks expiry first, then logs the click, then redirects
- A "this link has expired" page for expired codes, distinct from a generic 404
- A per-link analytics view: total clicks, clicks over time, and the expiry countdown

## The constraint that makes it real

The redirect path is on the critical path of someone else's browsing session — every millisecond you spend checking expiry and logging analytics is a millisecond they're staring at a blank tab. The constraint is doing all of that correctly without making the redirect noticeably slow, which means thinking about what has to happen before the redirect (the expiry check, non-negotiable) versus what can happen after or alongside it (the click log, which shouldn't block the response). That ordering decision, and being able to explain it, is the actual engineering content of this project.

## What you'll practice

- Generating unique identifiers and reasoning about collision probability
- Designing an API where response latency actually matters
- Separating "must happen before responding" from "can happen after responding"
- Basic analytics aggregation (clicks over time, grouped by day)
- Handling expired/invalid state distinctly from "not found"
