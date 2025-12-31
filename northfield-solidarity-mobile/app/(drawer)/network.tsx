import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

const ENTITIES = [
    {
        name: "Cook Islands Trust",
        role: "Asset Protection Trust",
        desc: "The ultimate beneficiary and asset protector. Sitting outside US jurisdiction to provide maximum defense against litigation and seizure.",
        color: '#a78bfa',
        borderColor: '#a78bfa',
        bg: 'rgba(76, 29, 149, 0.3)',
    },
    {
        name: "Cayman Aggregator LLC",
        role: "International HoldCo",
        desc: "Intermediary holding entity ensuring tax efficiency and international flexibility before capital touches US soil.",
        color: '#a78bfa',
        borderColor: '#8b5cf6',
        bg: 'rgba(139, 92, 246, 0.05)',
    },
    {
        name: "Northfield Solidarity LLC",
        role: "Parent HoldCo",
        desc: "Holds founder/member equity and governance controls. Owns membership interests in all subsidiaries. Does not sign customer contracts.",
        color: '#3b82f6',
        borderColor: '#3b82f6',
        bg: 'rgba(59, 130, 246, 0.05)',
    },
    {
        name: "NSDC IP Holdings LLC",
        role: "IP Owner",
        desc: "Owns all codebase, workflows, docs, trademarks, and datasets. Licenses platform IP to OpCo. Receives IP assignments from R&D Labs.",
        color: '#a855f7',
        borderColor: '#a855f7',
        bg: '#1e1e1e',
    },
    {
        name: "NSDC Operations LLC",
        role: "Customer OpCo",
        desc: "Signs customer contracts (DPA, SLA). Runs billing, support, & customer success. Holds operational vendor contracts.",
        color: '#22c55e',
        borderColor: '#22c55e',
        bg: '#1e1e1e',
    },
    {
        name: "South Lawn LLC",
        role: "Facilities / RE",
        desc: "Holds leases for physical space and facilities. Leases office/facility use to sister entities via intercompany agreements.",
        color: '#eab308',
        borderColor: '#eab308',
        bg: '#1e1e1e',
    },
    {
        name: "Innovations & Experimental Labs",
        role: "R&D Subsidiaries",
        desc: "Isolated environments for prototyping and high-risk experiments. All resulting IP is assigned up to IP Holdings LLC.",
        color: '#f97316',
        borderColor: '#f97316',
        bg: '#1e1e1e',
    },
    {
        name: "NS MGMT LLC",
        role: "Shared Services",
        desc: "Centralized employment and contractor management. Charges sister entities via intercompany services + cost allocation.",
        color: '#94a3b8',
        borderColor: '#94a3b8',
        bg: '#1e1e1e',
    },
    {
        name: "NSDC Educational Services LLC",
        role: "Education & Training",
        desc: "Provides educational content, training workshops, and certification programs. Utilizes IP licensed from NSDC IP Holdings.",
        color: '#00ff9d',
        borderColor: '#00ff9d',
        bg: '#1e1e1e',
    },
    {
        name: "More Than Enough Tutors",
        role: "AI Education Platform",
        desc: "Specialized AI tutors designed to elevate financial and operational cognition. The primary educational interface for the Northfield ecosystem.",
        color: '#d97706',
        borderColor: '#d97706',
        bg: '#1e1e1e',
    },
];

export default function NetworkScreen() {
    const router = useRouter();
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#1e1b4b' }}
            headerImage={
                <View style={{ flex: 1 }}>
                    <IconSymbol
                        size={310}
                        color="#808080"
                        name="person.3.fill"
                        style={styles.headerImage}
                    />
                    <ThemedText type="title" style={styles.headerTitle}>Network</ThemedText>
                </View>
            }>
            <ThemedText style={styles.subtitle}>Organizational Structure</ThemedText>

            <View style={styles.list}>
                {ENTITIES.map((entity, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.card, { borderColor: entity.borderColor, backgroundColor: entity.bg }]}
                        onPress={() => router.push(`/entity/${entity.name.toLowerCase().replace(/\s+/g, '-')}`)}
                    >
                        <ThemedText type="defaultSemiBold" style={{ color: entity.color, marginBottom: 4 }}>{entity.name}</ThemedText>
                        <ThemedText style={[styles.roleText, { color: entity.borderColor }]}>{entity.role}</ThemedText>
                        <ThemedText style={styles.descText}>{entity.desc}</ThemedText>
                    </TouchableOpacity>
                ))}
            </View>

            <ThemedView style={styles.titleContainer}>
                <ThemedText type="subtitle">System Delivery Timeline</ThemedText>
            </ThemedView>
            <View style={styles.timelineList}>
                {[
                    { month: "Jan '26", label: "Seed Close", active: true },
                    { month: "Feb '26", label: "DRE Alpha" },
                    { month: "Mar '26", label: "SL Expansion" },
                    { month: "Apr '26", label: "Firmament Beta" },
                    { month: "May '26", label: "Series A Prep" },
                    { month: "Jun '26", label: "Governance V1" },
                ].map((item, index) => (
                    <View key={index} style={styles.timelineItem}>
                        <View style={[styles.timelineDot, item.active && styles.timelineDotActive]} />
                        <View style={styles.timelineContent}>
                            <ThemedText style={styles.timelineMonth}>{item.month}</ThemedText>
                            <ThemedText style={styles.timelineLabel}>{item.label}</ThemedText>
                        </View>
                    </View>
                ))}
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: '#fff',
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 16,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 8,
    },
    list: {
        gap: 16,
        paddingBottom: 24,
    },
    card: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        gap: 8,
    },
    roleText: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: 'bold',
    },
    descText: {
        fontSize: 14,
        color: '#ccc',
        lineHeight: 20,
    },
    timelineList: {
        gap: 0,
        paddingLeft: 8,
        borderLeftWidth: 1,
        borderLeftColor: '#333',
        marginLeft: 12,
        marginBottom: 40,
    },
    timelineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        position: 'relative',
    },
    timelineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#333',
        position: 'absolute',
        left: -13.5,
    },
    timelineDotActive: {
        backgroundColor: '#00ff9d',
        width: 12,
        height: 12,
        left: -14.5,
        shadowColor: '#00ff9d',
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    timelineContent: {
        marginLeft: 16,
    },
    timelineMonth: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    timelineLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});
