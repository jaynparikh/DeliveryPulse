import { router, useLocalSearchParams } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, radius, spacing } from '../theme';
import BottomNav from '../components/BottomNav';

const projects = [
  {
    name: 'Project Phoenix',
    client: 'Enterprise IoT Platform',
    owner: 'Arjun Mehta',
    progress: 72,
    status: 'At Risk',
    statusType: 'danger',
    target: '30 Sep 2026',
    risk: 'API integration is 3 days behind schedule.',
    team: '8 members',
    startDate: '01 Jun 2026',
    budget: '$420K',

    milestones: [
      { name: 'Requirements', progress: 100, status: 'Completed' },
      { name: 'Development', progress: 82, status: 'In Progress' },
      { name: 'API Integration', progress: 55, status: 'Delayed' },
      { name: 'UAT', progress: 20, status: 'Not Started' },
      { name: 'Go-Live', progress: 0, status: 'Not Started' },
    ],

    issues: [
      {
        title: 'API integration delay',
        severity: 'High',
        owner: 'Arjun Mehta',
        detail: 'Integration is currently 3 days behind the planned schedule.',
      },
      {
        title: 'External dependency',
        severity: 'Medium',
        owner: 'Engineering',
        detail: 'Partner API response time is affecting integration testing.',
      },
    ],

    aiInsight:
      'Phoenix is currently at risk primarily because of the delayed API integration. The immediate priority should be dependency closure and a short recovery plan. If the integration delay extends beyond the current buffer, the target date may be impacted.',
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
    team: '10 members',
    startDate: '15 May 2026',
    budget: '$310K',

    milestones: [
      { name: 'Requirements', progress: 100, status: 'Completed' },
      { name: 'Development', progress: 90, status: 'Completed' },
      { name: 'Data Integration', progress: 75, status: 'In Progress' },
      { name: 'UAT', progress: 45, status: 'In Progress' },
      { name: 'Go-Live', progress: 0, status: 'Not Started' },
    ],

    issues: [
      {
        title: 'UAT defects',
        severity: 'Medium',
        owner: 'QA Team',
        detail: 'Five defects remain unresolved before UAT completion.',
      },
    ],

    aiInsight:
      'Atlas remains manageable but requires focused attention on UAT closure. The current delivery position is recoverable if defect resolution remains on schedule and no new critical issues emerge.',
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
    team: '7 members',
    startDate: '10 Apr 2026',
    budget: '$280K',

    milestones: [
      { name: 'Requirements', progress: 100, status: 'Completed' },
      { name: 'Development', progress: 100, status: 'Completed' },
      { name: 'Integration', progress: 95, status: 'Completed' },
      { name: 'UAT', progress: 80, status: 'In Progress' },
      { name: 'Go-Live', progress: 25, status: 'Planned' },
    ],

    issues: [],

    aiInsight:
      'Nova is progressing well and remains on track for the target date. The main focus should now be UAT completion and go-live readiness while maintaining the current delivery momentum.',
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
    team: '12 members',
    startDate: '01 Jul 2026',
    budget: '$510K',

    milestones: [
      { name: 'Discovery', progress: 100, status: 'Completed' },
      { name: 'Architecture', progress: 90, status: 'In Progress' },
      { name: 'Data Migration', progress: 60, status: 'In Progress' },
      { name: 'Validation', progress: 20, status: 'Not Started' },
      { name: 'Go-Live', progress: 0, status: 'Not Started' },
    ],

    issues: [],

    aiInsight:
      'Orion is currently tracking according to plan. The primary management focus should remain on data migration quality and ensuring that upcoming validation activities have clear entry criteria.',
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
    team: '9 members',
    startDate: '20 Jul 2026',
    budget: '$390K',

    milestones: [
      { name: 'Assessment', progress: 100, status: 'Completed' },
      { name: 'Cloud Setup', progress: 45, status: 'Delayed' },
      { name: 'Migration', progress: 20, status: 'Not Started' },
      { name: 'Testing', progress: 0, status: 'Not Started' },
      { name: 'Go-Live', progress: 0, status: 'Not Started' },
    ],

    issues: [
      {
        title: 'Environment provisioning',
        severity: 'Medium',
        owner: 'Cloud Team',
        detail: 'Required cloud environments are taking longer than planned to provision.',
      },
    ],

    aiInsight:
      'Horizon requires attention because environment provisioning is delaying the start of migration activities. The team should establish a firm provisioning completion date and assess whether migration activities can be parallelized.',
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
    team: '6 members',
    startDate: '15 Mar 2026',
    budget: '$350K',

    milestones: [
      { name: 'Discovery', progress: 100, status: 'Completed' },
      { name: 'Development', progress: 100, status: 'Completed' },
      { name: 'Integration', progress: 100, status: 'Completed' },
      { name: 'Validation', progress: 90, status: 'In Progress' },
      { name: 'Go-Live', progress: 70, status: 'In Progress' },
    ],

    issues: [],

    aiInsight:
      'Vertex is close to completion and remains healthy. Final validation and go-live readiness are the key priorities. Any late-stage critical defects should be resolved without compromising the planned release window.',
  },
];

export default function ProjectDetailsScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();

  const project = projects.find((item) => item.name === name);

  if (!project) {
    return (
      <View style={styles.screen}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Project not found</Text>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>

        <BottomNav />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <Pressable
          style={styles.backLink}
          onPress={() => router.back()}
        >
          <Text style={styles.backLinkText}>‹ Projects</Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>PROJECT DELIVERY</Text>
            <Text style={styles.title}>{project.name}</Text>
            <Text style={styles.subtitle}>{project.client}</Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              project.statusType === 'danger' &&
                styles.dangerBackground,
              project.statusType === 'warning' &&
                styles.warningBackground,
              project.statusType === 'success' &&
                styles.successBackground,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                project.statusType === 'danger' && styles.dangerText,
                project.statusType === 'warning' && styles.warningText,
                project.statusType === 'success' && styles.successText,
              ]}
            >
              {project.status}
            </Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.cardLabel}>DELIVERY PROGRESS</Text>
              <Text style={styles.progressValue}>
                {project.progress}%
              </Text>
            </View>

            <Text style={styles.targetText}>
              Target: {project.target}
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressBar,
                { width: `${project.progress}%` },
                project.statusType === 'danger' && styles.dangerBar,
                project.statusType === 'warning' && styles.warningBar,
                project.statusType === 'success' && styles.successBar,
              ]}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Project Overview</Text>

        <View style={styles.overviewGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>PROJECT OWNER</Text>
            <Text style={styles.infoValue}>{project.owner}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>TEAM SIZE</Text>
            <Text style={styles.infoValue}>{project.team}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>START DATE</Text>
            <Text style={styles.infoValue}>{project.startDate}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>BUDGET</Text>
            <Text style={styles.infoValue}>{project.budget}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Milestones</Text>

        <View style={styles.card}>
          {project.milestones.map((milestone, index) => (
            <View
              key={milestone.name}
              style={[
                styles.milestoneRow,
                index !== project.milestones.length - 1 &&
                  styles.milestoneBorder,
              ]}
            >
              <View style={styles.milestoneMain}>
                <Text style={styles.milestoneName}>
                  {milestone.name}
                </Text>

                <View style={styles.milestoneProgressBackground}>
                  <View
                    style={[
                      styles.milestoneProgressBar,
                      { width: `${milestone.progress}%` },
                      milestone.status === 'Delayed' &&
                        styles.dangerBar,
                      milestone.status === 'In Progress' &&
                        styles.warningBar,
                      milestone.status === 'Completed' &&
                        styles.successBar,
                    ]}
                  />
                </View>
              </View>

              <View style={styles.milestoneRight}>
                <Text style={styles.milestonePercent}>
                  {milestone.progress}%
                </Text>

                <Text
                  style={[
                    styles.milestoneStatus,
                    milestone.status === 'Completed' &&
                      styles.successText,
                    milestone.status === 'In Progress' &&
                      styles.warningText,
                    milestone.status === 'Delayed' &&
                      styles.dangerText,
                  ]}
                >
                  {milestone.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Risks & Issues</Text>

        {project.issues.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No open issues</Text>
            <Text style={styles.emptyText}>
              No significant delivery issues are currently recorded.
            </Text>
          </View>
        ) : (
          project.issues.map((issue) => (
            <View key={issue.title} style={styles.issueCard}>
              <View style={styles.issueHeader}>
                <Text style={styles.issueTitle}>{issue.title}</Text>

                <View
                  style={[
                    styles.severityBadge,
                    issue.severity === 'High' &&
                      styles.highSeverityBackground,
                    issue.severity === 'Medium' &&
                      styles.mediumSeverityBackground,
                  ]}
                >
                  <Text
                    style={[
                      styles.severityText,
                      issue.severity === 'High' &&
                        styles.dangerText,
                      issue.severity === 'Medium' &&
                        styles.warningText,
                    ]}
                  >
                    {issue.severity}
                  </Text>
                </View>
              </View>

              <Text style={styles.issueDetail}>{issue.detail}</Text>

              <Text style={styles.issueOwner}>
                Owner: {issue.owner}
              </Text>
            </View>
          ))
        )}

        <Text style={styles.sectionTitle}>AI Delivery Insight</Text>

        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <View style={styles.aiIcon}>
              <Text style={styles.aiIconText}>AI</Text>
            </View>

            <View>
              <Text style={styles.aiTitle}>DeliveryPulse Insight</Text>
              <Text style={styles.aiSubtitle}>
                Manager-level delivery assessment
              </Text>
            </View>
          </View>

          <Text style={styles.aiText}>{project.aiInsight}</Text>
        </View>

        <Text style={styles.sectionTitle}>Delivery Health</Text>

        <View style={styles.healthCard}>
          <View
            style={[
              styles.healthIndicator,
              project.statusType === 'danger' &&
                styles.dangerIndicator,
              project.statusType === 'warning' &&
                styles.warningIndicator,
              project.statusType === 'success' &&
                styles.successIndicator,
            ]}
          />

          <View style={styles.healthContent}>
            <Text style={styles.healthTitle}>
              {project.status === 'Healthy'
                ? 'Delivery is on track'
                : project.status === 'Watch'
                  ? 'Delivery requires attention'
                  : 'Delivery is at risk'}
            </Text>

            <Text style={styles.healthText}>{project.risk}</Text>
          </View>
        </View>

        <View style={styles.bottomSpace} />
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
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },

  backLink: {
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
  },

  backLinkText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },

  headerText: {
    flex: 1,
    marginRight: spacing.md,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
    marginBottom: 5,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
  },

  statusBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 4,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '700',
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

  dangerText: {
    color: colors.danger,
  },

  warningText: {
    color: colors.warning,
  },

  successText: {
    color: colors.success,
  },

  progressCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },

  cardLabel: {
    color: '#DBEAFE',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 5,
  },

  progressValue: {
    color: colors.surface,
    fontSize: 32,
    fontWeight: '800',
  },

  targetText: {
    color: '#DBEAFE',
    fontSize: 12,
  },

  progressBackground: {
    height: 8,
    backgroundColor: '#FFFFFF33',
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

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },

  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },

  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    width: '48%',
    minHeight: 82,
    justifyContent: 'center',
  },

  infoLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 6,
  },

  infoValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },

  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },

  milestoneBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  milestoneMain: {
    flex: 1,
    marginRight: spacing.md,
  },

  milestoneName: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 7,
  },

  milestoneProgressBackground: {
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },

  milestoneProgressBar: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: colors.primary,
  },

  milestoneRight: {
    width: 82,
    alignItems: 'flex-end',
  },

  milestonePercent: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },

  milestoneStatus: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 3,
    fontWeight: '600',
  },

  issueCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  issueTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginRight: spacing.md,
  },

  severityBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  highSeverityBackground: {
    backgroundColor: colors.dangerBackground,
  },

  mediumSeverityBackground: {
    backgroundColor: colors.warningBackground,
  },

  severityText: {
    fontSize: 10,
    fontWeight: '700',
  },

  issueDetail: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  issueOwner: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 10,
  },

  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },

  emptyText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  aiCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  aiIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  aiIconText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '800',
  },

  aiTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },

  aiSubtitle: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },

  aiText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20,
  },

  healthCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    flexDirection: 'row',
  },

  healthIndicator: {
    width: 5,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: spacing.md,
  },

  dangerIndicator: {
    backgroundColor: colors.danger,
  },

  warningIndicator: {
    backgroundColor: colors.warning,
  },

  successIndicator: {
    backgroundColor: colors.success,
  },

  healthContent: {
    flex: 1,
  },

  healthTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
  },

  healthText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },

  errorTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },

  backButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },

  backButtonText: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: '700',
  },

  bottomSpace: {
    height: 30,
  },
});