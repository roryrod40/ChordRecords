"use client"
import { useState } from "react"
import RecordGallery from "../components/RecordGallery"
import CONSTANTS from "../../lib/mockData"
import { Song } from "@/lib/types";

export default function Gallery() {
  const [currentRecord, setCurrentRecord] = useState<Song>();

  return (
    <div className="flex flex-col items-center p-10">
      <RecordGallery records={CONSTANTS.records} onSelectRecord={setCurrentRecord} />
      {currentRecord && (
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold">{currentRecord.title}</h2>
          <p className="text-lg">{currentRecord.artist}</p>
          <img src={currentRecord.cover} alt={currentRecord.title} className="w-64 h-64 rounded-full mt-4 shadow-lg" />
        </div>
      )}
    </div>
  );
}
