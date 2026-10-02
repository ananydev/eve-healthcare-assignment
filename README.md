# EVE Healthcare — MERN Backend Engineering Assignment

A production-minded diagnostic test booking and simulated payment platform built using the user's current MERN stack: React, Node.js, Express.js and MongoDB.

## Why MERN
The assignment allows any backend framework. This implementation uses Node.js + Express.js + MongoDB, matching my existing stack and demonstrating REST APIs, authentication, data modelling, authorization, validation and payment/webhook handling.

## Features
- JWT authentication: signup/login
- Password hashing with bcrypt
- Diagnostic centres and tests
- Centre-specific test pricing
- Authenticated bookings
- Booking lifecycle: PENDING, CONFIRMED, FAILED, CANCELLED
- Simulated payment endpoint
- Idempotent payment webhook using unique event IDs and provider IDs
- Authorization checks
- Appointment slot conflict prevention
- Zod request validation
- Helmet, CORS, rate limiting and structured request logging
- Docker Compose for MongoDB + API + React frontend
- React demo UI for centres, authentication, bookings and mock payments

## Architecture
React client → Express REST API → Service/route layer → Mongoose models → MongoDB.

Payment flow:
1. User creates a booking → PENDING.
2. Client calls POST /api/payments.
3. Mock provider produces SUCCESS/FAILED.
4. A Payment document is created once and the booking becomes CONFIRMED/FAILED.
5. Provider webhook POST /api/payments/webhook can update payment state.
6. eventId has a unique database index, so replaying the same event returns the existing payment rather than creating another payment.

## API
### Auth
POST `/api/auth/signup`
```json
{"name":"Anany","email":"anany@example.com","password":"secret123"}
```
POST `/api/auth/login`

### Centres
GET `/api/centres`
POST `/api/centres` (ADMIN)
POST `/api/centres/:id/tests` (ADMIN)
GET `/api/centres/:id`

### Booking
POST `/api/bookings`
```json
{"testId":"TEST_ID","centreId":"CENTRE_ID","appointmentAt":"2026-10-05T10:30:00.000Z"}
```
GET `/api/bookings/mine`
GET `/api/bookings/:id`
PATCH `/api/bookings/:id/cancel`

### Payment
POST `/api/payments`
```json
{"bookingId":"BOOKING_ID"}
```

POST `/api/payments/webhook`
```json
{"eventId":"evt_001","providerPaymentId":"pay_001","bookingId":"BOOKING_ID","status":"SUCCESS","amount":499}
```

## Important assumptions
- A test belongs to exactly one diagnostic centre.
- Price is stored on the test and copied into the booking so historical bookings remain financially consistent if a test price changes later.
- A centre/test/appointment slot cannot have another active booking.
- Only the booking owner or an admin can view/cancel a booking.
- Webhooks are treated as at-least-once delivery and therefore must be safe to replay.
- Mock payment success is probabilistic for demonstration; real payment gateways are intentionally not integrated.

## Run locally
### Docker
```bash
docker compose up --build
```
React: http://localhost:5173
API: http://localhost:5000
Health: http://localhost:5000/api/health

### Without Docker
1. Start MongoDB locally.
2. `cd server && npm install`
3. Copy `.env.example` to `.env` and set values.
4. `npm run dev`
5. `cd client && npm install && npm run dev`

## Testing strategy
The important cases to test are successful signup/login, duplicate email, invalid JWT, centre/test mismatch, past appointments, duplicate slots, unauthorized booking access, successful/failed payments, cancelled bookings, duplicate webhook event IDs and amount mismatch.

## Improvements with more time
- Dedicated service/repository layers
- MongoDB transactions around payment state changes
- Redis caching
- BullMQ/Celery-equivalent background webhook processing
- OpenAPI/Swagger generation
- More complete integration tests using an ephemeral MongoDB
- Pagination/filtering for centres and bookings
- Refresh tokens and token rotation
- Webhook signature verification
- Structured JSON logging and monitoring
- CI pipeline with lint/test/build/security checks
