"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: (isMaximized: boolean) => void;
  onFocus?: () => void;
  isMinimized?: boolean;
  width?: number;
  height?: number;
  initialX?: number;
  initialY?: number;
  zIndex?: number;
}

export default function Window({
  id,
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMinimized = false,
  width = 800,
  height = 650,
  initialX = 100,
  initialY = 80,
  zIndex = 1000,
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile || isMaximized) return;
    if ((e.target as HTMLElement).closest("[data-no-drag]")) return;
    onFocus?.();
    setIsDragging(true);
    setDragOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMaximize = () => {
    setIsMaximized((prev) => {
      onMaximize?.(!prev);
      return !prev;
    });
  };

  const showFullscreen = isMaximized || isMobile;

  const controls = [
    { label: "─", tooltip: "Minimize", onClick: onMinimize },
    { label: "□", tooltip: isMaximized ? "Restore" : "Maximize", onClick: handleMaximize },
    { label: "✕", tooltip: "Close", onClick: onClose },
  ];

  return (
    <motion.div
      className="absolute"
      style={{
        left: showFullscreen ? 0 : position.x,
        top: showFullscreen ? 0 : position.y,
        width: showFullscreen ? "100%" : width,
        height: showFullscreen ? "calc(100% - 40px)" : height,
        zIndex,
        cursor: isDragging ? "grabbing" : "auto",
        fontFamily: "'Press Start 2P', monospace",
        pointerEvents: isMinimized ? "none" : "auto",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseDown={() => onFocus?.()}
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      animate={isMinimized ? { opacity: 0, scale: 0.88, y: 20 } : { opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 16 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div
        className="w-full h-full flex flex-col"
        style={{
          background: "var(--c-bg-win)",
          border: "2px solid var(--c-border-hi)",
          outline: "1px solid var(--c-border-md)",
          outlineOffset: "2px",
          boxShadow: "0 0 0 1px var(--c-shadow-1), 4px 4px 0 var(--c-shadow-2), 0 0 24px var(--c-glow)",
        }}
      >
        {/* Title bar */}
        <div
          onMouseDown={handleMouseDown}
          className="h-10 flex items-center justify-between px-3 shrink-0 select-none"
          style={{
            background: "linear-gradient(90deg, var(--c-tb-start) 0%, var(--c-tb-mid) 50%, var(--c-tb-start) 100%)",
            borderBottom: "2px solid var(--c-border-hi)",
            cursor: isDragging ? "grabbing" : showFullscreen ? "default" : "grab",
          }}
        >
          <span className="text-[9px] tracking-[2px]" style={{ color: "var(--c-text-hi)" }}>
            {title.toUpperCase()}
          </span>

          <div data-no-drag className="flex items-center gap-1">
            {controls.map(({ label, tooltip, onClick }) => (
              <button
                key={label}
                title={tooltip}
                onClick={onClick}
                className="w-6 h-6 flex items-center justify-center p-0 text-[9px] leading-none cursor-pointer transition-colors duration-100"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  background: "var(--c-bg-btn)",
                  color: "var(--c-text-md)",
                  border: "1px solid var(--c-border-md)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--c-btn-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--c-bg-btn)")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Pixel scan line */}
        <div
          className="h-0.5 shrink-0 opacity-50"
          style={{ background: "repeating-linear-gradient(90deg, var(--c-accent) 0px, var(--c-accent) 6px, transparent 6px, transparent 12px)" }}
        />

        {/* Content area */}
        <div className="flex-1 overflow-hidden relative" style={{ background: "var(--c-bg)" }}>
          <div className="absolute inset-1 pointer-events-none z-10" style={{ border: "1px solid var(--c-border-lo)" }} />
          <div className="absolute inset-0 overflow-auto">
            {children}
          </div>
        </div>

        {/* Status bar */}
        <div
          className="h-5 flex items-center px-2 gap-4 shrink-0"
          style={{ borderTop: "1px solid var(--c-border-lo)", background: "var(--c-bg-win)" }}
        >
          <span className="text-[7px] tracking-[1px]" style={{ color: "var(--c-text-lo)" }}>{title.toUpperCase()}</span>
        </div>
      </div>
    </motion.div>
  );
}
