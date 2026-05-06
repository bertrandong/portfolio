"use client";

import { portfolioData } from "@/lib/data";
import { motion } from "framer-motion";

const PixelSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    style={{
      border: "1px solid #1b3a66",
      padding: "16px",
      marginBottom: "16px",
      position: "relative",
      background: "rgba(12,31,56,0.58)",
    }}
  >
    {/* corner accents */}
    {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
      <div key={i} className={`absolute ${pos}`} style={{ width: 6, height: 6, background: "#2f5f9a" }} />
    ))}
    {children}
  </motion.div>
);

const PixelLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "9px",
    color: "#4a84d0",
    letterSpacing: "2px",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}>
    <span style={{ color: "#b7d6ff" }}>▸</span>
    {children}
    <div style={{ flex: 1, height: "1px", background: "repeating-linear-gradient(90deg, #1b3a66 0px, #1b3a66 4px, transparent 4px, transparent 8px)" }} />
  </div>
);

export default function About() {
  const { personalInfo } = portfolioData;

  const fields = [
    { label: "NAME", value: personalInfo.name },
    { label: "TITLE", value: personalInfo.title },
    { label: "LOCATION", value: personalInfo.location },
    { label: "EMAIL", value: personalInfo.email, isEmail: true },
  ];

  const stack = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js"];

  return (
    <div style={{
      padding: "20px",
      fontFamily: "'Press Start 2P', monospace",
      background: "#050d1a",
      minHeight: "100%",
      color: "#b7d6ff",
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ marginBottom: "24px" }}
      >
        <div style={{ fontSize: "14px", color: "#d6e6ff", letterSpacing: "4px", marginBottom: "6px" }}>
          ABOUT.EXE
        </div>
        <div style={{ height: "2px", background: "repeating-linear-gradient(90deg, #4a84d0 0px, #4a84d0 8px, transparent 8px, transparent 16px)", opacity: 0.6 }} />
      </motion.div>

      {/* Bio */}
      <PixelSection delay={0.1}>
        <PixelLabel>BIO</PixelLabel>
        <p style={{ fontSize: "8px", lineHeight: "2", color: "#98bde8", letterSpacing: "0.5px" }}>
          {personalInfo.bio}
        </p>
      </PixelSection>

      {/* Stats */}
      <PixelSection delay={0.2}>
        <PixelLabel>PLAYER STATS</PixelLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {fields.map(({ label, value, isEmail }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #12294b", paddingBottom: "8px" }}>
              <span style={{ fontSize: "7px", color: "#5b86bb", letterSpacing: "2px" }}>{label}</span>
              {isEmail ? (
                <a href={`mailto:${value}`} style={{ fontSize: "7px", color: "#b7d6ff", letterSpacing: "1px", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#d6e6ff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#b7d6ff")}
                >
                  {value}
                </a>
              ) : (
                <span style={{ fontSize: "7px", color: "#98bde8", letterSpacing: "1px" }}>{value}</span>
              )}
            </div>
          ))}
        </div>
      </PixelSection>

      {/* Tech stack */}
      <PixelSection delay={0.3}>
        <PixelLabel>TECH STACK</PixelLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {stack.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              style={{
                fontSize: "7px",
                padding: "6px 10px",
                background: "#0b1f3a",
                color: "#b7d6ff",
                border: "1px solid #2f5f9a",
                letterSpacing: "1px",
                cursor: "default",
                boxShadow: "2px 2px 0 #08162f",
              }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </PixelSection>
    </div>
  );
}