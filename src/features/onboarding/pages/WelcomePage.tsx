import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Container, Input, Button } from '@/src/shared/components';
import { validateEmployeeId, formatEmployeeId } from '@/src/shared/utils';
import { WelcomeHeader } from '../components/WelcomeHeader';
import { useOnboarding } from '../context/OnboardingContext';
import { Colors, Spacing, Typography } from '../../../shared/constants';
import { IMAGE_ASSETS } from '@/src/shared/utils/image-assets';

export const WelcomePage: React.FC = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [company, setCompany] = useState('CompanyA'); // Temporary state for switching between companies
    const { state, verifyEmployeeId } = useOnboarding();

    const handleEmployeeIdChange = (text: string) => {
        const formatted = formatEmployeeId(text);
        setEmployeeId(formatted);
    };

    const handleSubmit = async () => {
        if (!validateEmployeeId(employeeId)) {
            Alert.alert('Invalid Employee ID', 'Please enter a valid 6-8 digit employee ID');
            return;
        }

        await verifyEmployeeId(employeeId);
        router.replace('/onboarding/verification');
    };

    // Temporary button to switch company branding
    const switchCompany = () => {
        setCompany(company === 'CompanyA' ? 'CompanyB' : 'CompanyA');
    };

    const companyBranding = company === 'CompanyA' 
        ? { logo: IMAGE_ASSETS.companyALogo, primaryColor: Colors.primary.main, secondaryColor: Colors.text.secondary, backgroundColor: '#f4f8fc' }
        : { logo: IMAGE_ASSETS.companyBLogo, primaryColor: '#2E8B57', secondaryColor: '#333', backgroundColor: '#fffbf0' };

    return (
        <Container scrollable style={{ backgroundColor: companyBranding.backgroundColor }}>
            <View style={[styles.content, { backgroundColor: companyBranding.backgroundColor }]}>
                <WelcomeHeader
                    logo={companyBranding.logo}
                    primaryColor={companyBranding.primaryColor}
                    secondaryColor={companyBranding.secondaryColor}
                />

                <Text style={[styles.title, { color: companyBranding.primaryColor }]}>Step 1: Enter Employee ID</Text>

                <View style={styles.form}>
                    <Input
                        label="Employee ID"
                        value={employeeId}
                        onChangeText={handleEmployeeIdChange}
                        placeholder="Enter your employee ID"
                        keyboardType="numeric"
                        maxLength={8}
                        error={state.error ?? undefined}
                    />

                    <Text style={[styles.infoText, { color: companyBranding.secondaryColor }]}>
                        ✓ Your employee ID will be used ONLY for verification
                    </Text>
                    <Text style={[styles.infoText, { color: companyBranding.secondaryColor }]}>
                        ✓ Your ID is immediately deleted after verification
                    </Text>
                    <Text style={[styles.infoText, { color: companyBranding.secondaryColor }]}>
                        ✓ NO connection between your ID and responses is ever stored
                    </Text>
                    <Text style={[styles.infoText, { color: companyBranding.secondaryColor }]}>
                        ✓ This process is secured by blockchain technology
                    </Text>
                    <Text style={[styles.infoText, { color: companyBranding.secondaryColor }]}>
                        ✓ Independent third-party auditors verify this system's anonymity
                    </Text>

                    <Text style={[styles.infoText, { color: companyBranding.primaryColor }]}>
                        By proceeding, you are accessing an anonymous survey. Your honest feedback helps improve working conditions.
                    </Text>

                    <Button
                        title="VERIFY ID"
                        onPress={handleSubmit}
                        loading={state.isLoading}
                        disabled={!validateEmployeeId(employeeId)}
                    />
                </View>

                <TouchableOpacity onPress={switchCompany} style={styles.switchCompanyButton}>
                    <Text style={styles.switchCompanyText}>Switch Company Branding</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        🔒 Your data is encrypted and secure
                    </Text>
                    <Text style={styles.footerSubtext}>
                        Need help? Contact IT support
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
        paddingHorizontal: Spacing.lg,
        // borderRadius: 12,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
    },

    title: {
        fontSize: Typography.fontSize.lg,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: Spacing.lg,
    },

    form: {
        marginBottom: Spacing.xl,
    },

    infoText: {
        fontSize: Typography.fontSize.sm,
        marginBottom: Spacing.sm,
    },

    switchCompanyButton: {
        marginTop: Spacing.xl,
        alignItems: 'center',
        padding: Spacing.sm,
        backgroundColor: Colors.secondary.main,
        borderRadius: 5,
    },

    switchCompanyText: {
        fontSize: Typography.fontSize.sm,
        color: '#fff',
    },

    footer: {
        alignItems: 'center',
        marginTop: Spacing.xl,
    },

    footerText: {
        fontSize: Typography.fontSize.sm,
        color: Colors.text.secondary,
        textAlign: 'center',
        marginBottom: Spacing.xs,
    },

    footerSubtext: {
        fontSize: Typography.fontSize.xs,
        color: Colors.text.tertiary,
        textAlign: 'center',
    },
});
