"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard } from "@/components/movie-card";
import { cn } from "@/lib/utils";

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  year?: string;
  rating?: string;
  duration?: string;
  match?: number;
  genres?: string[];
}

interface ContentRowProps {
  title: string;
  movies: Movie[];
}

export function ContentRow({ title, movies }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.8;
      const newScrollLeft =
        direction === "left"
          ? rowRef.current.scrollLeft - scrollAmount
          : rowRef.current.scrollLeft + scrollAmount;

      rowRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="relative group py-4">
      <h2 className="text-lg md:text-xl font-semibold text-foreground px-4 md:px-12 mb-2">
        {title}
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className={cn(
            "absolute left-0 top-0 bottom-0 z-40 w-12 md:w-16 bg-background/50 hover:bg-background/80 flex items-center justify-center transition-opacity",
            showLeftArrow
              ? "opacity-0 group-hover:opacity-100"
              : "opacity-0 pointer-events-none"
          )}
        >
          <ChevronLeft className="h-8 w-8 text-foreground" />
        </button>

        {/* Content */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-4 md:px-12 py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              imageUrl={movie.imageUrl}
              year={movie.year}
              rating={movie.rating}
              duration={movie.duration}
              match={movie.match}
              genres={movie.genres}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className={cn(
            "absolute right-0 top-0 bottom-0 z-40 w-12 md:w-16 bg-background/50 hover:bg-background/80 flex items-center justify-center transition-opacity",
            showRightArrow
              ? "opacity-0 group-hover:opacity-100"
              : "opacity-0 pointer-events-none"
          )}
        >
          <ChevronRight className="h-8 w-8 text-foreground" />
        </button>
      </div>
    </div>
  );
}
