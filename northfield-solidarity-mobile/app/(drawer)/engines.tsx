
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';

import { IconSymbol } from '@/components/ui/icon-symbol';

import { NS_ENGINES } from '@shared/data/engineRegistry';

const ENGINES = NS_ENGINES;

export default function EnginesScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#000', dark: '#000' }}
      headerImage={
        <View style={{ flex: 1 }}>
          <IconSymbol
            size={310}
            color="#1a1a1a"
            name="cpu"
            style={styles.headerImage}
          />
          <ThemedText type="title" style={styles.headerTitle}>Engines</ThemedText>
        </View>
      }>
      <ThemedText style={{ marginBottom: 16 }}>Core computational modules of the Northfield Solidarity ecosystem.</ThemedText>

      <View style={styles.list}>
        {ENGINES.map((engine) => (
          <TouchableOpacity
            key={engine.code}
            style={styles.item}
            onPress={() => router.push(`/engine/${engine.code}`)}
          >
            <View style={[styles.codeBadge, engine.status.toLowerCase().includes('active') ? styles.activeBadge : styles.plannedBadge]}>
              <ThemedText style={[styles.codeText, engine.status.toLowerCase().includes('active') ? styles.activeText : styles.plannedText]}>
                {engine.code}
              </ThemedText>
            </View>
            <View style={styles.info}>
              <ThemedText type="defaultSemiBold">{engine.name}</ThemedText>
              <ThemedText style={styles.categoryText}>{engine.category}</ThemedText>
            </View>
            <View style={styles.statusDotContainer}>
              <View style={[styles.statusDot, { backgroundColor: engine.status.toLowerCase().includes('active') ? '#00ff9d' : '#444' }]} />
            </View>
          </TouchableOpacity>
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
    color: '#1a1a1a',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  list: {
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  codeBadge: {
    width: 48,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activeBadge: {
    backgroundColor: 'rgba(0, 255, 157, 0.1)',
  },
  plannedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  codeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#00ff9d',
  },
  plannedText: {
    color: '#666',
  },
  info: {
    flex: 1,
  },
  categoryText: {
    fontSize: 10,
    color: '#666',
    textTransform: 'uppercase',
  },
  statusDotContainer: {
    padding: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
