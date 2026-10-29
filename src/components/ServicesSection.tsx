"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/site";

export function ServicesSection() {
  return (
    <section className="relative z-10 border-y border-line/40 bg-elevated/30">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <p className="text-xs tracking-[0.22em] text-gold">שירותים</p>
        <h2 className="display mt-3 max-w-xl text-3xl text-ivory md:text-5xl">
          מה נבנה יחד
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05, duration: 0.55 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <p className="text-sm text-pink">0{i + 1}</p>
              <h3 className="display mt-3 text-2xl text-ivory">{service.title}</h3>
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
