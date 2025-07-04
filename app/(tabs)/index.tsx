import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Container } from '@/src/shared/components';
import { useOnboarding } from '@/src/features/onboarding';
import { Colors, Spacing, Typography } from '@/src/shared/constants';

export default function DashboardPage() {
  const { state } = useOnboarding();

  const mockStats = {
    reportsSubmitted: 12,
    reputationScore: 95,
    lastActivity: '2 hours ago',
  };

  return (
    <Container scrollable>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Welcome back, {state.employee?.firstName || 'User'}!
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Activity Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Activity Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{mockStats.reportsSubmitted}</Text>
              <Text style={styles.statLabel}>Reports Submitted</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{mockStats.reputationScore}%</Text>
              <Text style={styles.statLabel}>Reputation Score</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
          <View style={styles.quickActions}>
            <View style={styles.actionCard}>
              <Text style={styles.actionIcon}>📝</Text>
              <Text style={styles.actionTitle}>Submit Report</Text>
              <Text style={styles.actionDescription}>
                Report compliance issues or achievements
              </Text>
            </View>
            <View style={styles.actionCard}>
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionTitle}>View Stats</Text>
              <Text style={styles.actionDescription}>
                Check your performance stats and reports
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🕒 Recent Activity</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>
              Last activity: {mockStats.lastActivity}
            </Text>
            <Text style={styles.activityDescription}>
              Compliance report submitted successfully
            </Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Spacing.xl,
    paddingTop: Spacing.lg,
  },

  greeting: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },

  subGreeting: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
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

  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },

  statCard: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  statValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.main,
    marginBottom: Spacing.xs,
  },

  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    textAlign: 'center',
  },

  quickActions: {
    gap: Spacing.md,
  },

  actionCard: {
    backgroundColor: Colors.background.secondary,
    padding: Spacing.lg,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  actionIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },

  actionTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },

  actionDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
  },

  activityCard: {
    backgroundColor: Colors.background.secondary,
    padding: Spacing.lg,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  activityText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },

  activityDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
});
