"use client";

import { useEffect, useState, useRef } from "react";

import { Clock } from "lucide-react";
import { Progress } from "../../ui/progress";

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
  reset: number;
}

export default function Timer({
  duration,
  onTimeUp,
  isActive,
  reset,
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timeUpCalled = useRef(false);

  // Reset timer when reset prop changes or duration changes
  useEffect(() => {
    setTimeLeft(duration);
    timeUpCalled.current = false;
  }, [duration, reset]);

  // Handle the countdown timer
  useEffect(() => {
    // Don't start the timer if it's not active
    if (!isActive) return;

    // Clear the previous timeUpCalled flag when timer becomes active
    timeUpCalled.current = false;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        // If we're at 1 second left, clear the interval and call onTimeUp
        if (prev <= 1) {
          clearInterval(timer);

          // Use the ref to ensure we only call onTimeUp once
          if (!timeUpCalled.current) {
            timeUpCalled.current = true;
            // Use setTimeout to ensure this doesn't happen during rendering
            setTimeout(() => {
              onTimeUp();
            }, 0);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clean up the interval when the component unmounts or dependencies change
    return () => {
      clearInterval(timer);
    };
  }, [isActive, onTimeUp, reset]);

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-orange-500" />
          <span className="text-sm font-medium text-gray-700">
            Time Remaining
          </span>
        </div>
        <span
          className={`text-sm font-bold ${
            timeLeft <= 3 ? "text-red-500" : "text-gray-700"
          }`}
        >
          {timeLeft} seconds
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
