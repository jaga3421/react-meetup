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
  title: "Chrome Extension.. What?",
  horizandalSubSlides:[
    {
      "title": "What are Chrome Extensions?",
      "list": [
        {
          "title": "Definition:",
          "content": "Chrome Extensions are small software programs that enhance and customize the browsing experience in Google Chrome."
        },
        {
          "title": "Purpose:",
          "content": "They add new features or modify existing ones to improve productivity, functionality, and user experience."
        },
        {
          "title": "Scope:",
          "content": "Extensions can modify web pages, automate tasks, manage bookmarks, and integrate with other services."
        }
      ]
    },
    {
      "title": "Types of Chrome Extensions Actions",
      "list": [
        {
          "title": "Browser Actions:",
          "content": "Provide a button in the browser toolbar for quick access to their functionality."
        },
        {
          "title": "Page Actions:",
          "content": "Interact with specific web pages. Show UI elements. Manipulate DOM."
        },
        {
          "title": "Background Scripts:",
          "content": "Run in the background, performing tasks like monitoring network activity or handling alarms."
        }
      ]
    },
   
    {
      "title": "Architecture of Chrome Extensions",
      "list": [
        {
          "title": "Manifest File:",
          "content": "The manifest.json file defines the extension's properties, permissions, and entry points."
        },
        {
          "title": "Content Scripts:",
          "content": "JavaScript files that run in the context of web pages, allowing extensions to interact with web content."
        },
        {
          "title": "Background Scripts:",
          "content": "Persistent scripts that manage tasks in the background, such as network requests and event handling."
        },
        {
          "title": "UI Elements:",
          "content": "Components like popups, options pages, and browser action icons for user interaction."
        }
      ]
    },
    {
      "title": "Important APIs",
      "list":[
        {
          "title": "webRequest API:",
          "content": "Allows extensions to observe and analyze traffic and to intercept, block, or modify requests in-flight."
        },
        {
          "title": "storage API:",
          "content": "Provides a simple interface for storing, retrieving, and tracking changes to user data."
        },
        {
          "title": "tabs API:",
          "content": "Provides methods to interact with the browser's tab system, allowing the extension to create, modify, and rearrange tabs."
        },
        {
          "title": "contextMenus API:",
          "content": "Enables extensions to add items to the context menu in the browser."
        }
      ]
    }
  ]
  
};

function WhatIsCE() {
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

export default WhatIsCE;
