# DeliveryPulse

### AI-Powered Project Delivery Intelligence

DeliveryPulse is a portfolio-level project delivery management application designed to help delivery managers identify project exceptions, delivery risks, capacity constraints, and management priorities from a single interface.

Rather than focusing only on project tracking, DeliveryPulse is built around a simple question:

> **Where does management attention need to go next?**

The application combines portfolio data with AI-powered delivery analysis to provide decision-focused insights across projects, risks, resources, and delivery health.

---

## Key Features

### Portfolio Dashboard

Provides a management-level view of:

- Active projects
- Projects requiring attention
- Portfolio delivery progress
- Open delivery risks
- High-priority risks
- Resource capacity concerns

The dashboard highlights exceptions instead of requiring managers to inspect every project individually.

### Project Management

View project-level information including:

- Delivery status
- Progress
- Target date
- Project owner
- Delivery risk
- Management assessment

Projects are classified as:

- Healthy
- Watch
- At Risk

### Risk Management

Centralized delivery risk tracking with:

- Risk severity
- Risk status
- Project association
- Risk owner
- Description
- Recommended management action

Risk detail screens provide additional delivery assessment and management context.

### Resource Capacity

Monitor resource allocation and identify capacity pressure.

DeliveryPulse highlights:

- Current allocation
- Available capacity
- Overloaded resources
- Project assignment
- Capacity assessment

This helps identify delivery risk created by sustained resource over-allocation.

### Daily Delivery Brief

DeliveryPulse automatically generates a short management brief based on current portfolio data.

The brief prioritizes actions such as:

- Reviewing At Risk projects
- Acting on critical delivery risks
- Monitoring Watch projects
- Addressing overloaded resources

The objective is to convert delivery data into a short list of management actions.

### AI Delivery Copilot

The DeliveryPulse Copilot allows managers to ask natural-language questions about their delivery portfolio.

Example questions:

- Which project needs my intervention?
- Which projects need attention?
- What are my highest delivery risks?
- Who is overloaded?
- Give me a portfolio summary.

The Copilot combines current project, risk, and resource data with an AI model to produce management-focused responses.

---

## Application Screens

### Dashboard

![DeliveryPulse Dashboard](screenshots/dashboard.png)

### Projects

![Projects](screenshots/projects.png)

### Project Details

![Project Details](screenshots/project-details.png)

### Risks

![Risks](screenshots/risks.png)

### Resource Capacity

![Resources](screenshots/resources.png)

### Daily Delivery Brief

![Daily Delivery Brief](screenshots/daily-brief.png)

### AI Delivery Copilot

![Delivery Copilot](screenshots/copilot.png)

---

## Technology Stack

### Mobile / Frontend

- React Native
- Expo
- TypeScript
- Expo Router

### Backend

- Node.js
- Express
- TypeScript
- REST APIs

### Database

- PostgreSQL
- Prisma ORM

### AI

- Google Gemini
- `@google/genai`

### Development

- VS Code
- Git
- GitHub

---

## Architecture

DeliveryPulse uses a layered architecture:

```text
React Native / Expo
        |
        | REST API
        v
Node.js / Express
        |
        +------------------+
        |                  |
        v                  v
 PostgreSQL             Gemini
   Prisma               AI API
