"use client";
import React, { useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import SlideWrapper from "../components/SlideWrapper";
import MotionH1 from "../components/MotionH1";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaExpand, FaCompress } from "react-icons/fa6";

function InteractiveCodeSlide({ data }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div ref={ref}>
      <SlideWrapper className="text-center md:items-start" id={data?.id}>
        {data?.title && (
          <MotionH1 className="text-center mb-8" inView={inView}>
            {data.title}
          </MotionH1>
        )}

        <div className="w-full flex gap-4" style={{ minHeight: "60vh" }}>
          {/* Code Section - Left Side */}
          <motion.div
            className="relative flex-shrink-0"
            initial={false}
            animate={{
              width: isExpanded ? "90%" : "40%",
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div
              className="cardPrimary overflow-auto relative"
              style={{ minHeight: "60vh" }}
            >
              {/* Expand/Collapse Button */}
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                onClick={toggleExpand}
                aria-label={isExpanded ? "Collapse code" : "Expand code"}
              >
                {isExpanded ? (
                  <FaCompress className="w-5 h-5 text-gray-300" />
                ) : (
                  <FaExpand className="w-5 h-5 text-gray-300" />
                )}
              </button>

              {data.code && (
                <CodeBlock
                  text={data.code}
                  language={data.language || "typescript"}
                  theme={dracula}
                  showLineNumbers={true}
                  wrapLines={true}
                />
              )}
            </div>
          </motion.div>

          {/* Theory Section - Right Side */}
          <motion.div
            className="flex-shrink-0 overflow-auto"
            initial={false}
            animate={{
              width: isExpanded ? "10%" : "60%",
              opacity: isExpanded ? 0.3 : 1,
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div className="cardPrimary" style={{ minHeight: "60vh" }}>
              <AnimatePresence mode="wait">
                {!isExpanded && (
                  <motion.div
                    key="theory-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      {/* Main Heading - Animated */}
                      {data.theory?.heading && (
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.5 }}
                          className="text-4xl font-bold mb-6 text-pink-600"
                        >
                          {data.theory.heading}
                        </motion.h2>
                      )}

                      {/* Sub Heading */}
                      {data.theory?.subHeading && (
                        <h3 className="text-3xl font-semibold mb-4 text-gray-200">
                          {data.theory.subHeading}
                        </h3>
                      )}

                      {/* Copy/Paragraph */}
                      {data.theory?.copy && (
                        <p className="text-2xl mb-6 font-light leading-relaxed">
                          {data.theory.copy}
                        </p>
                      )}

                      {/* List Items */}
                      {data.theory?.list && (
                        <ul className="space-y-4">
                          {data.theory.list.map((item, index) => (
                            <li
                              key={index}
                              className="text-2xl font-light"
                            >
                              {typeof item === "string" ? (
                                <span>{item}</span>
                              ) : (
                                <>
                                  {item.title && (
                                    <span className="font-bold text-pink-400">
                                      {item.title}:{" "}
                                    </span>
                                  )}
                                  {item.content && <span>{item.content}</span>}
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Pointers/Bullet Points */}
                      {data.theory?.pointers && (
                        <ul className="space-y-3 mt-6">
                          {data.theory.pointers.map((pointer, index) => (
                            <li
                              key={index}
                              className="text-xl font-light flex items-start"
                            >
                              <span className="text-pink-600 mr-3 mt-1">•</span>
                              <span>{pointer}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Custom Content Blocks */}
                      {data.theory?.blocks && (
                        <div className="space-y-4 mt-6">
                          {data.theory.blocks.map((block, index) => (
                            <div
                              key={index}
                              className="p-4 bg-gray-800 rounded-lg border border-gray-600"
                            >
                              {block.title && (
                                <h4 className="text-xl font-bold mb-2 text-pink-400">
                                  {block.title}
                                </h4>
                              )}
                              {block.content && (
                                <p className="text-lg font-light">
                                  {block.content}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </SlideWrapper>
    </div>
  );
}

export default InteractiveCodeSlide;

