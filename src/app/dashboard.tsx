import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, radius, spacing } from '../theme';
import BottomNav from '../components/BottomNav';

import {
  getPortfolioSummary,
  getProjects,
  getResources,
  getRisks,
  PortfolioSummary,
  Project,
  Resource,
  Risk,
} from '../services/api';

type MetricType =
  | 'info'
  | 'danger'
  | 'success'
  | 'warning';

type Metric = {
  label: string;
  value: string;
  detail: string;
  type: MetricType;
};

export default function DashboardScreen() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [risks, setRisks] =
    useState<Risk[]>([]);

  const [resources, setResources] =
    useState<Resource[]>([]);

  const [summary, setSummary] =
    useState<PortfolioSummary | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError('');

        const [
          projectData,
          riskData,
          resourceData,
          summaryData,
        ] = await Promise.all([
          getProjects(),
          getRisks(),
          getResources(),
          getPortfolioSummary(),
        ]);

        if (!ignore) {
          setProjects(projectData);
          setRisks(riskData);
          setResources(resourceData);
          setSummary(summaryData);
        }
      } catch (err) {
        console.error(
          'Dashboard loading error:',
          err
        );

        if (!ignore) {
          setError(
            'Unable to load dashboard data from DeliveryPulse API.'
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      ignore = true;
    };
  }, []);

  const averageAllocation =
    resources.length > 0
      ? Math.round(
          resources.reduce(
            (total, resource) =>
              total + resource.allocation,
            0
          ) / resources.length
        )
      : 0;

  const criticalRisks = risks.filter(
    (risk) => risk.severity === 'Critical'
  ).length;

  const openHighPriorityRisks =
    risks.filter(
      (risk) =>
        risk.status === 'Open' &&
        (risk.severity === 'Critical' ||
          risk.severity === 'High')
    ).length;

  const attentionProjects = summary
    ? summary.atRiskProjects +
      summary.watchProjects
    : 0;

  const metrics: Metric[] = summary
    ? [
        {
          label: 'Active Projects',
          value: String(
            summary.activeProjects
          ),
          detail: `${attentionProjects} need attention`,
          type: 'info',
        },
        {
          label: 'At Risk',
          value: String(
            summary.atRiskProjects
          ),
          detail: `${criticalRisks} critical risk${
            criticalRisks === 1
              ? ''
              : 's'
          }`,
          type: 'danger',
        },
        {
          label: 'Team Capacity',
          value: `${averageAllocation}%`,
          detail:
            summary.overloadedResources > 0
              ? `${summary.overloadedResources} overloaded`
              : 'Healthy',
          type:
            summary.overloadedResources > 0
              ? 'warning'
              : 'success',
        },
        {
          label: 'Open Risks',
          value: String(
            summary.openRisks
          ),
          detail: `${openHighPriorityRisks} high priority`,
          type: 'warning',
        },
      ]
    : [];

  const dashboardProjects =
    projects.slice(0, 3);

  const atRiskProject =
    projects.find(
      (project) =>
        project.status === 'At Risk'
    );

  const watchProject =
    projects.find(
      (project) =>
        project.status === 'Watch'
    );

  const overloadedResource =
    resources.find(
      (resource) =>
        resource.status === 'Overloaded'
    );

  const briefItems = [
    atRiskProject
      ? {
          key: 'risk-project',
          text: `${atRiskProject.name}: ${atRiskProject.risk}`,
          color: colors.danger,
        }
      : null,

    watchProject
      ? {
          key: 'watch-project',
          text: `${watchProject.name}: ${watchProject.risk}`,
          color: colors.warning,
        }
      : null,

    overloadedResource
      ? {
          key: 'capacity',
          text: `${overloadedResource.name} is allocated at ${overloadedResource.allocation}% on ${overloadedResource.project}.`,
          color: colors.info,
        }
      : null,
  ].filter(
    (
      item
    ): item is {
      key: string;
      text: string;
      color: string;
    } => item !== null
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Good morning
            </Text>

            <Text style={styles.title}>
              DeliveryPulse
            </Text>

            <Text style={styles.subtitle}>
              Your delivery command center
            </Text>
          </View>

          <Pressable
            style={styles.avatar}
            onPress={() =>
              router.replace('/login')
            }
          >
            <Text style={styles.avatarText}>
              JP
            </Text>
          </Pressable>
        </View>

        {loading ? (
          <View style={styles.stateCard}>
            <ActivityIndicator
              size="small"
              color={colors.primary}
            />

            <Text style={styles.stateText}>
              Loading delivery dashboard...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>
              Unable to load dashboard
            </Text>

            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.briefCard}>
              <View style={styles.briefHeader}>
                <View>
                  <Text style={styles.briefLabel}>
                    TODAY&apos;S BRIEF
                  </Text>

                  <Text style={styles.briefTitle}>
                    {briefItems.length}{' '}
                    {briefItems.length === 1
                      ? 'thing needs'
                      : 'things need'}{' '}
                    your attention
                  </Text>
                </View>

                <View style={styles.aiBadge}>
                  <Text
                    style={styles.aiBadgeText}
                  >
                    AI
                  </Text>
                </View>
              </View>

              {briefItems.map((item) => (
                <View
                  key={item.key}
                  style={styles.briefItem}
                >
                  <View
                    style={[
                      styles.dot,
                      {
                        backgroundColor:
                          item.color,
                      },
                    ]}
                  />

                  <Text
                    style={styles.briefText}
                  >
                    {item.text}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>
              Portfolio Overview
            </Text>

            <View style={styles.metricsGrid}>
              {metrics.map((metric) => (
                <View
                  key={metric.label}
                  style={styles.metricCard}
                >
                  <Text
                    style={styles.metricLabel}
                  >
                    {metric.label}
                  </Text>

                  <Text
                    style={styles.metricValue}
                  >
                    {metric.value}
                  </Text>

                  <View
                    style={[
                      styles.metricStatus,
                      metric.type ===
                        'danger' &&
                        styles.dangerBackground,
                      metric.type ===
                        'warning' &&
                        styles.warningBackground,
                      metric.type ===
                        'success' &&
                        styles.successBackground,
                      metric.type ===
                        'info' &&
                        styles.infoBackground,
                    ]}
                  >
                    <Text
                      style={[
                        styles.metricDetail,
                        metric.type ===
                          'danger' &&
                          styles.dangerText,
                        metric.type ===
                          'warning' &&
                          styles.warningText,
                        metric.type ===
                          'success' &&
                          styles.successText,
                        metric.type ===
                          'info' &&
                          styles.infoText,
                      ]}
                    >
                      {metric.detail}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Projects
              </Text>

              <Pressable
                onPress={() =>
                  router.replace('/projects')
                }
              >
                <Text style={styles.viewAll}>
                  View all
                </Text>
              </Pressable>
            </View>

            {dashboardProjects.map(
              (project) => (
                <Pressable
                  key={project.id}
                  style={({ pressed }) => [
                    styles.projectCard,
                    pressed &&
                      styles.projectCardPressed,
                  ]}
                  onPress={() =>
                    router.push({
                      pathname:
                        '/project-details',
                      params: {
                        name: project.name,
                      },
                    })
                  }
                >
                  <View
                    style={
                      styles.projectTopRow
                    }
                  >
                    <View
                      style={styles.projectInfo}
                    >
                      <Text
                        style={
                          styles.projectName
                        }
                      >
                        {project.name}
                      </Text>

                      <Text
                        style={
                          styles.projectClient
                        }
                      >
                        {project.client}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.statusBadge,
                        project.statusType ===
                          'danger' &&
                          styles.dangerBackground,
                        project.statusType ===
                          'warning' &&
                          styles.warningBackground,
                        project.statusType ===
                          'success' &&
                          styles.successBackground,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          project.statusType ===
                            'danger' &&
                            styles.dangerText,
                          project.statusType ===
                            'warning' &&
                            styles.warningText,
                          project.statusType ===
                            'success' &&
                            styles.successText,
                        ]}
                      >
                        {project.status}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={
                      styles.progressHeader
                    }
                  >
                    <Text
                      style={
                        styles.progressLabel
                      }
                    >
                      Delivery progress
                    </Text>

                    <Text
                      style={
                        styles.progressValue
                      }
                    >
                      {project.progress}%
                    </Text>
                  </View>

                  <View
                    style={
                      styles.progressBackground
                    }
                  >
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${project.progress}%`,
                        },
                        project.statusType ===
                          'danger' &&
                          styles.dangerBar,
                        project.statusType ===
                          'warning' &&
                          styles.warningBar,
                        project.statusType ===
                          'success' &&
                          styles.successBar,
                      ]}
                    />
                  </View>
                </Pressable>
              )
            )}

            <Pressable
              style={styles.copilotCard}
              onPress={() =>
                router.replace('/copilot')
              }
            >
              <View
                style={styles.copilotIcon}
              >
                <Text
                  style={
                    styles.copilotIconText
                  }
                >
                  ✦
                </Text>
              </View>

              <View
                style={styles.copilotContent}
              >
                <Text
                  style={styles.copilotTitle}
                >
                  Ask Delivery Copilot
                </Text>

                <Text
                  style={
                    styles.copilotSubtitle
                  }
                >
                  Get AI-powered insights
                  about your projects, risks
                  and team.
                </Text>
              </View>

              <Text style={styles.arrow}>
                ›
              </Text>
            </Pressable>

            <Pressable
              style={styles.briefButton}
              onPress={() =>
                router.replace('/brief')
              }
            >
              <Text
                style={
                  styles.briefButtonText
                }
              >
                View Daily Delivery Brief
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
  },

  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  greeting: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 14,
  },

  stateCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: 'center',
  },

  stateText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacing.md,
  },

  errorCard: {
    backgroundColor: colors.dangerBackground,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: spacing.lg,
  },

  errorTitle: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 5,
  },

  errorText: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 18,
  },

  briefCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  briefHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },

  briefLabel: {
    color: '#BFDBFE',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 5,
  },

  briefTitle: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '700',
  },

  aiBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF22',
    alignItems: 'center',
    justifyContent: 'center',
  },

  aiBadgeText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '800',
  },

  briefItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.sm,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 6,
    marginRight: spacing.sm,
  },

  briefText: {
    flex: 1,
    color: '#DBEAFE',
    fontSize: 13,
    lineHeight: 19,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },

  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },

  metricCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexGrow: 1,
    flexBasis: '45%',
    minWidth: 150,
  },

  metricLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: spacing.sm,
  },

  metricValue: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },

  metricStatus: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },

  metricDetail: {
    fontSize: 11,
    fontWeight: '600',
  },

  dangerBackground: {
    backgroundColor: colors.dangerBackground,
  },

  warningBackground: {
    backgroundColor: colors.warningBackground,
  },

  successBackground: {
    backgroundColor: colors.successBackground,
  },

  infoBackground: {
    backgroundColor: colors.infoBackground,
  },

  dangerText: {
    color: colors.danger,
  },

  warningText: {
    color: colors.warning,
  },

  successText: {
    color: colors.success,
  },

  infoText: {
    color: colors.info,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  viewAll: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: spacing.md,
  },

  projectCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },

  projectCardPressed: {
    opacity: 0.85,
  },

  projectTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  projectInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },

  projectName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },

  projectClient: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },

  statusBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  progressLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  progressValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },

  progressBackground: {
    height: 7,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    borderRadius: 4,
  },

  dangerBar: {
    backgroundColor: colors.danger,
  },

  warningBar: {
    backgroundColor: colors.warning,
  },

  successBar: {
    backgroundColor: colors.success,
  },

  copilotCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    flexDirection: 'row',
    alignItems: 'center',
  },

  copilotIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  copilotIconText: {
    color: colors.primary,
    fontSize: 21,
    fontWeight: '700',
  },

  copilotContent: {
    flex: 1,
  },

  copilotTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },

  copilotSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },

  arrow: {
    color: colors.primary,
    fontSize: 28,
    marginLeft: spacing.sm,
  },

  briefButton: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.md,
  },

  briefButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
});