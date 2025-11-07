"use client";
import React from "react";
import Image from "next/image";
import { CodeBlock, dracula } from "react-code-blocks";
import SlideWrapper from "../components/SlideWrapper";
import MotionH1 from "../components/MotionH1";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  VariantStaggerParent,
  VariantStaggerChildRight,
} from "../framerVariants";


function HorizandalSubSlides({ data }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <SlideWrapper className="text-center md:items-start" id="why">
        <MotionH1 className="text-center" inView={inView}>
          {data?.title}
        </MotionH1>

        {/* Horizandal slides */}
        <motion.div
          className="flex space-x-4 overflow-x-scroll snap-x snap-mandatory w-[95%] mx-auto"
          variants={VariantStaggerParent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {data.horizandalSubSlides?.map((slide, index) => (
            <motion.div
              variants={VariantStaggerChildRight}
              key={index}
              className="w-[95%] flex-shrink-0  snap-center font-light text-left"
            >
              <div className={`cardPrimary ${data.center ? "mx-auto" : ""} flex flex-row gap-4 h-full min-h-[500px]`}>
                <div className={slide.image || slide.code ? "w-[60%] h-full overflow-auto" : "w-full"}>
                  {slide?.title && <h3 className="text-5xl mb-16">{slide?.title}</h3>}

                  {slide.list?.map((content, index) => (
                    <li
                      key={index}
                      className="flex items-start mb-8 space-x-4 text-3xl "
                    >
                      <p className="font-thin">
                        <span className="font-bold">{content.title}</span>{" "}
                        {content.content}
                        {content.images && content.images.map((image, index) => (
                          <img src={image} className="mt-3" alt={content.title} key={index} />
                        ))}
                      </p>
                    </li>
                  ))}
                </div>
                {slide.image && (
                  <div className="w-[40%] flex-shrink-0 flex items-center justify-center relative">
                    <Image 
                      src={slide.image} 
                      alt={slide.title || "Slide image"} 
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                )}
                {slide.code && (
                  <div className="w-[40%] flex-shrink-0 flex items-start justify-start relative h-full">
                    <div className="w-full h-full overflow-auto">
                      <CodeBlock
                        text={slide.code}
                        language={slide.language || "javascript"}
                        theme={dracula}
                        showLineNumbers={true}
                        wrapLines={true}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </SlideWrapper>
    </div>
  );
}

export default HorizandalSubSlides;
