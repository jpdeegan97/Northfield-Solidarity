

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Platform, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { INNER_SANCTUM_EMAILS } from '@shared/data/mock/innerSanctumData';

type Tab = 'mail' | 'journal';

export default function InnerSanctumScreen() {
    const [activeTab, setActiveTab] = useState<Tab>('mail');

    return (
        <ThemedView style={styles.container}>
            {/* Sidebar / Top Bar for Mobile */}
            <View style={styles.tabBar}>
                <TabButton
                    active={activeTab === 'mail'}
                    onPress={() => setActiveTab('mail')}
                    icon="mail-outline"
                    label="Mail"
                />
                <TabButton
                    active={activeTab === 'journal'}
                    onPress={() => setActiveTab('journal')}
                    icon="book-outline"
                    label="Journal"
                />
            </View>

            {/* Content Area */}
            <View style={styles.content}>
                {activeTab === 'mail' ? <EmailClient /> : <JournalInterface />}
            </View>
        </ThemedView>
    );
}

function TabButton({ active, onPress, icon, label }: { active: boolean; onPress: () => void; icon: any; label: string }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.tabButton, active && styles.activeTabButton]}
        >
            <Ionicons name={icon} size={20} color={active ? '#00ff9d' : '#666'} />
            <ThemedText style={[styles.tabLabel, active && styles.activeTabLabel]}>{label}</ThemedText>
        </TouchableOpacity>
    );
}

// Helper type for Folder
type MailFolder = 'inbox' | 'drafts' | 'sent';

function EmailClient() {
    const [selectedMailId, setSelectedMailId] = useState<number | null>(null);
    const [currentFolder, setCurrentFolder] = useState<MailFolder>('inbox');
    const [isComposing, setIsComposing] = useState(false);

    // Filter logic
    const folderEmails = INNER_SANCTUM_EMAILS.filter(m => {
        if (!m.folder) return currentFolder === 'inbox';
        return m.folder === currentFolder;
    });

    const selectedMail = INNER_SANCTUM_EMAILS.find(m => m.id === selectedMailId);

    const handleCompose = () => {
        setIsComposing(true);
        setSelectedMailId(null);
    };

    const handleBack = () => {
        setIsComposing(false);
        setSelectedMailId(null);
    };

    if (isComposing) {
        return <ComposeScreen onDiscard={handleBack} />;
    }

    if (selectedMail) {
        return (
            <View style={styles.fullScreen}>
                <View style={styles.mailHeader}>
                    <TouchableOpacity onPress={() => setSelectedMailId(null)} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <ThemedText type="subtitle">{selectedMail.sender}</ThemedText>
                </View>
                <ScrollView style={styles.mailBody}>
                    <ThemedText style={styles.mailTitle}>{selectedMail.subject}</ThemedText>
                    <ThemedText style={styles.mailMeta}>From: {selectedMail.sender} • {selectedMail.time}</ThemedText>
                    <View style={styles.divider} />
                    <ThemedText style={styles.mailContent}>
                        {selectedMail.body}
                    </ThemedText>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.fullScreen}>
            {/* Folder Tabs */}
            <View style={styles.folderTabs}>
                {(['inbox', 'drafts', 'sent'] as MailFolder[]).map(folder => (
                    <TouchableOpacity
                        key={folder}
                        style={[styles.folderTab, currentFolder === folder && styles.activeFolderTab]}
                        onPress={() => setCurrentFolder(folder)}
                    >
                        <ThemedText style={[styles.folderText, currentFolder === folder && styles.activeFolderText]}>
                            {folder.toUpperCase()}
                        </ThemedText>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView style={styles.mailList}>
                {folderEmails.length === 0 ? (
                    <View style={styles.emptyState}>
                        <ThemedText style={styles.emptyStateText}>No messages in {currentFolder}</ThemedText>
                    </View>
                ) : (
                    folderEmails.map(mail => (
                        <TouchableOpacity key={mail.id} onPress={() => setSelectedMailId(mail.id)} style={styles.mailItem}>
                            <View style={styles.mailItemHeader}>
                                <ThemedText style={styles.sender}>{mail.sender}</ThemedText>
                                <ThemedText style={styles.time}>{mail.time}</ThemedText>
                            </View>
                            <ThemedText style={styles.subject} numberOfLines={1}>{mail.subject}</ThemedText>
                            <ThemedText style={styles.snippet} numberOfLines={1}>{mail.snippet}</ThemedText>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            <TouchableOpacity style={styles.composeButton} onPress={handleCompose}>
                <Ionicons name="add" size={24} color="#000" />
                <ThemedText style={styles.composeText}>COMPOSE</ThemedText>
            </TouchableOpacity>
        </View>
    );
}

function ComposeScreen({ onDiscard }: { onDiscard: () => void }) {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    return (
        <View style={styles.fullScreen}>
            <View style={styles.mailHeader}>
                <TouchableOpacity onPress={onDiscard} style={styles.backButton}>
                    <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
                <ThemedText type="subtitle">New Message</ThemedText>
                <TouchableOpacity onPress={onDiscard} style={{ marginLeft: 'auto' }}>
                    <ThemedText style={{ color: '#aaa', fontSize: 12 }}>DRAFT</ThemedText>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.composeBody}>
                <TextInput
                    style={styles.composeInput}
                    placeholder="To: (e.g. @TheArchitect)"
                    placeholderTextColor="#666"
                    value={to}
                    onChangeText={setTo}
                />
                <TextInput
                    style={styles.composeInput}
                    placeholder="Subject"
                    placeholderTextColor="#666"
                    value={subject}
                    onChangeText={setSubject}
                />
                <TextInput
                    style={[styles.composeInput, styles.composeArea]}
                    placeholder="Write your secure message..."
                    placeholderTextColor="#666"
                    multiline
                    textAlignVertical="top"
                    value={body}
                    onChangeText={setBody}
                />

                <TouchableOpacity style={styles.sendButton} onPress={onDiscard}>
                    <ThemedText style={styles.sendButtonText}>SEND ENCRYPTED</ThemedText>
                    <Ionicons name="send" size={16} color="#000" />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

function JournalInterface() {
    const [entry, setEntry] = useState('');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <View style={styles.journalContainer}>
            <View style={styles.journalHeader}>
                <Ionicons name="create-outline" size={24} color="#00ff9d" />
                <ThemedText type="subtitle" style={styles.journalTitle}>New Entry</ThemedText>
            </View>
            <TextInput
                style={styles.journalInput}
                multiline
                placeholder="Log your thoughts... (Encrypted)"
                placeholderTextColor="#666"
                value={entry}
                onChangeText={setEntry}
            />
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <ThemedText style={styles.saveButtonText}>{saved ? 'ENCRYPTED & SAVED' : 'SAVE LOG'}</ThemedText>
            </TouchableOpacity>
            <ThemedText style={styles.journalDesc}>
                All entries are locally encrypted before storage.
            </ThemedText>
        </View>
    );
}

// ... styles remain mostly valid, but adding new ones
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    tabBar: {
        flexDirection: 'row',
        padding: 10,
        gap: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
    },
    tabButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        gap: 6,
        backgroundColor: 'transparent',
    },
    activeTabButton: {
        backgroundColor: 'rgba(0, 255, 157, 0.1)',
    },
    tabLabel: {
        color: '#666',
        fontWeight: '600',
        fontSize: 14,
    },
    activeTabLabel: {
        color: '#00ff9d',
    },
    content: {
        flex: 1,
    },
    mailList: {
        flex: 1,
    },
    mailItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    mailItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    sender: {
        fontWeight: 'bold',
        color: '#fff',
    },
    time: {
        fontSize: 12,
        color: '#666',
    },
    subject: {
        color: '#eee',
        marginBottom: 2,
    },
    snippet: {
        color: '#888',
        fontSize: 12,
    },
    fullScreen: {
        flex: 1,
    },
    mailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        gap: 16,
    },
    backButton: {
        padding: 4,
    },
    mailBody: {
        flex: 1,
        padding: 24,
    },
    mailTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    mailMeta: {
        color: '#666',
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginBottom: 16,
    },
    mailContent: {
        fontSize: 16,
        lineHeight: 24,
        color: '#ccc',
    },
    // New Journal Styles
    journalContainer: {
        flex: 1,
        padding: 20,
    },
    journalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    journalTitle: {
        color: '#fff',
    },
    journalInput: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 8,
        padding: 16,
        color: '#fff',
        fontSize: 16,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: 'rgba(0, 255, 157, 0.1)',
        borderWidth: 1,
        borderColor: '#00ff9d',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    saveButtonText: {
        color: '#00ff9d',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    journalDesc: {
        textAlign: 'center',
        color: '#666',
        fontSize: 12,
    },
    composeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00ff9d',
        margin: 16,
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    composeText: {
        color: '#000',
        fontWeight: 'bold',
    },
    // Remove old unused styles if any, but keeping them safe is fine
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    // New Styles for Folders and Compose
    folderTabs: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        gap: 12,
    },
    folderTab: {
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeFolderTab: {
        borderBottomColor: '#00ff9d',
    },
    folderText: {
        color: '#666',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    activeFolderText: {
        color: '#00ff9d',
    },
    emptyState: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyStateText: {
        color: '#444',
        fontSize: 14,
    },
    composeBody: {
        flex: 1,
        padding: 20,
    },
    composeInput: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 8,
        padding: 16,
        color: '#fff',
        fontSize: 16,
        marginBottom: 12,
    },
    composeArea: {
        minHeight: 200,
        textAlignVertical: 'top',
    },
    sendButton: {
        backgroundColor: '#00ff9d',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 8,
        gap: 8,
        marginTop: 12,
    },
    sendButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
