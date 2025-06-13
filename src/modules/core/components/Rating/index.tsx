"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  /**
   * The maximum rating value
   * @default 5
   */
  maxRating?: number;
  /**
   * The current rating value
   * @default 0
   */
  value?: number;
  /**
   * Whether the rating is read-only
   * @default false
   */
  readOnly?: boolean;
  /**
   * The size of the stars
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * The color of the filled stars
   * @default "gold"
   */
  color?: "gold" | "primary" | "red";
  /**
   * Callback when the rating changes
   */
  onChange?: (value: number) => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function Rating({
  maxRating = 5,
  value = 0,
  readOnly = false,
  size = "md",
  color = "gold",
  onChange,
  className,
}: RatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [activeRating, setActiveRating] = useState<number>(value);

  const handleMouseEnter = (rating: number) => {
    if (readOnly) return;
    setHoveredRating(rating);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoveredRating(null);
  };

  const handleClick = (rating: number) => {
    if (readOnly) return;
    setActiveRating(rating);
    onChange?.(rating);
  };

  const displayRating = hoveredRating !== null ? hoveredRating : activeRating;

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const colorClasses = {
    gold: "fill-yellow-400 text-yellow-400",
    primary: "fill-primary text-primary",
    red: "fill-red-500 text-red-500",
  };

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="radiogroup"
      aria-label="Rating"
    >
      {Array.from({ length: maxRating }).map((_, index) => {
        const rating = index + 1;
        const isFilled = rating <= displayRating;

        return (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              "cursor-pointer transition-all",
              isFilled
                ? colorClasses[color]
                : "fill-muted stroke-muted-foreground",
              readOnly && "cursor-default"
            )}
            onMouseEnter={() => handleMouseEnter(rating)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(rating)}
            role="radio"
            aria-checked={isFilled}
            aria-label={`${rating} star${rating === 1 ? "" : "s"}`}
            data-rating={rating}
          />
        );
      })}
    </div>
  );
}
