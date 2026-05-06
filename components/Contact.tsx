"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";
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
      className="relative border border-(--c-border-lo) p-4 mb-4 bg-(--c-bg-card)"
    >
      {CORNERS.map((pos) => (
        <div key={pos} className={`absolute ${pos} w-1.5 h-1.5 bg-(--c-border-md)`} />
      ))}
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-2 mb-4 text-(--c-accent) tracking-widest"
      style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px" }}
    >
      <span className="text-(--c-text-md)">▸</span>
      {children}
      <div className="flex-1 h-px" style={{ background: "repeating-linear-gradient(90deg, var(--c-border-lo) 0px, var(--c-border-lo) 4px, transparent 4px, transparent 8px)" }} />
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
    "w-full bg-(--c-bg-card) text-(--c-text-md) border border-(--c-border-md) p-2 outline-none transition-colors focus:border-(--c-text-md)";
  const sharedStyle = { fontFamily: "'Press Start 2P', monospace", fontSize: "8px", letterSpacing: "1px" };

  return (
    <div className="mb-4">
      <label
        className="block text-(--c-accent) tracking-widest mb-1.5"
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
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div
      className="p-5 min-h-full text-(--c-text-md) bg-(--c-bg)"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <div className="text-(--c-text-hi) tracking-[4px] mb-1.5" style={{ fontSize: "14px" }}>
          CONTACT.EXE
        </div>
        <div
          className="h-0.5 opacity-60"
          style={{ background: "repeating-linear-gradient(90deg, var(--c-accent) 0px, var(--c-accent) 8px, transparent 8px, transparent 16px)" }}
        />
      </motion.div>

      <PixelCard delay={0.1}>
        <SectionLabel>PLATFORMS</SectionLabel>
        <div className="flex gap-3">
          {SOCIAL_LINKS.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 p-3 border border-(--c-border-md) bg-(--c-bg-card) text-(--c-text-md) hover:border-(--c-text-md) hover:text-(--c-text-hi) transition-colors no-underline flex-1"
            >
              <Icon size={20} />
              <span className="tracking-widest" style={{ fontSize: "6px" }}>{label}</span>
            </motion.a>
          ))}
        </div>
      </PixelCard>

      <PixelCard delay={0.2}>
        <SectionLabel>SEND A MESSAGE</SectionLabel>

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
              className="w-full p-3 text-white border-2 border-(--c-border-hi) bg-(--c-bg-btn) cursor-pointer tracking-widest disabled:opacity-60 disabled:cursor-not-allowed transition-colors hover:bg-(--c-btn-hover)"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", boxShadow: "3px 3px 0 var(--c-shadow-2)" }}
            >
              {status === "loading" ? "TRANSMITTING..." : "▶ TRANSMIT"}
            </motion.button>
          </form>
        )}
      </PixelCard>
    </div>
  );
}
