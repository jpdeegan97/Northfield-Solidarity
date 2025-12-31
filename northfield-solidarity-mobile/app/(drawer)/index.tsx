import { View, StyleSheet, Platform, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppModel } from '@/context/AppContext';
import { NS_ENGINES } from '@shared/data/engineRegistry';

const SCREEN_WIDTH = Dimensions.get('window').width;

function InnerSanctumWidget({ title, icon, children, style }: any) {
  return (
    <View style={[styles.sanctumWidget, style]}>
      <View style={styles.widgetHeader}>
        <ThemedText style={styles.widgetTitle}>{title}</ThemedText>
        {icon && <IconSymbol name={icon} size={14} color="#666" />}
      </View>
      {children}
    </View>
  );
}

export default function HomeScreen() {
  const { mode } = useAppModel();
  const router = useRouter();

  // Northfield Layout
  if (mode === 'Northfield') {
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#0f172a', dark: '#0f172a' }}
        headerImage={
          <View style={styles.nsHeroBackground}>
            <View style={styles.nsHeroContent}>
              <ThemedText style={styles.heroEyebrow}>BE WATER</ThemedText>
              <ThemedText type="title" style={styles.heroTitle}>
                Systems that govern, adapt, and execute.
              </ThemedText>
            </View>
          </View>
        }>

        <View style={styles.nsContainer}>
          {/* Hero Description */}
          <View style={styles.section}>
            <ThemedText style={styles.heroDesc}>
              Northfield Solidarity builds a modular engine stack for governance, research, market integration,
              simulation, identity, and financial orchestration.
            </ThemedText>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/engines')}>
                <ThemedText style={styles.primaryBtnText}>Explore System</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/education')}>
                <ThemedText style={styles.secondaryBtnText}>Docs</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Nucleus Card */}
          <View style={styles.nucleusCard}>
            <ThemedText style={styles.nucleusLabel}>NUCLEUS</ThemedText>
            <ThemedText style={styles.nucleusTitle}>GGP</ThemedText>
            <ThemedText style={styles.nucleusSub}>Governance Graph Processor</ThemedText>
            <View style={styles.divider} />
            <ThemedText style={styles.nucleusDesc}>Permissions • Approvals • State • Audit</ThemedText>
          </View>

          {/* Design Principles */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Design Principles</ThemedText>
            <View style={styles.card}>
              {[
                "Event-driven by default",
                "Contracts over conventions",
                "Auditable state transitions",
                "Human-legible governance"
              ].map((item, i) => (
                <View key={i} style={styles.bulletItem}>
                  <View style={styles.bulletDot} />
                  <ThemedText style={styles.bulletText}>{item}</ThemedText>
                </View>
              ))}
            </View>
          </View>

          {/* Engine Grid */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Core Engines</ThemedText>
            <View style={styles.grid}>
              {NS_ENGINES.slice(0, 6).map((engine) => (
                <TouchableOpacity key={engine.code} style={styles.engineCard} onPress={() => router.push(`/engine/${engine.code}`)}>
                  <View style={[styles.statusDot, { backgroundColor: engine.status.includes('Active') ? '#38bdf8' : '#64748b' }]} />
                  <ThemedText style={styles.engineCode}>{engine.code}</ThemedText>
                  <ThemedText style={styles.engineName} numberOfLines={1}>{engine.name}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Flow Steps */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>System Flow</ThemedText>
            <View style={styles.flowList}>
              {[
                { id: "01", text: "Signals + inputs arrive", sub: "(SIG, MUX)" },
                { id: "02", text: "Research forms", sub: "(DRE, PIE)" },
                { id: "03", text: "Scenarios tested", sub: "(SIM)" },
                { id: "04", text: "Identity applies", sub: "(IDN + GGP)" },
                { id: "05", text: "Execution", sub: "(DAT + FLO)" },
              ].map((step) => (
                <View key={step.id} style={styles.flowItem}>
                  <ThemedText style={styles.flowId}>{step.id}</ThemedText>
                  <View>
                    <ThemedText style={styles.flowText}>{step.text}</ThemedText>
                    <ThemedText style={styles.flowSub}>{step.sub}</ThemedText>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ParallaxScrollView>
    );
  }

  // Inner Sanctum Layout
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#000000', dark: '#000000' }}
      headerImage={
        <View style={styles.sanctumHero}>
          <ThemedText style={styles.sanctumTitle}>INNER SANCTUM <ThemedText style={{ color: '#00ff9d' }}>HUD</ThemedText></ThemedText>
          <ThemedText style={styles.sanctumSub}>Situational Awareness v2.0</ThemedText>
        </View>
      }>

      <View style={styles.sanctumContainer}>
        {/* Daily Briefing */}
        <InnerSanctumWidget title="Daily Briefing" icon="checklist">
          <View style={styles.briefItem}>
            <View style={[styles.briefBorder, { backgroundColor: '#00ff9d' }]} />
            <View>
              <ThemedText style={styles.briefText}>Approve &apos;NS_AI_LABS&apos;</ThemedText>
              <ThemedText style={styles.briefSub}>Pending Signature • 2h ago</ThemedText>
            </View>
          </View>
          <View style={styles.briefItem}>
            <View style={[styles.briefBorder, { backgroundColor: '#ef4444' }]} />
            <View>
              <ThemedText style={styles.briefText}>SSL Certificate Expiry</ThemedText>
              <ThemedText style={[styles.briefSub, { color: '#ef4444' }]}>CRITICAL • Expires 24h</ThemedText>
            </View>
          </View>
        </InnerSanctumWidget>

        {/* Financial Fortress */}
        <InnerSanctumWidget title="Financial Fortress" icon="dollarsign.circle">
          <ThemedText style={styles.finLabel}>Total Liquidity</ThemedText>
          <ThemedText style={styles.finValue}>$2,482,105<ThemedText style={{ fontSize: 14, color: '#555' }}>.00</ThemedText></ThemedText>

          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
          <View style={styles.finRow}>
            <ThemedText style={styles.finStatLabel}>BURN: -$12.4k</ThemedText>
            <ThemedText style={[styles.finStatLabel, { color: '#00ff9d' }]}>IN: +$28.2k</ThemedText>
          </View>
        </InnerSanctumWidget>

        {/* Signal Room */}
        <InnerSanctumWidget title="Signal Intelligence" icon="waveform.path.ecg">
          <View style={styles.consoleBox}>
            <ThemedText style={styles.consoleText}>&gt; SCAPING: index_funds_v2... OK</ThemedText>
            <ThemedText style={styles.consoleText}>&gt; MARKET: SPX 4500.23 (+0.4%)</ThemedText>
            <ThemedText style={styles.consoleText}>&gt; ALERT: Competitor XYZ Launch</ThemedText>
            <ThemedText style={[styles.consoleText, { color: '#00ff9d' }]}>&gt; INGESTING...</ThemedText>
          </View>
          <View style={styles.tickerRow}>
            {['BTC $98k', 'ETH $3.2k', 'TSLA $240'].map(t => (
              <View key={t} style={styles.tickerTag}>
                <ThemedText style={styles.tickerText}>{t}</ThemedText>
              </View>
            ))}
          </View>
        </InnerSanctumWidget>

        {/* Engine Stack */}
        <InnerSanctumWidget title="Engineering Stack" icon="cpu">
          <View style={styles.grid}>
            {NS_ENGINES.slice(0, 8).map(eng => (
              <View key={eng.code} style={styles.sanctumGridItem}>
                <View style={[styles.pulseDot, { backgroundColor: '#00ff9d' }]} />
                <ThemedText style={styles.gridCode}>{eng.code}</ThemedText>
              </View>
            ))}
          </View>
        </InnerSanctumWidget>

      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  // NS STYLES
  nsHeroBackground: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    padding: 24,
  },
  nsHeroContent: {
    marginTop: 40,
  },
  heroEyebrow: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  nsContainer: {
    padding: 20,
    gap: 32,
    backgroundColor: '#0f172a',
    minHeight: 800,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  heroDesc: {
    fontSize: 16,
    color: '#94a3b8',
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  primaryBtn: {
    backgroundColor: '#38bdf8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  primaryBtnText: {
    color: '#0f172a',
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#94a3b8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  secondaryBtnText: {
    color: '#e2e8f0',
    fontWeight: '600',
    fontSize: 14,
  },
  nucleusCard: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  nucleusLabel: {
    fontSize: 10,
    color: '#94a3b8',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  nucleusTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#38bdf8',
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  },
  nucleusSub: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  nucleusDesc: {
    fontSize: 12,
    color: '#94a3b8',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    width: '100%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38bdf8',
    marginRight: 12,
  },
  bulletText: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  engineCard: {
    width: (SCREEN_WIDTH - 52) / 2, // 2 columns
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
  },
  engineCode: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  engineName: {
    fontSize: 10,
    color: '#94a3b8',
  },
  flowList: {
    gap: 16,
  },
  flowItem: {
    flexDirection: 'row',
    gap: 16,
  },
  flowId: {
    color: '#38bdf8',
    fontSize: 14,
    fontWeight: 'bold',
    width: 24,
    marginTop: 2,
  },
  flowText: {
    color: '#e2e8f0',
    fontSize: 14,
  },
  flowSub: {
    color: '#64748b',
    fontSize: 12,
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  },

  // SANCTUM STYLES
  sanctumHero: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 20,
  },
  sanctumTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 4,
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  },
  sanctumSub: {
    fontSize: 10,
    color: '#52525b',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 8,
  },
  sanctumContainer: {
    padding: 20,
    gap: 20,
    backgroundColor: '#000000',
    minHeight: 800,
  },
  sanctumWidget: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  widgetTitle: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#ffffff',
  },
  briefItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    gap: 12,
  },
  briefBorder: {
    width: 2,
    borderRadius: 1,
  },
  briefText: {
    fontSize: 12,
    color: '#e2e8f0',
    fontWeight: '500',
  },
  briefSub: {
    fontSize: 10,
    color: '#71717a',
    marginTop: 2,
  },
  finLabel: {
    fontSize: 10,
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  finValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00ff9d',
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
    marginVertical: 4,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginVertical: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    width: '35%',
    backgroundColor: '#00ff9d',
  },
  finRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  finStatLabel: {
    fontSize: 10,
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
    color: '#ef4444',
  },
  consoleBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: 8,
    marginBottom: 12,
  },
  consoleText: {
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
    fontSize: 10,
    color: 'rgba(0,255,157,0.7)',
    marginBottom: 2,
  },
  tickerRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tickerTag: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tickerText: {
    fontSize: 10,
    color: '#a1a1aa',
  },
  sanctumGridItem: {
    width: (SCREEN_WIDTH - 56) / 4,
    aspectRatio: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  gridCode: {
    fontSize: 8,
    color: '#52525b',
    fontWeight: 'bold',
  }
});
