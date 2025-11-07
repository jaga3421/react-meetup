"use client";
import React from "react";
import Link from "next/link";
import SlideWrapper from "../components/SlideWrapper";
import MotionH1 from "../components/MotionH1";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function DemoLink({ data }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <SlideWrapper className="text-center" id={data.id}>
        <MotionH1 className="text-center" inView={inView}>
          {data.title}
        </MotionH1>

        <div className="info flex flex-col items-center justify-center px-4 mt-8">
          <motion.div
            className="flex flex-col items-center justify-center"
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {data.copy && data.link && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-light text-center max-w-2xl text-blue-400 hover:text-blue-300 underline transition-colors"
                >
                  {data.copy}
                </Link>
              </motion.div>
            )}
            {data.copy && !data.link && (
              <p className="text-2xl font-light text-center max-w-2xl">
                {data.copy}
              </p>
            )}
          </motion.div>
        </div>
      </SlideWrapper>
    </div>
  );
}

export default DemoLink;

