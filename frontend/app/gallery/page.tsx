"use client"
import { useState, useEffect} from "react"
import RecordGallery from "../components/RecordGallery"
import { Song } from "@/lib/types";
import {get} from "@/utils/api"

export default function Gallery() {
  const [currentRecord, setCurrentRecord] = useState<Song>();
  const [allRecords, setAllRecords] = useState<Song[]>([]);

  useEffect(() => {
        const fetchSongs = async () => {
        try {
          const response : any = await get(`/songs`);
          setAllRecords(response);
        } catch (error) {
          console.error("Error fetching records:", error);
        }
      };
      fetchSongs();
    }, []);

  return (
    <div className="flex flex-col items-center p-10">
      <RecordGallery records={allRecords} onSelectRecord={setCurrentRecord} />
      {currentRecord && (
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold">{currentRecord.title}</h2>
          <p className="text-lg">{currentRecord.artist}</p>
          <img src={currentRecord.album_cover_url} alt={currentRecord.title} className="w-64 h-64 rounded-full mt-4 shadow-lg" />
        </div>
      )}
    </div>
  );
}
