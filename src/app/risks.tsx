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
  getRisks,
  Risk,
} from '../services/api';

export default function RisksScreen() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadRisks = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getRisks();

        if (!ignore) {
          setRisks(data);
        }
      } catch (err) {
        console.error(
          'Risk loading error:',
          err
        );

        if (!ignore) {
          setError(
            'Unable to load risks from DeliveryPulse API.'
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadRisks();

    return () => {
      ignore = true;
    };
  }, []);

  const criticalRisks = risks.filter(
    (risk) => risk.severity === 'Critical'
  ).length;

  const highRisks = risks.filter(
    (risk) => risk.severity === 'High'
  ).length;

  const openRisks = risks.filter(
    (risk) => risk.status === 'Open'
  ).length;

  const openRisk = (riskId: number) => {
    router.push({
      pathname: '/risk-details',
      params: {
        id: String(riskId),
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
              DELIVERY GOVERNANCE
            </Text>

            <Text style={styles.title}>
              Risks
            </Text>

            <Text style={styles.subtitle}>
              Identify and manage delivery risks before
              they escalate
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
              Loading risks...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>
              Unable to load risks
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
                  {risks.length}
                </Text>

                <Text style={styles.summaryLabel}>
                  Total Risks
                </Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryItem}>
                <Text
                  style={[
                    styles.summaryValue,
                    styles.summaryDanger,
                  ]}
                >
                  {criticalRisks + highRisks}
                </Text>

                <Text style={styles.summaryLabel}>
                  High Priority
                </Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>
                  {openRisks}
                </Text>

                <Text style={styles.summaryLabel}>
                  Open
                </Text>
              </View>
            </View>

            {criticalRisks > 0 && (
              <View style={styles.criticalBanner}>
                <View style={styles.criticalIcon}>
                  <Text
                    style={
                      styles.criticalIconText
                    }
                  >
                    !
                  </Text>
                </View>

                <View
                  style={styles.criticalContent}
                >
                  <Text
                    style={styles.criticalTitle}
                  >
                    Immediate attention required
                  </Text>

                  <Text
                    style={styles.criticalText}
                  >
                    {criticalRisks} critical delivery
                    risk
                    {criticalRisks > 1
                      ? 's are'
                      : ' is'}{' '}
                    currently active.
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Active Delivery Risks
              </Text>

              <Text style={styles.riskCount}>
                {risks.length} risks
              </Text>
            </View>

            {risks.map((risk) => (
              <Pressable
                key={risk.id}
                style={({ pressed }) => [
                  styles.riskCard,
                  pressed &&
                    styles.riskCardPressed,
                ]}
                onPress={() =>
                  openRisk(risk.id)
                }
              >
                <View style={styles.riskTopRow}>
                  <View
                    style={styles.riskIdentity}
                  >
                    <Text style={styles.riskId}>
                      {risk.id}
                    </Text>

                    <Text
                      style={styles.riskTitle}
                    >
                      {risk.title}
                    </Text>

                    <Text
                      style={styles.riskProject}
                    >
                      {risk.project}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.severityBadge,
                      risk.severity ===
                        'Critical' &&
                        styles.dangerBackground,
                      risk.severity === 'High' &&
                        styles.dangerBackground,
                      risk.severity ===
                        'Medium' &&
                        styles.warningBackground,
                      risk.severity === 'Low' &&
                        styles.successBackground,
                    ]}
                  >
                    <Text
                      style={[
                        styles.severityText,
                        (risk.severity ===
                          'Critical' ||
                          risk.severity ===
                            'High') &&
                          styles.dangerText,
                        risk.severity ===
                          'Medium' &&
                          styles.warningText,
                        risk.severity ===
                          'Low' &&
                          styles.successText,
                      ]}
                    >
                      {risk.severity}
                    </Text>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <View>
                    <Text
                      style={styles.metaLabel}
                    >
                      Owner
                    </Text>

                    <Text
                      style={styles.metaValue}
                    >
                      {risk.owner}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={styles.metaLabel}
                    >
                      Status
                    </Text>

                    <Text
                      style={styles.metaValue}
                    >
                      {risk.status}
                    </Text>
                  </View>
                </View>

                <View
                  style={
                    styles.riskDescriptionBox
                  }
                >
                  <Text
                    style={
                      styles.descriptionText
                    }
                  >
                    {risk.description}
                  </Text>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.viewText}>
                    View risk details ›
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
    maxWidth: 600,
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

  summaryDanger: {
    color: '#FCA5A5',
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

  criticalBanner: {
    backgroundColor: colors.dangerBackground,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  criticalIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  criticalIconText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '800',
  },

  criticalContent: {
    flex: 1,
  },

  criticalTitle: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 3,
  },

  criticalText: {
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

  riskCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  riskCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },

  riskCardPressed: {
    opacity: 0.85,
  },

  riskTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  riskIdentity: {
    flex: 1,
    marginRight: spacing.md,
  },

  riskId: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.7,
    marginBottom: 5,
  },

  riskTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },

  riskProject: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },

  severityBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  severityText: {
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

  metaRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: spacing.lg,
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

  riskDescriptionBox: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
  },

  descriptionText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  cardFooter: {
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