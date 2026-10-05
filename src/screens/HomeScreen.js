import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const FEATURES = [
  { icon: '🎵', title: 'Pitch & Scale', desc: 'Identify your natural scale and pitch range' },
  { icon: '🎨', title: 'Timbre Quality', desc: 'Discover your unique vocal color and texture' },
  { icon: '🎤', title: 'Genre Match', desc: 'Find which music genres suit your voice best' },
  { icon: '🌟', title: 'Career Insight', desc: 'Learn what voice careers you could excel in' },
];

export default function HomeScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <LinearGradient colors={['#0D0D1A', '#0A0A14']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🎙️</Text>
          <Text style={styles.appName}>VoiceAnalyzer</Text>
          <Text style={styles.tagline}>Discover the music inside your voice</Text>
        </View>

        {/* Hero card */}
        <LinearGradient
          colors={['#3B1F8C', '#1A0F4A']}
          style={styles.heroCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.heroTitle}>What does your{'\n'}voice say about you?</Text>
          <Text style={styles.heroSub}>
            Sing or speak for 10 seconds. Our AI analyzes your pitch, timbre, and range
            to reveal your voice type and the genres where you'll shine.
          </Text>
          <View style={styles.waveIllustration}>
            {Array.from({ length: 20 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.wavebar,
                  { height: 8 + Math.sin(i * 0.7) * 20 + 20, opacity: 0.4 + i * 0.03 },
                ]}
              />
            ))}
          </View>
        </LinearGradient>

        {/* Features */}
        <View style={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>

        {/* CTA Button */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Recording')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
          >
            <LinearGradient
              colors={['#7C3AED', '#4F46E5']}
              style={styles.ctaButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="mic" size={22} color="#FFF" style={{ marginRight: 10 }} />
              <Text style={styles.ctaText}>Analyze My Voice</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.disclaimer}>
          10-second recording · No data stored · Instant results
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 24, paddingBottom: 48 },
  header: { alignItems: 'center', marginTop: 24, marginBottom: 32 },
  logo: { fontSize: 48, marginBottom: 8 },
  appName: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 },
  tagline: { fontSize: 14, color: '#8888AA', marginTop: 6 },
  heroCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    overflow: 'hidden',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 34,
    marginBottom: 12,
  },
  heroSub: {
    fontSize: 14,
    color: '#C4B5FD',
    lineHeight: 21,
    marginBottom: 20,
  },
  waveIllustration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 56,
  },
  wavebar: {
    flex: 1,
    backgroundColor: '#A78BFA',
    borderRadius: 3,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  featureCard: {
    width: '47%',
    backgroundColor: '#141428',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  featureIcon: { fontSize: 24, marginBottom: 8 },
  featureTitle: { fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  featureDesc: { fontSize: 12, color: '#7777AA', lineHeight: 17 },
  ctaButton: {
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  disclaimer: { textAlign: 'center', color: '#555577', fontSize: 12, marginTop: 16 },
});
