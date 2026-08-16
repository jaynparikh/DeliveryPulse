//const API_BASE_URL = 'http://localhost:4000/api';
const API_BASE_URL = 'http://192.168.29.9:4000/api';
/*
 * AUTHENTICATION
 */

export type LoginUser = {
  name: string;
  email: string;
  role: string;
};

export type LoginResponse = {
  success: boolean;
  user: LoginUser;
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/auth/login`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Unable to sign in.'
    );
  }

  return data;
};

/*
 * PROJECTS
 */

export type ApiProjectStatus =
  | 'AT_RISK'
  | 'WATCH'
  | 'HEALTHY';

export type ProjectStatus =
  | 'At Risk'
  | 'Watch'
  | 'Healthy';

export type ProjectStatusType =
  | 'danger'
  | 'warning'
  | 'success';

export type Project = {
  id: number;
  name: string;
  client: string;
  owner: string;
  progress: number;
  status: ProjectStatus;
  statusType: ProjectStatusType;
  target: string;
  risk: string;
};

type ApiProject = {
  id: number;
  name: string;
  client: string;
  owner: string;
  progress: number;
  status: ApiProjectStatus;
  target: string;
  risk: string;
  createdAt: string;
  updatedAt: string;
};

const normalizeProjectStatus = (
  status: ApiProjectStatus
): {
  status: ProjectStatus;
  statusType: ProjectStatusType;
} => {
  switch (status) {
    case 'AT_RISK':
      return {
        status: 'At Risk',
        statusType: 'danger',
      };

    case 'WATCH':
      return {
        status: 'Watch',
        statusType: 'warning',
      };

    case 'HEALTHY':
    default:
      return {
        status: 'Healthy',
        statusType: 'success',
      };
  }
};

export const getProjects =
  async (): Promise<Project[]> => {
    const response = await fetch(
      `${API_BASE_URL}/projects`
    );

    if (!response.ok) {
      throw new Error(
        `Unable to load projects. HTTP ${response.status}`
      );
    }

    const data: ApiProject[] =
      await response.json();

    return data.map((project) => {
      const normalizedStatus =
        normalizeProjectStatus(
          project.status
        );

      return {
        id: project.id,
        name: project.name,
        client: project.client,
        owner: project.owner,
        progress: project.progress,
        status:
          normalizedStatus.status,
        statusType:
          normalizedStatus.statusType,
        target: project.target,
        risk: project.risk,
      };
    });
  };

/*
 * RISKS
 */

export type ApiRiskSeverity =
  | 'CRITICAL'
  | 'HIGH'
  | 'MEDIUM'
  | 'LOW';

export type ApiRiskStatus =
  | 'OPEN'
  | 'MONITORING'
  | 'MITIGATED';

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

type ApiRisk = {
  id: number;
  title: string;
  project: string;
  severity: ApiRiskSeverity;
  status: ApiRiskStatus;
  owner: string;
  description: string;
  action: string;
  createdAt: string;
  updatedAt: string;
};

const normalizeRiskSeverity = (
  severity: ApiRiskSeverity
): RiskSeverity => {
  switch (severity) {
    case 'CRITICAL':
      return 'Critical';

    case 'HIGH':
      return 'High';

    case 'MEDIUM':
      return 'Medium';

    case 'LOW':
    default:
      return 'Low';
  }
};

const normalizeRiskStatus = (
  status: ApiRiskStatus
): RiskStatus => {
  switch (status) {
    case 'OPEN':
      return 'Open';

    case 'MONITORING':
      return 'Monitoring';

    case 'MITIGATED':
    default:
      return 'Mitigated';
  }
};

export const getRisks =
  async (): Promise<Risk[]> => {
    const response = await fetch(
      `${API_BASE_URL}/risks`
    );

    if (!response.ok) {
      throw new Error(
        `Unable to load risks. HTTP ${response.status}`
      );
    }

    const data: ApiRisk[] =
      await response.json();

    return data.map((risk) => ({
      id: risk.id,
      title: risk.title,
      project: risk.project,
      severity:
        normalizeRiskSeverity(
          risk.severity
        ),
      status:
        normalizeRiskStatus(
          risk.status
        ),
      owner: risk.owner,
      description: risk.description,
      action: risk.action,
    }));
  };

/*
 * RESOURCES
 */

export type ApiResourceStatus =
  | 'AVAILABLE'
  | 'ALLOCATED'
  | 'OVERLOADED';

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

type ApiResource = {
  id: number;
  name: string;
  role: string;
  project: string;
  allocation: number;
  capacity: number;
  status: ApiResourceStatus;
  createdAt: string;
  updatedAt: string;
};

const normalizeResourceStatus = (
  status: ApiResourceStatus
): ResourceStatus => {
  switch (status) {
    case 'OVERLOADED':
      return 'Overloaded';

    case 'ALLOCATED':
      return 'Allocated';

    case 'AVAILABLE':
    default:
      return 'Available';
  }
};

export const getResources =
  async (): Promise<Resource[]> => {
    const response = await fetch(
      `${API_BASE_URL}/resources`
    );

    if (!response.ok) {
      throw new Error(
        `Unable to load resources. HTTP ${response.status}`
      );
    }

    const data: ApiResource[] =
      await response.json();

    return data.map((resource) => ({
      id: resource.id,
      name: resource.name,
      role: resource.role,
      project: resource.project,
      allocation:
        resource.allocation,
      capacity: resource.capacity,
      status:
        normalizeResourceStatus(
          resource.status
        ),
    }));
  };

/*
 * PORTFOLIO SUMMARY
 */

export type PortfolioSummary = {
  activeProjects: number;
  atRiskProjects: number;
  watchProjects: number;
  healthyProjects: number;
  averageProgress: number;
  openRisks: number;
  highPriorityRisks: number;
  overloadedResources: number;
};

export const getPortfolioSummary =
  async (): Promise<PortfolioSummary> => {
    const response = await fetch(
      `${API_BASE_URL}/portfolio-summary`
    );

    if (!response.ok) {
      throw new Error(
        `Unable to load portfolio summary. HTTP ${response.status}`
      );
    }

    return response.json();
  };

/*
 * COPILOT
 */

export const askCopilot = async (
  question: string
): Promise<string> => {
  const response = await fetch(
    `${API_BASE_URL}/copilot`,
    {
      method: 'POST',

      headers: {
        'Content-Type':
          'application/json',
      },

      body: JSON.stringify({
        question,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Unable to generate Copilot response.'
    );
  }

  return data.answer;
};