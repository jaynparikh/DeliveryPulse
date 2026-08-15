import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

const navigationItems = [
  {
    label: 'Home',
    path: '/dashboard',
    icon: '⌂',
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: '▣',
  },
  {
    label: 'Risks',
    path: '/risks',
    icon: '!',
  },
  {
    label: 'Resources',
    path: '/resources',
    icon: '●',
  },
  {
    label: 'Copilot',
    path: '/copilot',
    icon: '✦',
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  const navigate = (path: string) => {
    router.replace(path as never);
  };

  return (
    <View style={styles.container}>
      {navigationItems.map((item) => {
        const active = pathname === item.path;

        return (
          <Pressable
            key={item.path}
            style={styles.item}
            onPress={() => navigate(item.path)}
          >
            <View
              style={[
                styles.iconContainer,
                active && styles.activeIconContainer,
              ]}
            >
              <Text
                style={[
                  styles.icon,
                  active && styles.activeIcon,
                ]}
              >
                {item.icon}
              </Text>
            </View>

            <Text
              style={[
                styles.label,
                active && styles.activeLabel,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 4,
  },

  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer: {
    width: 34,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeIconContainer: {
    backgroundColor: '#DBEAFE',
  },

  icon: {
    fontSize: 17,
    color: colors.textSecondary,
    fontWeight: '700',
  },

  activeIcon: {
    color: colors.primary,
  },

  label: {
    fontSize: 9,
    color: colors.textSecondary,
    marginTop: 3,
  },

  activeLabel: {
    color: colors.primary,
    fontWeight: '700',
  },
});