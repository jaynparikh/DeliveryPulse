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
import { risks } from '../data/DeliveryData';

export default function RiskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const risk = risks.find((item) => item.id === Number(id));

  if (!risk) {
    return (
      <View style={styles.screen}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>
            Risk not found
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

  const isDanger =
    risk.severity === 'Critical' ||
    risk.severity === 'High';

  const isWarning =
    risk.severity === 'Medium';

  const isSuccess =
    risk.severity === 'Low';

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
          <View style={styles.headerContent}>
            <Text style={styles.eyebrow}>
              RISK R-{String(risk.id).padStart(3, '0')}
            </Text>

            <Text style={styles.title}>
              {risk.title}
            </Text>

            <Text style={styles.project}>
              {risk.project}
            </Text>
          </View>

          <View
            style={[
              styles.severityBadge,
              isDanger && styles.dangerBackground,
              isWarning && styles.warningBackground,
              isSuccess && styles.successBackground,
            ]}
          >
            <Text
              style={[
                styles.severityText,
                isDanger && styles.dangerText,
                isWarning && styles.warningText,
                isSuccess && styles.successText,
              ]}
            >
              {risk.severity}
            </Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <View>
            <Text style={styles.statusLabel}>
              CURRENT STATUS
            </Text>

            <Text style={styles.statusValue}>
              {risk.status}
            </Text>
          </View>

          <View style={styles.statusRight}>
            <Text style={styles.statusLabel}>
              RISK OWNER
            </Text>

            <Text style={styles.statusOwner}>
              {risk.owner}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Risk Description
        </Text>

        <View style={styles.contentCard}>
          <Text style={styles.bodyText}>
            {risk.description}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Potential Impact
        </Text>

        <View style={styles.impactCard}>
          <View style={styles.impactIcon}>
            <Text style={styles.impactIconText}>
              !
            </Text>
          </View>

          <Text style={styles.impactText}>
            {risk.severity === 'Critical'
              ? 'Potential impact to major project milestones and dependent delivery activities.'
              : risk.severity === 'High'
              ? 'Potential impact to delivery timeline, quality, or team capacity if not addressed.'
              : risk.severity === 'Medium'
              ? 'Potential impact to delivery efficiency and available execution time.'
              : 'Low current impact; continued monitoring is required until the risk is closed.'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Recommended Mitigation
        </Text>

        <View style={styles.mitigationCard}>
          <View style={styles.mitigationIcon}>
            <Text style={styles.mitigationIconText}>
              →
            </Text>
          </View>

          <View style={styles.mitigationContent}>
            <Text style={styles.mitigationTitle}>
              Delivery Manager Action
            </Text>

            <Text style={styles.mitigationText}>
              {risk.action}
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

  headerContent: {
    flex: 1,
    marginRight: spacing.md,
  },

  eyebrow: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 5,
  },

  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '800',
  },

  project: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },

  severityBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 4,
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

  statusCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },

  statusLabel: {
    color: '#DBEAFE',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.7,
    marginBottom: 5,
  },

  statusValue: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '800',
  },

  statusRight: {
    alignItems: 'flex-end',
  },

  statusOwner: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: '700',
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '700',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },

  contentCard: {
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
    lineHeight: 21,
  },

  impactCard: {
    backgroundColor: colors.dangerBackground,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  impactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  impactIconText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '800',
  },

  impactText: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    lineHeight: 20,
  },

  mitigationCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: 'row',
  },

  mitigationIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  mitigationIconText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
  },

  mitigationContent: {
    flex: 1,
  },

  mitigationTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },

  mitigationText: {
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