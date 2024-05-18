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
  title: "Libraries & Boilerplates",
  horizandalSubSlides: [
    {
      title: "CRXJS",
      content:
        "CRXJS Vite Plugin is a tool that helps you make Chrome Extensions using modern web development technology.",
      link:
        "https://crxjs.dev/vite-plugin",
    },
    {
      title: "vite-web-extension",
      content: "Chrome Extension Boilerplate with React + Vite + TypeScript + TailwindCSS",
      link: "https://github.com/JohnBra/vite-web-extension",
    },
    {
      title: "chrome-extension-boilerplate-react",
      content: "1K Forks | 3.2K Stars ",
      link: "https://github.com/lxieyang/chrome-extension-boilerplate-react",
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
              className="cardPrimary w-1/3"
            >
              <h3 className="text-3xl font-semibold mb-8">{slide.title}</h3>
              <p className="flex items-start mb-8 space-x-4 text-2xl ">
                {slide.content}
              </p>
              <a href={slide.link} target="_blank" rel="noreferrer">
                <p className="text-sm py-2 px-1 inline-block">
                  <span className=" p-1 color-white rounded text-pink-600">
                    {" "}
                    {slide.link}
                  </span>
                </p>
                </a>
            </motion.div>
          ))}
        </motion.div>
      </SlideWrapper>
    </div>
  );
}

export default Libraries;
