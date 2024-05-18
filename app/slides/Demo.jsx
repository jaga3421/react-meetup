"use client";
import React from "react";
import SlideWrapper from "../components/SlideWrapper";
import MotionH1 from "../components/MotionH1";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const data = {
  title: "Demo Time",
  horizandalSubSlides: [
   
  ],
};

function Demo() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <SlideWrapper className="text-center md:items-start" id="Demo">
        <MotionH1 className="text-center" inView={inView}>
          {data.title}
        </MotionH1>

      </SlideWrapper>
    </div>
  );
}

export default Demo;
