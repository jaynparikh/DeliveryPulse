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

const resources = [
  {
    name: 'Arjun Mehta',
    role: 'Senior Engineer',
    utilization: 112,
    status: 'Overallocated',
    statusType: 'danger',
    capacity: '40 hrs/week',
    available: '0 hrs/week',
    projects: [
      {
        name: 'Project Phoenix',
        allocation: 100,
        role: 'Technical Lead',
      },
      {
        name: 'Project Orion',
        allocation: 12,
        role: 'Technical Support',
      },
    ],
    recommendation:
      'Arjun is currently overallocated. Consider moving the Orion support activity to another engineer to protect Phoenix delivery.',
  },

  {
    name: 'Neha Shah',
    role: 'Business Analyst',
    utilization: 94,
    status: 'Healthy',
    statusType: 'success',
    capacity: '40 hrs/week',
    available: '2 hrs/week',
    projects: [
      {
        name: 'Project Atlas',
        allocation: 94,
        role: 'Business Analyst',
      },
    ],
    recommendation:
      'Neha is operating close to full capacity. Maintain the current allocation and avoid adding additional work without removing an existing commitment.',
  },

  {
    name: 'Rahul Patel',
    role: 'Mobile Engineer',
    utilization: 86,
    status: 'Healthy',
    statusType: 'success',
    capacity: '40 hrs/week',
    available: '6 hrs/week',
    projects: [
      {
        name: 'Project Nova',
        allocation: 86,
        role: 'Mobile Engineer',
      },
    ],
    recommendation:
      'Rahul has limited spare capacity but remains within a healthy utilization range. Small support activities can be accommodated.',
  },

  {
    name: 'Priya Desai',
    role: 'Data Engineer',
    utilization: 101,
    status: 'Overallocated',
    statusType: 'danger',
    capacity: '40 hrs/week',
    available: '0 hrs/week',
    projects: [
      {
        name: 'Project Orion',
        allocation: 90,
        role: 'Data Engineer',
      },
      {
        name: 'Project Atlas',
        allocation: 11,
        role: 'Data Support',
      },
    ],
    recommendation:
      'Priya is slightly overallocated. Consider moving the Atlas support activity to another data resource to restore sustainable capacity.',
  },

  {
    name: 'Vivek Shah',
    role: 'Cloud Engineer',
    utilization: 78,
    status: 'Available',
    statusType: 'warning',
    capacity: '40 hrs/week',
    available: '9 hrs/week',
    projects: [
      {
        name: 'Project Horizon',
        allocation: 78,
        role: 'Cloud Engineer',
      },
    ],
    recommendation:
      'Vivek has meaningful available capacity and could support additional cloud activities if required.',
  },

  {
    name: 'Karan Mehta',
    role: 'AI Engineer',
    utilization: 69,
    status: 'Available',
    statusType: 'warning',
    capacity: '40 hrs/week',
    available: '12 hrs/week',
    projects: [
      {
        name: 'Project Vertex',
        allocation: 69,
        role: 'AI Engineer',
      },
    ],
    recommendation:
      'Karan has the highest available capacity in the current team and could absorb additional AI or automation work.',
  },

  {
    name: 'Anjali Patel',
    role: 'QA Engineer',
    utilization: 62,
    status: 'Available',
    statusType: 'warning',
    capacity: '40 hrs/week',
    available: '15 hrs/week',
    projects: [
      {
        name: 'Project Atlas',
        allocation: 62,
        role: 'QA Engineer',
      },
    ],
    recommendation:
      'Anjali has good available capacity and could support additional testing or UAT activities.',
  },

  {
    name: 'Rohan Shah',
    role: 'DevOps Engineer',
    utilization: 88,
    status: 'Healthy',
    statusType: 'success',
    capacity: '40 hrs/week',
    available: '5 hrs/week',
    projects: [
      {
        name: 'Project Phoenix',
        allocation: 88,
        role: 'DevOps Engineer',
      },
    ],
    recommendation:
      'Rohan is close to full capacity. Maintain the current allocation unless the Phoenix recovery plan requires additional DevOps support.',
  },
];

export default function ResourceDetailsScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();

  const resource = resources.find((item) => item.name === name);

  if (!resource) {
    return (
      <View style={styles.screen}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Resource not found</Text>

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
          <Text style={styles.backLinkText}>‹ Resources</Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.headerIdentity}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {resource.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
              </Text>
            </View>

            <View>
              <Text style={styles.eyebrow}>RESOURCE PROFILE</Text>
              <Text style={styles.title}>{resource.name}</Text>
              <Text style={styles.subtitle}>{resource.role}</Text>
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

        <View style={styles.capacityCard}>
          <View style={styles.capacityHeader}>
            <View>
              <Text style={styles.capacityLabel}>
                CURRENT UTILIZATION
              </Text>

              <Text
                style={[
                  styles.capacityValue,
                  resource.utilization > 100 &&
                    styles.dangerText,
                ]}
              >
                {resource.utilization}%
              </Text>
            </View>

            <View style={styles.capacityRight}>
              <Text style={styles.capacityMeta}>
                Capacity
              </Text>
              <Text style={styles.capacityMetaValue}>
                {resource.capacity}
              </Text>

              <Text style={styles.capacityMeta}>
                Available
              </Text>
              <Text style={styles.capacityMetaValue}>
                {resource.available}
              </Text>
            </View>
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
        </View>

        <Text style={styles.sectionTitle}>
          Current Project Allocation
        </Text>

        {resource.projects.map((project) => (
          <View
            key={project.name}
            style={styles.projectCard}
          >
            <View style={styles.projectHeader}>
              <View>
                <Text style={styles.projectName}>
                  {project.name}
                </Text>

                <Text style={styles.projectRole}>
                  {project.role}
                </Text>
              </View>

              <Text style={styles.projectAllocation}>
                {project.allocation}%
              </Text>
            </View>

            <View style={styles.projectProgressBackground}>
              <View
                style={[
                  styles.projectProgressBar,
                  {
                    width: `${project.allocation}%`,
                  },
                ]}
              />
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>
          Capacity Recommendation
        </Text>

        <View style={styles.recommendationCard}>
          <View style={styles.recommendationIcon}>
            <Text style={styles.recommendationIconText}>
              →
            </Text>
          </View>

          <View style={styles.recommendationContent}>
            <Text style={styles.recommendationTitle}>
              Delivery Manager Recommendation
            </Text>

            <Text style={styles.recommendationText}>
              {resource.recommendation}
            </Text>
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

  headerIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.md,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  avatarText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '800',
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.8,
    marginBottom: 4,
  },

  title: {
    fontSize: 25,
    fontWeight: '800',
    color: colors.text,
  },

  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 3,
  },

  statusBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 6,
    marginTop: 4,
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

  capacityCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },

  capacityLabel: {
    color: '#DBEAFE',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.7,
    marginBottom: 5,
  },

  capacityValue: {
    color: colors.surface,
    fontSize: 34,
    fontWeight: '800',
  },

  capacityRight: {
    alignItems: 'flex-end',
  },

  capacityMeta: {
    color: '#DBEAFE',
    fontSize: 10,
    marginTop: 2,
  },

  capacityMetaValue: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 5,
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

  projectCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  projectName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },

  projectRole: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 3,
  },

  projectAllocation: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },

  projectProgressBackground: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },

  projectProgressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },

  recommendationCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: 'row',
  },

  recommendationIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  recommendationIconText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
  },

  recommendationContent: {
    flex: 1,
  },

  recommendationTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },

  recommendationText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
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