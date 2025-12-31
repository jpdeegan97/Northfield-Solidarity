import { useLocalSearchParams, Stack } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

// Mock Lookup (Move to registry later)
const ENTITIES = [
    { name: "Cook Islands Trust", role: "Asset Protection Trust" },
    { name: "Cayman Aggregator LLC", role: "International HoldCo" },
    { name: "Northfield Solidarity LLC", role: "Parent HoldCo" },
    { name: "NSDC IP Holdings LLC", role: "IP Owner" },
    { name: "NSDC Operations LLC", role: "Customer OpCo" },
    { name: "South Lawn LLC", role: "Facilities / RE" },
    { name: "Innovations & Experimental Labs", role: "R&D Subsidiaries" },
    { name: "NS MGMT LLC", role: "Shared Services" },
    { name: "NSDC Educational Services LLC", role: "Education & Training" },
    { name: "More Than Enough Tutors", role: "AI Education Platform" },
];

export default function EntityDetailScreen() {
    const { slug } = useLocalSearchParams();
    // Simple mock match
    const entity = ENTITIES.find(e => e.name === slug) || ENTITIES[0];

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{
                title: 'Entity Details',
                headerBackTitle: 'Network',
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#000' },
            }} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.cardHeader}>
                    <View style={styles.iconContainer}>
                        <IconSymbol name="building.2.fill" size={32} color="#fff" />
                    </View>
                    <View>
                        <ThemedText type="subtitle" style={styles.name}>{entity.name}</ThemedText>
                        <ThemedText style={styles.role}>{entity.role}</ThemedText>
                    </View>
                </View>

                <View style={styles.section}>
                    <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Jurisdiction & Status</ThemedText>
                    <View style={styles.row}>
                        <View style={styles.stat}>
                            <ThemedText style={styles.statLabel}>Jurisdiction</ThemedText>
                            <ThemedText style={styles.statValue}>Delaware, US</ThemedText>
                        </View>
                        <View style={styles.stat}>
                            <ThemedText style={styles.statLabel}>Status</ThemedText>
                            <ThemedText style={[styles.statValue, { color: '#00ff9d' }]}>Good Standing</ThemedText>
                        </View>
                        <View style={styles.stat}>
                            <ThemedText style={styles.statLabel}>Tax Year</ThemedText>
                            <ThemedText style={styles.statValue}>Calendar</ThemedText>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Ownership Structure</ThemedText>
                    <View style={styles.ownershipCard}>
                        <ThemedText style={styles.ownershipLabel}>Owned By</ThemedText>
                        <View style={styles.ownerRow}>
                            <IconSymbol name="arrow.turn.down.right" size={16} color="#666" />
                            <ThemedText style={styles.ownerName}>Northfield Solidarity LLC</ThemedText>
                            <ThemedText style={styles.ownerPercent}>100%</ThemedText>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Documents</ThemedText>
                    <View style={styles.docList}>
                        {['Articles of Organization', 'Operating Agreement', 'EIN Confirmation', 'Initial Board Resolutions'].map((doc, i) => (
                            <View key={i} style={styles.docItem}>
                                <IconSymbol name="doc.text.fill" size={20} color="#888" />
                                <ThemedText style={styles.docName}>{doc}</ThemedText>
                                <IconSymbol name="chevron.right" size={16} color="#444" />
                            </View>
                        ))}
                    </View>
                </View>
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
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#333',
    },
    name: {
        fontSize: 20,
        marginBottom: 4,
    },
    role: {
        color: '#888',
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        marginBottom: 16,
        color: '#666',
        textTransform: 'uppercase',
        fontSize: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#111',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#222',
    },
    stat: {
        gap: 4,
    },
    statLabel: {
        fontSize: 10,
        color: '#666',
        textTransform: 'uppercase',
    },
    statValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    ownershipCard: {
        backgroundColor: '#111',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#222',
    },
    ownershipLabel: {
        fontSize: 10,
        color: '#666',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    ownerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    ownerName: {
        flex: 1,
        color: '#fff',
        fontWeight: '500',
    },
    ownerPercent: {
        color: '#00ff9d',
        fontWeight: 'bold',
        fontFamily: 'Courier',
    },
    docList: {
        gap: 8,
    },
    docItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        backgroundColor: '#111',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#222',
    },
    docName: {
        flex: 1,
        color: '#ddd',
    },
});
