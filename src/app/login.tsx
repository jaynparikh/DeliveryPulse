import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, radius, spacing } from '../theme';

export default function LoginScreen() {
  const [email, setEmail] = useState(
    'manager@deliverypulse.com'
  );

  const [password, setPassword] = useState('password');

  const handleLogin = () => {
    router.replace('/dashboard');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios' ? 'padding' : undefined
      }
    >
      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>DP</Text>
        </View>

        <Text style={styles.title}>DeliveryPulse</Text>

        <Text style={styles.subtitle}>
          AI-powered project delivery intelligence
        </Text>

        <View style={styles.card}>
          <Text style={styles.welcome}>
            Welcome back
          </Text>

          <Text style={styles.description}>
            Sign in to access your delivery command center.
          </Text>

          <Text style={styles.label}>Email</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            style={styles.input}
          />

          <Pressable
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              Sign in
            </Text>
          </Pressable>

          <Text style={styles.demoText}>
            Demo application. Authentication will be connected
            to the backend later.
          </Text>
        </View>

        <Text style={styles.footer}>
          DeliveryPulse · Project Delivery Intelligence
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },

  logo: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  logoText: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '800',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 6,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  welcome: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },

  description: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    marginBottom: spacing.lg,
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 14,
    marginBottom: spacing.md,
    backgroundColor: '#FAFAFA',
  },

  loginButton: {
    height: 50,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },

  loginButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '700',
  },

  demoText: {
    color: colors.textSecondary,
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: spacing.md,
  },

  footer: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});