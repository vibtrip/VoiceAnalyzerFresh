import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GenreCard, CareerCard, StatRow } from '../components/ResultCard';
import { MUSICAL_SCALES, TIMBRE_TYPES } from '../constants/voiceProfiles';

export default function ResultsScreen({ navigation, route }) {
  const { report } = route.params;
  const { voiceType, headline, genres, scaleInfo, timbreInfo, careerSuggestions, confidence, stats, mode } = report;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  async function handleShare() {
    try {
      await Share.share({
        message: `My voice analysis: I'm a ${voiceType.name} voice!\n\n${headline}\n\nAnalyzed with VoiceAnalyzer app.`,
      });
    } catch (_) {}
  }

  const confidenceColor = confidence >= 75 ? '#22C55E' : confidence >= 50 ? '#F59E0B' : '#EF4444';

  return (
    <LinearGradient colors={['#0D0D1A', '#0A0A14']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeBtn}>
            <Ionicons name="home-outline" size={22} color="#8888AA" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
            <Ionicons name="share-outline" size={22} color="#A78BFA" />
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Voice type hero */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <LinearGradient
            colors={voiceType.gradient}
            style={styles.heroCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.heroTop}>
              <Text style={styles.voiceTypeIcon}>{voiceType.icon}</Text>
              <View style={styles.confidenceBadge}>
                <View style={[styles.confidenceDot, { backgroundColor: confidenceColor }]} />
                <Text style={styles.confidenceText}>{confidence}% confidence</Text>
              </View>
            </View>
            <Text style={styles.voiceTypeName}>{voiceType.name}</Text>
            <Text style={styles.voiceTypeRange}>{voiceType.range}</Text>
            <Text style={styles.voiceTypeDesc}>{voiceType.description}</Text>

            <View style={styles.tagRow}>
              {voiceType.characteristics.map((c, i) => (
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>{c}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Headline insight */}
        <View style={styles.headlineBox}>
          <Text style={styles.headlineLabel}>Your Voice Story</Text>
          <Text style={styles.headlineText}>"{headline}"</Text>
        </View>

        {/* Voice stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice Profile</Text>
          <View style={styles.statsCard}>
            <StatRow
              label="Voice Type"
              value={voiceType.name}
              sub={voiceType.range}
            />
            <StatRow
              label="Mode Detected"
              value={mode === 'singing' ? '🎵 Singing' : '🗣️ Speaking'}
            />
            <StatRow
              label="Timbre"
              value={`${timbreInfo.icon} ${timbreInfo.name}`}
              sub={timbreInfo.description}
            />
            <StatRow
              label="Scale Tendency"
              value={scaleInfo.name}
              sub={scaleInfo.description}
            />
          </View>
        </View>

        {/* Timbre quality visualizer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vocal Qualities</Text>
          <View style={styles.qualityCard}>
            {[
              { label: 'Depth', value: Math.max(20, 100 - report.weight) },
              { label: 'Brightness', value: report.weight },
              { label: 'Warmth', value: Math.round(50 + Math.sin(report.weight / 10) * 30) },
              { label: 'Expressiveness', value: Math.min(95, Math.round(stats.std * 5 + 40)) },
            ].map(({ label, value }) => (
              <View key={label} style={styles.qualityRow}>
                <Text style={styles.qualityLabel}>{label}</Text>
                <View style={styles.qualityBarTrack}>
                  <LinearGradient
                    colors={['#7C3AED', '#4F46E5']}
                    style={[styles.qualityBarFill, { width: `${value}%` }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
                <Text style={styles.qualityValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Genre recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Genre Matches</Text>
          {genres.map((g, i) => (
            <GenreCard key={i} {...g} />
          ))}
        </View>

        {/* Career suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Paths to Explore</Text>
          {careerSuggestions.map((c, i) => (
            <CareerCard key={i} {...c} />
          ))}
        </View>

        {/* Next steps */}
        <View style={styles.nextStepsCard}>
          <Text style={styles.nextStepsTitle}>What to do next</Text>
          {[
            'Record yourself regularly to track your vocal development',
            'Find a vocal coach who specializes in your genre matches',
            'Join local open mics or karaoke nights to build confidence',
            'Listen to the suggested artists and study their technique',
          ].map((step, i) => (
            <View key={i} style={styles.nextStep}>
              <Text style={styles.nextStepNum}>{i + 1}</Text>
              <Text style={styles.nextStepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Retry button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Recording')}
          style={styles.retryButton}
        >
          <Ionicons name="mic-outline" size={18} color="#A78BFA" />
          <Text style={styles.retryText}>Analyze Again</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Results are based on vocal amplitude patterns.{'\n'}
          For professional vocal analysis, consult a voice coach.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: 60 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  homeBtn: { padding: 8 },
  shareBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 8 },
  shareText: { fontSize: 15, fontWeight: '600', color: '#A78BFA' },

  heroCard: { marginHorizontal: 20, borderRadius: 24, padding: 24, marginBottom: 16 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  voiceTypeIcon: { fontSize: 40 },
  confidenceBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#00000033', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  confidenceDot: { width: 8, height: 8, borderRadius: 4 },
  confidenceText: { fontSize: 12, color: '#FFFFFF', fontWeight: '600' },
  voiceTypeName: { fontSize: 34, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 },
  voiceTypeRange: { fontSize: 14, color: '#FFFFFF99', marginBottom: 10, fontWeight: '500' },
  voiceTypeDesc: { fontSize: 14, color: '#FFFFFFCC', lineHeight: 21, marginBottom: 16 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#FFFFFF22', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  tagText: { fontSize: 12, color: '#FFFFFF', fontWeight: '500' },

  headlineBox: { marginHorizontal: 20, backgroundColor: '#141428', borderRadius: 16, padding: 20, marginBottom: 8, borderWidth: 1, borderColor: '#7C3AED44' },
  headlineLabel: { fontSize: 11, color: '#7C3AED', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  headlineText: { fontSize: 16, color: '#DDDDFF', lineHeight: 24, fontStyle: 'italic' },

  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginBottom: 14, letterSpacing: -0.3 },

  statsCard: { backgroundColor: '#141428', borderRadius: 16, paddingHorizontal: 16, borderWidth: 1, borderColor: '#2A2A4A' },

  qualityCard: { backgroundColor: '#141428', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#2A2A4A', gap: 14 },
  qualityRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qualityLabel: { width: 110, fontSize: 13, color: '#8888AA' },
  qualityBarTrack: { flex: 1, height: 6, backgroundColor: '#2A2A4A', borderRadius: 3, overflow: 'hidden' },
  qualityBarFill: { height: 6, borderRadius: 3 },
  qualityValue: { width: 30, fontSize: 12, color: '#A78BFA', fontWeight: '600', textAlign: 'right' },

  nextStepsCard: { marginHorizontal: 20, marginTop: 24, backgroundColor: '#141428', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#2A2A4A' },
  nextStepsTitle: { fontSize: 17, fontWeight: '800', color: '#FFFFFF', marginBottom: 16 },
  nextStep: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'flex-start' },
  nextStepNum: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#7C3AED', textAlign: 'center', lineHeight: 24, fontSize: 12, fontWeight: '700', color: '#FFF', overflow: 'hidden' },
  nextStepText: { flex: 1, fontSize: 13, color: '#9999BB', lineHeight: 20 },

  retryButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 20, marginTop: 20, paddingVertical: 14, borderRadius: 14, borderWidth: 1, borderColor: '#7C3AED44', backgroundColor: '#7C3AED11' },
  retryText: { fontSize: 15, fontWeight: '600', color: '#A78BFA' },

  footer: { textAlign: 'center', fontSize: 11, color: '#444466', marginTop: 24, paddingHorizontal: 32, lineHeight: 17 },
});
