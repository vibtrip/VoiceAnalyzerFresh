// Voice type definitions with full profiles
export const VOICE_TYPES = {
  BASS: {
    id: 'bass',
    name: 'Bass',
    icon: '🎸',
    range: 'E2 – E4',
    hzRange: [82, 330],
    description:
      'Deep, resonant, and authoritative. Bass voices carry a natural gravitas that commands attention in any room.',
    timbre: 'Dark & Powerful',
    characteristics: ['Deep resonance', 'Natural authority', 'Rich overtones', 'Commanding presence'],
    color: '#4A1880',
    gradient: ['#4A1880', '#1A0630'],
  },
  BARITONE: {
    id: 'baritone',
    name: 'Baritone',
    icon: '🎵',
    range: 'A2 – A4',
    hzRange: [110, 440],
    description:
      'Warm, versatile, and expressive. The most common male voice type, equally powerful in speaking and singing.',
    timbre: 'Warm & Versatile',
    characteristics: ['Warm mid-tones', 'Natural expression', 'Broad range', 'Conversational ease'],
    color: '#1A4480',
    gradient: ['#1A4480', '#0A1830'],
  },
  TENOR: {
    id: 'tenor',
    name: 'Tenor',
    icon: '🎤',
    range: 'C3 – C5',
    hzRange: [130, 523],
    description:
      'Bright, soaring, and emotionally compelling. Tenor voices cut through music effortlessly and evoke strong emotions.',
    timbre: 'Bright & Soaring',
    characteristics: ['Clear highs', 'Emotional resonance', 'Lyrical quality', 'Natural brightness'],
    color: '#1A6840',
    gradient: ['#1A6840', '#0A2818'],
  },
  CONTRALTO: {
    id: 'contralto',
    name: 'Contralto / Alto',
    icon: '🎼',
    range: 'E3 – E5',
    hzRange: [165, 659],
    description:
      'Rich, earthy, and soulful. The rarest female voice type, with a depth and character that is instantly recognizable.',
    timbre: 'Rich & Soulful',
    characteristics: ['Deep warmth', 'Soulful expression', 'Rare quality', 'Emotional depth'],
    color: '#804A1A',
    gradient: ['#804A1A', '#301808'],
  },
  MEZZO_SOPRANO: {
    id: 'mezzo',
    name: 'Mezzo-Soprano',
    icon: '🎶',
    range: 'A3 – A5',
    hzRange: [220, 880],
    description:
      'Powerful, expressive, and dynamic. A versatile female voice that bridges depth and brilliance with effortless grace.',
    timbre: 'Dynamic & Expressive',
    characteristics: ['Mid-range power', 'Expressive depth', 'Dynamic range', 'Soulful warmth'],
    color: '#6A1A70',
    gradient: ['#6A1A70', '#280A28'],
  },
  SOPRANO: {
    id: 'soprano',
    name: 'Soprano',
    icon: '✨',
    range: 'C4 – C6',
    hzRange: [262, 1047],
    description:
      'Brilliant, pure, and transcendent. Soprano voices soar above all others and are capable of extraordinary emotional heights.',
    timbre: 'Pure & Brilliant',
    characteristics: ['Crystal clarity', 'High brilliance', 'Emotional power', 'Ethereal quality'],
    color: '#802040',
    gradient: ['#802040', '#300818'],
  },
  SPEAKING: {
    id: 'speaking',
    name: 'Rich Speaking Voice',
    icon: '🎙️',
    range: 'Conversational',
    hzRange: [85, 255],
    description:
      'Your voice has a natural authority and richness perfect for broadcasting, narration, and voice work.',
    timbre: 'Authoritative & Clear',
    characteristics: ['Natural authority', 'Clear articulation', 'Engaging cadence', 'Memorable quality'],
    color: '#1A5050',
    gradient: ['#1A5050', '#0A2020'],
  },
};

// Genre recommendations keyed by voice type ID
export const GENRE_RECOMMENDATIONS = {
  bass: [
    {
      genre: 'Blues',
      match: 95,
      reason: 'Blues was practically invented for bass voices. Your depth creates the emotional foundation the genre needs.',
      artists: ['B.B. King', 'Muddy Waters', 'Robert Johnson'],
    },
    {
      genre: 'Heavy Metal',
      match: 90,
      reason: 'Deep, powerful bass vocals are the cornerstone of metal music — your voice can fill arenas.',
      artists: ['Ozzy Osbourne', 'Glenn Danzig', 'Ronnie James Dio'],
    },
    {
      genre: 'Gospel / Soul',
      match: 88,
      reason: 'The spiritual weight of gospel music is carried by bass voices. You can move entire congregations.',
      artists: ['Barry White', 'Isaac Hayes', 'Luther Vandross'],
    },
    {
      genre: 'Country',
      match: 82,
      reason: 'Classic country storytelling sounds most authentic with a deep, resonant voice like yours.',
      artists: ['Johnny Cash', 'Waylon Jennings', 'Willie Nelson'],
    },
  ],
  baritone: [
    {
      genre: 'Pop',
      match: 93,
      reason: 'Pop music\'s sweet spot is exactly the baritone range. Your voice is instantly radio-friendly.',
      artists: ['Ed Sheeran', 'Bruno Mars', 'Michael Bublé'],
    },
    {
      genre: 'Rock',
      match: 90,
      reason: 'Rock\'s power and emotion are perfectly channeled through the versatile baritone range.',
      artists: ['Elvis Presley', 'Jim Morrison', 'Chris Cornell'],
    },
    {
      genre: 'Jazz',
      match: 87,
      reason: 'Jazz phrasing and improvisation suit the baritone voice\'s natural warmth and expressiveness.',
      artists: ['Frank Sinatra', 'Tony Bennett', 'Nat King Cole'],
    },
    {
      genre: 'Bollywood (Male)',
      match: 85,
      reason: 'Many iconic Bollywood songs are in the baritone range, with rich emotional depth.',
      artists: ['Mohammed Rafi (lower register)', 'Mukesh', 'Hemant Kumar'],
    },
  ],
  tenor: [
    {
      genre: 'Pop / Bollywood',
      match: 96,
      reason: 'The bright, soaring tenor voice is the most loved in pop and Bollywood music worldwide.',
      artists: ['Kishore Kumar', 'Mohammed Rafi', 'Arijit Singh'],
    },
    {
      genre: 'Musical Theatre',
      match: 92,
      reason: 'Stage musicals are built around tenor leads. Your voice can carry an entire show.',
      artists: ['Mika Singh', 'Sonu Nigam', 'Armaan Malik'],
    },
    {
      genre: 'Classical / Opera',
      match: 88,
      reason: 'The tenor is the romantic hero of opera. Your range and brightness fit this tradition perfectly.',
      artists: ['Pavarotti', 'Plácido Domingo', 'Andrea Bocelli'],
    },
    {
      genre: 'R&B',
      match: 85,
      reason: 'R&B\'s emotional expressiveness and falsetto moments are tailor-made for tenor voices.',
      artists: ['The Weeknd', 'Bruno Mars', 'Justin Timberlake'],
    },
  ],
  contralto: [
    {
      genre: 'Soul / R&B',
      match: 97,
      reason: 'Your rare, deep female voice is the bedrock of soul music. Every note carries extraordinary emotional weight.',
      artists: ['Cher', 'Tracy Chapman', 'Nina Simone'],
    },
    {
      genre: 'Blues',
      match: 93,
      reason: 'Deep female blues voices are extraordinarily powerful and memorable. You were born for this genre.',
      artists: ['Bessie Smith', 'Bonnie Raitt', 'Janis Joplin'],
    },
    {
      genre: 'Folk / Indie',
      match: 88,
      reason: 'Your earthy, rich tone brings authenticity and intimacy to folk and indie music.',
      artists: ['Joan Baez', 'Norah Jones', 'k.d. lang'],
    },
    {
      genre: 'Jazz',
      match: 90,
      reason: 'The jazz world treasures deep female voices. Your timbre is ideal for smoky, late-night performances.',
      artists: ['Billie Holiday', 'Ella Fitzgerald (lower range)', 'Amy Winehouse'],
    },
  ],
  mezzo: [
    {
      genre: 'Pop',
      match: 94,
      reason: 'Most successful female pop artists are mezzo-sopranos. Your range covers everything from power ballads to dance hits.',
      artists: ['Adele', 'Madonna', 'Taylor Swift'],
    },
    {
      genre: 'Bollywood (Female)',
      match: 91,
      reason: 'The mid-range warmth of the mezzo-soprano voice suits the emotional depth of Bollywood beautifully.',
      artists: ['Shreya Ghoshal', 'Sunidhi Chauhan', 'Kavita Krishnamurthy'],
    },
    {
      genre: 'Musical Theatre',
      match: 89,
      reason: 'Mezzo-soprano voices dominate musical theatre leading roles with power and emotional versatility.',
      artists: ['Barbra Streisand', 'Celine Dion', 'Jennifer Hudson'],
    },
    {
      genre: 'Gospel',
      match: 86,
      reason: 'The warmth and power of a mezzo-soprano voice can lift an entire congregation.',
      artists: ['Whitney Houston', 'Aretha Franklin', 'CeCe Winans'],
    },
  ],
  soprano: [
    {
      genre: 'Classical / Opera',
      match: 98,
      reason: 'The soprano voice is the crown jewel of classical music. Your range and clarity are perfectly suited for operatic roles.',
      artists: ['Lata Mangeshkar', 'Noor Jehan', 'Maria Callas'],
    },
    {
      genre: 'Bollywood (Female)',
      match: 95,
      reason: 'Lata Mangeshkar\'s legendary career was built on a soprano voice just like yours. You could achieve similar heights.',
      artists: ['Lata Mangeshkar', 'Asha Bhosle (higher register)', 'Alka Yagnik'],
    },
    {
      genre: 'Pop (Power)',
      match: 88,
      reason: 'Power pop and anthemic songs showcase soprano voices brilliantly — your high notes can be your signature.',
      artists: ['Mariah Carey', 'Whitney Houston', 'Christina Aguilera'],
    },
    {
      genre: 'Electronic / Ambient',
      match: 82,
      reason: 'Clear, high soprano voices create magical textures in electronic and ambient music.',
      artists: ['Enya', 'Florence Welch', 'Björk'],
    },
  ],
  speaking: [
    {
      genre: 'Radio / Podcasting',
      match: 97,
      reason: 'Your voice has natural broadcast quality. Listeners will stay tuned just to hear you speak.',
      artists: ['Ameen Sayani', 'RJ Malishka', 'Howard Stern'],
    },
    {
      genre: 'Voice Acting / Dubbing',
      match: 94,
      reason: 'Your distinctive voice quality makes characters come alive. Animation studios and dubbing houses look for voices exactly like yours.',
      artists: ['Morgan Freeman', 'James Earl Jones', 'Aamir Khan'],
    },
    {
      genre: 'Audiobooks / Narration',
      match: 90,
      reason: 'A compelling speaking voice is everything in audiobooks. Listeners will get lost in whatever story you tell.',
      artists: ['Jim Dale', 'Stephen Fry', 'Amitabh Bachchan'],
    },
    {
      genre: 'Motivational Speaking',
      match: 87,
      reason: 'Your vocal authority naturally inspires confidence and trust in audiences.',
      artists: ['Tony Robbins', 'Les Brown', 'Priya Kumar'],
    },
  ],
};

// Scale classifications
export const MUSICAL_SCALES = {
  MAJOR: { name: 'Major Scale tendency', description: 'Bright, happy, uplifting', suited: ['Pop', 'Country', 'Gospel'] },
  MINOR: { name: 'Minor Scale tendency', description: 'Emotional, melancholic, expressive', suited: ['Blues', 'Rock', 'Soul'] },
  PENTATONIC: { name: 'Pentatonic', description: 'Versatile, natural, folk-like', suited: ['Folk', 'Blues', 'World'] },
  CHROMATIC: { name: 'Wide chromatic range', description: 'Classically trained, highly versatile', suited: ['Classical', 'Jazz', 'Opera'] },
};

// Timbre descriptors
export const TIMBRE_TYPES = {
  WARM: { name: 'Warm', description: 'Round, full-bodied tone', icon: '🌞' },
  BRIGHT: { name: 'Bright', description: 'Clear, forward-projecting tone', icon: '✨' },
  DARK: { name: 'Dark', description: 'Deep, shadowy, mysterious tone', icon: '🌙' },
  BREATHY: { name: 'Breathy', description: 'Airy, intimate, close-mic quality', icon: '🌬️' },
  RESONANT: { name: 'Resonant', description: 'Rich overtones, fills any space', icon: '🔔' },
  NASAL: { name: 'Nasal / Twangy', description: 'Distinctive, piercing, memorable', icon: '🎯' },
};
