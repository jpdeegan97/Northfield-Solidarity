import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

// Mock Data (Shared with Web concept)
const MOCK_EMAILS = [
    { id: '1', from: "System", subject: "Protocol Update v2.4", preview: "The new governance modules have been deployed...", time: "10:42 AM", read: false },
    { id: '2', from: "Investments", subject: "Q4 Distribution Report", preview: "Attached is the preliminary distribution...", time: "Yesterday", read: true },
    { id: '3', from: "Security", subject: "New Login Detected", preview: "A new login was detected from IP 192.168.1.1...", time: "Yesterday", read: true },
    { id: '4', from: "Alex Sterling", subject: "RE: Northfield Acquisition", preview: "Let's proceed with the due diligence phase...", time: "Mon", read: true },
    { id: '5', from: "Ops Team", subject: "Maintenance Ticket #9482", preview: "Resolved: HVAC unit in Building 4 has been...", time: "Sun", read: true },
];

export default function MailScreen() {
    const router = useRouter();

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#000', dark: '#000' }}
            headerImage={
                <View style={{ flex: 1 }}>
                    <IconSymbol
                        size={310}
                        color="#1a1a1a"
                        name="envelope.fill"
                        style={styles.headerImage}
                    />
                    <ThemedText type="title" style={styles.headerTitle}>Secure Mail</ThemedText>
                </View>
            }>
            <ThemedText style={styles.subtitle}>Encrypted communications.</ThemedText>

            <View style={styles.list}>
                {MOCK_EMAILS.map((email) => (
                    <TouchableOpacity
                        key={email.id}
                        style={[styles.item, !email.read && styles.unreadItem]}
                        onPress={() => router.push(`/mail/${email.id}`)}
                    >
                        <View style={styles.avatar}>
                            <ThemedText style={styles.avatarText}>{email.from[0]}</ThemedText>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.header}>
                                <ThemedText type="defaultSemiBold" style={[styles.sender, !email.read && styles.unreadText]}>
                                    {email.from}
                                </ThemedText>
                                <ThemedText style={styles.time}>{email.time}</ThemedText>
                            </View>
                            <ThemedText style={[styles.subject, !email.read && styles.unreadText]} numberOfLines={1}>
                                {email.subject}
                            </ThemedText>
                            <ThemedText style={styles.preview} numberOfLines={2}>
                                {email.preview}
                            </ThemedText>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.fab}>
                <IconSymbol name="plus" size={24} color="#fff" />
            </TouchableOpacity>
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
        color: '#1a1a1a',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    subtitle: {
        marginBottom: 20,
        color: '#888',
    },
    list: {
        gap: 8,
        paddingBottom: 80, // Space for FAB
    },
    item: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#111',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        gap: 12,
    },
    unreadItem: {
        backgroundColor: '#1a1a1a',
        borderColor: 'rgba(255,255,255,0.1)',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    sender: {
        fontSize: 14,
        color: '#ccc',
    },
    time: {
        fontSize: 12,
        color: '#666',
    },
    subject: {
        fontSize: 14,
        color: '#888',
        marginBottom: 2,
    },
    preview: {
        fontSize: 12,
        color: '#666',
    },
    unreadText: {
        color: '#fff',
        fontWeight: '600',
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#a855f7', // Brand purple
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#a855f7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    }
});
