import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined.");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seeding DeliveryPulse database...");

  await prisma.risk.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.project.deleteMany();

  await prisma.project.createMany({
    data: [
      {
        name: "Project Phoenix",
        client: "Enterprise IoT Platform",
        owner: "Arjun Mehta",
        progress: 72,
        status: "AT_RISK",
        target: "30 Sep 2026",
        risk: "API integration is 3 days behind schedule.",
      },
      {
        name: "Project Atlas",
        client: "Customer Analytics",
        owner: "Neha Shah",
        progress: 58,
        status: "WATCH",
        target: "15 Oct 2026",
        risk: "5 unresolved UAT defects.",
      },
      {
        name: "Project Nova",
        client: "Mobile Experience",
        owner: "Rahul Patel",
        progress: 84,
        status: "HEALTHY",
        target: "20 Sep 2026",
        risk: "No major risks currently identified.",
      },
      {
        name: "Project Orion",
        client: "Data Modernization",
        owner: "Priya Desai",
        progress: 66,
        status: "HEALTHY",
        target: "12 Nov 2026",
        risk: "Delivery tracking is currently on plan.",
      },
      {
        name: "Project Horizon",
        client: "Cloud Migration",
        owner: "Vivek Shah",
        progress: 41,
        status: "WATCH",
        target: "05 Dec 2026",
        risk: "Cloud environment provisioning is taking longer than planned.",
      },
      {
        name: "Project Vertex",
        client: "AI Transformation",
        owner: "Karan Mehta",
        progress: 91,
        status: "HEALTHY",
        target: "28 Aug 2026",
        risk: "Final validation activities are in progress.",
      },
    ],
  });

  await prisma.risk.createMany({
    data: [
      {
        title: "API integration delay",
        project: "Project Phoenix",
        severity: "CRITICAL",
        status: "OPEN",
        owner: "Arjun Mehta",
        description:
          "API integration is currently three days behind the planned schedule.",
        action:
          "Escalate dependency and agree on a recovery plan with the integration team.",
      },
      {
        title: "UAT defects",
        project: "Project Atlas",
        severity: "HIGH",
        status: "OPEN",
        owner: "Neha Shah",
        description:
          "Five unresolved UAT defects remain before the next delivery milestone.",
        action:
          "Prioritize defect triage and establish daily closure tracking.",
      },
      {
        title: "Resource capacity pressure",
        project: "Project Orion",
        severity: "HIGH",
        status: "MONITORING",
        owner: "Priya Desai",
        description:
          "The data engineering team is operating above sustainable allocation levels.",
        action:
          "Rebalance secondary activities and move available capacity to Orion.",
      },
      {
        title: "Cloud provisioning delay",
        project: "Project Horizon",
        severity: "MEDIUM",
        status: "MONITORING",
        owner: "Vivek Shah",
        description:
          "Cloud environment provisioning is taking longer than originally planned.",
        action:
          "Follow up with the infrastructure team and confirm the revised provisioning date.",
      },
      {
        title: "Final validation dependency",
        project: "Project Vertex",
        severity: "LOW",
        status: "MONITORING",
        owner: "Karan Mehta",
        description:
          "Final validation activities are currently in progress.",
        action:
          "Continue validation tracking and confirm closure before the target date.",
      },
    ],
  });

  await prisma.resource.createMany({
    data: [
      {
        name: "Priya Desai",
        role: "Data Engineer",
        project: "Project Orion",
        allocation: 115,
        capacity: 100,
        status: "OVERLOADED",
      },
      {
        name: "Arjun Mehta",
        role: "Integration Lead",
        project: "Project Phoenix",
        allocation: 100,
        capacity: 100,
        status: "ALLOCATED",
      },
      {
        name: "Neha Shah",
        role: "Product Analyst",
        project: "Project Atlas",
        allocation: 95,
        capacity: 100,
        status: "ALLOCATED",
      },
      {
        name: "Rahul Patel",
        role: "Mobile Engineer",
        project: "Project Nova",
        allocation: 80,
        capacity: 100,
        status: "ALLOCATED",
      },
      {
        name: "Vivek Shah",
        role: "Cloud Engineer",
        project: "Project Horizon",
        allocation: 90,
        capacity: 100,
        status: "ALLOCATED",
      },
      {
        name: "Karan Mehta",
        role: "AI Engineer",
        project: "Project Vertex",
        allocation: 70,
        capacity: 100,
        status: "AVAILABLE",
      },
    ],
  });

  console.log("DeliveryPulse database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });