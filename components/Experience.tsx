"use client";

import { portfolioData } from "@/lib/data";
import { motion } from "framer-motion";

export default function Experience() {
  const { resume } = portfolioData;

  return (
    <div
      className="overflow-auto h-full p-5 bg-(--c-bg) text-(--c-text-md)"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
        <div className="text-[13px] text-(--c-text-hi) tracking-[4px] mb-3">EXPERIENCE.LOG</div>
        <div
          className="h-0.5 opacity-60"
          style={{ background: "repeating-linear-gradient(90deg, var(--c-accent) 0px, var(--c-accent) 8px, transparent 8px, transparent 16px)" }}
        />
      </motion.div>

      {/* Timeline */}
      <div className="relative flex flex-col">
        {/* Continuous vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-(--c-border-lo)" />

        {resume.experience.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + idx * 0.1, duration: 0.3 }}
            className="relative flex last:mb-0"
          >
            {/* Left column: logo sitting on the line */}
            <div className="shrink-0 w-16 flex flex-col items-center z-10">
              <div
                className="w-12 h-12 mt-1 border-2 border-(--c-border-md) bg-(--c-bg-card) flex items-center justify-center relative overflow-hidden shrink-0"
                style={{ boxShadow: "0 0 0 3px var(--c-bg), 2px 2px 0 var(--c-shadow-2)" }}
              >
                {job.logo ? (
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-full h-full object-contain p-1.5"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <span className="text-(--c-accent) text-[10px] tracking-tight">
                    {job.company.slice(0, 2).toUpperCase()}
                  </span>
                )}
                {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-1 h-1 bg-(--c-border-md)`} />
                ))}
              </div>
            </div>

            {/* Right column: content */}
            <div className="flex-1 pl-5 pb-20 last:pb-6">
              <div className="text-[8px] text-(--c-text-hi) tracking-[1px] mb-1.5 mt-0.5">{job.title}</div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[7px] text-(--c-accent) tracking-[1px]">{job.company}</span>
                <div className="w-px h-3 bg-(--c-border-md)" />
                <span className="text-[6px] text-(--c-text-lo) tracking-[1px]">{job.period}</span>
                {job.location && (
                  <>
                    <div className="w-px h-3 bg-(--c-border-md)" />
                    <span className="text-[6px] text-(--c-text-lo) tracking-[1px]">📍 {job.location}</span>
                  </>
                )}
              </div>

              {job.companyDescription && (
                <div className="border-l-2 border-(--c-border-md) pl-2 mb-4">
                  <p className="text-[6px] text-(--c-text-lo) leading-relaxed tracking-[0.5px] italic">
                    {job.companyDescription}
                  </p>
                </div>
              )}

              <ul className="flex flex-col gap-2 mb-4">
                {job.description.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-(--c-border-md) shrink-0 text-[7px] leading-none">▸</span>
                    <span className="text-[7px] text-(--c-text-sub) leading-relaxed tracking-[0.3px]">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[6px] px-2 py-1 bg-(--c-bg-card) text-(--c-text-sub) border border-(--c-border-lo) tracking-[1px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
