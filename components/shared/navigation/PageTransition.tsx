"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import type { PageTransitionProps } from "./types";

export default function PageTransition({
  children,
}: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {
            opacity: 0,
            clipPath: "circle(0% at 50% 50%)",
          },

          animate: {
            opacity: 1,
            clipPath: "circle(150% at 50% 50%)",
          },

          exit: {
            opacity: 1,
            clipPath: "circle(0% at 50% 50%)",
          },
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}