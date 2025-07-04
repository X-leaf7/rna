import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from '../../../shared/components';

import { Colors, Spacing, Typography } from '../../../shared/constants';
import { LocationInfo } from '../components/LocationInfo';
import { ReportTypeSelector } from '../components/ReportTypeSelector';
import { ReportForm } from '../components/ReportForm';
import { ReportingProvider } from '..';

const ReportingPageContent: React.FC = () => {
    return (
        <Container scrollable>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.brandText}>GetVer.io</Text>
                    <Text style={styles.securityText}>🔒 Anonymous • Blockchain Verified</Text>
                </View>
                <Text style={styles.title}>🔒 VAC Report</Text>
                <Text style={styles.subtitle}>Verified Anonymous Compliance</Text>
            </View>

            <LocationInfo />
            <ReportTypeSelector />
            <ReportForm />
        </Container>
    );
};

export const ReportingPage: React.FC = () => {
    return (
        <ReportingProvider>
            <ReportingPageContent />
        </ReportingProvider>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.primary.main,
        padding: Spacing.lg,
        borderRadius: 20,
        marginBottom: Spacing.lg,
        marginHorizontal: -Spacing.lg,
        marginTop: -Spacing.lg,
    },

    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },

    brandText: {
        fontSize: Typography.fontSize.xs,
        color: Colors.neutral.white,
        opacity: 0.8,
        fontWeight: Typography.fontWeight.medium,
    },

    securityText: {
        fontSize: Typography.fontSize.xs,
        color: Colors.neutral.white,
        opacity: 0.8,
    },

    title: {
        fontSize: Typography.fontSize.xxl,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.neutral.white,
        textAlign: 'center',
        marginBottom: Spacing.xs,
    },

    subtitle: {
        fontSize: Typography.fontSize.md,
        color: Colors.neutral.white,
        opacity: 0.9,
        textAlign: 'center',
    },
});