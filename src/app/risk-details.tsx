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
  getRisks,
  Risk,
} from '../services/api';

export default function RiskDetailsScreen() {
  const { id } = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const riskId = Number(
    Array.isArray(id) ? id[0] : id
  );

  const [risk, setRisk] =
    useState<Risk | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    let ignore = false;

    const loadRisk = async () => {
      if (!riskId || Number.isNaN(riskId)) {
        setError('Risk ID was not provided.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const risks = await getRisks();

        const selectedRisk = risks.find(
          (item) => item.id === riskId
        );

        if (!ignore) {
          if (!selectedRisk) {
            setError('Risk not found.');
          } else {
            setRisk(selectedRisk);
          }
        }
      } catch (err) {
        console.error(
          'Risk details loading error:',
          err
        );

        if (!ignore) {
          setError(
            'Unable to load risk details from DeliveryPulse API.'
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadRisk();

    return () => {
      ignore = true;
    };
  }, [riskId]);

  if (loading) {
    return (
      <View style={styles.screen}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color={colors.primary}
          />

          <Text style={styles.loadingText}>
            Loading risk details...
          </Text>
        </View>

        <BottomNav />
      </View>
    );
  }

  if (error || !risk) {
    return (
      <View style={styles.screen}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>
            Risk not found
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

  const severityDescription =
    risk.severity === 'Critical'
      ? 'Immediate management intervention is required.'
      : risk.severity === 'High'
        ? 'This risk requires active management attention.'
        : risk.severity === 'Medium'
          ? 'This risk should remain under regular monitoring.'
          : 'This risk currently has limited delivery impact.';

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
            ‹ Risks
          </Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>
              DELIVERY RISK
            </Text>

            <Text style={styles.title}>
              {risk.title}
            </Text>

            <Text style={styles.subtitle}>
              {risk.project}
            </Text>
          </View>

          <View
            style={[
              styles.severityBadge,
              (risk.severity === 'Critical' ||
                risk.severity === 'High') &&
                styles.dangerBackground,
              risk.severity === 'Medium' &&
                styles.warningBackground,
              risk.severity === 'Low' &&
                styles.successBackground,
            ]}
          >
            <Text
              style={[
                styles.severityText,
                (risk.severity === 'Critical' ||
                  risk.severity === 'High') &&
                  styles.dangerText,
                risk.severity === 'Medium' &&
                  styles.warningText,
                risk.severity === 'Low' &&
                  styles.successText,
              ]}
            >
              {risk.severity}
            </Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>
              STATUS
            </Text>

            <Text style={styles.summaryValue}>
              {risk.status}
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>
              OWNER
            </Text>

            <Text style={styles.summaryValue}>
              {risk.owner}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Risk Description
        </Text>

        <View style={styles.card}>
          <Text style={styles.bodyText}>
            {risk.description}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Recommended Action
        </Text>

        <View style={styles.actionCard}>
          <View style={styles.actionIcon}>
            <Text style={styles.actionIconText}>
              →
            </Text>
          </View>

          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>
              Management Action
            </Text>

            <Text style={styles.actionText}>
              {risk.action}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Delivery Assessment
        </Text>

        <View style={styles.assessmentCard}>
          <View
            style={[
              styles.assessmentIndicator,
              (risk.severity === 'Critical' ||
                risk.severity === 'High') &&
                styles.dangerIndicator,
              risk.severity === 'Medium' &&
                styles.warningIndicator,
              risk.severity === 'Low' &&
                styles.successIndicator,
            ]}
          />

          <View style={styles.assessmentContent}>
            <Text style={styles.assessmentTitle}>
              {risk.severity} delivery risk
            </Text>

            <Text style={styles.assessmentText}>
              {severityDescription}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          DeliveryPulse Insight
        </Text>

        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <View style={styles.insightIcon}>
              <Text style={styles.insightIconText}>
                AI
              </Text>
            </View>

            <View>
              <Text style={styles.insightTitle}>
                Manager-level assessment
              </Text>

              <Text style={styles.insightSubtitle}>
                Based on current delivery data
              </Text>
            </View>
          </View>

          <Text style={styles.insightText}>
            {risk.severity === 'Critical'
              ? `${risk.title} represents an immediate delivery concern for ${risk.project}. The priority should be to execute the recommended mitigation action and track closure closely until the risk is reduced.`
              : risk.severity === 'High'
                ? `${risk.title} requires active management attention on ${risk.project}. The recommended action should be tracked against the next delivery milestone to prevent escalation.`
                : risk.severity === 'Medium'
                  ? `${risk.title} should remain under regular monitoring for ${risk.project}. Management intervention may be required if the likelihood or delivery impact increases.`
                  : `${risk.title} currently represents limited delivery impact for ${risk.project}. Continue monitoring while maintaining focus on higher-priority portfolio risks.`}
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
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
  },

  severityBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 4,
  },

  severityText: {
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

  summaryCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },

  summaryLabel: {
    color: '#DBEAFE',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.7,
    marginBottom: 5,
  },

  summaryValue: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },

  summaryDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#FFFFFF33',
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  bodyText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },

  actionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },

  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  actionIconText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
  },

  actionContent: {
    flex: 1,
  },

  actionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },

  actionText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
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

  insightCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  insightIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  insightIconText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '800',
  },

  insightTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },

  insightSubtitle: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },

  insightText: {
    color: colors.text,
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