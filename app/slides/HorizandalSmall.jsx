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
import Image from "next/image";

function HorizandalSmall({ data }) {
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
              {slide.image && (
                <Image src={slide.image} width={100} height={100} className="mb-4"/>
              )}
              <p className="flex items-start mb-8 space-x-4 text-2xl ">
                {slide.content}
              </p>
              {slide.example?.split(",").map((item, index) => (
                <p key={index} className="text-sm py-2 px-1 inline-block break-words">
                  <span className=" p-1 color-white rounded bg-pink-600">
                    {" "}
                    {item}
                  </span>
                </p>
              ))}
              {slide.link && (
                <p className="text-sm text-pink-600  break-words">
                  <a href={slide.link} target="_blank" rel="noopener noreferrer">
                    {slide.link}
                  </a>
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </SlideWrapper>
    </div>
  );
}

export default HorizandalSmall;
