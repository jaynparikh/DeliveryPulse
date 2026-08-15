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

const resources = [
  {
    name: 'Arjun Mehta',
    role: 'Senior Engineer',
    utilization: 112,
    project: 'Project Phoenix',
    allocation: '112%',
    status: 'Overallocated',
    statusType: 'danger',
  },
  {
    name: 'Neha Shah',
    role: 'Business Analyst',
    utilization: 94,
    project: 'Project Atlas',
    allocation: '94%',
    status: 'Healthy',
    statusType: 'success',
  },
  {
    name: 'Rahul Patel',
    role: 'Mobile Engineer',
    utilization: 86,
    project: 'Project Nova',
    allocation: '86%',
    status: 'Healthy',
    statusType: 'success',
  },
  {
    name: 'Priya Desai',
    role: 'Data Engineer',
    utilization: 101,
    project: 'Project Orion',
    allocation: '101%',
    status: 'Overallocated',
    statusType: 'danger',
  },
  {
    name: 'Vivek Shah',
    role: 'Cloud Engineer',
    utilization: 78,
    project: 'Project Horizon',
    allocation: '78%',
    status: 'Available',
    statusType: 'warning',
  },
  {
    name: 'Karan Mehta',
    role: 'AI Engineer',
    utilization: 69,
    project: 'Project Vertex',
    allocation: '69%',
    status: 'Available',
    statusType: 'warning',
  },
  {
    name: 'Anjali Patel',
    role: 'QA Engineer',
    utilization: 62,
    project: 'Project Atlas',
    allocation: '62%',
    status: 'Available',
    statusType: 'warning',
  },
  {
    name: 'Rohan Shah',
    role: 'DevOps Engineer',
    utilization: 88,
    project: 'Project Phoenix',
    allocation: '88%',
    status: 'Healthy',
    statusType: 'success',
  },
];

export default function ResourcesScreen() {
  const totalResources = resources.length;

  const overallocated = resources.filter(
    (resource) => resource.utilization > 100
  ).length;

  const averageUtilization = Math.round(
    resources.reduce(
      (total, resource) => total + resource.utilization,
      0
    ) / resources.length
  );

  const availableCapacity = resources.filter(
    (resource) => resource.utilization < 80
  ).length;

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>DELIVERY CAPACITY</Text>
            <Text style={styles.title}>Resources</Text>
            <Text style={styles.subtitle}>
              Monitor team utilization and delivery capacity
            </Text>
          </View>

          <Pressable
            style={styles.avatar}
            onPress={() => router.replace('/login')}
          >
            <Text style={styles.avatarText}>JP</Text>
          </Pressable>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {totalResources}
            </Text>
            <Text style={styles.summaryLabel}>Team</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {averageUtilization}%
            </Text>
            <Text style={styles.summaryLabel}>Avg. Utilization</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {availableCapacity}
            </Text>
            <Text style={styles.summaryLabel}>Available</Text>
          </View>
        </View>

        {overallocated > 0 && (
          <View style={styles.alertCard}>
            <View style={styles.alertIcon}>
              <Text style={styles.alertIconText}>!</Text>
            </View>

            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>
                Capacity attention required
              </Text>

              <Text style={styles.alertText}>
                {overallocated} team member
                {overallocated > 1 ? 's are' : ' is'} currently
                allocated above 100%.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Team Capacity</Text>
          <Text style={styles.resourceCount}>
            {totalResources} resources
          </Text>
        </View>

        {resources.map((resource) => (
          <Pressable
            key={resource.name}
            style={({ pressed }) => [
              styles.resourceCard,
              pressed && styles.resourceCardPressed,
            ]}
            onPress={() =>
              router.push({
                pathname: '/resource-details',
                params: {
                  name: resource.name,
                },
              })
            }
          >
            <View style={styles.resourceTopRow}>
              <View style={styles.resourceIdentity}>
                <View style={styles.resourceAvatar}>
                  <Text style={styles.resourceAvatarText}>
                    {resource.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')}
                  </Text>
                </View>

                <View style={styles.resourceInfo}>
                  <Text style={styles.resourceName}>
                    {resource.name}
                  </Text>

                  <Text style={styles.resourceRole}>
                    {resource.role}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  resource.statusType === 'danger' &&
                    styles.dangerBackground,
                  resource.statusType === 'success' &&
                    styles.successBackground,
                  resource.statusType === 'warning' &&
                    styles.warningBackground,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    resource.statusType === 'danger' &&
                      styles.dangerText,
                    resource.statusType === 'success' &&
                      styles.successText,
                    resource.statusType === 'warning' &&
                      styles.warningText,
                  ]}
                >
                  {resource.status}
                </Text>
              </View>
            </View>

            <View style={styles.projectRow}>
              <View>
                <Text style={styles.metaLabel}>Current Project</Text>
                <Text style={styles.metaValue}>
                  {resource.project}
                </Text>
              </View>

              <View style={styles.allocationContainer}>
                <Text style={styles.metaLabel}>Allocation</Text>
                <Text
                  style={[
                    styles.allocationValue,
                    resource.utilization > 100 &&
                      styles.dangerText,
                  ]}
                >
                  {resource.allocation}
                </Text>
              </View>
            </View>

            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>
                Utilization
              </Text>

              <Text
                style={[
                  styles.progressValue,
                  resource.utilization > 100 &&
                    styles.dangerText,
                ]}
              >
                {resource.utilization}%
              </Text>
            </View>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${Math.min(
                      resource.utilization,
                      100
                    )}%`,
                  },
                  resource.utilization > 100 &&
                    styles.dangerBar,
                  resource.utilization >= 80 &&
                    resource.utilization <= 100 &&
                    styles.successBar,
                  resource.utilization < 80 &&
                    styles.warningBar,
                ]}
              />
            </View>

            <View style={styles.viewRow}>
              <Text style={styles.viewText}>
                View resource details ›
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
    marginBottom: spacing.lg,
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

  alertCard: {
    backgroundColor: colors.dangerBackground,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  alertIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  alertIconText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '800',
  },

  alertContent: {
    flex: 1,
  },

  alertTitle: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 3,
  },

  alertText: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 18,
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

  resourceCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  resourceCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },

  resourceCardPressed: {
    opacity: 0.85,
  },

  resourceTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  resourceIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.md,
  },

  resourceAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  resourceAvatarText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '800',
  },

  resourceInfo: {
    flex: 1,
  },

  resourceName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },

  resourceRole: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 3,
  },

  statusBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  statusText: {
    fontSize: 10,
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

  projectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },

  allocationContainer: {
    alignItems: 'flex-end',
  },

  metaLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    marginBottom: 3,
  },

  metaValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },

  allocationValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  progressLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },

  progressValue: {
    color: colors.text,
    fontSize: 11,
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

  viewRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.md,
    paddingTop: spacing.md,
  },

  viewText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },

  bottomSpace: {
    height: 30,
  },
});