import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useReporting } from '../context/ReportingContext';
import { Colors, Spacing, Typography } from '../../../shared/constants';

export const ReportTypeSelector: React.FC = () => {
  const { state, setReportType } = useReporting();

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            styles.goodButton,
            state.currentReport.type === 'good' && styles.selectedButton,
          ]}
          onPress={() => setReportType('good')}
        >
          <Text style={styles.buttonEmoji}>✅</Text>
          <Text style={[styles.buttonText, styles.goodButtonText]}>
            Report{'\n'}Something Good
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeButton,
            styles.badButton,
            state.currentReport.type === 'bad' && styles.selectedButton,
          ]}
          onPress={() => setReportType('bad')}
        >
          <Text style={styles.buttonEmoji}>❌</Text>
          <Text style={[styles.buttonText, styles.badButtonText]}>
            Report{'\n'}Something Bad
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },

  typeButton: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },

  goodButton: {
    backgroundColor: Colors.status.success,
  },

  badButton: {
    backgroundColor: Colors.status.error,
  },

  selectedButton: {
    transform: [{ translateY: -3 }],
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 12,
  },

  buttonEmoji: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },

  buttonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.tight * Typography.fontSize.md,
  },

  goodButtonText: {
    color: Colors.neutral.white,
  },

  badButtonText: {
    color: Colors.neutral.white,
  },
});