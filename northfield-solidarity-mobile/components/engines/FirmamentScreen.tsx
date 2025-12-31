
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';

// Layer definitions matching web
const LAYER_GROUPS = [
    {
        title: "Core Infrastructure",
        items: [
            { id: 'entities', label: 'Entities', desc: 'Active Nodes' },
            { id: 'sectors', label: 'Sector Grid', desc: 'Geo-Spatial Mesh' }
        ]
    },
    {
        title: "Real-time Intelligence",
        items: [
            { id: 'events', label: 'Events Feed', desc: 'Live Signals' },
            { id: 'risks', label: 'Risk Perimeter', desc: 'Threat Detection' }
        ]
    },
];

export default function FirmamentScreen() {
    // Mock health data
    const [healthData, setHealthData] = useState([40, 65, 30, 80, 55, 90, 70, 45, 60, 75]);
    const [liveness, setLiveness] = useState(98.2);
    const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
        entities: true,
        risks: true
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setHealthData(prev => prev.map(h => {
                const change = (Math.random() - 0.5) * 30;
                return Math.max(20, Math.min(100, h + change));
            }));

            setLiveness(prev => {
                const change = (Math.random() - 0.5) * 0.4;
                return Math.max(95, Math.min(99.9, prev + change));
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const toggleLayer = (id: string) => {
        setActiveLayers(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <ThemedView style={styles.container}>
            {/* Header / Status */}
            <View style={styles.statusSection}>
                <View style={styles.headerRow}>
                    <Ionicons name="pulse" size={24} color="#00ff9d" />
                    <ThemedText type="subtitle" style={styles.headerTitle}>SYSTEM STATUS</ThemedText>
                </View>

                <View style={styles.healthBarsContainer}>
                    {healthData.map((h, i) => (
                        <View
                            key={i}
                            style={[
                                styles.healthBar,
                                {
                                    height: `${h}%`,
                                    opacity: 0.3 + (h / 200)
                                }
                            ]}
                        />
                    ))}
                </View>
                <ThemedText style={styles.livenessText}>LIVENESS: {liveness.toFixed(1)}%</ThemedText>
            </View>

            {/* Layers Configuration */}
            <ScrollView style={styles.configSection}>
                <View style={styles.headerRow}>
                    <Ionicons name="layers-outline" size={24} color="#fff" />
                    <ThemedText type="subtitle" style={styles.headerTitle}>CONFIGURATION</ThemedText>
                </View>

                <View style={styles.layerGroups}>
                    {LAYER_GROUPS.map((group, idx) => (
                        <View key={idx} style={styles.group}>
                            <ThemedText style={styles.groupTitle}>{group.title}</ThemedText>
                            {group.items.map(item => {
                                const isActive = activeLayers[item.id];
                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={[styles.layerItem, isActive && styles.activeLayerItem]}
                                        onPress={() => toggleLayer(item.id)}
                                    >
                                        <View>
                                            <ThemedText style={[styles.layerLabel, isActive && styles.activeLayerLabel]}>
                                                {item.label}
                                            </ThemedText>
                                            <ThemedText style={styles.layerDesc}>{item.desc}</ThemedText>
                                        </View>

                                        <View style={[styles.toggle, isActive && styles.activeToggle]}>
                                            <View style={[styles.toggleKnob, isActive && styles.activeToggleKnob]} />
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Footer Action */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.launchButton}>
                    <View style={styles.pingDot} />
                    <ThemedText style={styles.launchText}>LAUNCH FIRMAMENT</ThemedText>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusSection: {
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
    },
    headerTitle: {
        letterSpacing: 2,
        fontSize: 14,
        color: '#00ff9d',
    },
    healthBarsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 60,
        gap: 4,
        marginBottom: 8,
    },
    healthBar: {
        flex: 1,
        backgroundColor: '#00ff9d',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
    },
    livenessText: {
        textAlign: 'right',
        fontFamily: 'Courier', // Assuming generic monospace or handled by theme
        fontSize: 12,
        color: '#00ff9d',
        fontWeight: 'bold',
    },
    configSection: {
        flex: 1,
        padding: 20,
    },
    group: {
        marginBottom: 24,
    },
    layerGroups: {
        marginTop: 10,
    },
    groupTitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
        marginBottom: 12,
        fontWeight: 'bold',
    },
    layerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'rgba(255,255,255,0.03)',
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    activeLayerItem: {
        backgroundColor: 'rgba(0, 255, 157, 0.05)',
        borderColor: 'rgba(0, 255, 157, 0.3)',
    },
    layerLabel: {
        fontWeight: '600',
        fontSize: 16,
        color: 'rgba(255,255,255,0.6)',
    },
    activeLayerLabel: {
        color: '#fff',
    },
    layerDesc: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.3)',
        marginTop: 2,
    },
    toggle: {
        width: 40,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 2,
    },
    activeToggle: {
        backgroundColor: '#00ff9d',
    },
    toggleKnob: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#000',
    },
    activeToggleKnob: {
        alignSelf: 'flex-end',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    launchButton: {
        backgroundColor: 'rgba(0, 255, 157, 0.1)',
        borderWidth: 1,
        borderColor: '#00ff9d',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    launchText: {
        color: '#00ff9d',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    pingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00ff9d',
    }
});
