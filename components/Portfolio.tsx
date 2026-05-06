"use client";

import { portfolioData } from "@/lib/data";
import { motion } from "framer-motion";

export default function Portfolio() {
  const { portfolio } = portfolioData;

  return (
    <div style={{ padding: "20px", fontFamily: "'Press Start 2P', monospace", background: "var(--c-bg)", minHeight: "100%", color: "var(--c-text-md)" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "14px", color: "var(--c-text-hi)", letterSpacing: "4px", marginBottom: "4px" }}>PORTFOLIO.EXE</div>
        <div style={{ fontSize: "7px", color: "var(--c-text-lo)", letterSpacing: "2px", marginBottom: "8px" }}>SELECT A PROJECT</div>
        <div style={{ height: "2px", background: "repeating-linear-gradient(90deg, var(--c-accent) 0px, var(--c-accent) 8px, transparent 8px, transparent 16px)", opacity: 0.6 }} />
      </motion.div>

      {/* Projects */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {portfolio.projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07, duration: 0.25 }}
            whileHover={{ y: -3 }}
            style={{
              border: "1px solid var(--c-border-lo)",
              padding: "14px",
              background: "var(--c-bg-card)",
              position: "relative",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--c-accent)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--c-border-lo)")}
          >
            {/* corner dots */}
            {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
              <div key={i} className={`absolute ${pos}`} style={{ width: 5, height: 5, background: "var(--c-border-md)" }} />
            ))}

            {/* Icon */}
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>{project.image}</div>

            {/* Title */}
            <div style={{ fontSize: "8px", color: "var(--c-text-hi)", letterSpacing: "1px", marginBottom: "8px", lineHeight: "1.5" }}>
              {project.title}
            </div>

            {/* Description */}
            <p style={{ fontSize: "7px", color: "var(--c-text-sub)", lineHeight: "1.8", marginBottom: "10px", letterSpacing: "0.3px" }}>
              {project.description}
            </p>

            {/* Tech tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "10px" }}>
              {project.technologies.map((tech, i) => (
                <span key={i} style={{
                  fontSize: "6px", padding: "3px 6px",
                  background: "var(--c-bg-card)", color: "var(--c-text-sub)",
                  border: "1px solid var(--c-border-md)", letterSpacing: "1px",
                }}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Link */}
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              style={{ fontSize: "7px", color: "var(--c-text-md)", letterSpacing: "1px", textDecoration: "none", display: "inline-block" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--c-text-hi)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--c-text-md)")}
            >
              OPEN ▶
            </motion.a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
