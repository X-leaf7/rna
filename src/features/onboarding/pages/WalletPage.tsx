import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button } from '@/src/shared/components';
import { useOnboarding } from '../context/OnboardingContext';
import { Colors, Spacing, Typography } from '../../../shared/constants';
import { router } from 'expo-router';

export const WalletPage: React.FC = () => {
  const { state, createWallet } = useOnboarding();

  useEffect(() => {
    createWallet();
  }, []);

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  const renderWalletInfo = () => {
    if (!state.walletData) return null;

    const { address, isNew, verTokens, alphBalance } = state.walletData;

    return (
      <View style={styles.walletInfo}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusIcon}>{isNew ? '🎉' : '👋'}</Text>
          <Text style={styles.statusText}>
            {isNew ? 'New wallet created and funded!' : 'Welcome back!'}
          </Text>
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Your Wallet Address:</Text>
          <Text style={styles.addressText}>{address}</Text>
        </View>

        <View style={styles.balanceContainer}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceValue}>{verTokens.toLocaleString()}</Text>
            <Text style={styles.balanceLabel}>VER Tokens</Text>
          </View>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceValue}>${alphBalance.toFixed(2)}</Text>
            <Text style={styles.balanceLabel}>ALPH Balance</Text>
          </View>
        </View>

        {isNew && (
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>🎁 Welcome Benefits:</Text>
            <Text style={styles.benefitItem}>• 1,000 VER tokens awarded</Text>
            <Text style={styles.benefitItem}>• $5 ALPH for transaction fees</Text>
            <Text style={styles.benefitItem}>• Passkey-based security enabled</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <Container scrollable>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {state.walletData?.isNew ? 'Wallet Created!' : 'Wallet Ready!'}
          </Text>
          <Text style={styles.subtitle}>
            Your secure digital wallet is now ready to use
          </Text>
        </View>

        {state.isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>🔧 Setting up your wallet...</Text>
            <Text style={styles.loadingSubtext}>This may take a few moments</Text>
          </View>
        ) : (
          renderWalletInfo()
        )}

        {state.walletData && (
          <Button
            title="Go to Dashboard"
            onPress={handleContinue}
            style={styles.continueButton}
          />
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🔒 Your wallet is secured with passkey technology
          </Text>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
  },

  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },

  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },

  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.md,
  },

  loadingContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },

  loadingText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },

  loadingSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },

  walletInfo: {
    marginBottom: Spacing.xl,
  },

  statusContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  statusIcon: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },

  statusText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    textAlign: 'center',
  },

  addressContainer: {
    backgroundColor: Colors.background.secondary,
    padding: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.lg,
  },

  addressLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },

  addressText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'monospace',
    color: Colors.text.primary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
  },

  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },

  balanceItem: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
  },

  balanceValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.main,
    marginBottom: Spacing.xs,
  },

  balanceLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },

  benefitsContainer: {
    backgroundColor: Colors.status.success + '10',
    padding: Spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.status.success + '30',
  },

  benefitsTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },

  benefitItem: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },

  continueButton: {
    marginBottom: Spacing.lg,
  },

  footer: {
    alignItems: 'center',
  },

  footerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});