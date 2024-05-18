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

const data = {
  title: "For Example",
  horizandalSubSlides: [
    {
      "title": "Adblock Plus",
      "content": "Blocks ads on web pages, providing a cleaner and faster browsing experience.",
      "example": "webRequest API, storage API",
      "image": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Adblock_logo.png"
    },
    {
      "title": "LastPass",
      "content": "Manages and auto-fills passwords for websites, enhancing security and convenience.",
      "example": "storage API, identity API",
      "image": "https://cdn.icon-icons.com/icons2/2407/PNG/512/lastpass_icon_146153.png"
    },
    {
      "title": "Google Translate",
      "content": "Translates selected text on web pages to different languages.",
      "example": "Uses context menu for translation options, communicates with translation API. Type: Context Menu, API: contextMenus API, storage API",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/480px-Google_Translate_logo.svg.png"
    },
    {
      "title": "Grammarly",
      "content": "Provides grammar and spell-checking across various online platforms like email, social media, and documents.",
      "example": "storage API, contextMenus API",
      "image": "https://qph.cf2.quoracdn.net/main-qimg-1e030e9215902cd25a5d6389b4871125"
    }
  ]
  
};

function Examples() {
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
              <Image src={slide.image} width={100} height={100} className="mb-4"/>
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

export default Examples;
