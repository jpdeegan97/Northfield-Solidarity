import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppModel } from '@/context/AppContext';

// Theme Constants matching web styling
const COLORS = {
    NS: {
        bg: '#0f172a', // Slate 900
        activeBg: 'rgba(56, 189, 248, 0.15)', // Light Blue Tint
        activeText: '#38bdf8', // Sky 400
        inactiveText: '#94a3b8', // Slate 400
        border: 'rgba(255, 255, 255, 0.1)',
        headerTitle: '#ffffff',
        headerSub: '#64748b',
    },
    InnerSanctum: {
        bg: '#050505', // Very Dark
        activeBg: 'rgba(0, 255, 157, 0.1)', // Sanctum Green Tint
        activeText: '#00ff9d', // Sanctum Green
        inactiveText: '#52525b', // Zinc 600
        border: 'rgba(0, 255, 157, 0.2)',
        headerTitle: '#00ff9d',
        headerSub: '#52525b',
    }
};

export default function CustomDrawerContent(props: any) {
    const { toggleMode, mode } = useAppModel();
    const router = useRouter();
    const pathname = usePathname();
    const { top, bottom } = useSafeAreaInsets();

    const isNS = mode === 'Northfield';
    const theme = isNS ? COLORS.NS : COLORS.InnerSanctum;

    // Navigation Logic
    const handleNav = (route: string) => {
        if (route.startsWith('http')) {
            Alert.alert("External Link", `Opening ${route}`);
        } else if (route === 'TODO') {
            Alert.alert("Coming Soon", "This feature is under development.");
        } else {
            // @ts-ignore
            router.push(route);
        }
    };

    const nsItems = [
        { label: "Home", route: "/", icon: "house.fill" },
        { label: "Platform", route: "/engines", icon: "play.display" },
        { label: "Projects", route: "/engines", icon: "folder.fill" },
        { label: "Marketplace", route: "/marketplace", icon: "bolt.fill" },
        { label: "System", route: "/firmament", icon: "cpu" },
        { label: "Features", route: "TODO", icon: "cube.fill" },
        { label: "Education", route: "/education", icon: "graduationcap.fill" },
        { label: "Pricing", route: "/investors", icon: "dollarsign.circle.fill" },
        { label: "Investors", route: "/investors", icon: "waveform.path.ecg" },
        { label: "Ascension", route: "TODO", icon: "arrow.up.circle.fill" },
        { label: "Docs", route: "/education", icon: "doc.text.fill" },
        { label: "Contact", route: "/mail", icon: "person.crop.circle" },
        { label: "South Lawn", route: "/entity/south-lawn", icon: "building.2.fill" },
        { label: "Wall Street Pro", route: "/entity/wall-street-pro", icon: "building.columns.fill" },
        { label: "More Than Enough", route: "/entity/more-than-enough", icon: "graduationcap.fill" },
    ];

    const sanctumItems = [
        { label: "DASHBOARD", route: "/", icon: "house.fill" },
        { label: "MARKETPLACE", route: "/marketplace", icon: "dollarsign.circle.fill" },
        { label: "ENGINE BUILDER", route: "/engines", icon: "square.stack.3d.up.fill" },
        { label: "SIMULATION", route: "/firmament", icon: "waveform.path.ecg" },
        { label: "MAIL", route: "/mail", icon: "envelope.fill" },
        { label: "OS PROSPECTUS", route: "/education", icon: "cpu" },
        { label: "JOURNAL", route: "TODO", icon: "lock.doc.fill" },
        { label: "TIMELINE", route: "/network", icon: "clock.fill" },
        { label: "VISUALIZER", route: "TODO", icon: "eye.fill" },
        { label: "DOCUMENTS", route: "/education", icon: "doc.text.fill" },
        { label: "INVESTORS", route: "/investors", icon: "square.stack.3d.up.fill" },
        { label: "DREAMS & NIGHTMARES", route: "TODO", icon: "trophy.fill" },
        { label: "ADMIN PORTAL", route: "TODO", icon: "gearshape.fill" },
    ];

    const items = isNS ? nsItems : sanctumItems;

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
                paddingTop: top,
                backgroundColor: theme.bg,
                minHeight: '100%'
            }}
            style={{ backgroundColor: theme.bg }}
        >
            <View style={styles.headerContainer}>
                {isNS ? (
                    <View style={styles.headerContent}>
                        <ThemedText style={{ fontSize: 20, fontWeight: '700', color: theme.headerTitle, letterSpacing: -0.5 }}>
                            Northfield Solidarity
                        </ThemedText>
                        <ThemedText style={{ fontSize: 12, color: theme.headerSub, fontWeight: '500' }}>
                            Systems that flow.
                        </ThemedText>
                    </View>
                ) : (
                    <View style={styles.headerContent}>
                        <ThemedText style={{
                            fontSize: 22,
                            fontWeight: '800',
                            color: theme.headerTitle,
                            letterSpacing: 2,
                            fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' })
                        }}>
                            INNER SANCTUM
                        </ThemedText>
                        <ThemedText style={{
                            fontSize: 10,
                            color: theme.headerSub,
                            textTransform: 'uppercase',
                            letterSpacing: 3,
                            marginTop: 4,
                            fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' })
                        }}>
                            Operations Interface
                        </ThemedText>
                    </View>
                )}
            </View>

            <View style={{ flex: 1, paddingHorizontal: 12 }}>
                {/* NS Mode: Helper lists to insert Divider */}
                {isNS ? (
                    <>
                        {items.slice(0, 12).map((item, i) => {
                            const isActive = pathname === item.route;
                            return (
                                <DrawerItem
                                    key={i}
                                    label={item.label}
                                    // @ts-ignore
                                    icon={({ size }) => <IconSymbol name={item.icon} size={20} color={isActive ? theme.activeText : theme.inactiveText} />}
                                    onPress={() => handleNav(item.route)}
                                    focused={isActive}
                                    activeTintColor={theme.activeText}
                                    inactiveTintColor={theme.inactiveText}
                                    activeBackgroundColor={theme.activeBg}
                                    style={styles.item}
                                    labelStyle={[styles.nsLabel, { color: isActive ? theme.activeText : theme.inactiveText }]}
                                />
                            );
                        })}

                        <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 12, marginHorizontal: 8 }} />

                        {items.slice(12).map((item, i) => {
                            const isActive = pathname === item.route;
                            return (
                                <DrawerItem
                                    key={`entity-${i}`}
                                    label={item.label}
                                    // @ts-ignore
                                    icon={({ size }) => <IconSymbol name={item.icon} size={20} color={isActive ? theme.activeText : theme.inactiveText} />}
                                    onPress={() => handleNav(item.route)}
                                    focused={isActive}
                                    activeTintColor={theme.activeText}
                                    inactiveTintColor={theme.inactiveText}
                                    activeBackgroundColor={theme.activeBg}
                                    style={styles.item}
                                    labelStyle={[styles.nsLabel, { color: isActive ? theme.activeText : theme.inactiveText }]}
                                />
                            );
                        })}
                    </>
                ) : (
                    // Sanctum Mode: Special Loop for Sanctum Styles
                    items.map((item, i) => {
                        const isActive = pathname === item.route;
                        return (
                            <DrawerItem
                                key={i}
                                label={item.label}
                                // @ts-ignore
                                icon={({ size }) => <IconSymbol name={item.icon} size={16} color={isActive ? theme.activeText : theme.inactiveText} />}
                                onPress={() => handleNav(item.route)}
                                focused={isActive}
                                activeTintColor={theme.activeText}
                                inactiveTintColor={theme.inactiveText}
                                activeBackgroundColor={theme.activeBg}
                                style={[
                                    styles.item,
                                    styles.sanctumItem,
                                    isActive && { borderColor: theme.border, borderWidth: 1 }
                                ]}
                                labelStyle={[
                                    styles.sanctumLabel,
                                    { color: isActive ? theme.activeText : theme.inactiveText }
                                ]}
                            />
                        );
                    })
                )}
            </View>

            {/* Footer / Switcher */}
            <View style={{ padding: 12, marginBottom: bottom }}>
                <View style={{ height: 1, backgroundColor: theme.border, marginBottom: 12, marginHorizontal: 8 }} />
                <DrawerItem
                    label={isNS ? "Switch to Inner Sanctum" : "Back to Northfield"}
                    // @ts-ignore
                    icon={({ color }) => <IconSymbol name={isNS ? "terminal.fill" : "arrow.uturn.left"} size={20} color={color} />}
                    onPress={toggleMode}
                    activeTintColor={theme.activeText}
                    inactiveTintColor={theme.inactiveText}
                    labelStyle={isNS ? styles.nsLabel : styles.sanctumLabel}
                    style={{ borderRadius: 8 }}
                />
            </View>

        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        marginBottom: 8,
    },
    headerContent: {
        justifyContent: 'center',
    },
    item: {
        borderRadius: 8,
        marginVertical: 2,
    },
    sanctumItem: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'transparent',
        marginVertical: 4,
    },
    nsLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 4,
    },
    sanctumLabel: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
        marginLeft: -4,
    }
});
