import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const BAR_COUNT = 24;

export default function WaveformVisualizer({ metering, isRecording, color = '#7C3AED' }) {
  // Create an array of animated values, one per bar
  const bars = useRef(
    Array.from({ length: BAR_COUNT }, () => new Animated.Value(0.1))
  ).current;

  const animRefs = useRef([]);

  useEffect(() => {
    if (!isRecording) {
      // Fade all bars to rest
      bars.forEach((bar) => {
        Animated.spring(bar, { toValue: 0.05, useNativeDriver: false }).start();
      });
      return;
    }

    // Drive bars from metering value with organic variation
    const level = metering ? Math.max(0, (metering + 60) / 60) : 0.1; // normalize -60..0 dB → 0..1

    bars.forEach((bar, i) => {
      // Each bar gets a slightly different amplitude for a natural waveform look
      const offset = (Math.sin(i * 0.8 + Date.now() / 200) + 1) / 2; // 0..1
      const barHeight = Math.max(0.05, level * (0.4 + offset * 0.6));

      // Cancel previous animation
      if (animRefs.current[i]) animRefs.current[i].stop();

      animRefs.current[i] = Animated.spring(bar, {
        toValue: barHeight,
        tension: 80,
        friction: 6,
        useNativeDriver: false,
      });
      animRefs.current[i].start();
    });
  }, [metering, isRecording]);

  return (
    <View style={styles.container}>
      {bars.map((bar, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            {
              backgroundColor: color,
              opacity: isRecording ? 0.7 + (i % 3) * 0.1 : 0.25,
              height: bar.interpolate({
                inputRange: [0, 1],
                outputRange: ['2%', '100%'],
                extrapolate: 'clamp',
              }),
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    gap: 3,
    paddingHorizontal: 8,
  },
  bar: {
    flex: 1,
    borderRadius: 3,
    minHeight: 4,
  },
});
