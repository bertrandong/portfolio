"use client";

import { portfolioData } from "@/lib/data";
import { motion } from "framer-motion";

const corners = ["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"];

const SectionLabel = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 text-[9px] text-(--c-accent) tracking-[2px] mb-3" style={{ fontFamily: "'Press Start 2P', monospace" }}>
    <span className="text-(--c-text-md)">▸</span>
    {label}
    <div className="flex-1 h-px" style={{ background: "repeating-linear-gradient(90deg, var(--c-border-lo) 0px, var(--c-border-lo) 4px, transparent 4px, transparent 8px)" }} />
  </div>
);

const PixelSection = ({ children, delay = 0, label }: { children: React.ReactNode; delay?: number; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="border border-(--c-border-lo) p-4 mb-4 relative bg-(--c-bg-card)"
  >
    {corners.map((pos, i) => (
      <div key={i} className={`absolute ${pos} w-1.5 h-1.5 bg-(--c-border-md)`} />
    ))}
    <SectionLabel label={label} />
    {children}
  </motion.div>
);

export default function About() {
  const { personalInfo, resume } = portfolioData;

  return (
    <div className="p-5 bg-(--c-bg) min-h-full text-(--c-text-md) overflow-auto" style={{ fontFamily: "'Press Start 2P', monospace" }}>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-5 mb-6 items-center">
        <div
          className="shrink-0 w-24 h-24 border-2 border-(--c-border-hi) relative bg-(--c-bg-card) overflow-hidden"
          style={{ boxShadow: "0 0 0 1px var(--c-shadow-1), 2px 2px 0 var(--c-shadow-2)" }}
        >
          {personalInfo.avatar ? (
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-full h-full object-cover"
              style={{ imageRendering: "pixelated" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="text-[13px] text-(--c-text-hi) tracking-[3px] mb-2 truncate">
            {personalInfo.name.toUpperCase()}
          </div>
          <div className="text-[7px] text-(--c-accent) tracking-[2px] mb-3 leading-relaxed">
            {personalInfo.title.toUpperCase()}
          </div>
          <div className="text-[6px] text-(--c-text-lo) tracking-[1px]">
            📍 {personalInfo.location}
          </div>
        </div>
      </motion.div>

      <PixelSection label="BIO" delay={0.1}>
        <p className="text-[7px] leading-loose text-(--c-text-sub) tracking-[0.5px]">
          {personalInfo.bio}
        </p>
      </PixelSection>

      <PixelSection label="EDUCATION" delay={0.2}>
        <div className="flex flex-col gap-3">
          {resume.education.map((edu, idx) => (
            <div
              key={edu.id}
              className={idx < resume.education.length - 1 ? "pb-3 border-b border-(--c-border-lo)" : ""}
            >
              <div className="text-[8px] text-(--c-text-hi) tracking-[1px] mb-1">{edu.degree}</div>
              <div className="text-[7px] text-(--c-accent) tracking-[1px] mb-1">{edu.field}</div>
              <div className="text-[6px] text-(--c-text-lo) tracking-[1px]">{edu.school} · {edu.year}</div>
            </div>
          ))}
        </div>
      </PixelSection>

      <PixelSection label="TECH STACK" delay={0.3}>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.04 }}
              whileHover={{ scale: 1.05 }}
              className="text-[7px] px-2.5 py-1.5 bg-(--c-bg-card) text-(--c-text-md) border border-(--c-border-md) tracking-[1px] cursor-default"
              style={{ boxShadow: "2px 2px 0 var(--c-shadow-2)" }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </PixelSection>

    </div>
  );
}
