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
  getResources,
  Resource,
} from '../services/api';

export default function ResourcesScreen() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadResources = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getResources();

        if (!ignore) {
          setResources(data);
        }
      } catch (err) {
        console.error(
          'Resource loading error:',
          err
        );

        if (!ignore) {
          setError(
            'Unable to load resources from DeliveryPulse API.'
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadResources();

    return () => {
      ignore = true;
    };
  }, []);

  const overloadedCount = resources.filter(
    (resource) => resource.status === 'Overloaded'
  ).length;

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

  const openResource = (resourceId: number) => {
    router.push({
      pathname: '/resource-details',
      params: {
        id: String(resourceId),
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
              RESOURCE MANAGEMENT
            </Text>

            <Text style={styles.title}>
              Resources
            </Text>

            <Text style={styles.subtitle}>
              Monitor team capacity and allocation
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

        {loading ? (
          <View style={styles.stateCard}>
            <ActivityIndicator
              size="small"
              color={colors.primary}
            />

            <Text style={styles.stateText}>
              Loading resources...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>
              Unable to load resources
            </Text>

            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.summaryCard}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>
                  {resources.length}
                </Text>

                <Text style={styles.summaryLabel}>
                  Resources
                </Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>
                  {overloadedCount}
                </Text>

                <Text style={styles.summaryLabel}>
                  Overloaded
                </Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>
                  {averageAllocation}%
                </Text>

                <Text style={styles.summaryLabel}>
                  Avg. Allocation
                </Text>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Team Resources
              </Text>

              <Text style={styles.resourceCount}>
                {resources.length} resources
              </Text>
            </View>

            {resources.map((resource) => (
              <Pressable
                key={resource.id}
                style={({ pressed }) => [
                  styles.resourceCard,
                  pressed &&
                    styles.resourceCardPressed,
                ]}
                onPress={() =>
                  openResource(resource.id)
                }
              >
                <View style={styles.resourceTopRow}>
                  <View style={styles.resourceInfo}>
                    <Text style={styles.resourceName}>
                      {resource.name}
                    </Text>

                    <Text style={styles.resourceRole}>
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

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>
                      Project
                    </Text>

                    <Text style={styles.metaValue}>
                      {resource.project}
                    </Text>
                  </View>

                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>
                      Capacity
                    </Text>

                    <Text style={styles.metaValue}>
                      {resource.capacity}%
                    </Text>
                  </View>

                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>
                      Allocation
                    </Text>

                    <Text style={styles.metaValue}>
                      {resource.allocation}%
                    </Text>
                  </View>
                </View>

                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>
                    Allocation
                  </Text>

                  <Text style={styles.progressValue}>
                    {resource.allocation}%
                  </Text>
                </View>

                <View
                  style={styles.progressBackground}
                >
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${Math.min(
                          resource.allocation,
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

                <View style={styles.cardFooter}>
                  <Text style={styles.capacityText}>
                    {resource.allocation >
                    resource.capacity
                      ? `${resource.allocation - resource.capacity}% above capacity`
                      : `${resource.capacity - resource.allocation}% capacity available`}
                  </Text>

                  <Text style={styles.viewText}>
                    View ›
                  </Text>
                </View>
              </Pressable>
            ))}
          </>
        )}

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

  stateCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
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
    marginBottom: spacing.xl,
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
    alignItems: 'flex-start',
  },

  resourceInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },

  resourceName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },

  resourceRole: {
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
    gap: spacing.lg,
    marginTop: spacing.lg,
  },

  metaItem: {
    flex: 1,
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

  capacityText: {
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