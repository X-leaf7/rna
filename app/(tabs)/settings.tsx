import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { Container, Button } from '@/src/shared/components';
import { useOnboarding } from '@/src/features/onboarding';
import { Colors, Spacing, Typography } from '@/src/shared/constants';
import { router } from 'expo-router';

export default function SettingsPage() {
  const { reset } = useOnboarding();
  const [notifications, setNotifications] = React.useState(true);
  const [biometrics, setBiometrics] = React.useState(true);
  const [analytics, setAnalytics] = React.useState(false);

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            reset();
            router.replace('/');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted');
          },
        },
      ]
    );
  };

  return (
    <Container scrollable>
      <View style={styles.header}>
        <Text style={styles.title}>⚙️ Settings</Text>
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📱 App Settings</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: Colors.neutral.gray300, true: Colors.primary.light }}
              thumbColor={notifications ? Colors.primary.main : Colors.neutral.gray400}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Biometric Login</Text>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={{ false: Colors.neutral.gray300, true: Colors.primary.light }}
              thumbColor={biometrics ? Colors.primary.main : Colors.neutral.gray400}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Analytics & Crash Reports</Text>
            <Switch
              value={analytics}
              onValueChange={setAnalytics}
              trackColor={{ false: Colors.neutral.gray300, true: Colors.primary.light }}
              thumbColor={analytics ? Colors.primary.main : Colors.neutral.gray400}
            />
          </View>
        </View>
      </View>

      {/* Security Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔐 Security</Text>
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionLabel}>Two-Factor Authentication</Text>
            <Text style={styles.actionDescription}>Manage 2FA settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Data & Privacy */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛡️ Data & Privacy</Text>
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionLabel}>Privacy Policy</Text>
            <Text style={styles.actionDescription}>View our privacy policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionLabel}>Terms of Service</Text>
            <Text style={styles.actionDescription}>Read terms and conditions</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Actions */}
      <View style={styles.section}>
        <Button
          title="Sign Out"
          onPress={handleSignOut}
          variant="outline"
          style={styles.signOutButton}
        />

        <Button
          title="Delete Account"
          onPress={handleDeleteAccount}
          variant="outline"
          style={styles.deleteButton}
          textStyle={styles.deleteButtonText}
        />
      </View>

      {/* App Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>GetVer.io v1.0.0</Text>
        <Text style={styles.footerSubtext}>
          Built with security and privacy in mind
        </Text>
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

  section: {
    marginBottom: Spacing.xl,
  },

  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },

  settingsCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  settingLabel: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },

  actionItem: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  actionLabel: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },

  actionDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },

  signOutButton: {
    marginBottom: Spacing.md,
  },

  deleteButton: {
    borderColor: Colors.status.error,
  },

  deleteButtonText: {
    color: Colors.status.error,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },

  footerText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },

  footerSubtext: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
});
