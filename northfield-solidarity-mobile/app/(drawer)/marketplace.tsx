import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';

import { IconSymbol } from '@/components/ui/icon-symbol';

export default function MarketplaceScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#1e1b4b' }}
            headerImage={
                <View style={{ flex: 1 }}>
                    <IconSymbol
                        size={310}
                        color="#808080"
                        name="bag.fill"
                        style={styles.headerImage}
                    />
                    <ThemedText type="title" style={styles.headerTitle}>Marketplace</ThemedText>
                </View>
            }>

            <ThemedText>Browse and purchase resources.</ThemedText>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    headerTitle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: '#fff',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
