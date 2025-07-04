import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from '@/src/shared/components';
import { useOnboarding } from '@/src/features/onboarding';
import { Colors, Spacing, Typography } from '@/src/shared/constants';

export default function ProfilePage() {
  const { state } = useOnboarding();

  // Fallback to a mock name if first or last name is missing
  const firstName = state.employee?.firstName || 'Anonymous';
  const lastName = state.employee?.lastName || 'User';

  return (
    <Container scrollable>
      <View style={styles.header}>
        <Text style={styles.title}>👤 Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {firstName[0]}{lastName[0]}
          </Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.email}>{state.employee?.email || 'example@company.com'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔐 Security</Text>
        <View style={styles.securityCard}>
          <View style={styles.securityItem}>
            <Text style={styles.securityLabel}>Account Status</Text>
            <Text style={styles.securityValue}>Verified ✅</Text>
          </View>
          <View style={styles.securityItem}>
            <Text style={styles.securityLabel}>Two-Factor Auth</Text>
            <Text style={styles.securityValue}>Enabled ✅</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Statistics</Text>
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <Text style={styles.statsValue}>12</Text>
              <Text style={styles.statsLabel}>Reports</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statsValue}>95%</Text>
              <Text style={styles.statsLabel}>Accuracy</Text>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Spacing.xl,
    paddingTop: Spacing.lg,
  },

  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },

  profileCard: {
    backgroundColor: Colors.background.secondary,
    padding: Spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  avatarText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.white,
  },

  profileInfo: {
    alignItems: 'center',
  },

  name: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },

  email: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },

  section: {
    marginBottom: Spacing.xl,
  },

  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },

  securityCard: {
    backgroundColor: Colors.background.secondary,
    padding: Spacing.lg,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  securityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  securityLabel: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },

  securityValue: {
    fontSize: Typography.fontSize.sm,
    color: Colors.status.success,
    fontWeight: Typography.fontWeight.medium,
  },

  statsCard: {
    backgroundColor: Colors.background.secondary,
    padding: Spacing.lg,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statsItem: {
    alignItems: 'center',
    flex: 1,
  },

  statsValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.main,
    marginBottom: Spacing.xs,
  },

  statsLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
});
