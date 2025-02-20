from fastapi import APIRouter, HTTPException
from database import songs_table
from models import Song
import uuid
import requests
import os

router = APIRouter()

# GET all songs
@router.get("/songs", response_model=list[Song])
async def get_songs():
    response = songs_table.scan()
    return response.get("Items", [])

# POST a new song
@router.post("/songs")
async def add_song(song: Song):
    # Check if the song already exists in the database
    existing_song = songs_table.get_item(Key={"song_id": song.song_id})
    if "Item" in existing_song:
        raise HTTPException(status_code=400, detail="Song already exists in the database.")
    # If not found, insert the new song
    songs_table.put_item(Item=song.dict())
    return {"message": "Song added!", "song_id": song.song_id}

# DELETE a song
@router.delete("/songs/{song_id}")
async def delete_song(song_id: str):
    response = songs_table.delete_item(Key={"song_id": song_id})
    if response.get("ResponseMetadata", {}).get("HTTPStatusCode") != 200:
        raise HTTPException(status_code=404, detail="Song not found")
    return {"message": "Song deleted"}



# Spotify API credentials
SPOTIFY_API_URL = "https://api.spotify.com/v1/search"
SPOTIFY_ACCESS_TOKEN = os.getenv("SPOTIFY_ACCESS_TOKEN")
 
# Endpoint to search for a song on Spotify
@router.get("/spotify/search")
async def search_spotify(query: str):
    headers = {
        "Authorization": f"Bearer {SPOTIFY_ACCESS_TOKEN}"
    }
    params = {
        "q": query,
        "type": "track",  # Type can be track, album, or artist
        "limit": 5,       # Limit the number of results
    }
    
    try:
        response = requests.get(SPOTIFY_API_URL, headers=headers, params=params)
        response.raise_for_status()  # Will raise an exception for 4xx/5xx responses
        data = response.json()

        # Extract relevant data from Spotify's API response
        tracks = [
            {
                "id": track["id"],
                "name": track["name"],
                "artist": track["artists"][0]["name"],
                "album_cover_url": track["album"]["images"][0]["url"],
            }
            for track in data["tracks"]["items"]
        ]
        return {"results": tracks}

    except requests.exceptions.RequestException as err:
        raise HTTPException(status_code=500, detail=f"Spotify API error: {err}")