'use client'
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [msg, setMsg]= useState("");

  const handleClick = async () => {
    const url = "http://localhost:8080/"
    fetch(url)
    .then(res => res.json())
    .then(data => { 
      setMsg(data.message)
    })
  }

  return (
    <div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full transition-colors flex items-center justify-center bg-foreground text-background gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={handleClick}
          >
            Test API
          </button>
          <h2>{msg}</h2>
        </div>
    </div>
  );
}
