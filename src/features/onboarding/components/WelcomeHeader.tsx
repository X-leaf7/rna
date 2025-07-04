import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Spacing, Typography } from '../../../shared/constants';

interface WelcomeHeaderProps {
  logo: ImageSourcePropType;
  primaryColor: string;
  secondaryColor: string;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ logo, primaryColor, secondaryColor }) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={[styles.title, { color: primaryColor }]}>Welcome to the Team!</Text>
      <Text style={[styles.subtitle, { color: secondaryColor }]}>
        Enter your employee ID to get started
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: Spacing.md,
  },

  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },

  subtitle: {
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.md,
  },
});
