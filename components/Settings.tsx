"use client";

import { motion } from "framer-motion";
import { themes } from "@/lib/themes";
import { useTheme } from "@/lib/ThemeContext";

const SectionLabel = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 text-[9px] text-[var(--c-accent)] tracking-[2px] mb-4" style={{ fontFamily: "'Press Start 2P', monospace" }}>
    <span className="text-[var(--c-text-md)]">▸</span>
    {label}
    <div className="flex-1 h-px" style={{ background: "repeating-linear-gradient(90deg, var(--c-border-lo) 0px, var(--c-border-lo) 4px, transparent 4px, transparent 8px)" }} />
  </div>
);

const ComingSoon = ({ items }: { items: string[] }) => (
  <div className="border border-[var(--c-border-lo)] p-4 bg-[var(--c-bg-card)] opacity-50">
    <p className="text-[6px] text-[var(--c-text-lo)] tracking-[1px] leading-loose">
      COMING SOON: {items.join(" · ")}
    </p>
  </div>
);

export default function Settings() {
  const { themeId, setTheme } = useTheme();

  return (
    <div
      className="overflow-auto h-full p-5 bg-[var(--c-bg)] text-[var(--c-text-md)]"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <div className="text-[13px] text-[var(--c-text-hi)] tracking-[4px] mb-3">SETTINGS.CFG</div>
        <div
          className="h-0.5 opacity-60"
          style={{ background: "repeating-linear-gradient(90deg, var(--c-accent) 0px, var(--c-accent) 8px, transparent 8px, transparent 16px)" }}
        />
      </motion.div>

      {/* Colour theme */}
      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <SectionLabel label="COLOUR THEME" />
        <div className="grid grid-cols-2 gap-3">
          {themes.map((theme) => {
            const active = themeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className="p-3 text-left cursor-pointer transition-colors duration-100 border-2"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  borderColor: active ? "var(--c-border-hi)" : "var(--c-border-lo)",
                  background: active ? "var(--c-bg-btn)" : "var(--c-bg-win)",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.borderColor = "var(--c-border-md)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.borderColor = "var(--c-border-lo)"; }}
              >
                {/* Swatch preview */}
                <div className="flex gap-1 mb-2.5 h-3">
                  {theme.swatch.map((color, i) => (
                    <div key={i} className="flex-1" style={{ background: color }} />
                  ))}
                </div>
                <div className="text-[7px] tracking-[1px] text-[var(--c-text-md)]">{theme.name}</div>
                {active && (
                  <div className="text-[6px] text-[var(--c-accent)] mt-1.5 tracking-[1px]">● ACTIVE</div>
                )}
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* Display */}
      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
        <SectionLabel label="DISPLAY" />
        <ComingSoon items={["CRT SCANLINES", "ANIMATION SPEED", "WINDOW OPACITY"]} />
      </motion.section>

      {/* System */}
      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <SectionLabel label="SYSTEM" />
        <ComingSoon items={["CLOCK FORMAT", "BACKGROUND STYLE", "SOUND EFFECTS"]} />
      </motion.section>
    </div>
  );
}
