
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ChronicleScreen() {
    const router = useRouter();
    // Assuming access is true for mobile user for now or handled elsewhere
    const canAccessJournal = true;

    return (
        <ThemedView style={styles.container}>
            <View style={styles.content}>
                <ThemedText type="subtitle" style={styles.title}>CHRONICLE</ThemedText>
                <ThemedText style={styles.code}>NS-CRN</ThemedText>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <ThemedText style={styles.actionTitle}>New Morning Brief (AM)</ThemedText>
                        <View style={styles.actionArrow}>
                            <ThemedText style={styles.arrowText}>Start Logic</ThemedText>
                            <Ionicons name="arrow-forward" size={14} color="rgba(255,255,255,0.5)" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <ThemedText style={styles.actionTitle}>New Evening Debrief (PM)</ThemedText>
                        <View style={styles.actionArrow}>
                            <ThemedText style={styles.arrowText}>Start Logic</ThemedText>
                            <Ionicons name="arrow-forward" size={14} color="rgba(255,255,255,0.5)" />
                        </View>
                    </TouchableOpacity>

                    {canAccessJournal && (
                        <View style={styles.journalLink}>
                            <View style={styles.linkHeader}>
                                <View style={styles.linkTitleRow}>
                                    <Ionicons name="book-outline" size={12} color="#c084fc" />
                                    <ThemedText style={styles.linkTitle}>Inner Sanctum Link Detected</ThemedText>
                                </View>
                                <TouchableOpacity
                                    onPress={() => router.push('/engine/INNER_SANCTUM')}
                                    style={styles.linkButton}
                                >
                                    <Ionicons name="arrow-forward" size={16} color="#c084fc" />
                                </TouchableOpacity>
                            </View>
                            <ThemedText style={styles.linkSub}>Inner Sanctum // Deep Dive</ThemedText>
                        </View>
                    )}
                </View>

                <ThemedText style={styles.footer}>Daily artifacts stored in /NS-CHRONICLE/Archive</ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    content: {
        backgroundColor: 'rgba(5, 5, 5, 0.5)',
        borderColor: 'rgba(16, 185, 129, 0.3)', // Emeraldish
        borderWidth: 1,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#fff',
    },
    code: {
        fontSize: 12,
        fontFamily: 'Courier',
        color: '#34d399', // Emerald 400
        marginBottom: 32,
    },
    actions: {
        width: '100%',
        gap: 12,
        marginBottom: 32,
    },
    actionButton: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#6ee7b7', // Emerald 300
    },
    actionArrow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    arrowText: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.5)',
    },
    journalLink: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    linkHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    linkTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    linkTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#c084fc', // Purple 400
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    linkButton: {
        padding: 4,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 4,
    },
    linkSub: {
        fontSize: 9,
        color: 'rgba(192, 132, 252, 0.6)',
    },
    footer: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.3)',
        fontStyle: 'italic',
    },
});
