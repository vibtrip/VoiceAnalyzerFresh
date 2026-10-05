import {
  VOICE_TYPES,
  GENRE_RECOMMENDATIONS,
  MUSICAL_SCALES,
  TIMBRE_TYPES,
} from '../constants/voiceProfiles';

/**
 * Build the complete voice analysis report from raw analysis results.
 */
export function buildVoiceReport(analysisResult) {
  const { voiceTypeId, mode, weight, timbre, scale, stats, confidence } = analysisResult;

  const voiceType = VOICE_TYPES[voiceTypeId.toUpperCase()] ||
    VOICE_TYPES[voiceTypeId] ||
    VOICE_TYPES.BARITONE;

  const genres = GENRE_RECOMMENDATIONS[voiceTypeId] || GENRE_RECOMMENDATIONS.baritone;
  const scaleInfo = MUSICAL_SCALES[scale] || MUSICAL_SCALES.PENTATONIC;
  const timbreInfo = TIMBRE_TYPES[timbre] || TIMBRE_TYPES.WARM;

  // Career suggestion based on voice type and mode
  const careerSuggestions = buildCareerSuggestions(voiceTypeId, mode, timbre);

  // Personalized top insight
  const headline = buildHeadline(voiceTypeId, genres[0], mode, timbre);

  return {
    voiceType,
    headline,
    genres: genres.slice(0, 4),
    topGenre: genres[0],
    scaleInfo,
    timbreInfo,
    careerSuggestions,
    confidence,
    weight,
    mode,
    stats,
  };
}

function buildHeadline(voiceTypeId, topGenre, mode, timbre) {
  const headlines = {
    bass: `Your deep, commanding voice is built for ${topGenre.genre}. Legends like ${topGenre.artists[0]} built entire careers on a voice just like yours.`,
    baritone: `You have the voice of a ${topGenre.genre} star. With your warm, versatile tone, you could sound just like ${topGenre.artists[0]}.`,
    tenor: `Your bright tenor voice is incredibly well-suited for ${topGenre.genre}. Think ${topGenre.artists[0]} — that kind of impact is within your reach.`,
    contralto: `Your rare, rich contralto voice is a precious instrument. You could captivate audiences in ${topGenre.genre} the way ${topGenre.artists[0]} does.`,
    mezzo: `With your expressive mezzo-soprano voice, ${topGenre.genre} is your natural home. Artists like ${topGenre.artists[0]} share your vocal range.`,
    soprano: `Your clear, soaring soprano voice has the qualities of a ${topGenre.genre} legend. Think ${topGenre.artists[0]} — truly extraordinary potential.`,
    speaking: `Your voice has natural broadcast quality that could make you a fantastic ${topGenre.genre} personality, much like ${topGenre.artists[0]}.`,
  };
  return headlines[voiceTypeId] || headlines.baritone;
}

function buildCareerSuggestions(voiceTypeId, mode, timbre) {
  const suggestions = {
    bass: [
      {
        title: 'Radio Jockey / Broadcaster',
        icon: '📻',
        reason: 'Your deep, authoritative voice is exactly what radio stations and podcasts look for. You could become the next voice that millions tune in to hear.',
      },
      {
        title: 'Voice Actor',
        icon: '🎭',
        reason: 'Deep character voices are incredibly sought-after for animation, video games, and dubbing. Your voice can bring memorable characters to life.',
      },
    ],
    baritone: [
      {
        title: 'Recording Artist',
        icon: '🎙️',
        reason: 'The baritone range is the sweet spot for commercial music. With training, you could release original music that finds a wide audience.',
      },
      {
        title: 'Jingle / Commercial Singer',
        icon: '📺',
        reason: 'Your versatile, pleasant voice is perfect for advertising jingles and commercial voice-overs — a very lucrative career path.',
      },
    ],
    tenor: [
      {
        title: 'Bollywood / Playback Singer',
        icon: '🎬',
        reason: 'Your tenor voice aligns perfectly with what Bollywood playback demands. With the right training and connections, you could have songs picturised on film heroes.',
      },
      {
        title: 'Live Performer',
        icon: '🎤',
        reason: 'Tenor voices carry exceptionally well in live venues. Your voice has the quality to fill a concert hall and connect with audiences.',
      },
    ],
    contralto: [
      {
        title: 'Jazz / Blues Artist',
        icon: '🎷',
        reason: 'Your rare vocal quality is a treasure in jazz and blues. Club owners and record labels search for voices like yours.',
      },
      {
        title: 'Session Singer',
        icon: '🎧',
        reason: 'Your distinctive timbre is incredibly valuable in recording studios as a session artist and background vocalist.',
      },
    ],
    mezzo: [
      {
        title: 'Bollywood / Pop Artist',
        icon: '🌟',
        reason: 'Your mezzo range is perfect for Bollywood and pop music. Think Shreya Ghoshal — your voice has that same commercial appeal.',
      },
      {
        title: 'Music Theatre Performer',
        icon: '🎭',
        reason: 'Musical theatre leading roles are written for voices like yours. The stage is calling.',
      },
    ],
    soprano: [
      {
        title: 'Classical / Playback Singer',
        icon: '🎼',
        reason: 'Your soprano voice is the tradition of Lata Mangeshkar and Asha Bhosle. Classical training could take you to extraordinary places.',
      },
      {
        title: 'Choral / Studio Vocalist',
        icon: '🎵',
        reason: 'Your clear high notes are precious in studio recordings, choirs, and background vocals for film and TV.',
      },
    ],
    speaking: [
      {
        title: 'Radio Jockey (RJ)',
        icon: '📻',
        reason: 'Your voice has the natural warmth, clarity and cadence that makes for an outstanding radio personality. You could connect with millions of listeners daily.',
      },
      {
        title: 'Podcast Host / YouTuber',
        icon: '🎧',
        reason: 'In the creator economy, a distinctive, engaging voice is your biggest asset. Your voice could build a loyal following across audio and video platforms.',
      },
    ],
  };

  return suggestions[voiceTypeId] || suggestions.baritone;
}
