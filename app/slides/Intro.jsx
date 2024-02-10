"use client";
import React from "react";
import Image from "next/image";
import SlideWrapper from "../components/SlideWrapper";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import MotionH1 from "../components/MotionH1";

const data = {
  title: "Building Accessible React Apps",
  author: "Jagadeesh Jayachandran | React Bangalore",
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
  ],
};

function Intro() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  return (
    <div ref={ref}>
      <SlideWrapper className="text-center" id="intro">
        <MotionH1 inView={inView}>{data.title}</MotionH1>
        <h3 className="text-2xl  mb-8 tracking-widest  font-thin uppercase">
          {/* {data.author} */}
          <TypeAnimation
            sequence={[
              "Jagadeesh",
              1000,
              "J JAY",
              2000,
              "ReactJS Bangalore",
              4000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
          />
        </h3>
        <div className="flex items-center mt-2">
          <div className="flex flex-col space-y-4 items-center">
            <Image
              src="/images/me.png"
              alt="jj"
              width={83 * 3.5}
              height={113 * 3.5}
              className="rounded-lg"
            />

            <div className="info flex flex-col items-center ">
              <div className="flex  space-x-16 mt-2">
                {data.social.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    className="flex flex-row items-center space-x-2 p-1"
                  >
                    {item.icon}
                    <span>{item.content}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SlideWrapper>
    </div>
  );
}

export default Intro;
