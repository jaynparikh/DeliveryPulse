export type ProjectStatus = 'At Risk' | 'Watch' | 'Healthy';

export type ProjectStatusType =
  | 'danger'
  | 'warning'
  | 'success';

export type Project = {
  name: string;
  client: string;
  owner: string;
  progress: number;
  status: ProjectStatus;
  statusType: ProjectStatusType;
  target: string;
  risk: string;
};

export type RiskSeverity =
  | 'Critical'
  | 'High'
  | 'Medium'
  | 'Low';

export type RiskStatus =
  | 'Open'
  | 'Monitoring'
  | 'Mitigated';

export type Risk = {
  id: number;
  title: string;
  project: string;
  severity: RiskSeverity;
  status: RiskStatus;
  owner: string;
  description: string;
  action: string;
};

export type ResourceStatus =
  | 'Available'
  | 'Allocated'
  | 'Overloaded';

export type Resource = {
  id: number;
  name: string;
  role: string;
  project: string;
  allocation: number;
  capacity: number;
  status: ResourceStatus;
};

export const projects: Project[] = [
  {
    name: 'Project Phoenix',
    client: 'Enterprise IoT Platform',
    owner: 'Arjun Mehta',
    progress: 72,
    status: 'At Risk',
    statusType: 'danger',
    target: '30 Sep 2026',
    risk: 'API integration is 3 days behind schedule.',
  },
  {
    name: 'Project Atlas',
    client: 'Customer Analytics',
    owner: 'Neha Shah',
    progress: 58,
    status: 'Watch',
    statusType: 'warning',
    target: '15 Oct 2026',
    risk: '5 unresolved UAT defects.',
  },
  {
    name: 'Project Nova',
    client: 'Mobile Experience',
    owner: 'Rahul Patel',
    progress: 84,
    status: 'Healthy',
    statusType: 'success',
    target: '20 Sep 2026',
    risk: 'No major risks currently identified.',
  },
  {
    name: 'Project Orion',
    client: 'Data Modernization',
    owner: 'Priya Desai',
    progress: 66,
    status: 'Healthy',
    statusType: 'success',
    target: '12 Nov 2026',
    risk: 'Delivery tracking is currently on plan.',
  },
  {
    name: 'Project Horizon',
    client: 'Cloud Migration',
    owner: 'Vivek Shah',
    progress: 41,
    status: 'Watch',
    statusType: 'warning',
    target: '05 Dec 2026',
    risk: 'Cloud environment provisioning is taking longer than planned.',
  },
  {
    name: 'Project Vertex',
    client: 'AI Transformation',
    owner: 'Karan Mehta',
    progress: 91,
    status: 'Healthy',
    statusType: 'success',
    target: '28 Aug 2026',
    risk: 'Final validation activities are in progress.',
  },
];

export const risks: Risk[] = [
  {
    id: 1,
    title: 'API integration delay',
    project: 'Project Phoenix',
    severity: 'Critical',
    status: 'Open',
    owner: 'Arjun Mehta',
    description:
      'API integration is currently three days behind the planned schedule.',
    action:
      'Escalate dependency and agree on a recovery plan with the integration team.',
  },
  {
    id: 2,
    title: 'UAT defects',
    project: 'Project Atlas',
    severity: 'High',
    status: 'Open',
    owner: 'Neha Shah',
    description:
      'Five unresolved UAT defects remain before the next delivery milestone.',
    action:
      'Prioritize defect triage and establish daily closure tracking.',
  },
  {
    id: 3,
    title: 'Resource capacity pressure',
    project: 'Project Orion',
    severity: 'High',
    status: 'Monitoring',
    owner: 'Priya Desai',
    description:
      'The data engineering team is operating above sustainable allocation levels.',
    action:
      'Rebalance secondary activities and move available capacity to Orion.',
  },
  {
    id: 4,
    title: 'Cloud provisioning delay',
    project: 'Project Horizon',
    severity: 'Medium',
    status: 'Monitoring',
    owner: 'Vivek Shah',
    description:
      'Cloud environment provisioning is taking longer than originally planned.',
    action:
      'Follow up with the infrastructure team and confirm the revised provisioning date.',
  },
  {
    id: 5,
    title: 'Final validation dependency',
    project: 'Project Vertex',
    severity: 'Low',
    status: 'Monitoring',
    owner: 'Karan Mehta',
    description:
      'Final validation activities are currently in progress.',
    action:
      'Continue validation tracking and confirm closure before the target date.',
  },
];

export const resources: Resource[] = [
  {
    id: 1,
    name: 'Priya Desai',
    role: 'Data Engineer',
    project: 'Project Orion',
    allocation: 115,
    capacity: 100,
    status: 'Overloaded',
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    role: 'Integration Lead',
    project: 'Project Phoenix',
    allocation: 100,
    capacity: 100,
    status: 'Allocated',
  },
  {
    id: 3,
    name: 'Neha Shah',
    role: 'Product Analyst',
    project: 'Project Atlas',
    allocation: 95,
    capacity: 100,
    status: 'Allocated',
  },
  {
    id: 4,
    name: 'Rahul Patel',
    role: 'Mobile Engineer',
    project: 'Project Nova',
    allocation: 80,
    capacity: 100,
    status: 'Allocated',
  },
  {
    id: 5,
    name: 'Vivek Shah',
    role: 'Cloud Engineer',
    project: 'Project Horizon',
    allocation: 90,
    capacity: 100,
    status: 'Allocated',
  },
  {
    id: 6,
    name: 'Karan Mehta',
    role: 'AI Engineer',
    project: 'Project Vertex',
    allocation: 70,
    capacity: 100,
    status: 'Available',
  },
];

export const portfolioSummary = {
  activeProjects: projects.length,

  atRiskProjects: projects.filter(
    (project) => project.status === 'At Risk'
  ).length,

  watchProjects: projects.filter(
    (project) => project.status === 'Watch'
  ).length,

  healthyProjects: projects.filter(
    (project) => project.status === 'Healthy'
  ).length,

  averageProgress: Math.round(
    projects.reduce(
      (total, project) => total + project.progress,
      0
    ) / projects.length
  ),

  openRisks: risks.filter(
    (risk) => risk.status === 'Open'
  ).length,

  highPriorityRisks: risks.filter(
    (risk) =>
      risk.severity === 'Critical' ||
      risk.severity === 'High'
  ).length,

  overloadedResources: resources.filter(
    (resource) => resource.status === 'Overloaded'
  ).length,
};