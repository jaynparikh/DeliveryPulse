# DeliveryPulse AI Copilot

## Overview

The DeliveryPulse AI Copilot explores how generative AI can support project and delivery managers.

It is not designed as a general-purpose chatbot.

Its role is to interpret structured delivery information and help answer management questions such as:

> **Where does my attention need to go?**

---

## Example Questions

Managers can ask questions such as:

> Which project needs my intervention?

> Which projects need attention?

> What are my highest delivery risks?

> Who is overloaded?

> Give me a portfolio summary.

---

## Context-Aware Analysis

Copilot analysis is based on delivery context available within DeliveryPulse.

Relevant information can include:

- Project health
- Project progress
- Target dates
- Project ownership
- Delivery risks
- Risk severity
- Risk status
- Resource allocation
- Resource capacity

This enables responses to reference current portfolio conditions instead of producing generic project-management advice.

---

## Processing Flow

```text
User Question
      |
      v
DeliveryPulse Client
      |
      v
Backend API
      |
      +------------------------+
      |                        |
      v                        v
Portfolio Context         User Question
      |                        |
      +-----------+------------+
                  |
                  v
          Structured AI Prompt
                  |
                  v
            Google Gemini
                  |
                  v
        Delivery Assessment
                  |
                  v
          Copilot Response
```

---

## Backend Integration

Gemini communication occurs through the DeliveryPulse backend.

This architecture provides two important benefits.

### Security

The Gemini API credential does not need to be exposed in the React Native application.

### Context Control

The backend determines which delivery information should be provided to the AI model.

The model therefore analyzes selected portfolio context rather than having unrestricted access to the application's data layer.

---

## Response Philosophy

Copilot responses are designed to distinguish between **facts** and **recommendations**.

### Facts

Facts are observations supported by portfolio information.

Examples:

- A project is marked At Risk.
- A critical delivery risk remains open.
- API integration is behind schedule.
- A resource is allocated above available capacity.

### Recommendations

Recommendations represent management actions derived from those observations.

Examples:

- Escalate a dependency.
- Establish a recovery plan.
- Rebalance resource allocation.
- Increase monitoring around a milestone.

Separating these concepts makes AI-generated analysis easier for a manager to interpret.

---

## Example Use Case

### Question

> Which project needs my intervention?

### Portfolio Evaluation

The Copilot can consider information such as:

- Projects marked At Risk
- Critical and high-severity risks
- Open risk status
- Schedule delays
- Resource capacity pressure

### Response

The Copilot can then identify the highest-priority project and explain:

1. Why the project requires attention.
2. Which facts support the assessment.
3. Which management actions should be considered.

---

## Why Generative AI?

Traditional delivery dashboards are effective at answering:

> **What is the current status?**

Generative AI creates an opportunity to answer a different question:

> **What does this information mean for me as a delivery manager?**

DeliveryPulse therefore treats AI as an **interpretation layer over structured delivery data**.

The AI does not replace delivery-management judgment.

Its purpose is to reduce the effort required to determine **where that judgment should be applied**.

---

## AI Scope

The Copilot is intentionally constrained to the DeliveryPulse portfolio context.

The current implementation demonstrates:

- Natural-language delivery questions
- Portfolio-aware analysis
- Risk prioritization
- Capacity analysis
- Project-health interpretation
- Management-focused recommendations

The objective is to demonstrate a practical application of generative AI within project and delivery management rather than building a general conversational assistant.