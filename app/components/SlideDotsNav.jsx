"use client";

import { useEffect, useState } from "react";

const getDeckRoot = () => document.getElementById("deck-root");

const getSlides = () =>
  Array.from(document.querySelectorAll("[data-slide-root='true']"));

export default function SlideDotsNav({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const deck = getDeckRoot();
    if (!deck) return undefined;

    const updateActiveIndex = () => {
      const slides = getSlides();
      if (slides.length === 0) return;

      const scrollTop = deck.scrollTop;
      let nextActiveIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.offsetTop - scrollTop);
        if (distance < closestDistance) {
          closestDistance = distance;
          nextActiveIndex = index;
        }
      });

      setActiveIndex(nextActiveIndex);
    };

    updateActiveIndex();
    deck.addEventListener("scroll", updateActiveIndex, { passive: true });

    return () => {
      deck.removeEventListener("scroll", updateActiveIndex);
    };
  }, []);

  const scrollToIndex = (index) => {
    const deck = getDeckRoot();
    const slides = getSlides();
    const targetSlide = slides[index];

    if (!deck || !targetSlide) return;

    deck.scrollTo({
      top: targetSlide.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed right-4 top-1/2 z-[9990] -translate-y-1/2">
      <div className="flex flex-col items-center gap-3">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={item.label}
              className="relative flex items-center justify-end"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {isHovered && (
                <div className="absolute right-4 whitespace-nowrap rounded-md border border-white/10 bg-black/75 px-3 py-1 text-xs text-gray-200 shadow-lg backdrop-blur-sm">
                  {item.label}
                </div>
              )}

              <button
                type="button"
                aria-label={`Go to ${item.label}`}
                onClick={() => scrollToIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  isActive
                    ? "bg-pink-500 opacity-30 scale-125 border border-pink-500"
                    : "bg-transparent border border-pink-500 opacity-30 hover:opacity-80"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
