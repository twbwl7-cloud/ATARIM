"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/site";

const INKS = ["ink-cyan", "ink-gold", "ink-rose"] as const;

export function ServicesSection() {
  return (
    <section className="section-void relative z-10 overflow-hidden border-y border-line/35">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-gold/12 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <p className="text-xs tracking-[0.24em] text-gold-bright">מה עושים יחד</p>
        <h2 className="display mt-3 max-w-xl text-3xl text-ivory md:text-5xl">
          שלושה דברים שאני <span className="ink-cyan">בונה</span>
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05, duration: 0.55 }}
              className="premium-panel group rounded-2xl p-6 transition duration-300 hover:border-gold/45 md:p-8"
            >
              <p className={`text-sm tracking-[0.16em] ${INKS[i % 3]}`}>
                0{i + 1}
              </p>
              <h3 className="display mt-3 text-2xl text-ivory group-hover:text-gold-bright">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {service.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
