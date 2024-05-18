import { motion } from "framer-motion";
import { HxVariants } from "../framerVariants";

const MotionH1 = ({ inView, className, children }) => {
  return (
    <motion.h1
      className={`text-5xl uppercase font-thin mb-16 w-full text-pink-600 ${className}`}
      variants={HxVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.h1>
  );
};

export default MotionH1;
