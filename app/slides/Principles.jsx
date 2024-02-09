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
  title: "Key Principles of Accessibility - P.O.U.R",
  horizandalSubSlides: [
    {
      title: "Perceivable",
      content:
        "Information must be presentable in ways that all users can perceive.",
      example:
        "Alt text for images for screen readers, Close Captions, Adjustable Text, Contrats",
    },
    {
      title: "Operable",
      content: "UI components and navigation must be operable by all users.",
      example: "Keyboard navigation, Skip to main content, Focus order",
    },
    {
      title: "Comprehensible",
      content: " Information and UI operation must be understandable. ",
      example: "Consistent navigation, Error handling, Clear instructions",
    },
    {
      title: "Robust",
      content:
        "Content must be robust enough to be interpreted reliably by a wide variety of user agents.",
      example: "Semantic HTML, ARIA roles, Valid HTML",
    },
  ],
};

function Principles() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <SlideWrapper className="text-center md:items-start" id="principles">
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

export default Principles;
