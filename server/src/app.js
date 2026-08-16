import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

import prisma from './prisma.js';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'DeliveryPulse API',
  });
});

/*
 * DEMO AUTHENTICATION
 */

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required.',
    });
  }

  const validEmail = process.env.DEMO_EMAIL;
  const validPassword = process.env.DEMO_PASSWORD;

  if (
    email.toLowerCase() !== validEmail?.toLowerCase() ||
    password !== validPassword
  ) {
    return res.status(401).json({
      message: 'Invalid email or password.',
    });
  }

  return res.json({
    success: true,
    user: {
      name: 'Jay Parikh',
      email: validEmail,
      role: 'Delivery Manager',
    },
  });
});

/*
 * PROJECTS
 */

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    res.json(projects);
  } catch (error) {
    console.error('Projects API error:', error);

    res.status(500).json({
      message: 'Unable to retrieve projects.',
    });
  }
});

/*
 * RISKS
 */

app.get('/api/risks', async (req, res) => {
  try {
    const risks = await prisma.risk.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    res.json(risks);
  } catch (error) {
    console.error('Risks API error:', error);

    res.status(500).json({
      message: 'Unable to retrieve risks.',
    });
  }
});

/*
 * RESOURCES
 */

app.get('/api/resources', async (req, res) => {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    res.json(resources);
  } catch (error) {
    console.error('Resources API error:', error);

    res.status(500).json({
      message: 'Unable to retrieve resources.',
    });
  }
});

/*
 * PORTFOLIO SUMMARY
 */

app.get('/api/portfolio-summary', async (req, res) => {
  try {
    const [projects, risks, resources] =
      await Promise.all([
        prisma.project.findMany(),
        prisma.risk.findMany(),
        prisma.resource.findMany(),
      ]);

    const averageProgress =
      projects.length > 0
        ? Math.round(
            projects.reduce(
              (total, project) =>
                total + project.progress,
              0
            ) / projects.length
          )
        : 0;

    res.json({
      activeProjects: projects.length,

      atRiskProjects: projects.filter(
        (project) => project.status === 'AT_RISK'
      ).length,

      watchProjects: projects.filter(
        (project) => project.status === 'WATCH'
      ).length,

      healthyProjects: projects.filter(
        (project) => project.status === 'HEALTHY'
      ).length,

      averageProgress,

      openRisks: risks.filter(
        (risk) => risk.status === 'OPEN'
      ).length,

      highPriorityRisks: risks.filter(
        (risk) =>
          risk.severity === 'CRITICAL' ||
          risk.severity === 'HIGH'
      ).length,

      overloadedResources: resources.filter(
        (resource) =>
          resource.status === 'OVERLOADED'
      ).length,
    });
  } catch (error) {
    console.error(
      'Portfolio summary API error:',
      error
    );

    res.status(500).json({
      message:
        'Unable to retrieve portfolio summary.',
    });
  }
});

/*
 * DELIVERY COPILOT
 */

app.post('/api/copilot', async (req, res) => {
  const { question } = req.body;

  if (!question?.trim()) {
    return res.status(400).json({
      message: 'Question is required.',
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      message: 'Gemini API key is not configured.',
    });
  }

  try {
    const [projects, risks, resources] =
      await Promise.all([
        prisma.project.findMany({
          orderBy: {
            id: 'asc',
          },
        }),

        prisma.risk.findMany({
          orderBy: {
            id: 'asc',
          },
        }),

        prisma.resource.findMany({
          orderBy: {
            id: 'asc',
          },
        }),
      ]);

    const averageProgress =
      projects.length > 0
        ? Math.round(
            projects.reduce(
              (total, project) =>
                total + project.progress,
              0
            ) / projects.length
          )
        : 0;

    const portfolioSummary = {
      activeProjects: projects.length,

      atRiskProjects: projects.filter(
        (project) =>
          project.status === 'AT_RISK'
      ).length,

      watchProjects: projects.filter(
        (project) =>
          project.status === 'WATCH'
      ).length,

      healthyProjects: projects.filter(
        (project) =>
          project.status === 'HEALTHY'
      ).length,

      averageProgress,

      openRisks: risks.filter(
        (risk) => risk.status === 'OPEN'
      ).length,

      highPriorityRisks: risks.filter(
        (risk) =>
          risk.severity === 'CRITICAL' ||
          risk.severity === 'HIGH'
      ).length,

      overloadedResources:
        resources.filter(
          (resource) =>
            resource.status ===
            'OVERLOADED'
        ).length,
    };

const prompt = `
You are DeliveryPulse Copilot, an AI assistant for a project delivery manager.

Your role is to analyze the provided delivery portfolio and give concise, decision-focused management guidance.

Rules:
- Base your answer ONLY on the provided portfolio data.
- Do not invent projects, risks, resources, dates, metrics, or facts.
- Prioritize exceptions, risks, dependencies, capacity pressure, and management actions.
- Write like a delivery manager briefing another delivery manager.
- Be concise and practical.
- Use plain text only.
- Do NOT use Markdown syntax.
- Do NOT use **bold**, # headings, --- separators, tables, or code formatting.
- Use short section labels such as "Priority:", "Why:", and "Recommended actions:".
- Use simple bullet points with • when useful.
- Keep answers mobile-friendly and easy to scan.
- Explicitly distinguish facts from recommendations when needed.
- If the question cannot be answered from the supplied data, say that clearly.
- Do not mention JSON, database records, Gemini, or implementation details.

PORTFOLIO SUMMARY:
${JSON.stringify(portfolioSummary, null, 2)}

PROJECTS:
${JSON.stringify(projects, null, 2)}

RISKS:
${JSON.stringify(risks, null, 2)}

RESOURCES:
${JSON.stringify(resources, null, 2)}

USER QUESTION:
${question}

Provide the DeliveryPulse Copilot response.
`;

    const ai = new GoogleGenAI({
      apiKey:
        process.env.GEMINI_API_KEY,
    });

    const response =
      await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

    const answer =
      response.text?.trim();

    if (!answer) {
      throw new Error(
        'Gemini returned an empty response.'
      );
    }

    return res.json({
      answer,
    });
  } catch (error) {
    console.error(
      'Copilot API error:',
      error
    );

    return res.status(500).json({
      message:
        'Unable to generate DeliveryPulse insight.',
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `DeliveryPulse API running on port ${PORT}`
  );
});