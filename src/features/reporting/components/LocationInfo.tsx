import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useReporting } from '../context/ReportingContext';
import { Colors, Spacing, Typography } from '../../../shared/constants';

export const LocationInfo: React.FC = () => {
    const { state, loadLocation } = useReporting();
    const [compass, setCompass] = useState(45);

    useEffect(() => {
        loadLocation();

        // Simulate compass updates
        const interval = setInterval(() => {
            setCompass(prev => (prev + Math.random() * 10 - 5 + 360) % 360);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const getCompassDirection = (heading: number) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(heading / 45) % 8;
        return directions[index];
    };

    if (!state.location) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>📍 Loading location...</Text>
            </View>
        );
    }

    const { latitude, longitude, elevation } = state.location;

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.statusIndicator} />
                <Text style={styles.coordinatesText}>
                    GPS: {latitude.toFixed(4)}° N, {Math.abs(longitude).toFixed(4)}° W
                </Text>
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineIcon}>📱</Text>
                    <Text style={styles.offlineText}>Offline Ready</Text>
                </View>
            </View>

            {elevation && (
                <Text style={styles.elevationText}>
                    Elevation: {elevation.toLocaleString()} ft
                </Text>
            )}

            <View style={styles.row}>
                <Text style={styles.dataText}>
                    📦 Data stored locally • Auto-sync on next connection
                </Text>
                <View style={styles.compassContainer}>
                    <View style={styles.compass}>
                        <View
                            style={[
                                styles.compassNeedle,
                                { transform: [{ rotate: `${compass}deg` }] }
                            ]}
                        />
                    </View>
                    <Text style={styles.compassText}>
                        {getCompassDirection(compass)} {Math.round(compass)}°
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background.secondary,
        padding: Spacing.md,
        borderRadius: 12,
        marginBottom: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border.light,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },

    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.status.success,
        marginRight: Spacing.xs,
    },

    coordinatesText: {
        flex: 1,
        fontSize: Typography.fontSize.xs,
        color: Colors.text.secondary,
    },

    offlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    offlineIcon: {
        fontSize: Typography.fontSize.md,
        marginRight: Spacing.xs,
    },

    offlineText: {
        fontSize: Typography.fontSize.xs,
        color: Colors.text.secondary,
    },

    elevationText: {
        fontSize: Typography.fontSize.xs,
        color: Colors.text.secondary,
        marginBottom: Spacing.xs,
    },

    dataText: {
        flex: 1,
        fontSize: Typography.fontSize.xs,
        color: Colors.text.secondary,
        fontStyle: 'italic',
    },

    compassContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    compass: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: Colors.text.secondary,
        borderRadius: 12,
        marginRight: Spacing.xs,
        justifyContent: 'center',
        alignItems: 'center',
    },

    compassNeedle: {
        width: 2,
        height: 8,
        backgroundColor: Colors.status.error,
        position: 'absolute',
        top: 2,
    },

    compassText: {
        fontSize: Typography.fontSize.xs,
        color: Colors.text.secondary,
    },

    loadingText: {
        fontSize: Typography.fontSize.sm,
        color: Colors.text.secondary,
        textAlign: 'center',
    },
});