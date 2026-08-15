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
import { projects } from '../data/DeliveryData';

export default function ProjectsScreen() {
  const averageProgress = Math.round(
    projects.reduce(
      (total, project) => total + project.progress,
      0
    ) / projects.length
  );

  const atRiskCount = projects.filter(
    (project) => project.status === 'At Risk'
  ).length;

 const openProject = (projectName: string) => {
  router.push({
    pathname: '/project-details',
    params: {
      name: projectName,
    },
  });
};

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>
              DELIVERY PORTFOLIO
            </Text>

            <Text style={styles.title}>
              Projects
            </Text>

            <Text style={styles.subtitle}>
              Track delivery health across your portfolio
            </Text>
          </View>

          <Pressable
            style={styles.avatar}
            onPress={() => router.replace('/login')}
          >
            <Text style={styles.avatarText}>
              JP
            </Text>
          </Pressable>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {projects.length}
            </Text>

            <Text style={styles.summaryLabel}>
              Active
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {atRiskCount}
            </Text>

            <Text style={styles.summaryLabel}>
              At Risk
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {averageProgress}%
            </Text>

            <Text style={styles.summaryLabel}>
              Avg. Progress
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            All Projects
          </Text>

          <Text style={styles.projectCount}>
            {projects.length} projects
          </Text>
        </View>

        {projects.map((project) => (
          <Pressable
            key={project.name}
            style={({ pressed }) => [
              styles.projectCard,
              pressed && styles.projectCardPressed,
            ]}
            onPress={() => openProject(project.name)}
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

            <View style={styles.metaRow}>
              <View>
                <Text style={styles.metaLabel}>
                  Owner
                </Text>

                <Text style={styles.metaValue}>
                  {project.owner}
                </Text>
              </View>

              <View>
                <Text style={styles.metaLabel}>
                  Target
                </Text>

                <Text style={styles.metaValue}>
                  {project.target}
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

            <View style={styles.cardFooter}>
              <Text style={styles.riskText}>
                {project.risk}
              </Text>

              <Text style={styles.viewText}>
                View ›
              </Text>
            </View>
          </Pressable>
        ))}

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
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
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

  summaryCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: spacing.xl,
  },

  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },

  summaryValue: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: '800',
  },

  summaryLabel: {
    color: '#DBEAFE',
    fontSize: 11,
    marginTop: 3,
  },

  summaryDivider: {
    width: 1,
    height: 38,
    backgroundColor: '#FFFFFF33',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },

  projectCount: {
    fontSize: 12,
    color: colors.textSecondary,
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

  metaRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: spacing.lg,
  },

  metaLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    marginBottom: 3,
  },

  metaValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
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

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  riskText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 11,
    marginRight: spacing.md,
  },

  viewText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },

  bottomSpace: {
    height: 30,
  },
});