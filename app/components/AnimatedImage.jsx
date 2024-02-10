"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const data = [
  { key: "D", path: "/images/dwight.gif", alt: "Dwight", width: "700px" },
  {
    key: "S",
    path: "/images/shakthimaan.gif",
    alt: "Shakthimaan",
    width: "800px",
    caption: "Showing off is Wrong",
  },
  {
    key: "X",
    path: "/images/drax.webp",
    alt: "Drax",
    width: "600px",
    caption: "I will do YOU one better, Why is accessibility",
  },
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
      {data.map(({ key, path, alt, width, caption }) => (
        <motion.div
          key={key}
          initial="hidden"
          animate={visibleImage[key] ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.5 }}
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <img src={path} alt={alt} style={{ width: width, height: "auto" }} />
          {caption && (
            <h2 className="text-2xl bg-pink-600 text-white p-2 text-center font-bold uppercase">
              {caption}
            </h2>
          )}
        </motion.div>
      ))}
    </>
  );
};

export default AnimatedImage;
