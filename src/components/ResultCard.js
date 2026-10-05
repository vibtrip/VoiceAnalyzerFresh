import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function GenreCard({ genre, match, reason, artists }) {
  return (
    <View style={styles.genreCard}>
      <View style={styles.genreHeader}>
        <Text style={styles.genreName}>{genre}</Text>
        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{match}% match</Text>
        </View>
      </View>
      <View style={styles.matchBar}>
        <View style={[styles.matchFill, { width: `${match}%` }]} />
      </View>
      <Text style={styles.genreReason}>{reason}</Text>
      <Text style={styles.artistsLabel}>Artists like you:</Text>
      <View style={styles.artistChips}>
        {artists.map((artist, i) => (
          <View key={i} style={styles.chip}>
            <Text style={styles.chipText}>{artist}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function CareerCard({ title, icon, reason }) {
  return (
    <LinearGradient
      colors={['#1E1E3A', '#141428']}
      style={styles.careerCard}
    >
      <Text style={styles.careerIcon}>{icon}</Text>
      <View style={styles.careerContent}>
        <Text style={styles.careerTitle}>{title}</Text>
        <Text style={styles.careerReason}>{reason}</Text>
      </View>
    </LinearGradient>
  );
}

export function StatRow({ label, value, sub }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statRight}>
        <Text style={styles.statValue}>{value}</Text>
        {sub ? <Text style={styles.statSub}>{sub}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  genreCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  genreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  genreName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  matchBadge: {
    backgroundColor: '#7C3AED22',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#7C3AED66',
  },
  matchText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A78BFA',
  },
  matchBar: {
    height: 4,
    backgroundColor: '#2A2A4A',
    borderRadius: 2,
    marginBottom: 10,
    overflow: 'hidden',
  },
  matchFill: {
    height: 4,
    backgroundColor: '#7C3AED',
    borderRadius: 2,
  },
  genreReason: {
    fontSize: 13,
    color: '#9999BB',
    lineHeight: 19,
    marginBottom: 10,
  },
  artistsLabel: {
    fontSize: 11,
    color: '#666688',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  artistChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: '#252540',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: 12,
    color: '#CCCCEE',
  },
  careerCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  careerIcon: {
    fontSize: 32,
    marginTop: 2,
  },
  careerContent: {
    flex: 1,
  },
  careerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  careerReason: {
    fontSize: 13,
    color: '#9999BB',
    lineHeight: 19,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E36',
  },
  statLabel: {
    fontSize: 14,
    color: '#8888AA',
  },
  statRight: {
    alignItems: 'flex-end',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#DDDDFF',
  },
  statSub: {
    fontSize: 11,
    color: '#666688',
    marginTop: 2,
  },
});
