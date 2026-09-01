## Overview

Build a dashboard that pulls your own data from a real provider — GitHub commit and PR activity, Spotify listening history, or a fitness tracker's API all work well — behind real OAuth, not a hardcoded API key. The dashboard should refresh the data, store it so you're not hitting rate limits on every page load, and present a couple of genuinely useful views instead of just dumping the raw API response onto the screen.

## Why it's worth building

OAuth is one of those things every developer eventually has to implement and almost nobody enjoys the first time, because the flow has several steps that all have to be correct — the redirect, the token exchange, the refresh — and a mistake in any one of them fails silently or with an unhelpful error. Building it once, for a provider you actually use, turns "OAuth" from a scary acronym into a flow you understand end to end. It also teaches you to work with a real external API's quirks: rate limits, pagination, and data that doesn't quite match its documentation.

## Build this

- OAuth login against a real provider (GitHub, Spotify, or similar) with proper token storage
- Automatic token refresh when the access token expires, without forcing the user to re-login
- A sync job that pulls new data periodically and caches it, instead of hitting the provider's API on every page load
- At least two meaningful views built from the data (e.g. commits-per-day and top languages for GitHub; listening trends over time for Spotify)
- Graceful handling of provider errors — expired tokens, rate limits, temporary outages

## The constraint that makes it real

Access tokens expire, and a dashboard that just breaks or forces a full re-login every hour isn't actually usable. The real work is implementing the refresh flow correctly — detecting an expired token before or after a failed request, exchanging the refresh token for a new access token, and retrying the original request transparently — so the user never notices the token expired at all. Get this wrong and the whole project degrades into "log in again" every session, which defeats the point of OAuth in the first place.

## What you'll practice

- OAuth 2.0 end to end: authorization redirect, token exchange, and refresh
- Secure token storage and handling
- Working with a real external API: pagination, rate limits, inconsistent data
- Caching and scheduled sync jobs to avoid hammering an external API
- Turning raw API data into a small number of genuinely useful views
