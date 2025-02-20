from pydantic import BaseModel
from typing import List, Optional

class ChordProgression(BaseModel):
    name: str
    chords: List[str]

class StrummingPattern(BaseModel):
    name: str
    pattern: str

class Song(BaseModel):
    song_id: str  # Primary key for DynamoDB
    title: str
    artist: str
    chords: List[ChordProgression]
    strumming_patterns: List[StrummingPattern]
    notes: Optional[str] = None
    album_cover_url: Optional[str] = None
