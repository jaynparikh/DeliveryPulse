import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BottomNav from '../components/BottomNav';
import { colors, radius, spacing } from '../theme';

import {
  getProjects,
  getResources,
  getRisks,
  Project,
  Resource,
  Risk,
} from '../services/api';

type BriefItem = {
  id: string;
  title: string;
  text: string;
};

export default function BriefScreen() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [risks, setRisks] =
    useState<Risk[]>([]);

  const [resources, setResources] =
    useState<Resource[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    let ignore = false;

    const loadBrief = async () => {
      try {
        setLoading(true);
        setError('');

        const [
          projectData,
          riskData,
          resourceData,
        ] = await Promise.all([
          getProjects(),
          getRisks(),
          getResources(),
        ]);

        if (!ignore) {
          setProjects(projectData);
          setRisks(riskData);
          setResources(resourceData);
        }
      } catch (err) {
        console.error(
          'Daily brief loading error:',
          err
        );

        if (!ignore) {
          setError(
            'Unable to load the daily delivery brief.'
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadBrief();

    return () => {
      ignore = true;
    };
  }, []);

  const atRiskProject = projects.find(
    (project) =>
      project.status === 'At Risk'
  );

  const watchProject = projects.find(
    (project) =>
      project.status === 'Watch'
  );

  const criticalRisk = risks.find(
    (risk) =>
      risk.severity === 'Critical' &&
      risk.status === 'Open'
  );

  const overloadedResource = resources.find(
    (resource) =>
      resource.status === 'Overloaded'
  );

  const briefItems: BriefItem[] = [];

  if (atRiskProject) {
    briefItems.push({
      id: 'at-risk-project',
      title: `Review ${atRiskProject.name}`,
      text:
        atRiskProject.risk,
    });
  }

  if (criticalRisk) {
    briefItems.push({
      id: 'critical-risk',
      title: `Act on ${criticalRisk.title}`,
      text:
        criticalRisk.action,
    });
  } else if (watchProject) {
    briefItems.push({
      id: 'watch-project',
      title: `Follow up on ${watchProject.name}`,
      text:
        watchProject.risk,
    });
  }

  if (overloadedResource) {
    briefItems.push({
      id: 'overloaded-resource',
      title: `Review ${overloadedResource.name}'s capacity`,
      text:
        `${overloadedResource.name} is allocated at ${overloadedResource.allocation}% on ${overloadedResource.project}. Rebalancing should be considered.`,
    });
  }

  const displayItems =
    briefItems.slice(0, 3);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>
          Daily Delivery Brief
        </Text>

        <Text style={styles.subtitle}>
          Your recommended actions for today
        </Text>

        {loading ? (
          <View style={styles.stateCard}>
            <ActivityIndicator
              size="small"
              color={colors.primary}
            />

            <Text style={styles.stateText}>
              Preparing your delivery brief...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>
              Unable to load brief
            </Text>

            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        ) : displayItems.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No immediate actions
            </Text>

            <Text style={styles.emptyText}>
              The current portfolio does not
              have any urgent delivery
              exceptions requiring attention.
            </Text>
          </View>
        ) : (
          displayItems.map((item, index) => (
            <View
              key={item.id}
              style={styles.card}
            >
              <Text style={styles.number}>
                {String(index + 1).padStart(
                  2,
                  '0'
                )}
              </Text>

              <View
                style={styles.textContainer}
              >
                <Text
                  style={styles.cardTitle}
                >
                  {item.title}
                </Text>

                <Text
                  style={styles.cardText}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          ))
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

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
    marginBottom: spacing.xl,
  },

  stateCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.xl,
    alignItems: 'center',
  },

  stateText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacing.md,
  },

  errorCard: {
    backgroundColor: colors.dangerBackground,
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: radius.md,
    padding: spacing.lg,
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

  emptyCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
  },

  emptyText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
  },

  number: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
    marginRight: spacing.md,
  },

  textContainer: {
    flex: 1,
  },

  cardTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },

  cardText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  bottomSpace: {
    height: 30,
  },
});