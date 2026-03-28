"use client";

import React from "react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SlideWrapper from "../components/SlideWrapper";
import MotionH1 from "../components/MotionH1";

function LinkSlide({ data }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <SlideWrapper className="text-center" id={data.id}>
        <MotionH1 className="text-center" inView={inView}>
          {data.heading}
        </MotionH1>

        <motion.div
          className="mt-10 flex flex-col items-center gap-5 px-4"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {data.links?.map((item) => (
            <motion.div
              key={`${item.displayText}-${item.link}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <NextLink
                href={item.link}
                className="text-3xl font-light text-blue-400 underline transition-colors hover:text-blue-300"
              >
                {item.displayText}
              </NextLink>
            </motion.div>
          ))}
        </motion.div>
      </SlideWrapper>
    </div>
  );
}

export default LinkSlide;
