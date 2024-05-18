"use client";
import React from "react";
import SlideWrapper from "../components/SlideWrapper";
import MotionH1 from "../components/MotionH1";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  VariantStaggerParent,
  VariantStaggerChildRight,
} from "../framerVariants";

const data = {
  title: "Before We Start",
  horizandalSubSlides: [
    {
      title: "What is Accessibility?",
      list: [
        {
          title: "Definition:",
          content:
            "Accessibility refers to the design and creation of websites and web applications that are usable by people of all abilities and disabilities.",
        },
        {
          title: "Inclusive Approach:",
          content:
            "Accessibility ensures that the web is inclusive for everyone, including elderly users, users in rural areas, and those with temporary disabilities (like a broken arm).",
        },
        {
          title: "Ethical Responsibility:",
          content:
            "Accessibility is seen as an ethical obligation in the digital space, ensuring equal access to information and digital services.",
        },
      ],
    },
   
  ],
};

function BeforeWeStart() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <SlideWrapper className="text-center md:items-start" id="why">
        <MotionH1 className="text-center" inView={inView}>
          {data.title}
        </MotionH1>

        {/* Horizandal slides */}
        <motion.div
          className="flex space-x-4 overflow-x-scroll snap-x snap-mandatory w-[95%] mx-auto"
          variants={VariantStaggerParent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {data.horizandalSubSlides.map((slide, index) => (
            <motion.div
              variants={VariantStaggerChildRight}
              key={index}
              className="w-[95%] flex-shrink-0  snap-center font-light text-left flex flex-row"
            >
              <div className="cardPrimary">
                <h3 className="text-5xl mb-16">{slide.title}</h3>

                {slide.list?.map((content, index) => (
                  <li
                    key={index}
                    className="flex items-start mb-8 space-x-4 text-3xl "
                  >
                    <p className="font-thin">
                      <span className="font-bold">{content.title}</span>{" "}
                      {content.content}
                    </p>
                  </li>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </SlideWrapper>
    </div>
  );
}

export default BeforeWeStart;
