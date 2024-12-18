"use client";
import React from "react";
import SlideWrapper from "../components/SlideWrapper";
import { CiCircleChevRight } from "react-icons/ci";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  VariantStaggerChildRight,
  VariantStaggerParent,
} from "../framerVariants";
import MotionH1 from "../components/MotionH1";

function SingleList({ data }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <SlideWrapper className="text-center md:items-start" id={data.id}>
        <MotionH1 className="text-left" inView={inView}>
          {data.title}
        </MotionH1>

        <div className="info flex flex-col items-center px-4">
          <motion.div
            className="flex flex-col space-y-4 mt-2 text-3xl"
            variants={VariantStaggerParent}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {data.subtitles.map((handle, index) => (
              <motion.li
                key={index}
                className="flex flex-row items-center space-x-6"
                variants={VariantStaggerChildRight}
              >
                <CiCircleChevRight />
                <motion.span>{handle}</motion.span>
              </motion.li>
            ))}
          </motion.div>
        </div>
      </SlideWrapper>
    </div>
  );
}

export default SingleList;
