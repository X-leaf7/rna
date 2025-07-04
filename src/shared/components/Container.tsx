import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing } from '../constants';

export interface ContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  padding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  scrollable = false,
  style,
  contentContainerStyle,
  padding = true,
}) => {
  const containerStyle = [
    styles.container,
    padding && styles.padding,
    style, // Apply the style passed to the Container component
  ];

  if (scrollable) {
    return (
      <ScrollView
        style={containerStyle}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  padding: {
    paddingHorizontal: Spacing.lg,
  },

  scrollContent: {
    flexGrow: 1,
  },
});
