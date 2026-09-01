## Overview

Build a note-taking app that supports multiple tenants — think multiple companies or workspaces sharing the same deployed application, each with their own users, notes, and folders, completely isolated from each other. The notes app itself (create, edit, organize, search) is the easy part and mostly a formality; the actual project is the tenancy model underneath it, because a single mistake in how you scope queries can let one tenant's user read another tenant's private notes.

## Why it's worth building

Multi-tenancy is how most real B2B software is built, and it's almost never taught directly — you either learn it on the job, under pressure, after a scoping bug already shipped, or you learn it here first. This project forces you to make and defend an explicit architectural choice (shared database with a tenant column, schema-per-tenant, or fully separate databases) and then prove, not just assert, that the isolation actually holds under adversarial testing. It's the kind of project that reads as "understands production systems" to anyone reviewing your portfolio, because the failure mode it prevents is a real, embarrassing, career-relevant one.

## Build this

- User accounts scoped to a tenant/workspace, with invite-based signup into an existing tenant
- Notes and folders, fully CRUD, with search across a tenant's own notes only
- An explicit tenancy strategy (shared-schema with tenant ID, or isolated schemas) — documented and consistent across every query
- An admin view scoped per tenant (user list, usage) that cannot see or be reached from another tenant's context
- A test suite that specifically tries to breach isolation: can user A ever read, list, or search tenant B's data through any route?

## The constraint that makes it real

Every single query that touches tenant data has to be scoped correctly, with no exceptions, and the failure mode when you get it wrong is silent — the query still returns data, it's just the wrong tenant's data, and nothing crashes to tell you. The real work is picking an enforcement strategy that makes the mistake hard to make in the first place (a query helper that requires a tenant ID to compile, row-level security at the database layer, or a middleware that injects tenant scoping automatically) rather than trusting yourself to remember it in every handler. Then you have to write tests that actively try to break isolation — log in as tenant A, attempt to fetch tenant B's note by ID directly — because "I didn't see a bug" is not the same as "isolation is enforced."

## What you'll practice

- Multi-tenant architecture patterns and their tradeoffs (shared schema vs. isolated)
- Designing enforcement mechanisms that make the unsafe path hard to reach, not just discouraged
- Row-level security or query-scoping middleware
- Writing adversarial tests that target a specific security property, not just functionality
- Reasoning about a system from the perspective of "how could this fail silently"
