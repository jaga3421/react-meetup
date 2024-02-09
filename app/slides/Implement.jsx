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
  title: "Practical Tips for Accessible React Components ",
  horizandalSubSlides: [
    {
      title: "Semantic HTML",
      list: [
        {
          title: "Inherent Support:",
          content:
            "Semantic HTML elements like <button>, <input>, <nav>, and <article> provide inherent accessibility features, such as keyboard accessibility and screen reader support",
        },
        {
          title: "Custom Components:",
          content:
            "When creating custom components, map them appropriately to the corresponding semantic HTML elements. Ex: Using a combination of <input>, <ul>, <li> to create a drop down instead of just <div> and <span>.",
        },
      ],
    },
    {
      title: "Managing Focus",
      list: [
        {
          title: "General Focus Management:",
          content:
            "Ensure interactive elements like links and form controls are either autofocussed/focusable and that the focus order follows a logical sequence. Ex: Ability to TAB through inputs in the order they appear.",
        },
        {
          title: "Custom Focus Handling with ref:",
          content:
            "Utilize React's ref system to manage focus, especially in complex components like modals and dropdowns. Ex: When a modal opens, shift focus to the modal and trap focus within it until closed.",
        },
        {
          title: "State-Based Focus Handling:",
          content:
            "Use state and keyboard events for focus management in components like menus. Ex: Track focused menu item in state; on close, focus returns to the opener.",
        },
      ],
    },
    {
      title: "Aria Attributes and Roles",
      list: [
        {
          title: "Enhancing Form Accessibility:",
          content:
            "Utilize ARIA attributes to improve screen reader interaction with forms. Ex: Add 'aria-labelledby' to associate form labels with their controls.",
        },
        {
          title: "Defining Element Roles:",
          content:
            "Use ARIA roles to clarify the purpose of elements to assistive technologies. Ex: Assign 'role=button' to a div that acts as a button.",
        },
        {
          title: "Dynamic Content Updates:",
          content:
            "Implement dynamic ARIA attributes for announcing real-time content changes. Ex: Use 'aria-live' for real-time updates in a chat application.",
        },
      ],
    },
  ],
};

function Implement() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <SlideWrapper className="text-center md:items-start" id="implement">
        <MotionH1 className="text-center" inView={inView}>
          {data.title}
        </MotionH1>

        {/* Horizandal slides */}
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
                <h3 className="text-4xl mb-8 text-center font-bold">
                  {slide.title}
                </h3>

                {slide.list?.map((content, index) => (
                  <li
                    key={index}
                    className="flex items-start mb-8 space-x-4 text-3xl "
                  >
                    <div className="font-thin">
                      <p className="font-semibold mb-4">{content.title}</p>
                      {content.content}
                    </div>
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

export default Implement;
