"use client";
import { useRouter } from "next/navigation"; 
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { post } from "@/utils/api"; 
import { useSpotifySearch } from "@/hooks/useSpotifySearch"; 

type ChordProgression = {
  name: string;
  chords: string[];
};

type StrummingPattern = {
  name: string;
  pattern: string;
};

const SongForm: React.FC = () => {
  const router = useRouter();
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [chordProgressions, setChordProgressions] = useState<ChordProgression[]>([]);
  const [strummingPatterns, setStrummingPatterns] = useState<StrummingPattern[]>([]);
  const [albumCoverUrl, setAlbumCoverUrl] = useState("");
  const [spotifyId, setSpotifyId] = useState("");

  const { searchResults, searchSpotify } = useSpotifySearch(songTitle, artist);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newSong = {
      song_id: spotifyId,
      title: songTitle,
      artist,
      chords: chordProgressions,
      strumming_patterns: strummingPatterns,
      notes: "",
      album_cover_url: albumCoverUrl,
    };

    try {
      await post("/songs", newSong);
      alert("Song added successfully!");
      router.push("/gallery");
    } catch (err) {
      console.error("Error saving song:", err);
      alert("Error saving song.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Add a New Song</h2>

        <Label htmlFor="spotify-search">Search Spotify</Label>
        <Input
          id="spotify-search"
          type="text"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)} // Updating the songTitle
          placeholder="Search Spotify for song"
        />

        <div className="mt-2">
          {searchResults.length > 0 && (
            <div className="space-y-2">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => {
                    setSongTitle(result.name);
                    setArtist(result.artist);
                    setAlbumCoverUrl(result.album_cover_url);
                    setSpotifyId(result.id);
                  }}
                  className="cursor-pointer p-2 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  <h3 className="font-semibold">{result.name} - {result.artist}</h3>
                  <img src={result.album_cover_url} alt={result.name} className="w-20 h-20" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Song Title and Artist now auto-populate from search result */}
        <Label htmlFor="song-title">Song Title</Label>
        <Input
          id="song-title"
          type="text"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          placeholder="Enter song title"
          disabled
        />

        <Label htmlFor="artist">Artist</Label>
        <Input
          id="artist"
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Enter artist name"
          disabled
        />

        <Label htmlFor="chords">Chord Progressions</Label>
        <Textarea
          id="chords"
          placeholder="Enter chord progressions"
          onChange={(e) =>
            setChordProgressions([{ name: "Progression 1", chords: e.target.value.split(",") }])
          }
        />

        <Label htmlFor="strumming-pattern">Strumming Patterns</Label>
        <Textarea
          id="strumming-pattern"
          placeholder="Enter strumming patterns"
          onChange={(e) => setStrummingPatterns([{ name: "Pattern 1", pattern: e.target.value }])}
        />

        <Button type="submit" className="mt-4 w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SongForm;
