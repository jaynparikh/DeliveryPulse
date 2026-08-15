import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, radius, spacing } from '../theme';
import BottomNav from '../components/BottomNav';

const metrics = [
  {
    label: 'Active Projects',
    value: '6',
    detail: '2 need attention',
    type: 'info',
  },
  {
    label: 'At Risk',
    value: '2',
    detail: '1 critical',
    type: 'danger',
  },
  {
    label: 'Team Capacity',
    value: '83%',
    detail: 'Healthy',
    type: 'success',
  },
  {
    label: 'Open Risks',
    value: '8',
    detail: '3 high priority',
    type: 'warning',
  },
];

const projects = [
  {
    name: 'Project Phoenix',
    client: 'Enterprise IoT Platform',
    progress: 72,
    status: 'At Risk',
    statusType: 'danger',
  },
  {
    name: 'Project Atlas',
    client: 'Customer Analytics',
    progress: 58,
    status: 'Watch',
    statusType: 'warning',
  },
  {
    name: 'Project Nova',
    client: 'Mobile Experience',
    progress: 84,
    status: 'Healthy',
    statusType: 'success',
  },
];

export default function DashboardScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.title}>DeliveryPulse</Text>
            <Text style={styles.subtitle}>
              Your delivery command center
            </Text>
          </View>

          <Pressable
            style={styles.avatar}
            onPress={() => router.replace('/login')}
          >
            <Text style={styles.avatarText}>JP</Text>
          </Pressable>
        </View>

        <View style={styles.briefCard}>
          <View style={styles.briefHeader}>
            <View>
              <Text style={styles.briefLabel}>TODAY'S BRIEF</Text>
              <Text style={styles.briefTitle}>
                3 things need your attention
              </Text>
            </View>

            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>AI</Text>
            </View>
          </View>

          <View style={styles.briefItem}>
            <View
              style={[
                styles.dot,
                { backgroundColor: colors.danger },
              ]}
            />
            <Text style={styles.briefText}>
              Phoenix API integration is 3 days behind schedule.
            </Text>
          </View>

          <View style={styles.briefItem}>
            <View
              style={[
                styles.dot,
                { backgroundColor: colors.warning },
              ]}
            />
            <Text style={styles.briefText}>
              Atlas has 5 unresolved UAT defects.
            </Text>
          </View>

          <View style={styles.briefItem}>
            <View
              style={[
                styles.dot,
                { backgroundColor: colors.info },
              ]}
            />
            <Text style={styles.briefText}>
              Engineering capacity reached 106%.
            </Text>
          </View>
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
              <Text style={styles.metricLabel}>
                {metric.label}
              </Text>

              <Text style={styles.metricValue}>
                {metric.value}
              </Text>

              <View
                style={[
                  styles.metricStatus,
                  metric.type === 'danger' &&
                    styles.dangerBackground,
                  metric.type === 'warning' &&
                    styles.warningBackground,
                  metric.type === 'success' &&
                    styles.successBackground,
                  metric.type === 'info' &&
                    styles.infoBackground,
                ]}
              >
                <Text
                  style={[
                    styles.metricDetail,
                    metric.type === 'danger' &&
                      styles.dangerText,
                    metric.type === 'warning' &&
                      styles.warningText,
                    metric.type === 'success' &&
                      styles.successText,
                    metric.type === 'info' &&
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
            onPress={() => router.replace('/projects')}
          >
            <Text style={styles.viewAll}>View all</Text>
          </Pressable>
        </View>

        {projects.map((project) => (
          <View
            key={project.name}
            style={styles.projectCard}
          >
            <View style={styles.projectTopRow}>
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>
                  {project.name}
                </Text>

                <Text style={styles.projectClient}>
                  {project.client}
                </Text>
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
                    project.statusType === 'danger' &&
                      styles.dangerText,
                    project.statusType === 'warning' &&
                      styles.warningText,
                    project.statusType === 'success' &&
                      styles.successText,
                  ]}
                >
                  {project.status}
                </Text>
              </View>
            </View>

            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>
                Delivery progress
              </Text>

              <Text style={styles.progressValue}>
                {project.progress}%
              </Text>
            </View>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${project.progress}%`,
                  },
                  project.statusType === 'danger' &&
                    styles.dangerBar,
                  project.statusType === 'warning' &&
                    styles.warningBar,
                  project.statusType === 'success' &&
                    styles.successBar,
                ]}
              />
            </View>
          </View>
        ))}

        <Pressable
          style={styles.copilotCard}
          onPress={() => router.replace('/copilot')}
        >
          <View style={styles.copilotIcon}>
            <Text style={styles.copilotIconText}>✦</Text>
          </View>

          <View style={styles.copilotContent}>
            <Text style={styles.copilotTitle}>
              Ask Delivery Copilot
            </Text>

            <Text style={styles.copilotSubtitle}>
              Get AI-powered insights about your projects,
              risks and team.
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable
          style={styles.briefButton}
          onPress={() => router.replace('/brief')}
        >
          <Text style={styles.briefButtonText}>
            View Daily Delivery Brief
          </Text>
        </Pressable>
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