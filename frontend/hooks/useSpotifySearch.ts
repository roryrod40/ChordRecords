import { useState, useEffect } from "react";
import { get } from "../utils/api"; // Assuming you have the API utility for making GET requests

export const useSpotifySearch = (songTitle: string, artist: string) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (!songTitle) return;

    const fetchSpotifyResults = async () => {
      try {
        const response : any = await get(`/spotify/search?query=${songTitle}`);
        setSearchResults(response.results);
      } catch (error) {
        console.error("Error fetching Spotify search results:", error);
      }
    };

    fetchSpotifyResults();
  }, [songTitle]);

  return { searchResults, searchSpotify: setSearchResults };
};
