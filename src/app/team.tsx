import { StyleSheet, Text, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import { colors, spacing } from '../theme';

export default function TeamScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Team</Text>
        <Text style={styles.subtitle}>
          Team allocation and capacity
        </Text>

        <View style={styles.placeholder}>
          <Text style={styles.placeholderTitle}>Team capacity</Text>
          <Text style={styles.placeholderText}>
            Resource allocation, utilization and workload insights will be
            built here.
          </Text>
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
  },

  placeholder: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },

  placeholderTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },

  placeholderText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    marginTop: 7,
  },
});