import { useLocalSearchParams, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function MailDetailScreen() {
    const { id } = useLocalSearchParams();

    // Mock data lookup (Replace with real data fetch later)
    const email = {
        id,
        from: "System",
        subject: "Protocol Update v2.4",
        body: "The new governance modules have been deployed to GGP. Please review the attached change log within the next 24 hours.\n\nChanges include:\n- Enhanced audit trails\n- New policy gates for financial ops\n- Fixed minor latency in SIG integration\n\nStandby for further instructions.",
        time: "10:42 AM",
        read: false
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{
                title: '',
                headerBackTitle: 'Inbox',
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#000' },
            }} />

            <View style={styles.header}>
                <View style={styles.avatar}>
                    <ThemedText style={styles.avatarText}>{email.from[0]}</ThemedText>
                </View>
                <View style={styles.headerInfo}>
                    <ThemedText type="title" style={styles.subject}>{email.subject}</ThemedText>
                    <ThemedText style={styles.from}>From: {email.from}</ThemedText>
                    <ThemedText style={styles.time}>{email.time}</ThemedText>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.body}>
                <ThemedText style={styles.bodyText}>{email.body}</ThemedText>
            </View>

            <View style={styles.actions}>
                <View style={styles.actionButton}>
                    <IconSymbol name="arrowshape.turn.up.left.fill" size={20} color="#fff" />
                    <ThemedText style={styles.actionText}>Reply</ThemedText>
                </View>
                <View style={styles.actionButton}>
                    <IconSymbol name="archivebox.fill" size={20} color="#fff" />
                    <ThemedText style={styles.actionText}>Archive</ThemedText>
                </View>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 24,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerInfo: {
        flex: 1,
    },
    subject: {
        marginBottom: 4,
    },
    from: {
        fontSize: 14,
        color: '#ccc',
    },
    time: {
        fontSize: 12,
        color: '#666',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginBottom: 24,
    },
    body: {
        flex: 1,
    },
    bodyText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#ddd',
    },
    actions: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 24,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#222',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    actionText: {
        fontWeight: '600',
    }
});
