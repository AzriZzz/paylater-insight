import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface SectionProps {
  children: React.ReactNode;
}

function Section({ children }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default Section;
