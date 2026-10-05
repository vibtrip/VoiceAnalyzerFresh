import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import WaveformVisualizer from '../components/WaveformVisualizer';
import { analyzeVoice } from '../utils/audioAnalysis';
import { buildVoiceReport } from '../utils/voiceClassifier';

const MAX_DURATION = 15; // seconds
const GENDER_OPTIONS = ['Male', 'Female', 'Prefer not to say'];

export default function RecordingScreen({ navigation }) {
  const [phase, setPhase] = useState('setup'); // setup | countdown | recording | analyzing
  const [gender, setGender] = useState('Prefer not to say');
  const [elapsed, setElapsed] = useState(0);
  const [metering, setMetering] = useState(-60);
  const [countdown, setCountdown] = useState(3);

  const recordingRef = useRef(null);
  const meteringHistory = useRef([]);
  const timerRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseLoop = useRef(null);

  useEffect(() => () => cleanup(), []);

  async function cleanup() {
    clearInterval(timerRef.current);
    if (recordingRef.current) {
      try { await recordingRef.current.stopAndUnloadAsync(); } catch (_) {}
      recordingRef.current = null;
    }
    pulseLoop.current?.stop();
  }

  function startPulse() {
    pulseLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 600, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    );
    pulseLoop.current.start();
  }

  async function requestPermission() {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Microphone Required',
        'Please enable microphone access in Settings to analyze your voice.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  }

  async function startCountdown() {
    const ok = await requestPermission();
    if (!ok) return;
    setPhase('countdown');
    setCountdown(3);

    let c = 3;
    const countTimer = setInterval(() => {
      c -= 1;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(countTimer);
        startRecording();
      }
    }, 1000);
  }

  async function startRecording() {
    meteringHistory.current = [];
    setElapsed(0);
    setPhase('recording');
    startPulse();

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      {
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        isMeteringEnabled: true,
      },
      (status) => {
        if (status.metering !== undefined) {
          const db = status.metering;
          setMetering(db);
          meteringHistory.current.push(db);
        }
      },
      100 // update every 100ms
    );

    recordingRef.current = recording;

    // Auto-stop after MAX_DURATION
    timerRef.current = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1;
        if (next >= MAX_DURATION) {
          clearInterval(timerRef.current);
          stopRecording();
        }
        return next;
      });
    }, 1000);
  }

  async function stopRecording() {
    clearInterval(timerRef.current);
    pulseLoop.current?.stop();
    pulseAnim.setValue(1);
    setPhase('analyzing');

    try {
      await recordingRef.current?.stopAndUnloadAsync();
    } catch (_) {}

    // Simulate a brief analysis delay for UX
    await new Promise((r) => setTimeout(r, 1800));

    const genderKey = gender === 'Female' ? 'female' : gender === 'Male' ? 'male' : 'unknown';
    const analysis = analyzeVoice(meteringHistory.current, elapsed || 5, genderKey);
    const report = buildVoiceReport(analysis);

    navigation.replace('Results', { report });
  }

  const progress = elapsed / MAX_DURATION;

  return (
    <LinearGradient colors={['#0D0D1A', '#0A0A14']} style={styles.container}>

      {/* Back button */}
      {phase === 'setup' && (
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#8888AA" />
        </TouchableOpacity>
      )}

      {/* ──── SETUP PHASE ──── */}
      {phase === 'setup' && (
        <View style={styles.content}>
          <Text style={styles.screenTitle}>Before we begin</Text>
          <Text style={styles.screenSub}>
            Select your gender for a more accurate voice type classification.
          </Text>

          <View style={styles.genderRow}>
            {GENDER_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[styles.genderChip, gender === opt && styles.genderChipActive]}
                onPress={() => setGender(opt)}
              >
                <Text style={[styles.genderText, gender === opt && styles.genderTextActive]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>Tips for best results</Text>
            {[
              'Find a quiet room with minimal background noise',
              'Sing a few notes or speak naturally for 10–15 seconds',
              'Hold the phone at normal speaking distance',
              'Try to use your full range if singing',
            ].map((tip, i) => (
              <Text key={i} style={styles.tipItem}>• {tip}</Text>
            ))}
          </View>

          <TouchableOpacity onPress={startCountdown}>
            <LinearGradient
              colors={['#7C3AED', '#4F46E5']}
              style={styles.startButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="mic" size={20} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.startButtonText}>Start Recording</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* ──── COUNTDOWN PHASE ──── */}
      {phase === 'countdown' && (
        <View style={styles.centeredContent}>
          <Text style={styles.countdownLabel}>Get ready…</Text>
          <Text style={styles.countdownNumber}>{countdown}</Text>
          <Text style={styles.countdownSub}>Start singing or speaking when the mic appears</Text>
        </View>
      )}

      {/* ──── RECORDING PHASE ──── */}
      {phase === 'recording' && (
        <View style={styles.content}>
          <Text style={styles.recordingTitle}>Recording…</Text>
          <Text style={styles.recordingHint}>Sing, hum, or speak naturally</Text>

          <WaveformVisualizer metering={metering} isRecording={true} color="#7C3AED" />

          {/* Progress ring */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.progressTime}>
              {elapsed}s / {MAX_DURATION}s
            </Text>
          </View>

          {/* Pulsing mic */}
          <Animated.View style={[styles.micRing, { transform: [{ scale: pulseAnim }] }]}>
            <View style={styles.micCircle}>
              <Ionicons name="mic" size={36} color="#FFF" />
            </View>
          </Animated.View>

          <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
            <Ionicons name="stop" size={18} color="#FF6B6B" />
            <Text style={styles.stopText}>Stop & Analyze</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ──── ANALYZING PHASE ──── */}
      {phase === 'analyzing' && (
        <View style={styles.centeredContent}>
          <Text style={styles.analyzingIcon}>🔬</Text>
          <Text style={styles.analyzingTitle}>Analyzing your voice…</Text>
          <Text style={styles.analyzingSub}>
            Detecting pitch, timbre, and vocal characteristics
          </Text>
          <View style={styles.analyzeSteps}>
            {['Pitch detection', 'Timbre analysis', 'Genre matching', 'Building your profile'].map(
              (step, i) => (
                <Text key={i} style={styles.analyzeStep}>
                  ✦ {step}
                </Text>
              )
            )}
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backBtn: { position: 'absolute', top: 56, left: 20, zIndex: 10, padding: 8 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 90, paddingBottom: 40 },
  centeredContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },

  screenTitle: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', marginBottom: 8 },
  screenSub: { fontSize: 14, color: '#8888AA', lineHeight: 21, marginBottom: 28 },

  genderRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  genderChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    alignItems: 'center',
    backgroundColor: '#141428',
  },
  genderChipActive: { borderColor: '#7C3AED', backgroundColor: '#7C3AED22' },
  genderText: { fontSize: 13, color: '#7777AA', fontWeight: '600' },
  genderTextActive: { color: '#A78BFA' },

  tipBox: {
    backgroundColor: '#141428',
    borderRadius: 16,
    padding: 18,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  tipTitle: { fontSize: 13, fontWeight: '700', color: '#A78BFA', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.6 },
  tipItem: { fontSize: 13, color: '#8888AA', lineHeight: 24 },

  startButton: {
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: { fontSize: 17, fontWeight: '700', color: '#FFF' },

  countdownLabel: { fontSize: 18, color: '#8888AA', marginBottom: 16 },
  countdownNumber: { fontSize: 96, fontWeight: '800', color: '#FFFFFF', lineHeight: 110 },
  countdownSub: { fontSize: 14, color: '#666688', textAlign: 'center', marginTop: 16 },

  recordingTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 4 },
  recordingHint: { fontSize: 13, color: '#8888AA', textAlign: 'center', marginBottom: 24 },

  progressContainer: { marginTop: 20, marginBottom: 32 },
  progressTrack: { height: 4, backgroundColor: '#2A2A4A', borderRadius: 2, overflow: 'hidden', marginBottom: 8 },
  progressFill: { height: 4, backgroundColor: '#7C3AED', borderRadius: 2 },
  progressTime: { fontSize: 13, color: '#8888AA', textAlign: 'center' },

  micRing: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#7C3AED44',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  micCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FF6B6B44',
    backgroundColor: '#FF6B6B11',
  },
  stopText: { fontSize: 15, fontWeight: '600', color: '#FF6B6B' },

  analyzingIcon: { fontSize: 56, marginBottom: 20 },
  analyzingTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginBottom: 10, textAlign: 'center' },
  analyzingSub: { fontSize: 14, color: '#8888AA', textAlign: 'center', lineHeight: 21, marginBottom: 28 },
  analyzeSteps: { gap: 10 },
  analyzeStep: { fontSize: 14, color: '#7C3AED', fontWeight: '500' },
});
