"use client";

import React from "react";
import { motion } from "framer-motion";

interface AppIconProps {
  icon: React.ReactNode;
  name: string;
  description?: string;
  onClick: () => void;
}

export default function AppIcon({ icon, name, description, onClick }: AppIconProps) {
  const [isSelected, setIsSelected] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      onClick={(e) => {
        setIsSelected(true);
        onClick();
        const deselect = () => setIsSelected(false);
        document.addEventListener("click", deselect, { once: true });
        e.stopPropagation();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ x: 4 }}
      title={description}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        padding: "6px 10px",
        cursor: "pointer",
        fontFamily: "'Press Start 2P', monospace",
        background: isSelected
          ? "rgba(74,132,208,0.25)"
          : isHovered
          ? "rgba(74,132,208,0.12)"
          : "transparent",
        border: isSelected
          ? "1px dashed #b7d6ff"
          : isHovered
          ? "1px dashed #2f5f9a"
          : "1px solid transparent",
        width: "fit-content",
        minWidth: "160px",
        userSelect: "none",
        transition: "background 0.1s, border 0.1s",
      }}
    >
      {/* Icon box */}
      <div style={{
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px",
        background: "#0b1f3a",
        border: "2px solid #2f5f9a",
        boxShadow: isHovered ? "0 0 8px rgba(74,132,208,0.6)" : "2px 2px 0 #08162f",
        flexShrink: 0,
        transition: "box-shadow 0.15s",
        imageRendering: "pixelated",
      }}>
        {icon}
      </div>

      {/* Label */}
      <span style={{
        fontSize: "8px",
        color: isSelected ? "#ffffff" : isHovered ? "#d6e6ff" : "#b7d6ff",
        letterSpacing: "1px",
        lineHeight: "1.5",
        textShadow: isSelected || isHovered ? "0 0 8px rgba(140,190,255,0.8)" : "none",
        transition: "color 0.1s",
      }}>
        {name.toUpperCase()}
      </span>

      {/* Arrow indicator */}
      <span style={{
        fontSize: "8px",
        color: "#4a84d0",
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.1s",
        marginLeft: "auto",
      }}>▶</span>
    </motion.div>
  );
}