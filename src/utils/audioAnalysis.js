/**
 * audioAnalysis.js
 *
 * Analyzes metering data collected from expo-av during recording.
 *
 * NOTE FOR PRODUCTION: Replace the heuristic analysis here with a proper
 * DSP pipeline. Options:
 *  1. WebView + Web Audio API + YIN/McLeod pitch algorithm (works in managed Expo)
 *  2. react-native-pitch-tracker native module (bare workflow)
 *  3. Backend API using Python + librosa for full spectral analysis
 *
 * For the MVP, we use amplitude statistics to classify voice characteristics.
 */

const SAMPLE_RATE_MS = 100; // metering sample every 100ms

/**
 * Compute basic statistics from an array of dB metering values.
 */
export function computeStats(meteringArray) {
  if (!meteringArray || meteringArray.length === 0) {
    return { avg: -60, max: -60, min: -160, variance: 0, std: 0 };
  }

  const valid = meteringArray.filter((v) => v > -160);
  if (valid.length === 0) return { avg: -60, max: -60, min: -160, variance: 0, std: 0 };

  const avg = valid.reduce((a, b) => a + b, 0) / valid.length;
  const max = Math.max(...valid);
  const min = Math.min(...valid);
  const variance = valid.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / valid.length;
  const std = Math.sqrt(variance);

  return { avg, max, min, variance, std };
}

/**
 * Count how many times the signal crosses from below-threshold to above.
 * More zero-crossings → higher pitched voice tendency.
 */
function countPeaks(arr, threshold) {
  let peaks = 0;
  let wasBelow = true;
  for (const v of arr) {
    const isAbove = v > threshold;
    if (isAbove && wasBelow) peaks++;
    wasBelow = !isAbove;
  }
  return peaks;
}

/**
 * Detect whether the user was primarily singing or speaking.
 * Singers tend to have:
 *  - Sustained notes (longer periods above threshold)
 *  - More pitch variation (higher std)
 *  - More dynamic range
 */
export function detectVoiceMode(meteringArray) {
  const { avg, std, max, min } = computeStats(meteringArray);
  const dynamicRange = max - min;

  // Long sustained segments suggest singing
  let sustainedCount = 0;
  let currentRun = 0;
  const threshold = avg - 5;

  for (const v of meteringArray) {
    if (v > threshold) {
      currentRun++;
      if (currentRun > 5) sustainedCount++; // 500ms sustained
    } else {
      currentRun = 0;
    }
  }

  const isSinging = std > 8 || dynamicRange > 20 || sustainedCount > 10;
  return isSinging ? 'singing' : 'speaking';
}

/**
 * Estimate vocal weight from amplitude patterns.
 * Heavier voices (bass/contralto) tend to produce more consistent, fuller signals.
 * Lighter voices (tenor/soprano) have more peaks and variability at higher amplitudes.
 *
 * Returns 0-100 where 0 = heaviest (bass) and 100 = lightest (soprano)
 */
export function estimateVocalWeight(meteringArray, durationSeconds) {
  const { avg, std, max } = computeStats(meteringArray);
  const peakRate = countPeaks(meteringArray, avg) / Math.max(durationSeconds, 1);

  // Normalize factors:
  // Higher average amplitude → tends heavier voices
  // Higher peak rate → tends lighter/more agile voices
  // Higher std → wider range → tends lighter/more expressive
  const normalizedAvg = Math.min(1, Math.max(0, (avg + 60) / 50)); // -60 to -10 dB → 0 to 1
  const normalizedPeakRate = Math.min(1, peakRate / 8); // up to 8 peaks/sec
  const normalizedStd = Math.min(1, std / 15);

  // Weight: more peaks + high std → lighter voice
  const lightness = normalizedPeakRate * 0.5 + normalizedStd * 0.3 + (1 - normalizedAvg) * 0.2;
  return Math.round(lightness * 100);
}

/**
 * Estimate timbre from amplitude envelope shape.
 */
export function estimateTimbre(meteringArray) {
  const { avg, std, max, min } = computeStats(meteringArray);
  const dynamicRange = max - min;

  if (dynamicRange < 10 && std < 5) return 'RESONANT';
  if (std > 12) return 'BRIGHT';
  if (avg < -35) return 'BREATHY';
  if (avg > -20) return 'WARM';
  if (dynamicRange > 25) return 'BRIGHT';
  return 'WARM';
}

/**
 * Estimate scale tendency from rhythmic patterns in the metering data.
 */
export function estimateScaleTendency(meteringArray) {
  const { std, variance } = computeStats(meteringArray);
  if (variance > 150) return 'CHROMATIC';
  if (std > 10) return 'MINOR';
  if (std > 5) return 'MAJOR';
  return 'PENTATONIC';
}

/**
 * Convert vocal weight score (0-100) and voice mode to a voice type ID.
 */
export function weightToVoiceType(weight, mode, isFemale) {
  // Override for speaking voices when mode is 'speaking' and energy is low
  if (mode === 'speaking') {
    return 'speaking';
  }

  if (isFemale) {
    if (weight < 25) return 'contralto';
    if (weight < 55) return 'mezzo';
    return 'soprano';
  } else {
    if (weight < 30) return 'bass';
    if (weight < 65) return 'baritone';
    return 'tenor';
  }
}

/**
 * Main analysis entry point.
 * @param {number[]} meteringData - Array of dB values collected during recording
 * @param {number} durationSeconds - Recording duration
 * @param {string} gender - 'male' | 'female' | 'unknown'
 * @returns {object} Full analysis result
 */
export function analyzeVoice(meteringData, durationSeconds, gender = 'unknown') {
  const stats = computeStats(meteringData);
  const mode = detectVoiceMode(meteringData);
  const isFemale = gender === 'female';
  const weight = estimateVocalWeight(meteringData, durationSeconds);
  const voiceTypeId = weightToVoiceType(weight, mode, isFemale);
  const timbre = estimateTimbre(meteringData);
  const scale = estimateScaleTendency(meteringData);

  // Confidence score based on recording quality and duration
  const confidence = Math.min(100, Math.round(
    (durationSeconds / 10) * 40 +          // up to 40 pts for 10s recording
    (stats.max > -20 ? 30 : 10) +           // up to 30 pts for good signal level
    (meteringData.length > 20 ? 30 : 10)    // up to 30 pts for enough samples
  ));

  return {
    voiceTypeId,
    mode,
    weight,
    timbre,
    scale,
    stats,
    confidence,
    durationSeconds,
  };
}
