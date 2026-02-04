"use client";

import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroBannerProps {
  title: string;
  description: string;
  imageUrl: string;
  year?: string;
  rating?: string;
  duration?: string;
}

export function HeroBanner({
  title,
  description,
  imageUrl,
  year,
  rating,
  duration,
}: HeroBannerProps) {
  return (
    <div className="relative w-full h-[56vw] min-h-[400px] max-h-[85vh]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-4 md:px-12 pb-[15%]">
        <div className="max-w-xl space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            {title}
          </h1>

          {/* Metadata */}
          {(year || rating || duration) && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              {year && <span>{year}</span>}
              {rating && (
                <span className="px-2 py-0.5 border border-muted-foreground/50 text-xs">
                  {rating}
                </span>
              )}
              {duration && <span>{duration}</span>}
            </div>
          )}

          <p className="text-sm md:text-base text-foreground/90 line-clamp-3 max-w-lg">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 font-semibold gap-2"
            >
              <Play className="h-5 w-5 fill-current" />
              Play
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-secondary/80 hover:bg-secondary font-semibold gap-2"
            >
              <Info className="h-5 w-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
