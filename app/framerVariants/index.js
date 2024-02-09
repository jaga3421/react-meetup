const HxVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
};

const VariantStaggerParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.8,
    },
  },
};

const VariantStaggerChildRight = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};
const VariantStaggerChildShow = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

export {
  HxVariants,
  VariantStaggerChildRight,
  VariantStaggerParent,
  VariantStaggerChildShow,
};
