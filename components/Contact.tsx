"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { portfolioData } from "@/lib/data";

const { personalInfo } = portfolioData;

const SOCIAL_LINKS = [
  { Icon: FaGithub, label: "GITHUB", href: personalInfo.github },
  { Icon: FaLinkedin, label: "LINKEDIN", href: personalInfo.linkedin },
  { Icon: FaEnvelope, label: "EMAIL", href: `mailto:${personalInfo.email}` },
];

const CORNERS = ["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"];

function PixelCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="relative border border-[#1b3a66] p-4 mb-4 bg-[#0c1f38]/60"
    >
      {CORNERS.map((pos) => (
        <div key={pos} className={`absolute ${pos} w-1.5 h-1.5 bg-[#2f5f9a]`} />
      ))}
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-2 mb-4 text-[#4a84d0] tracking-widest"
      style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px" }}
    >
      <span className="text-[#b7d6ff]">▸</span>
      {children}
      <div className="flex-1 h-px bg-[repeating-linear-gradient(90deg,#1b3a66_0px,#1b3a66_4px,transparent_4px,transparent_8px)]" />
    </div>
  );
}

function PixelInput({
  label, name, value, onChange, type = "text", placeholder, textarea = false,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string; placeholder?: string; textarea?: boolean;
}) {
  const sharedClass =
    "w-full bg-[#0b1f3a] text-[#b7d6ff] border border-[#2f5f9a] p-2 outline-none transition-colors focus:border-[#b7d6ff]";
  const sharedStyle = { fontFamily: "'Press Start 2P', monospace", fontSize: "8px", letterSpacing: "1px" };

  return (
    <div className="mb-4">
      <label
        className="block text-[#4a84d0] tracking-widest mb-1.5"
        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px" }}
      >
        ▸ {label}
      </label>
      {textarea ? (
        <textarea
          name={name} value={value} onChange={onChange} rows={4}
          placeholder={placeholder} required
          className={`${sharedClass} resize-none`}
          style={sharedStyle}
        />
      ) : (
        <input
          type={type} name={name} value={value} onChange={onChange}
          placeholder={placeholder} required
          className={sharedClass}
          style={sharedStyle}
        />
      )}
    </div>
  );
}

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setFormData({ name: "", email: "", message: "" });
        }, 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div
      className="p-5 min-h-full text-[#b7d6ff] bg-[#050d1a]"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <div className="text-[#d6e6ff] tracking-[4px] mb-1.5" style={{ fontSize: "14px" }}>
          CONTACT.EXE
        </div>
        <div
          className="h-0.5 opacity-60"
          style={{ background: "repeating-linear-gradient(90deg, #4a84d0 0px, #4a84d0 8px, transparent 8px, transparent 16px)" }}
        />
      </motion.div>

      {/* Social links */}
      <PixelCard delay={0.1}>
        <SectionLabel>SIGNAL CHANNELS</SectionLabel>
        <div className="flex gap-3">
          {SOCIAL_LINKS.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 p-3 border border-[#2f5f9a] bg-[#0b1f3a] text-[#b7d6ff] hover:border-[#b7d6ff] hover:text-[#d6e6ff] hover:bg-[#0f2a4a] transition-colors no-underline flex-1"
            >
              <Icon size={20} />
              <span className="tracking-widest" style={{ fontSize: "6px" }}>{label}</span>
            </motion.a>
          ))}
        </div>
      </PixelCard>

      {/* Form */}
      <PixelCard delay={0.2}>
        <SectionLabel>TRANSMIT MESSAGE</SectionLabel>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-6 gap-3 text-[#66ff99] tracking-widest"
            style={{ fontSize: "9px" }}
          >
            <span style={{ fontSize: "24px" }}>✓</span>
            <span>MESSAGE TRANSMITTED</span>
            <span>SUCCESSFULLY</span>
          </motion.div>
        ) : status === "error" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-6 gap-3 text-[#ff6666] tracking-widest"
            style={{ fontSize: "9px" }}
          >
            <span style={{ fontSize: "24px" }}>✕</span>
            <span>TRANSMISSION FAILED</span>
            <span className="text-[#ff9999]">PLEASE TRY AGAIN</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <PixelInput label="NAME" name="name" value={formData.name} onChange={handleChange} placeholder="your name" />
            <PixelInput label="EMAIL" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="your@email.com" />
            <PixelInput label="MESSAGE" name="message" value={formData.message} onChange={handleChange} placeholder="your message..." textarea />
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={status !== "loading" ? { scale: 1.02 } : {}}
              whileTap={status !== "loading" ? { scale: 0.97 } : {}}
              className="w-full p-3 text-white border-2 border-[#6ea3e2] bg-[#1d3f70] cursor-pointer tracking-widest disabled:opacity-60 disabled:cursor-not-allowed transition-colors hover:bg-[#254e8a]"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", boxShadow: "3px 3px 0 #08162f" }}
            >
              {status === "loading" ? "TRANSMITTING..." : "▶ TRANSMIT"}
            </motion.button>
          </form>
        )}
      </PixelCard>
    </div>
  );
}
