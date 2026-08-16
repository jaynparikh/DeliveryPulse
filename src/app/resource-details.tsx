import { useEffect, useState } from 'react';
import {
  router,
  useLocalSearchParams,
} from 'expo-router';
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
  getResources,
  Resource,
} from '../services/api';

export default function ResourceDetailsScreen() {
  const { id } = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const resourceId = Number(
    Array.isArray(id) ? id[0] : id
  );

  const [resource, setResource] =
    useState<Resource | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadResource = async () => {
      if (
        !resourceId ||
        Number.isNaN(resourceId)
      ) {
        setError(
          'Resource ID was not provided.'
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const resources =
          await getResources();

        const selectedResource =
          resources.find(
            (item) =>
              item.id === resourceId
          );

        if (!ignore) {
          if (!selectedResource) {
            setError(
              'Resource not found.'
            );
          } else {
            setResource(
              selectedResource
            );
          }
        }
      } catch (err) {
        console.error(
          'Resource details loading error:',
          err
        );

        if (!ignore) {
          setError(
            'Unable to load resource details from DeliveryPulse API.'
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadResource();

    return () => {
      ignore = true;
    };
  }, [resourceId]);

  if (loading) {
    return (
      <View style={styles.screen}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color={colors.primary}
          />

          <Text style={styles.loadingText}>
            Loading resource details...
          </Text>
        </View>

        <BottomNav />
      </View>
    );
  }

  if (error || !resource) {
    return (
      <View style={styles.screen}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>
            Resource not found
          </Text>

          <Text style={styles.errorMessage}>
            {error}
          </Text>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>
              Go Back
            </Text>
          </Pressable>
        </View>

        <BottomNav />
      </View>
    );
  }

  const utilization = Math.round(
    (resource.allocation /
      resource.capacity) *
      100
  );

  const remainingCapacity =
    resource.capacity -
    resource.allocation;

  const isOverloaded =
    resource.allocation >
    resource.capacity;

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
          <Text style={styles.backLinkText}>
            ‹ Resources
          </Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>
              RESOURCE DETAILS
            </Text>

            <Text style={styles.title}>
              {resource.name}
            </Text>

            <Text style={styles.subtitle}>
              {resource.role}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              resource.status ===
                'Overloaded' &&
                styles.dangerBackground,
              resource.status ===
                'Allocated' &&
                styles.warningBackground,
              resource.status ===
                'Available' &&
                styles.successBackground,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                resource.status ===
                  'Overloaded' &&
                  styles.dangerText,
                resource.status ===
                  'Allocated' &&
                  styles.warningText,
                resource.status ===
                  'Available' &&
                  styles.successText,
              ]}
            >
              {resource.status}
            </Text>
          </View>
        </View>

        <View style={styles.allocationCard}>
          <View
            style={styles.allocationHeader}
          >
            <View>
              <Text style={styles.cardLabel}>
                CURRENT ALLOCATION
              </Text>

              <Text
                style={
                  styles.allocationValue
                }
              >
                {resource.allocation}%
              </Text>
            </View>

            <View
              style={styles.capacityBlock}
            >
              <Text
                style={styles.capacityLabel}
              >
                CAPACITY
              </Text>

              <Text
                style={styles.capacityValue}
              >
                {resource.capacity}%
              </Text>
            </View>
          </View>

          <View
            style={styles.progressBackground}
          >
            <View
              style={[
                styles.progressBar,
                {
                  width: `${Math.min(
                    utilization,
                    100
                  )}%`,
                },
                resource.status ===
                  'Overloaded' &&
                  styles.dangerBar,
                resource.status ===
                  'Allocated' &&
                  styles.warningBar,
                resource.status ===
                  'Available' &&
                  styles.successBar,
              ]}
            />
          </View>

          <Text
            style={styles.allocationNote}
          >
            {isOverloaded
              ? `${resource.allocation - resource.capacity}% above available capacity`
              : `${remainingCapacity}% capacity remaining`}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Resource Overview
        </Text>

        <View style={styles.overviewGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              ROLE
            </Text>

            <Text style={styles.infoValue}>
              {resource.role}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              PROJECT
            </Text>

            <Text style={styles.infoValue}>
              {resource.project}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              CAPACITY
            </Text>

            <Text style={styles.infoValue}>
              {resource.capacity}%
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              ALLOCATION
            </Text>

            <Text style={styles.infoValue}>
              {resource.allocation}%
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Capacity Assessment
        </Text>

        <View style={styles.assessmentCard}>
          <View
            style={[
              styles.assessmentIndicator,
              resource.status ===
                'Overloaded' &&
                styles.dangerIndicator,
              resource.status ===
                'Allocated' &&
                styles.warningIndicator,
              resource.status ===
                'Available' &&
                styles.successIndicator,
            ]}
          />

          <View
            style={styles.assessmentContent}
          >
            <Text
              style={styles.assessmentTitle}
            >
              {resource.status ===
              'Overloaded'
                ? 'Resource is overloaded'
                : resource.status ===
                    'Allocated'
                  ? 'Resource is fully allocated'
                  : 'Resource has available capacity'}
            </Text>

            <Text
              style={styles.assessmentText}
            >
              {resource.status ===
              'Overloaded'
                ? `${resource.name} is allocated at ${resource.allocation}%, exceeding the available capacity of ${resource.capacity}%. Rebalancing should be considered.`
                : resource.status ===
                    'Allocated'
                  ? `${resource.name} is currently allocated at ${resource.allocation}% on ${resource.project}. Additional work should be assessed carefully before assignment.`
                  : `${resource.name} is currently allocated at ${resource.allocation}%, leaving ${remainingCapacity}% capacity available for additional work.`}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Delivery Context
        </Text>

        <View style={styles.contextCard}>
          <Text style={styles.contextLabel}>
            CURRENT PROJECT
          </Text>

          <Text style={styles.contextProject}>
            {resource.project}
          </Text>

          <Text style={styles.contextText}>
            This resource is currently
            assigned to {resource.project}.
            Allocation should be reviewed
            against project delivery
            priorities before additional
            responsibilities are assigned.
          </Text>
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

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },

  loadingText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacing.md,
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
    backgroundColor:
      colors.dangerBackground,
  },

  warningBackground: {
    backgroundColor:
      colors.warningBackground,
  },

  successBackground: {
    backgroundColor:
      colors.successBackground,
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

  allocationCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  allocationHeader: {
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

  allocationValue: {
    color: colors.surface,
    fontSize: 32,
    fontWeight: '800',
  },

  capacityBlock: {
    alignItems: 'flex-end',
  },

  capacityLabel: {
    color: '#DBEAFE',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 5,
  },

  capacityValue: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '700',
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

  allocationNote: {
    color: '#DBEAFE',
    fontSize: 12,
    marginTop: spacing.md,
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

  assessmentCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },

  assessmentIndicator: {
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

  assessmentContent: {
    flex: 1,
  },

  assessmentTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
  },

  assessmentText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  contextCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  contextLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 6,
  },

  contextProject: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },

  contextText: {
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
    marginBottom: spacing.sm,
  },

  errorMessage: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
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