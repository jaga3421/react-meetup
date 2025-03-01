"use client";
import React from "react";
import Image from "next/image";
import SlideWrapper from "../components/SlideWrapper";
import { FaLinkedin, FaGithub, FaLink } from "react-icons/fa";
import { IoMailSharp } from 'react-icons/io5';
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import MotionH1 from "../components/MotionH1";

const iconMap = {
    FaLinkedin: FaLinkedin,
    FaGithub: FaGithub,
    FaLink: FaLink,
    IoMailSharp: IoMailSharp,
};

function Intro({ data }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <SlideWrapper className="text-center" id="intro">
        <MotionH1 inView={inView}>{data.title}</MotionH1>
        <h3 className="text-2xl mb-8 tracking-widest font-thin uppercase">
          <TypeAnimation
            sequence={[
              "Jagadeesh",
              2000,
              "React Chennai ",
              2000,
              "Turing.com",
              2000,
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
              <div className="flex space-x-16 mt-2">
                {data.social.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    className="flex flex-row items-center space-x-2 p-1"
                  >
                    {React.createElement(iconMap[item.icon])}
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
