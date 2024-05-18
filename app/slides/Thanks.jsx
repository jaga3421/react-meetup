"use client";
import React from "react";
import SlideWrapper from "../components/SlideWrapper";
import MotionH1 from "../components/MotionH1";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";

import {
  VariantStaggerParent,
  VariantStaggerChildShow,
} from "../framerVariants";
import Image from "next/image";

const data = {
  title: "Thanks & QA ?",
  social: [
    {
      icon: <FaLinkedin />,
      content: "/in/jjayy",
      url: "https://www.linkedin.com/in/jjayy",
    },
    {
      icon: <FaGithub />,
      content: "/jaga3421",
      url: "https://www.github.com/jaga3421",
    },
    {
      icon: <FaLink />,
      content: "ja.gadee.sh",
      url: "https://ja.gadee.sh",
    },
    {
      icon: <IoMailSharp />,
      content: "j@gadee.sh",
      url: "mailto:j@gadee.sh",
    },
  ],
};

function Thanks() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <SlideWrapper className="text-center md:items-start" id="thanks">
        <MotionH1 className="text-center" inView={inView}>
          {data.title}
        </MotionH1>

        {/* Horizandal slides */}
        <motion.div
          className="flex space-x-4  mx-auto items-center justify-center my-4 bg-slate-100 p-4"
          variants={VariantStaggerParent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}

        >
          <Image src="/images/jaga3421.png" width={300} height={300} />
        </motion.div>
        <motion.div
          className="flex space-x-4 w-full mx-auto"
          variants={VariantStaggerParent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div
            variants={VariantStaggerChildShow}
            className="max-w-2xl mx-auto mt-2 flex flex-col space-y-2"
          >
            {data.social.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                className="flex flex-row items-center p-1 space-x-2 text-center"
              >
                {item.icon}
                <span>{item.content}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>
     
      </SlideWrapper>
    </div>
  );
}

export default Thanks;
