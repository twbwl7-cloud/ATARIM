"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/site";

export function ServicesSection() {
  return (
    <section className="section-void relative z-10 overflow-hidden border-y border-line">
      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">מה עושים יחד</p>
        <h2 className="display mt-4 max-w-xl text-3xl font-light text-ink md:text-5xl">
          שלושה דברים שאני בונה
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: i * 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="premium-panel group rounded-2xl p-6 md:p-8"
            >
              <p className="relative z-[1] text-sm tracking-[0.14em] text-muted">
                0{i + 1}
              </p>
              <h3 className="relative z-[1] display mt-3 text-2xl text-ink">
                {service.title}
              </h3>
              <p className="relative z-[1] mt-3 text-sm leading-relaxed text-muted">
                {service.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
