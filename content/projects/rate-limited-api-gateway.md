## Overview

Build an API gateway that sits in front of one or more backend routes and actually enforces rate limits per client, backed by Redis so the limits hold up across multiple server instances, not just in one process's memory. A client that exceeds their limit gets a proper `429 Too Many Requests` with a `Retry-After` header, not a silent drop or a crash. This is infrastructure code — the kind that has to be correct under concurrent load, not just correct in a single-threaded test.

## Why it's worth building

Rate limiting is one of those things every production API needs and almost no tutorial teaches properly, because doing it correctly requires thinking about concurrency, not just writing a counter. Building it yourself — token bucket or sliding window, backed by Redis for atomicity — forces you to confront race conditions directly: what happens when two requests from the same client hit the limit check at the exact same millisecond? That's a question tutorials skip and production systems can't.

## Build this

- A gateway layer that proxies requests to at least one backend route
- A configurable per-client rate limit (e.g. 100 requests per minute) enforced via Redis
- A `429` response with a correct `Retry-After` header when the limit is exceeded
- Support for at least two rate-limiting strategies (token bucket and sliding window), so you can compare their behavior under burst traffic
- A small load-testing script that fires concurrent requests and verifies the limit actually holds

## The constraint that makes it real

A naive "read the count, check it, increment it" implementation has a race condition: two concurrent requests can both read the same count before either increments it, letting both through when only one should have been allowed. The real work is using Redis's atomic operations (`INCR`, or a Lua script for token bucket logic) so the check-and-increment happens as one atomic step, not two separate ones a race can slip between. You have to actually load-test this with concurrent requests to prove it holds — reasoning about it isn't enough, because race conditions don't show up in a single manual test.

## What you'll practice

- Rate-limiting algorithms (token bucket vs. sliding window) and their tradeoffs
- Atomic operations in Redis and why check-then-act patterns are dangerous under concurrency
- Designing correct HTTP semantics for rejection (status codes, headers)
- Load testing and reasoning about behavior under concurrent access
- Building infrastructure-layer code that sits in front of, not inside, your application logic
