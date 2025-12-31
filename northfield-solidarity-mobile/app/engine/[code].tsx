
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import InnerSanctumScreen from '@/components/engines/InnerSanctumScreen';
import ChronicleScreen from '@/components/engines/ChronicleScreen';
import FirmamentScreen from '@/components/engines/FirmamentScreen';
import { NS_ENGINES } from '@shared/data/engineRegistry';

export default function EngineDetailScreen() {
    const { code } = useLocalSearchParams();
    const router = useRouter();
    const engineCode = typeof code === 'string' ? code : code?.[0];

    const engine = NS_ENGINES.find(e => e.code === engineCode);
    const isActive = engine?.status?.toLowerCase().includes('active');

    // Dynamic Header Title
    useLayoutEffect(() => {
        // Additional header config if needed
    }, [engineCode]);

    // --- SPECIALIZED ENGINES ---
    if (engineCode === 'INNER_SANCTUM' || engineCode === 'SANCTUM' || engineCode === 'JRNL') {
        return (
            <>
                <Stack.Screen options={{ title: 'Inner Sanctum', headerTintColor: '#d8b4fe' }} />
                <InnerSanctumScreen />
            </>
        );
    }

    if (engineCode === 'CRN') {
        return (
            <>
                <Stack.Screen options={{ title: 'Chronicle' }} />
                <ChronicleScreen />
            </>
        );
    }

    if (engineCode === 'FIRMAMENT') {
        return (
            <>
                <Stack.Screen options={{ title: 'Firmament Cockpit', headerTintColor: '#00ff9d' }} />
                <FirmamentScreen />
            </>
        );
    }

    // --- NOT FOUND ---
    if (!engine) {
        return (
            <ThemedView style={styles.container}>
                <Stack.Screen options={{ title: 'Unknown Engine' }} />
                <ThemedText>Engine not found.</ThemedText>
            </ThemedView>
        );
    }

    // --- GENERIC ENGINE VIEW ---
    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{
                title: engine.code,
                headerTintColor: isActive ? '#00ff9d' : '#888',
            }} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={[styles.badge, isActive ? styles.activeBadge : styles.plannedBadge]}>
                        <ThemedText style={[styles.badgeText, isActive ? styles.activeText : styles.plannedText]}>
                            {engine.status}
                        </ThemedText>
                    </View>
                    <ThemedText type="title" style={styles.name}>{engine.name}</ThemedText>
                    <ThemedText style={styles.category}>{engine.category}</ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText type="subtitle">Mission</ThemedText>
                    <ThemedText style={styles.bodyText}>{engine.description}</ThemedText>
                </View>

                <View style={styles.grid}>
                    <View style={styles.gridItem}>
                        <ThemedText style={styles.gridLabel}>Responsibilities</ThemedText>
                        {engine.responsibilities.map((r, i) => (
                            <View key={i} style={styles.bullet}>
                                <View style={[styles.dot, { backgroundColor: '#a855f7' }]} />
                                <ThemedText style={styles.gridValue}>{r}</ThemedText>
                            </View>
                        ))}
                    </View>

                    <View style={styles.gridItem}>
                        <ThemedText style={styles.gridLabel}>Integrations</ThemedText>
                        <View style={styles.tags}>
                            {engine.integrations.map((int, i) => (
                                <View key={i} style={styles.tag}>
                                    <ThemedText style={styles.tagText}>{int}</ThemedText>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {engine.endpoints && (
                    <View style={styles.section}>
                        <ThemedText type="subtitle">Endpoints</ThemedText>
                        <View style={styles.endpointList}>
                            {engine.endpoints.slice(0, 3).map((ep, i) => (
                                <View key={i} style={styles.endpoint}>
                                    <View style={[styles.methodBadge, ep.method === 'GET' ? styles.methodGet : styles.methodPost]}>
                                        <ThemedText style={styles.methodText}>{ep.method}</ThemedText>
                                    </View>
                                    <View>
                                        <ThemedText style={styles.pathText}>{ep.path}</ThemedText>
                                        <ThemedText style={styles.descText}>{ep.desc}</ThemedText>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
    },
    header: {
        marginBottom: 32,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: 12,
        borderWidth: 1,
    },
    activeBadge: {
        backgroundColor: 'rgba(0, 255, 157, 0.1)',
        borderColor: 'rgba(0, 255, 157, 0.2)',
    },
    plannedBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    activeText: { color: '#00ff9d' },
    plannedText: { color: '#888' },
    name: {
        marginBottom: 4,
    },
    category: {
        fontSize: 14,
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    section: {
        marginBottom: 32,
    },
    bodyText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#ccc',
    },
    grid: {
        gap: 24,
        marginBottom: 32,
    },
    gridItem: {
        gap: 8,
    },
    gridLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    bullet: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        marginBottom: 4,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 6,
    },
    gridValue: {
        fontSize: 14,
        color: '#ccc',
        flex: 1,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: '#222',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333',
    },
    tagText: {
        fontSize: 12,
        color: '#ccc',
        fontFamily: 'Courier',
    },
    endpointList: {
        gap: 12,
    },
    endpoint: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#111',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#222',
    },
    methodBadge: {
        width: 48,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    methodGet: { backgroundColor: '#0ea5e9' },
    methodPost: { backgroundColor: '#eab308' },
    methodText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    pathText: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Courier',
    },
    descText: {
        fontSize: 12,
        color: '#666',
    },
});
