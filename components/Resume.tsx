"use client";

export default function Resume() {
  return (
    <div className="flex flex-col h-full bg-[#050d1a]">
      <div className="flex items-center justify-end px-4 py-2 shrink-0 border-b border-[#1b3a66] bg-[#071223]">
        <a
          href="/portfolio/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 text-[7px] tracking-[1px] bg-[#0c2448] text-[#b7d6ff] border border-[#2f5f9a] hover:bg-[#1d3f70] transition-colors duration-100"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          ↗ OPEN IN NEW TAB
        </a>
      </div>
      <div className="flex-1 overflow-hidden">
        <iframe
          src="/portfolio/resume.pdf"
          className="w-full h-full border-0"
          title="Resume PDF"
        />
      </div>
    </div>
  );
}
