export type Song = {
    song_id: number, 
    title: string,
    artist: string, 
    chords: ChordProgression[],
    strumming_patterns: StrummingPattern[],
    notes: string,
    album_cover_url: string
}

export type ChordProgression = {
    name: string;
    chords: string[];
  };
  
export type StrummingPattern = {
    name: string;
    pattern: string;
  };