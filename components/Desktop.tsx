"use client";

import React, { useState, useEffect } from "react";
import Window from "./Window";
import AppIcon from "./AppIcon";
import Resume from "./Resume";
import Experience from "./Experience";
import Portfolio from "./Portfolio";
import About from "./About";
import Contact from "./Contact";
import SettingsApp from "./Settings";
import PixelSkyline from "./PixelSkyline";
import { portfolioData } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { PxlKitIcon } from "@pxlkit/core";
import { Settings, Download, History } from "@pxlkit/ui";
import { User } from "@pxlkit/social";
import { CheckCircle, MessageSquare } from "@pxlkit/feedback";

interface OpenWindow {
  id: string;
  appId: string;
  isMinimized: boolean;
  zIndex: number;
}

// ── Pixel mascot ──────────────────────────────────────────────────────────────
function PixelMascot() {
  const [talking, setTalking] = useState(false);
  const messages = ["Hi! I'm Bert!", "Currently based in Singapore!", "Interested in startups!", "Enjoy building cool things!"];
  const [msgIdx, setMsgIdx] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTalking(true);
    setMsgIdx((i) => (i + 1) % messages.length);
    setTimeout(() => setTalking(false), 2200);
  };

  return (
    <motion.div
      data-no-particle
      className="absolute z-30 select-none cursor-pointer"
      style={{ bottom: "48px", right: "20px" }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      onClick={handleClick}
      title="Click me!"
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {talking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 6px)",
              right: 0,
              background: "#EEF6FF",
              border: "2px solid #7BAEE0",
              padding: "7px 11px",
              whiteSpace: "nowrap",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "7px",
              color: "#1E3A6E",
              letterSpacing: "0.5px",
              lineHeight: "1.7",
              boxShadow: "2px 2px 0 #A8C8F0",
            }}
          >
            {messages[msgIdx]}
            <div style={{
              position: "absolute", bottom: -7, right: 14,
              width: 0, height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #7BAEE0",
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.svg
        width="52" height="52" viewBox="0 0 16 16"
        style={{ imageRendering: "pixelated" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ rotate: [-8, 8, -8, 0], transition: { duration: 0.4 } }}
      >
        <rect x="4" y="1" width="8" height="2" fill="#3D2B1F" />
        <rect x="3" y="2" width="1" height="2" fill="#3D2B1F" />
        <rect x="12" y="2" width="1" height="2" fill="#3D2B1F" />
        <rect x="3" y="3" width="10" height="6" fill="#F5C9A0" />
        <rect x="2" y="4" width="1" height="2" fill="#EAB990" />
        <rect x="13" y="4" width="1" height="2" fill="#EAB990" />
        <rect x="5" y="5" width="2" height="2" fill="#222034" />
        <rect x="9" y="5" width="2" height="2" fill="#222034" />
        <rect x="6" y="5" width="1" height="1" fill="#FFFFFF" />
        <rect x="10" y="5" width="1" height="1" fill="#FFFFFF" />
        <rect x="6" y="8" width="1" height="1" fill="#C07858" />
        <rect x="9" y="8" width="1" height="1" fill="#C07858" />
        <rect x="7" y="9" width="2" height="1" fill="#C07858" />
        <rect x="4" y="10" width="8" height="4" fill="#5B9BD5" />
        <rect x="7" y="10" width="2" height="2" fill="#4A8AC4" />
        <rect x="2" y="10" width="2" height="3" fill="#F5C9A0" />
        <rect x="12" y="10" width="2" height="3" fill="#F5C9A0" />
        <rect x="5" y="14" width="2" height="2" fill="#2E2A50" />
        <rect x="9" y="14" width="2" height="2" fill="#2E2A50" />
        <rect x="4" y="15" width="3" height="1" fill="#1A1830" />
        <rect x="9" y="15" width="3" height="1" fill="#1A1830" />
        <rect x="0" y="0" width="1" height="1" fill="#FFE8A0" />
        <rect x="15" y="2" width="1" height="1" fill="#A8DCFF" />
        <rect x="1" y="8" width="1" height="1" fill="#D0A8FF" />
      </motion.svg>

      <div style={{
        textAlign: "center",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "6px",
        color: "#7EC8E3",
        marginTop: "2px",
        letterSpacing: "1px",
      }}>
        BERT
      </div>
    </motion.div>
  );
}

// ── Main Desktop ──────────────────────────────────────────────────────────────
export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1000);
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const APP_ICONS: Record<string, React.ReactNode> = {
    resume: <PxlKitIcon icon={Download} size={26} colorful />,
    experience: <PxlKitIcon icon={History} size={26} colorful />,
    portfolio: <PxlKitIcon icon={MessageSquare} size={26} colorful />,
    about: <PxlKitIcon icon={User} size={26} colorful />,
    contact: <PxlKitIcon icon={CheckCircle} size={26} colorful />,
    settings: <PxlKitIcon icon={Settings} size={26} colorful />,
  };

  const APP_ICONS_SM: Record<string, React.ReactNode> = {
    resume: <PxlKitIcon icon={Download} size={20} colorful />,
    experience: <PxlKitIcon icon={History} size={20} colorful />,
    portfolio: <PxlKitIcon icon={MessageSquare} size={20} colorful />,
    about: <PxlKitIcon icon={User} size={20} colorful />,
    contact: <PxlKitIcon icon={CheckCircle} size={20} colorful />,
    settings: <PxlKitIcon icon={Settings} size={20} colorful />,
  };

  const getWindowComponent = (appId: string) => {
    switch (appId) {
      case "resume": return <Resume />;
      case "experience": return <Experience />;
      case "portfolio": return <Portfolio />;
      case "about": return <About />;
      case "contact": return <Contact />;
      case "settings": return <SettingsApp />;
      default: return <div>Not found</div>;
    }
  };

  const getAppConfig = (appId: string) => portfolioData.apps.find((a) => a.id === appId);

  const openApp = (appId: string) => {
    const existing = openWindows.find((w) => w.appId === appId);
    if (existing) {
      const nz = maxZIndex + 1; setMaxZIndex(nz);
      setOpenWindows(openWindows.map((w) => w.id === existing.id ? { ...w, zIndex: nz, isMinimized: false } : w));
      return;
    }
    const nz = maxZIndex + 1; setMaxZIndex(nz);
    setOpenWindows((p) => [...p, { id: `${appId}-${Date.now()}`, appId, isMinimized: false, zIndex: nz }]);
  };

  const openAppAndCloseMenu = (appId: string) => {
    openApp(appId);
    setMenuOpen(false);
  };

  const closeWindow = (id: string) => setOpenWindows(openWindows.filter((w) => w.id !== id));
  const minimizeWindow = (id: string) => setOpenWindows(openWindows.map((w) => w.id === id ? { ...w, isMinimized: true } : w));
  const focusWindow = (id: string) => {
    const nz = maxZIndex + 1; setMaxZIndex(nz);
    setOpenWindows(openWindows.map((w) => w.id === id ? { ...w, zIndex: nz } : w));
  };

  const getDimensions = (appId: string) =>
    ({ resume: { width: 800, height: 720 }, experience: { width: 720, height: 640 }, portfolio: { width: 860, height: 700 }, about: { width: 760, height: 620 }, contact: { width: 720, height: 640 }, settings: { width: 560, height: 480 } }[appId] ?? { width: 800, height: 700 });

  const getInitialPos = (_: string, i: number) => ({ x: 120 + i * 28, y: 70 + i * 28 });

  const menuApps = [...portfolioData.apps, { id: "settings", name: "Settings", description: "Preferences" }];

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      <PixelSkyline />

      {/* Soft vignette */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        background: "radial-gradient(ellipse at 50% 40%, transparent 45%, rgba(8,5,24,0.5) 100%)",
      }} />

      {/* ── HERO ── */}
      <div className="absolute inset-x-0 top-0 flex flex-col items-center z-20 pointer-events-none select-none" style={{ paddingTop: "clamp(20px, 5vh, 48px)" }}>
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 4, left: 4, fontSize: "clamp(18px, 3.8vw, 46px)", color: "#0e0c28", letterSpacing: "7px", whiteSpace: "nowrap" }}>
            BERTRAND
          </div>
          <motion.div
            animate={{ textShadow: ["0 0 8px rgba(160,210,255,0.55), 0 0 22px rgba(120,170,255,0.28)", "0 0 14px rgba(180,225,255,0.75), 0 0 36px rgba(140,190,255,0.38)", "0 0 8px rgba(160,210,255,0.55), 0 0 22px rgba(120,170,255,0.28)"] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            style={{ fontSize: "clamp(18px, 3.8vw, 46px)", color: "#D8EEFF", letterSpacing: "7px", whiteSpace: "nowrap", position: "relative" }}
          >
            BERTRAND
          </motion.div>
        </motion.div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
          style={{ width: "clamp(140px, 28vw, 340px)", height: "3px", margin: "10px 0", background: "repeating-linear-gradient(90deg, #7EC8E3 0,#7EC8E3 6px,transparent 6px,transparent 12px)", opacity: 0.65 }}
        />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ fontSize: "clamp(7px, 1.1vw, 10px)", color: "#9DCFEA", letterSpacing: "5px" }}
        >
          SOFTWARE ENGINEER
        </motion.div>
      </div>

      {/* ── App icons — desktop only ── */}
      <div className="hidden md:flex absolute top-0 left-8 bottom-14 z-30 flex-col gap-1 justify-center" style={{ paddingBottom: "100px" }}>
        {portfolioData.apps.map((app, idx) => (
          <motion.div key={app.id} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + idx * 0.07 }}>
            <AppIcon
              icon={APP_ICONS[app.id] ?? <span style={{ fontSize: 20 }}>?</span>}
              name={app.name}
              description={app.description}
              onClick={() => openApp(app.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Pixel mascot — desktop only ── */}
      <div className="hidden md:block">
        <PixelMascot />
      </div>

      {/* ── Windows ── */}
      <AnimatePresence mode="popLayout">
        {openWindows.map((win) => {
          const app = getAppConfig(win.appId);
          const dim = getDimensions(win.appId);
          const widx = openWindows.filter((w) => w.appId === win.appId).indexOf(win);
          return (
            <Window key={win.id} id={win.id} title={app?.name ?? "Window"}
              isMinimized={win.isMinimized}
              onClose={() => closeWindow(win.id)} onMinimize={() => minimizeWindow(win.id)} onFocus={() => focusWindow(win.id)}
              width={dim.width} height={dim.height} initialX={getInitialPos(win.appId, widx).x} initialY={getInitialPos(win.appId, widx).y} zIndex={win.zIndex}
            >
              {getWindowComponent(win.appId)}
            </Window>
          );
        })}
      </AnimatePresence>

      {/* ── Taskbar — desktop only ── */}
      <div data-no-particle className="hidden md:flex absolute bottom-0 left-0 right-0 z-[9999] items-center px-2 gap-2"
        style={{ height: "40px", background: "var(--c-taskbar-bg)", borderTop: "2px solid var(--c-border-hi)", backdropFilter: "blur(6px)" }}
      >
        <button
          data-no-particle
          title="Settings"
          onClick={() => openApp("settings")}
          style={{
            fontFamily: "'Press Start 2P', monospace", display: "flex", alignItems: "center", gap: "6px",
            background: "var(--c-bg-btn)", color: "var(--c-text-md)", border: "2px solid var(--c-border-hi)",
            padding: "4px 10px", cursor: "pointer", fontSize: "7px", letterSpacing: "1px",
            flexShrink: 0, boxShadow: "2px 2px 0 var(--c-shadow-2)", transition: "background 0.1s",
            height: "28px", boxSizing: "border-box",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--c-btn-hover)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--c-bg-btn)")}
          onMouseDown={e => (e.currentTarget.style.transform = "translate(1px,1px)")}
          onMouseUp={e => (e.currentTarget.style.transform = "")}
        >
          <PxlKitIcon icon={Settings} size={16} colorful />
          <span>SETTINGS</span>
        </button>

        <div style={{ width: "1px", height: "22px", background: "var(--c-border-lo)", flexShrink: 0 }} />

        <div className="flex gap-1 flex-1 min-w-0 overflow-hidden">
          {openWindows.length === 0
            ? <span style={{ color: "var(--c-border-lo)", fontSize: "7px", letterSpacing: "2px", alignSelf: "center" }}>NO OPEN WINDOWS</span>
            : openWindows.map((win) => {
              const app = getAppConfig(win.appId);
              const active = !win.isMinimized;
              return (
                <button key={win.id} data-no-particle
                  onClick={() => {
                    if (win.isMinimized) {
                      const nz = maxZIndex + 1; setMaxZIndex(nz);
                      setOpenWindows(openWindows.map((w) => w.id === win.id ? { ...w, isMinimized: false, zIndex: nz } : w));
                    } else minimizeWindow(win.id);
                  }}
                  style={{
                    fontFamily: "'Press Start 2P', monospace", fontSize: "7px",
                    background: active ? "var(--c-bg-btn)" : "var(--c-bg)",
                    color: active ? "var(--c-text-md)" : "var(--c-text-lo)",
                    border: `2px solid ${active ? "var(--c-border-hi)" : "var(--c-border-lo)"}`,
                    padding: "4px 8px", cursor: "pointer", overflow: "hidden",
                    textOverflow: "ellipsis", whiteSpace: "nowrap", letterSpacing: "0.5px",
                    flexShrink: 0, display: "flex", alignItems: "center", gap: "5px",
                    maxWidth: "130px", height: "28px", boxSizing: "border-box",
                  }}
                >
                  {APP_ICONS[win.appId]}
                  <span>{app?.name ?? "APP"}</span>
                </button>
              );
            })
          }
        </div>

        <div style={{ color: "#6AAED0", fontSize: "8px", letterSpacing: "2px", flexShrink: 0 }}>{time}</div>
      </div>

      {/* ── Mobile taskbar ── */}
      <div data-no-particle className="md:hidden absolute bottom-0 left-0 right-0 z-[9999] flex items-center justify-between px-3"
        style={{ height: "calc(44px + env(safe-area-inset-bottom))", paddingBottom: "env(safe-area-inset-bottom)", background: "var(--c-taskbar-bg)", borderTop: "2px solid var(--c-border-hi)", backdropFilter: "blur(6px)" }}
      >
        <button
          data-no-particle
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            fontFamily: "'Press Start 2P', monospace", display: "flex", alignItems: "center", gap: "7px",
            background: menuOpen ? "var(--c-btn-hover)" : "var(--c-bg-btn)",
            color: "var(--c-text-md)", border: "2px solid var(--c-border-hi)",
            padding: "4px 12px", cursor: "pointer", fontSize: "7px", letterSpacing: "1px",
            height: "30px", boxSizing: "border-box", boxShadow: "2px 2px 0 var(--c-shadow-2)",
          }}
        >
          <span style={{ fontSize: "9px", lineHeight: 1, display: "flex", alignItems: "center", position: "relative", top: "-2px" }}>{menuOpen ? "✕" : "☰"}</span>
          <span style={{ lineHeight: 1 }}>{menuOpen ? "CLOSE" : "MENU"}</span>
        </button>

        <span style={{ color: "var(--c-text-lo)", fontSize: "7px", letterSpacing: "1px" }}>
          {openWindows.filter(w => !w.isMinimized).length > 0
            ? openWindows.filter(w => !w.isMinimized).slice(-1)[0] && getAppConfig(openWindows.filter(w => !w.isMinimized).slice(-1)[0].appId)?.name.toUpperCase()
            : "DESKTOP"}
        </span>

        <span style={{ color: "#6AAED0", fontSize: "8px", letterSpacing: "2px" }}>{time}</span>
      </div>

      {/* ── Mobile menu panel ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-no-particle
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute left-0 right-0 z-[9998]"
            style={{
              bottom: "calc(44px + env(safe-area-inset-bottom))",
              background: "var(--c-taskbar-bg)",
              borderTop: "2px solid var(--c-border-hi)",
              backdropFilter: "blur(8px)",
              maxHeight: "65vh",
              overflowY: "auto",
              padding: "16px",
            }}
          >
            {/* Apps grid */}
            <div style={{ fontSize: "7px", color: "var(--c-text-lo)", letterSpacing: "3px", marginBottom: "10px" }}>APPS</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
              {menuApps.map((app) => {
                const isOpen = openWindows.some(w => w.appId === app.id && !w.isMinimized);
                return (
                  <button
                    key={app.id}
                    data-no-particle
                    onClick={() => openAppAndCloseMenu(app.id)}
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      display: "flex", alignItems: "center", gap: "10px",
                      background: isOpen ? "var(--c-btn-hover)" : "var(--c-bg-btn)",
                      color: "var(--c-text-md)", border: `2px solid ${isOpen ? "var(--c-border-hi)" : "var(--c-border-lo)"}`,
                      padding: "10px 12px", cursor: "pointer", fontSize: "7px", letterSpacing: "1px",
                      textAlign: "left", boxSizing: "border-box", width: "100%",
                    }}
                  >
                    {APP_ICONS_SM[app.id] ?? <span style={{ fontSize: 18 }}>?</span>}
                    <span>{app.name.toUpperCase()}</span>
                  </button>
                );
              })}
            </div>

            {/* Open windows */}
            {openWindows.length > 0 && (
              <>
                <div style={{ height: "1px", background: "var(--c-border-lo)", marginBottom: "12px" }} />
                <div style={{ fontSize: "7px", color: "var(--c-text-lo)", letterSpacing: "3px", marginBottom: "10px" }}>OPEN WINDOWS</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {openWindows.map((win) => {
                    const app = getAppConfig(win.appId);
                    return (
                      <div key={win.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button
                          data-no-particle
                          onClick={() => {
                            const nz = maxZIndex + 1; setMaxZIndex(nz);
                            setOpenWindows(openWindows.map((w) => w.id === win.id ? { ...w, isMinimized: false, zIndex: nz } : w));
                            setMenuOpen(false);
                          }}
                          style={{
                            fontFamily: "'Press Start 2P', monospace", flex: 1,
                            display: "flex", alignItems: "center", gap: "8px",
                            background: "var(--c-bg-btn)", color: "var(--c-text-md)",
                            border: "2px solid var(--c-border-lo)", padding: "8px 10px",
                            cursor: "pointer", fontSize: "7px", letterSpacing: "1px", textAlign: "left",
                          }}
                        >
                          {APP_ICONS_SM[win.appId]}
                          <span>{app?.name.toUpperCase() ?? "APP"}</span>
                        </button>
                        <button
                          data-no-particle
                          onClick={() => closeWindow(win.id)}
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            background: "var(--c-bg-btn)", color: "var(--c-text-md)",
                            border: "2px solid var(--c-border-lo)", padding: "8px 10px",
                            cursor: "pointer", fontSize: "9px", flexShrink: 0,
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
