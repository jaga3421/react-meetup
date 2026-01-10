"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const data = [



];

const AnimatedImage = () => {
  const [visibleImage, setVisibleImage] = useState({});

  useEffect(() => {
    const handleKeyPress = (event) => {
      const imageKey = event.key.toUpperCase();
      const image = data.find(({ key }) => key === imageKey);
      if (image) {
        setVisibleImage((prevState) => ({
          ...prevState,
          [imageKey]: !prevState[imageKey],
        }));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const variants = {
    visible: { x: 0, opacity: 1 },
    hidden: { x: "100vw", opacity: 0 },
  };

  return (
    <>
      {data.map(({ key, path, alt, width }) => (
        <motion.div
          key={key}
          initial="hidden"
          animate={visibleImage[key] ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.5 }}
          style={{ position: "absolute", right: 0, top: 0 }}
          className="flex items-center justify-center w-full h-screen bg-black bg-opacity-80 z-[9999]"
        >
          <img src={path} alt={alt} style={{ width: width, height: "auto" }} />
        </motion.div>
      ))}
    </>
  );
};

export default AnimatedImage;
