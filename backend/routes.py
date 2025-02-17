from fastapi import APIRouter, HTTPException
from database import songs_table
from models import Song
import uuid

router = APIRouter()

# GET all songs
@router.get("/songs", response_model=list[Song])
async def get_songs():
    response = songs_table.scan()
    return response.get("Items", [])

# POST a new song
@router.post("/songs")
async def add_song(song: Song):
    song.song_id = str(uuid.uuid4())  # Generate a unique song ID
    songs_table.put_item(Item=song.dict())
    return {"message": "Song added!", "song_id": song.song_id}

# DELETE a song
@router.delete("/songs/{song_id}")
async def delete_song(song_id: str):
    response = songs_table.delete_item(Key={"song_id": song_id})
    if response.get("ResponseMetadata", {}).get("HTTPStatusCode") != 200:
        raise HTTPException(status_code=404, detail="Song not found")
    return {"message": "Song deleted"}
