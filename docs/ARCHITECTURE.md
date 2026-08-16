# DeliveryPulse Architecture

## Overview

DeliveryPulse follows a client-server architecture separating the user interface, backend services, persistence layer, and AI integration.

```text
┌──────────────────────────────┐
│       DeliveryPulse App      │
│                              │
│   React Native + Expo        │
│       TypeScript             │
└──────────────┬───────────────┘
               │
               │ REST API
               ▼
┌──────────────────────────────┐
│       Backend API            │
│                              │
│    Node.js + Express         │
│       TypeScript             │
└──────────┬───────────┬───────┘
           │           │
           │           │ AI Request
           ▼           ▼
┌────────────────┐  ┌─────────────────┐
│   PostgreSQL   │  │ Google Gemini   │
│                │  │                 │
│   Prisma ORM   │  │ AI Analysis     │
└────────────────┘  └─────────────────┘
```

---

## Frontend Architecture

The DeliveryPulse client is implemented using:

- React Native
- Expo
- TypeScript
- Expo Router

The frontend is responsible for:

- Authentication entry experience
- Portfolio dashboard
- Project views
- Project detail views
- Risk management
- Risk detail views
- Resource capacity
- Resource detail views
- Daily Delivery Brief
- AI Copilot interaction

API access is centralized through the frontend service layer.

---

## Backend Architecture

The backend uses Node.js and Express.

Its responsibilities include:

- Exposing REST APIs
- Retrieving portfolio information
- Managing project data
- Managing delivery risks
- Managing resource information
- Preparing delivery context for AI analysis
- Communicating with the Gemini API

Keeping the AI integration on the backend prevents AI credentials from being exposed in the client application.

---

## Persistence Layer

DeliveryPulse uses PostgreSQL as its relational database.

Prisma provides the ORM layer between the Node.js backend and PostgreSQL.

The primary portfolio entities are:

### Project

Represents a delivery engagement and its current health.

Typical information includes:

- Project name
- Client
- Owner
- Progress
- Delivery status
- Target date
- Current delivery risk

### Risk

Represents a delivery risk associated with a project.

Risk information includes:

- Severity
- Status
- Owner
- Description
- Recommended action

### Resource

Represents team capacity and project allocation.

Resource information includes:

- Name
- Role
- Project assignment
- Capacity
- Allocation
- Capacity status

---

## API Flow

A typical application request follows this pattern:

```text
DeliveryPulse Screen
        |
        v
Frontend Service Layer
        |
        v
REST API
        |
        v
Express Backend
        |
        v
Prisma
        |
        v
PostgreSQL
```

This allows screens to consume backend data without directly accessing the persistence layer.

---

## AI Integration

The DeliveryPulse Copilot communicates with Google Gemini through the backend.

```text
Manager Question
       |
       v
DeliveryPulse Client
       |
       v
Backend API
       |
       +---- Retrieve portfolio context
       |
       v
Structured AI Request
       |
       v
Google Gemini
       |
       v
Management-focused analysis
       |
       v
DeliveryPulse Copilot
```

The model does not require direct access to the database.

Instead, the backend provides relevant structured portfolio context as part of the AI request.

This provides greater control over the information available to the model.

---

## Daily Delivery Brief

The Daily Delivery Brief evaluates portfolio exceptions including:

- At Risk projects
- Critical open risks
- Watch projects
- Resource over-allocation

It converts these conditions into a small number of recommended management actions.

The objective is prioritization rather than comprehensive reporting.

---

## Application Navigation

Expo Router provides file-based navigation.

```text
Login
  |
Dashboard
  |
  +---- Projects
  |       |
  |       +---- Project Details
  |
  +---- Risks
  |       |
  |       +---- Risk Details
  |
  +---- Resources
  |       |
  |       +---- Resource Details
  |
  +---- Daily Delivery Brief
  |
  +---- Delivery Copilot
```

---

## Security Considerations

Sensitive configuration is excluded from source control.

Environment variables are used for information such as:

- PostgreSQL credentials
- Gemini API credentials

`.env` files are excluded through `.gitignore`.

AI requests are performed through the backend rather than exposing AI API credentials in the React Native application.

---

## Architectural Scope

DeliveryPulse is intentionally designed as a focused portfolio demonstration application.

The architecture demonstrates:

- React Native mobile development
- TypeScript
- REST API integration
- Node.js backend development
- Relational persistence
- Prisma ORM
- Generative AI integration
- Delivery-management domain logic

The architecture intentionally avoids unnecessary enterprise infrastructure that would not materially improve the portfolio demonstration.