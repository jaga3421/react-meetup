"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function VoiceCelebration() {
  useEffect(() => {
    const handleCelebrate = () => {
      const defaults = {
        spread: 110,
        ticks: 360,
        gravity: 0.65,
        decay: 0.93,
        scalar: 1.2,
        drift: 0.15,
      };

      const bursts = [
        {
          particleCount: 220,
          startVelocity: 42,
          origin: { x: 0.5, y: 0.72 },
        },
        {
          particleCount: 140,
          startVelocity: 34,
          angle: 60,
          origin: { x: 0.1, y: 0.75 },
        },
        {
          particleCount: 140,
          startVelocity: 34,
          angle: 120,
          origin: { x: 0.9, y: 0.75 },
        },
        {
          particleCount: 160,
          startVelocity: 28,
          origin: { x: 0.5, y: 0.68 },
        },
      ];

      bursts.forEach((burst, index) => {
        window.setTimeout(() => {
          confetti({
            ...defaults,
            ...burst,
          });
        }, index * 180);
      });
    };

    window.addEventListener("voice-interface:celebrate", handleCelebrate);
    return () =>
      window.removeEventListener("voice-interface:celebrate", handleCelebrate);
  }, []);

  return null;
}
