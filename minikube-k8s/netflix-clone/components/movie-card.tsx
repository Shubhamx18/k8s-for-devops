"use client";

import { useState } from "react";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  title: string;
  imageUrl: string;
  year?: string;
  rating?: string;
  duration?: string;
  match?: number;
  genres?: string[];
}

export function MovieCard({
  title,
  imageUrl,
  year,
  rating,
  duration,
  match,
  genres,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 w-[160px] md:w-[200px] lg:w-[240px] group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Card */}
      <div className="relative aspect-video rounded overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Expanded Card on Hover */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-[280px] md:w-[320px] bg-card rounded-md shadow-xl overflow-hidden transition-all duration-200 z-50",
          isHovered
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible pointer-events-none"
        )}
      >
        {/* Preview Image */}
        <div className="relative aspect-video">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-3">
            <h3 className="text-sm font-semibold text-foreground drop-shadow-lg">
              {title}
            </h3>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-3 space-y-3">
          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center hover:bg-foreground/90 transition-colors">
                <Play className="h-4 w-4 fill-background text-background" />
              </button>
              <button className="w-8 h-8 rounded-full border-2 border-muted-foreground flex items-center justify-center hover:border-foreground transition-colors">
                <Plus className="h-4 w-4 text-foreground" />
              </button>
              <button className="w-8 h-8 rounded-full border-2 border-muted-foreground flex items-center justify-center hover:border-foreground transition-colors">
                <ThumbsUp className="h-4 w-4 text-foreground" />
              </button>
            </div>
            <button className="w-8 h-8 rounded-full border-2 border-muted-foreground flex items-center justify-center hover:border-foreground transition-colors">
              <ChevronDown className="h-4 w-4 text-foreground" />
            </button>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs">
            {match && (
              <span className="text-green-500 font-semibold">{match}% Match</span>
            )}
            {rating && (
              <span className="px-1 border border-muted-foreground text-muted-foreground">
                {rating}
              </span>
            )}
            {duration && <span className="text-muted-foreground">{duration}</span>}
          </div>

          {/* Genres */}
          {genres && genres.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {genres.map((genre, index) => (
                <span key={genre} className="flex items-center">
                  {genre}
                  {index < genres.length - 1 && (
                    <span className="mx-1 w-1 h-1 rounded-full bg-muted-foreground" />
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
