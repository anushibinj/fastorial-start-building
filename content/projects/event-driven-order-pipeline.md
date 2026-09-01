## Overview

Build an order pipeline — order placed, payment processed, inventory reserved, shipment created — as a series of events flowing through a queue, rather than one function calling the next in a single request. Each step publishes an event when it completes; the next step listens for that event and does its own work independently. The interesting part isn't the happy path, which is nearly identical to a normal function-call chain — it's designing what happens when step three fails after steps one and two already succeeded.

## Why it's worth building

Most beginner and intermediate projects are built around request/response: a function calls another function, and if something fails, the whole chain fails together and you roll back or return an error. Real distributed systems don't get that luxury — services fail independently, messages get delivered twice, and "the order pipeline" isn't one process, it's several that have to agree on state without ever sharing memory. Building this teaches you the actual reasoning behind patterns like sagas, idempotency, and dead-letter queues, instead of just recognizing the vocabulary.

## Build this

- An event bus or message queue connecting each pipeline stage (a real queue — Redis Streams, RabbitMQ, or similar — not an in-process event emitter)
- Independent services for at least three stages: order placement, payment processing, inventory reservation, and shipment creation
- Idempotent event handlers, so a redelivered message doesn't double-charge or double-reserve stock
- A compensation path for partial failure: if inventory reservation fails after payment succeeded, the pipeline has to issue a refund event, not just log an error
- A dead-letter queue for events that fail repeatedly, plus a way to inspect and manually resolve them

## The constraint that makes it real

Payment succeeding and inventory reservation failing is not a corner case here — it's the whole point of the project. Once payment and inventory are separate services communicating over events, you no longer get an atomic transaction across both; you have to design an explicit compensation path (a refund event triggered by the reservation failure) and make every handler idempotent, because message queues guarantee at-least-once delivery, not exactly-once. If you build only the happy path, you haven't actually built an event-driven system — you've built a chain of function calls with extra latency.

## What you'll practice

- Event-driven architecture and asynchronous service boundaries
- Idempotency and handling at-least-once delivery correctly
- Saga/compensation patterns for distributed transactions
- Dead-letter queues and failure recovery
- Reasoning about partial failure across independent services, not just single-process error handling
