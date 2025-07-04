import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Button, Container } from '@/src/shared/components';
import { useOnboarding } from '../context/OnboardingContext';
import { validateVerificationCode } from '@/src/shared/utils';
import { Colors, Spacing, Typography } from '../../../shared/constants';
import { router } from 'expo-router';

export const VerificationPage: React.FC = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const { state, verifyCode } = useOnboarding();
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join('');
    if (!validateVerificationCode(fullCode)) {
      Alert.alert('Invalid Code', 'Please enter the complete 6-digit verification code');
      return;
    }

    await verifyCode(fullCode);

    router.replace('/(tabs)')
  };

  const handleResendCode = () => {
    Alert.alert(
      'Code Resent',
      `A new verification code has been sent to ${state.employee?.email}`
    );
  };

  return (
    <Container scrollable>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to {state.employee?.email}
          </Text>
        </View>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.codeInput}
              value={digit}
              onChangeText={(text) => handleCodeChange(text.slice(-1), index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        {state.error && (
          <Text style={styles.errorText}>{state.error}</Text>
        )}

        <Button
          title="Verify Code"
          onPress={handleSubmit}
          loading={state.isLoading}
          disabled={code.some(digit => !digit)}
          style={styles.verifyButton}
        />

        <Button
          title="Resend Code"
          onPress={handleResendCode}
          variant="ghost"
          style={styles.resendButton}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.xl
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

  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },

  codeInput: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderRadius: 12,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    backgroundColor: Colors.background.secondary,
  },

  errorText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.status.error,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },

  verifyButton: {
    marginBottom: Spacing.md,
  },

  resendButton: {
    marginTop: Spacing.sm,
  },
});