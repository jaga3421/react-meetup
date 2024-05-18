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
  title: "Why React for Chrome Extensions?",
  horizandalSubSlides:[
    {
      "title": "Because We are React Developers (and Lazy)",
      "list": [
        {
          "title": "Component-Based Architecture:",
          "content": "Build encapsulated components for complex UIs. Like LEGO blocks for your extension!"
        },
        {
          "title": "Reusable Components:",
          "content": "Reuse components to reduce redundancy and speed up development. Set it and forget it!"
        },
        {
          "title": "Efficient Updates:",
          "content": "React’s Virtual DOM updates only what changes. DOM manipulation on steroids!"
        }
      ]
    },
    {
      "title": "Developer Experience",
      "list": [
        {
          "title": "JSX Syntax:",
          "content": "Write HTML within JavaScript. A match made in heaven!"
        },
        {
          "title": "Rich Ecosystem:",
          "content": "Tools and libraries for every need. The ultimate developer toolkit!"
        },
        {
          "title": "Hot Reloading:",
          "content": "See changes instantly without losing state. Live preview while you code!"
        }
      ]
    },
    {
      "title": "Community and Support",
      "list": [
        {
          "title": "Large Community:",
          "content": "Massive community with plenty of resources. Stack Overflow answers for every question!"
        },
        {
          "title": "Continuous Improvement:",
          "content": "Backed by Facebook, constantly evolving. Getting better like fine wine!"
        },
        {
          "title": "Extensive Documentation:",
          "content": "Thorough and well-maintained docs. Your ultimate JavaScript roadmap!"
        }
      ]
    }
  ]
  
  
};

function WhyReact() {
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

export default WhyReact;
