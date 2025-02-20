import { Song } from "../../lib/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useEffect } from "react";

type Props = {
  records?: Song[];
  onSelectRecord: (record: Song) => void;
};

const RecordGallery = ({ records, onSelectRecord }: Props) => {
  const [api, setApi] = useState<any>();
  const [hoveredRecord, setHoveredRecord] = useState<Song | null>(null);
  const [current, setCurrent] = useState(0);

  // Similar to your InfiniteCarousel to manage state changes
  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Autoplay setup to scroll the carousel every 5 seconds
    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => {
      clearInterval(autoplayInterval);
    };
  }, [api]);

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true, // Makes the carousel infinitely scrollable
      }}
      className="w-full"
      setApi={setApi}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {records? records.map((record, index) => (
          <CarouselItem key={record.song_id} className="basis-1/4 pl-6">
            <div
              className="w-[250px] h-[250px] bg-sky-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer relative group"
              onClick={() => onSelectRecord(record)}
              onMouseEnter={() => setHoveredRecord(record)}
              onMouseLeave={() => setHoveredRecord(null)}
            >
              <img
                src={record.album_cover_url}
                alt={record.title}
                className={`w-full h-full object-cover transition duration-300 ease-in-out ${
                  hoveredRecord === record ? "blur-sm" : ""
                }`}
              />
              {hoveredRecord === record && (
                <div className="absolute inset-0 flex items-center flex-col justify-center bg-black bg-opacity-50">
                  <span className="text-orange-400 text-lg font-semibold">{record.title}</span>
                  <span className="text-orange-400 text-lg font-semibold">{record.artist}</span>
                </div>
              )}
            </div>
          </CarouselItem>
        )) : <div>Loading ...</div>}
      </CarouselContent>
      <CarouselPrevious className="scale-150 bg-sky-950 font-bold text-orange-400 border-none hover:bg-orange-400 hover:text-sky-950 transition-all duration-300"/>
      <CarouselNext className="scale-150 bg-sky-950 font-bold text-orange-400 border-none hover:bg-orange-400 hover:text-sky-950 transition-all duration-300"/>
    </Carousel>
  );
};

export default RecordGallery;
