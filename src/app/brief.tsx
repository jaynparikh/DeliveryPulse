import { StyleSheet, Text, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import { colors, spacing } from '../theme';

export default function BriefScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Daily Delivery Brief</Text>

        <Text style={styles.subtitle}>
          Your recommended actions for today
        </Text>

        <View style={styles.card}>
          <Text style={styles.number}>01</Text>

          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>
              Review Project Phoenix
            </Text>

            <Text style={styles.cardText}>
              API integration is behind schedule and may impact the next
              milestone.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.number}>02</Text>

          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>
              Follow up on Atlas UAT
            </Text>

            <Text style={styles.cardText}>
              Five unresolved defects require attention before the UAT
              milestone.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.number}>03</Text>

          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>
              Review engineering capacity
            </Text>

            <Text style={styles.cardText}>
              Current engineering allocation has reached 106%.
            </Text>
          </View>
        </View>
      </View>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    padding: spacing.lg,
    paddingTop: spacing.xl,
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

  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
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
});