"use client";

import { portfolioData } from "@/lib/data";
import { motion } from "framer-motion";

export default function Experience() {
  const { resume, personalInfo } = portfolioData;

  return (
    <div className="overflow-auto h-full p-5 bg-[#050d1a] text-[#b7d6ff]" style={{ fontFamily: "'Press Start 2P', monospace" }}>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <div className="text-[14px] text-[#d6e6ff] tracking-[4px] mb-2">
          {personalInfo.name.toUpperCase()}
        </div>
        <div className="text-[9px] text-[#4a84d0] tracking-[3px] mb-4">
          {personalInfo.title.toUpperCase()}
        </div>
        <div
          className="h-0.5 opacity-60"
          style={{ background: "repeating-linear-gradient(90deg, #4a84d0 0px, #4a84d0 8px, transparent 8px, transparent 16px)" }}
        />
      </motion.div>

      <div className="flex flex-col">
        {resume.experience.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + idx * 0.08 }}
            className="border-l-2 border-[#2f5f9a] pl-4 pb-5 mb-5 border-b border-b-[#12294b] last:border-b-0 last:mb-0 last:pb-0"
          >
            <div className="text-[8px] text-[#d6e6ff] tracking-[1px] mb-1">{job.title}</div>
            <div className="text-[7px] text-[#4a84d0] tracking-[1px] mb-1">{job.company}</div>
            <div className="text-[6px] text-[#5b86bb] tracking-[1px] mb-3">{job.period}</div>
            <p className="text-[7px] text-[#7ea8d8] leading-loose mb-3 tracking-[0.3px]">
              {job.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {job.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-[6px] px-2 py-1 bg-[#0b1f3a] text-[#7ea8d8] border border-[#1b3a66] tracking-[1px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
