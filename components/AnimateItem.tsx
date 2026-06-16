"use client";

import React from "react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function AnimateItem({ children, className, ...rest }: any) {
  return (
    <motion.div variants={itemVariants} className={className} {...rest}>
      {children}
    </motion.div>
  );
}
