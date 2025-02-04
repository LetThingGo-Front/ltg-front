'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function FadeInWrapper({ children }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
