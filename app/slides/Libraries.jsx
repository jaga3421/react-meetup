"use client";
import React from "react";
import SlideWrapper from "../components/SlideWrapper";
import MotionH1 from "../components/MotionH1";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  VariantStaggerParent,
  VariantStaggerChildShow,
} from "../framerVariants";

const data = {
  title: "React Accessibility Libraries",
  horizandalSubSlides: [
    {
      title: "React-axe",
      content:
        "Automatically detects accessibility issues in React applications during development in real-time.",
      example: "Missing alt text, inadequate contrast ratios",
    },
    {
      title: "Eslint-plugin-jsx-a11y",
      content: "Enforces accessibility best practices in JSX code.",
      example: "Focusable interactive elements, appropriate event handlers",
    },
    {
      title: "React A11y",
      content: "Provides warnings for components that are not accessible.",
      example: "Missing keyboard event handlers, custom button issues",
    },
    {
      title: "A11y-kit",
      content: "A collection of hooks and utilities to improve accessibility.",
      example: "Focus management, screen reader announcements",
    },
  ],
};

function Libraries() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <SlideWrapper className="text-center md:items-start" id="libraries">
        <MotionH1 className="text-center" inView={inView}>
          {data.title}
        </MotionH1>

        {/* Horizandal slides */}
        <motion.div
          className="flex space-x-4 w-full mx-auto"
          variants={VariantStaggerParent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {data.horizandalSubSlides.map((slide, index) => (
            <motion.div
              variants={VariantStaggerChildShow}
              key={index}
              className="cardPrimary w-1/4"
            >
              <h3 className="text-3xl font-semibold mb-8">{slide.title}</h3>
              <p className="flex items-start mb-8 space-x-4 text-2xl ">
                {slide.content}
              </p>
              {slide.example?.split(",").map((item, index) => (
                <p key={index} className="text-sm py-2 px-1 inline-block">
                  <span className=" p-1 color-white rounded bg-pink-600">
                    {" "}
                    {item}
                  </span>
                </p>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </SlideWrapper>
    </div>
  );
}

export default Libraries;
