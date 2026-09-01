## Overview

Build a single Slack-style channel — one room, real-time messages, and live presence showing who's currently online and who's typing. This is the project where "it works if you refresh the page" stops being an acceptable definition of done. Messages need to appear for everyone in the channel without a reload, presence needs to update as people join and leave, and typing indicators need to show up and disappear on their own within a second or two of being accurate.

## Why it's worth building

Realtime is a genuine step up in complexity from request/response CRUD, and it's a step almost every intermediate developer eventually has to take — chat, live dashboards, collaborative editing, and multiplayer features all share the same underlying problem. Building one real-time feature end to end (a persistent connection, server-pushed updates, and client state that has to reconcile with what the server says) teaches you the pattern once so you recognize it everywhere else. It's also one of the most satisfying projects to demo, because "watch it update live in two browser windows" sells itself.

## Build this

- A single channel where authenticated users can post and see messages appear instantly for everyone connected
- A WebSocket (or equivalent) connection layer that reconnects gracefully on drop
- A presence list showing who's currently connected, updated as people join and leave
- A typing indicator that appears while someone is actively typing and disappears shortly after they stop
- Message persistence, so refreshing the page loads history instead of an empty channel

## The constraint that makes it real

Presence and typing state are inherently ephemeral and prone to drift — a browser tab can close without a clean disconnect, a network blip can leave a "still typing" indicator stuck on forever if you're not careful. The real work is handling the unhappy path: timeouts for stale presence, debouncing typing events so you're not spamming the server on every keystroke, and reconciling client state when the connection drops and reconnects mid-session. A demo that only works when nobody's connection ever hiccups isn't actually done.

## What you'll practice

- Persistent connections (WebSockets or Server-Sent Events) instead of request/response
- Reconciling client-side state with server-pushed updates
- Debouncing and timeout-based cleanup for ephemeral state
- Graceful reconnection handling
- Designing a data model that separates persistent data (messages) from ephemeral data (presence, typing)
