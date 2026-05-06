"use client";

import React, { useEffect, useRef } from "react";

export default function PixelSkyline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const particlesRef = useRef<
    { x: number; y: number; vx: number; vy: number; life: number; color: string }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;

    // ── Seeded PRNG — deterministic ──────────────────────
    const makePrng = (initSeed: number) => {
      let s = initSeed;
      return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
    };

    const STAR_COLORS = ["#C8E6FF", "#FFE8C0", "#D4C8FF", "#B8F0D8", "#FFD0E0"];
    type Star = { x: number; y: number; s: number; ph: number; sp: number; col: string };
    let stars: Star[] = [];

    const spawnParticles = (x: number, y: number) => {
      const cols = ["#7EC8E3", "#FFD6A5", "#C8A8FF", "#98D8C8", "#FFB0C0"];
      for (let i = 0; i < 8; i++) {
        particlesRef.current.push({
          x, y,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * -3 - 1,
          life: 1,
          color: cols[Math.floor(Math.random() * cols.length)],
        });
      }
    };

    // ── Pre-baked building data (computed once on resize) ──
    type Building = {
      x: number; w: number; h: number; tone: string;
      hasAntenna: boolean; antennaX: number;
      windows: { wx: number; wy: number; warm: boolean }[];
    };
    let buildings: Building[] = [];
    let rightBuildings: Building[] = [];

    // ── Pre-baked supertree frond data ──
    type Frond = { fx: number; flen: number };
    type Supertree = { stx: number; height: number; crownR: number; glowCol: string; fronds: Frond[] };
    let supertrees: Supertree[] = [];

    const buildingTones = [
      "#131035", "#161240", "#1A1548", "#1C1850",
      "#121038", "#0E0C2E", "#181544", "#14103C",
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const W = canvas.width, H = canvas.height;
      const p = 4;
      const gw = Math.ceil(W / p);
      const gh = Math.ceil(H / p);
      const groundY = Math.round(gh * 0.68);

      // Regenerate stars
      stars = Array.from({ length: 80 }, () => ({
        x: Math.random() * W,
        y: Math.random() * groundY * p * 0.9,
        s: Math.random() < 0.1 ? 4 : Math.random() < 0.35 ? 3 : 2,
        ph: Math.random() * Math.PI * 2,
        sp: 0.005 + Math.random() * 0.015,
        col: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }));

      // ── Pre-bake buildings ──
      const prng = makePrng(42);
      buildings = [];
      const cbdEnd = Math.floor(gw * 0.50);
      let bx = 2;
      while (bx < cbdEnd) {
        const bw = 4 + Math.floor(prng() * 9);
        const rawH = 10 + Math.floor(prng() * Math.floor(groundY * 0.70));
        const tone = buildingTones[Math.floor(prng() * buildingTones.length)];
        const edgeFactor = bx < gw * 0.08 ? 0.45 : bx > cbdEnd * 0.88 ? 0.6 : 1.0;
        const bh = Math.max(4, Math.floor(rawH * edgeFactor));
        const antCheck = prng();
        const hasAntenna = bh > groundY * 0.28 && antCheck > 0.5;
        const antennaX = bx + Math.floor(bw / 2);

        const windows: { wx: number; wy: number; warm: boolean }[] = [];
        for (let wy = groundY - bh + 2; wy < groundY - 1; wy += 3) {
          for (let wx = bx + 1; wx < bx + bw - 1; wx += 2) {
            const lit = Math.sin(wx * 1.7 + wy * 2.3 + 41) > 0.25;
            if (lit) {
              const warm = prng() > 0.2;
              windows.push({ wx, wy, warm });
            }
          }
        }

        buildings.push({ x: bx, w: bw, h: bh, tone, hasAntenna, antennaX, windows });
        bx += bw + Math.floor(prng() * 2) + 1;
      }

      // ── Pre-bake right background buildings (behind Flyer) ──
      const rbPrng = makePrng(314);
      rightBuildings = [];
      const rbStart = Math.floor(gw * 0.68);
      const rbEnd   = Math.floor(gw * 0.77);
      let rbx = rbStart;
      while (rbx < rbEnd) {
        const bw   = 3 + Math.floor(rbPrng() * 6);
        const bh   = 4 + Math.floor(rbPrng() * Math.floor(groundY * 0.32));
        const tone = buildingTones[Math.floor(rbPrng() * buildingTones.length)];
        const windows: { wx: number; wy: number; warm: boolean }[] = [];
        for (let wy = groundY - bh + 2; wy < groundY - 1; wy += 3) {
          for (let wx = rbx + 1; wx < rbx + bw - 1; wx += 2) {
            if (Math.sin(wx * 2.1 + wy * 1.8 + 99) > 0.3)
              windows.push({ wx, wy, warm: rbPrng() > 0.35 });
          }
        }
        rightBuildings.push({ x: rbx, w: bw, h: bh, tone, hasAntenna: false, antennaX: 0, windows });
        rbx += bw + Math.floor(rbPrng() * 2) + 1;
      }

      // ── Pre-bake supertrees ──
      const stPrng = makePrng(777);
      const streeBase = Math.floor(gw * 0.78);
      const stDefs = [
        { stx: streeBase,      height: Math.floor(gh * 0.20), crownR: 11, glowCol: "#DD66FF" },
        { stx: streeBase + 16, height: Math.floor(gh * 0.28), crownR: 16, glowCol: "#8844FF" },
        { stx: streeBase + 36, height: Math.floor(gh * 0.24), crownR: 13, glowCol: "#AA66FF" },
        { stx: streeBase + 54, height: Math.floor(gh * 0.18), crownR: 10, glowCol: "#CC44FF" },
        { stx: streeBase + 70, height: Math.floor(gh * 0.14), crownR:  8, glowCol: "#EE88FF" },
      ];
      supertrees = stDefs.map((d) => {
        const bottomCW = d.crownR * 2;
        const fronds: Frond[] = [];
        for (let fx = d.stx - bottomCW / 2; fx < d.stx + bottomCW / 2; fx += 3) {
          fronds.push({ fx, flen: 2 + Math.floor(stPrng() * 3) });
        }
        return { ...d, fronds };
      });
    };

    // ── Dome drawing (ellipse widest at base, triangular spike panels) ──
    const drawDome = (
      domeX: number, domeW: number, domeH: number, baseY: number
    ) => {
      const domeGlow = 0.65 + 0.35 * Math.sin(t * 0.04 + domeX * 0.12);
      for (let row = 0; row < domeH; row++) {
        const frac = row / domeH;
        const hw = Math.max(1, Math.round((domeW / 2) * Math.sqrt(1 - (1 - frac) * (1 - frac))));
        const rowY = baseY - domeH + row;
        const sweep = 0.72 + 0.28 * Math.sin(t * 0.035 + domeX * 0.09 + row * 0.18);
        const brightness = (1 - frac * 0.26) * (0.84 + 0.16 * domeGlow * sweep);
        ctx.fillStyle = `rgb(${Math.round(180 * brightness)},${Math.round(172 * brightness)},${Math.round(200 * brightness)})`;
        ctx.fillRect((domeX - hw) * 4, rowY * 4, hw * 2 * 4, 4);
        // Triangular spike panel grooves
        if (row % 3 !== 1) {
          for (let sx = domeX - hw + 1; sx < domeX + hw - 1; sx += 4) {
            const groovePulse = 0.28 + 0.22 * Math.sin(t * 0.06 + sx * 0.14 + row * 0.22);
            ctx.fillStyle = `rgba(60,50,80,${groovePulse.toFixed(3)})`;
            ctx.fillRect(sx * 4, rowY * 4, 4, 4);
          }
        }
      }
      // Bright highlight at crown
      const topHW = Math.max(1, Math.round((domeW / 2) * 0.15));
      ctx.fillStyle = domeGlow > 0.8 ? "#FFF6C8" : "#E8E0F8";
      ctx.fillRect((domeX - topHW) * 4, (baseY - domeH) * 4, topHW * 2 * 4, 4);
    };

    const draw = () => {
      t++;
      const W = canvas.width, H = canvas.height;
      const p = 4;
      const gw = Math.ceil(W / p);
      const gh = Math.ceil(H / p);

      const groundY = Math.round(gh * 0.68);
      const waterY  = groundY + 1;
      const waterH  = gh - waterY;
      const bankY   = gh;

      const pix = (bx: number, by: number, bw = 1, bh = 1) => {
        ctx.fillRect(Math.floor(bx) * p, Math.floor(by) * p,
          Math.max(1, Math.ceil(bw)) * p, Math.max(1, Math.ceil(bh)) * p);
      };

      // ── SKY ──────────────────────────────────────────────
      const sky = ctx.createLinearGradient(0, 0, 0, groundY * p);
      sky.addColorStop(0, "#09082A");
      sky.addColorStop(0.5, "#14113E");
      sky.addColorStop(1, "#1E1650");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, groundY * p);

      // ── STARS ────────────────────────────────────────────
      for (const s of stars) {
        s.ph += s.sp;
        const a = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(s.ph));
        ctx.globalAlpha = a;
        ctx.fillStyle = s.col;
        ctx.fillRect(Math.round(s.x / p) * p, Math.round(s.y / p) * p, s.s, s.s);
      }
      ctx.globalAlpha = 1;

      // ── MOON ─────────────────────────────────────────────
      const moonGX = Math.floor(gw * 0.87);
      const moonGY = Math.floor(gh * 0.08);
      ctx.fillStyle = "#FFFCE0";
      pix(moonGX, moonGY, 5, 5);
      ctx.fillStyle = "#FFF8C0";
      pix(moonGX - 1, moonGY + 1, 7, 3);
      pix(moonGX, moonGY - 1, 5, 1);
      pix(moonGX, moonGY + 5, 5, 1);
      ctx.fillStyle = "#14113E";
      pix(moonGX + 2, moonGY, 4, 5);
      pix(moonGX + 1, moonGY + 1, 1, 3);
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = "#FFFCE0";
      ctx.beginPath();
      ctx.arc((moonGX + 2) * p, (moonGY + 2) * p, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // ── CBD BUILDINGS (pre-baked) ─────────────────────────
      for (const b of buildings) {
        ctx.fillStyle = b.tone;
        pix(b.x, groundY - b.h, b.w, b.h);
        ctx.fillStyle = "#201A55";
        pix(b.x + 1, groundY - b.h, b.w - 2, 1);
        if (b.hasAntenna) {
          ctx.fillStyle = "#2A2060";
          pix(b.antennaX, groundY - b.h - 4, 1, 4);
          ctx.fillStyle = "#FF4466";
          ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 0.07);
          pix(b.antennaX, groundY - b.h - 4, 1, 1);
          ctx.globalAlpha = 1;
        }
        for (const w of b.windows) {
          const flicker = 0.5 + 0.25 * Math.sin(t * 0.018 + w.wx * 0.3 + w.wy * 0.15);
          ctx.globalAlpha = flicker;
          ctx.fillStyle = w.warm ? "#FFE8A0" : "#A8DCFF";
          pix(w.wx, w.wy, 1, 1);
        }
        ctx.globalAlpha = 1;
      }

      // ── ESPLANADE — two large domes (BIGGER SCALE) ───────────
      const SCALE = 1.7;
      const espCX = Math.floor(gw * 0.07);
      const espBaseY = groundY;
      // Bigger domes
      drawDome(espCX, Math.floor(40 * SCALE), Math.floor(22 * SCALE), espBaseY);
      drawDome(
        espCX + Math.floor(26 * SCALE),
        Math.floor(34 * SCALE),
        Math.floor(19 * SCALE),
        espBaseY
      );
      // Glass lobby base
      ctx.fillStyle = "#706880";
      pix(
        espCX - Math.floor(20 * SCALE),
        espBaseY - Math.floor(4 * SCALE),
        Math.floor(72 * SCALE),
        Math.floor(4 * SCALE)
      );
      // Glass reflections
      ctx.fillStyle = "#4070A8";
      ctx.globalAlpha = 0.35;
      for (
        let gx2 = espCX - Math.floor(18 * SCALE);
        gx2 < espCX + Math.floor(50 * SCALE);
        gx2 += Math.floor(4 * SCALE)
      ) {
        pix(gx2, espBaseY - Math.floor(3 * SCALE), 3 * SCALE, 3 * SCALE);
      }
      ctx.globalAlpha = 1;
      // Warm interior glow (scaled)
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = "#FFF0A0";
      ctx.beginPath();
      ctx.arc(
        espCX * p,
        (espBaseY - Math.floor(14 * SCALE)) * p,
        64 * SCALE,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.beginPath();
      ctx.arc(
        (espCX + Math.floor(26 * SCALE)) * p,
        (espBaseY - Math.floor(11 * SCALE)) * p,
        50 * SCALE,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.globalAlpha = 1;

      // ── MARINA BAY SANDS (CURVED TOWERS) ───────────────────
      const mbsX = Math.floor(gw * 0.52);
      const mbsH = Math.round(gh * 0.40);

      const baseW = 14;   // wider bottom
      const topW  = 9;    // narrower top
      const tGap  = 8;

      for (let i = 0; i < 3; i++) {

        const towerCenter = mbsX + i * (baseW + tGap);

        for (let row = 0; row < mbsH; row++) {

          const y = groundY - row;

          // curve profile (smooth taper)
          const t = row / mbsH;
          const curve = Math.sin(t * Math.PI * 0.9) * 0.6;

          const w =
            baseW -
            (baseW - topW) * t -
            curve;

          const tx = Math.floor(towerCenter - w / 2);

          // tower body
          ctx.fillStyle = "#1C1A58";
          pix(tx, y, w, 1);

          // center highlight
          ctx.fillStyle = "#24206A";
          pix(tx + 2, y, w - 4, 1);

          // edge shading
          ctx.fillStyle = "#181458";
          pix(tx, y, 1, 1);
          pix(tx + w - 1, y, 1, 1);

          // windows
          if (row % 2 === 0) {
            for (let col = 2; col < w - 2; col += 2) {

              const wx = tx + col;
              const lit = Math.sin(wx * 1.2 + row * 1.6 + 17) > -0.1;

              if (lit) {
                const flicker =
                  0.5 + 0.2 * Math.sin(t * 30 + wx * 0.4);

                ctx.globalAlpha = flicker;
                ctx.fillStyle =
                  row < mbsH * 0.3 ? "#B8E8FF" :
                  row < mbsH * 0.6 ? "#D0F0FF" :
                                    "#FFE8A0";

                pix(wx, y, 1, 1);
                ctx.globalAlpha = 1;
              }
            }
          }
        }
      }

      const towerBaseW = 14;

      // Skypark
      const spW = 3 * towerBaseW + 2 * tGap + 20;
      const spX = mbsX - 13;
      const spY = groundY - mbsH - 5;
      ctx.fillStyle = "#2A2470";
      pix(spX, spY, spW, 6);
      ctx.fillStyle = "#343080";
      pix(spX, spY, spW, 2);
      ctx.fillStyle = "#201C60";
      pix(spX + 4,  spY + 6, spW - 8,  2);
      pix(spX + 8,  spY + 8, spW - 16, 2);
      pix(spX + 12, spY + 10, spW - 24, 1);
      ctx.fillStyle = "#181458";
      pix(spX, spY + 2, 4, 4);
      pix(spX + 1, spY + 6, 3, 2);
      pix(spX + spW - 4, spY + 2, 4, 4);
      pix(spX + spW - 4, spY + 6, 3, 2);
      ctx.fillStyle = "#60B8E8";
      ctx.globalAlpha = 0.5 + 0.15 * Math.sin(t * 0.05);
      pix(spX + 3, spY, spW - 6, 1);
      ctx.globalAlpha = 1;
      for (let gx = spX + 8; gx < spX + spW - 8; gx += 6) {
        ctx.fillStyle = "#0A2018";
        pix(gx, spY - 3, 3, 3);
        pix(gx + 1, spY - 4, 2, 1);
        ctx.fillStyle = "#143828";
        pix(gx + 1, spY - 3, 1, 2);
      }
      ctx.fillStyle = "#FFC050";
      ctx.globalAlpha = 0.8;
      pix(spX + 1, spY - 1, 2, 1);
      pix(spX + spW - 3, spY - 1, 2, 1);
      ctx.globalAlpha = 1;

      // ── MERLION (between MBS and Supertrees) ─────────────────────────
      {
        const cX = Math.floor(gw * 0.675);  // horizontal center
        const bY = groundY;                  // base y (ground)
        const mB  = "#DDD8EE";  // body white
        const mS  = "#A8A0C0";  // scale/shade grey
        const mD  = "#504868";  // dark detail
        const mE  = "#181030";  // eye
        const mW  = "#90D4F0";  // water spout (light blue)
        const mW2 = "#C0EEFF";  // water highlight

        // Pedestal
        ctx.fillStyle = "#B8B0CC";
        pix(cX - 3, bY - 2, 8, 2);

        // Fish tail (rows 3-5)
        ctx.fillStyle = mB;
        pix(cX - 1, bY - 3, 5, 1);
        pix(cX - 2, bY - 4, 7, 1);
        pix(cX - 3, bY - 5, 8, 1);
        ctx.fillStyle = mS;
        pix(cX + 2, bY - 3, 2, 1);
        pix(cX + 3, bY - 4, 2, 1);
        pix(cX + 3, bY - 5, 2, 1);

        // Fish body (rows 6-13)
        ctx.fillStyle = mB;
        pix(cX - 4, bY - 6,  10, 1);
        pix(cX - 4, bY - 7,  10, 1);
        pix(cX - 5, bY - 8,  11, 1);
        pix(cX - 5, bY - 9,  11, 1);
        pix(cX - 5, bY - 10, 10, 1);
        pix(cX - 4, bY - 11,  9, 1);
        pix(cX - 4, bY - 12,  9, 1);
        pix(cX - 3, bY - 13,  8, 1);
        // Scales
        ctx.fillStyle = mS;
        pix(cX - 2, bY - 6,  1, 1); pix(cX,     bY - 6,  1, 1); pix(cX + 2, bY - 6,  1, 1);
        pix(cX - 3, bY - 8,  1, 1); pix(cX - 1, bY - 8,  1, 1); pix(cX + 1, bY - 8,  1, 1); pix(cX + 3, bY - 8,  1, 1);
        pix(cX - 2, bY - 10, 1, 1); pix(cX,     bY - 10, 1, 1); pix(cX + 2, bY - 10, 1, 1);
        pix(cX - 2, bY - 12, 1, 1); pix(cX,     bY - 12, 1, 1); pix(cX + 2, bY - 12, 1, 1);
        pix(cX + 4, bY - 7,  1, 2);  // right body shadow

        // Lion mane (rows 14-17)
        ctx.fillStyle = mB;
        pix(cX - 5, bY - 14, 12, 1);
        pix(cX - 6, bY - 15, 13, 1);
        pix(cX - 6, bY - 16, 13, 1);
        pix(cX - 5, bY - 17, 11, 1);
        ctx.fillStyle = mS;
        pix(cX - 4, bY - 14, 1, 1); pix(cX - 2, bY - 14, 1, 1); pix(cX, bY - 14, 1, 1); pix(cX + 2, bY - 14, 1, 1); pix(cX + 4, bY - 14, 1, 1);
        pix(cX - 5, bY - 16, 1, 1); pix(cX - 3, bY - 16, 1, 1); pix(cX - 1, bY - 16, 1, 1); pix(cX + 1, bY - 16, 1, 1); pix(cX + 3, bY - 16, 1, 1);

        // ── MERLION HEAD (faces LEFT) ─────────────────────────
        // Main head shape
        ctx.fillStyle = mB;
        pix(cX - 5, bY - 18, 10, 1);
        pix(cX - 4, bY - 19,  9, 1);
        pix(cX - 3, bY - 20,  8, 1);
        pix(cX - 3, bY - 21,  8, 1);
        pix(cX - 2, bY - 22,  7, 1);
        pix(cX - 1, bY - 23,  5, 1);
        pix(cX, bY - 24,  3, 1);
        pix(cX - 6, bY - 19, 1, 1);
        pix(cX - 6, bY - 20, 1, 1);

        // Head right-side shading
        ctx.fillStyle = mS;
        pix(cX + 3, bY - 18, 1, 2);
        pix(cX + 3, bY - 20, 1, 2);
        pix(cX + 3, bY - 22, 1, 1);

        // Ear (top-right of head)
        ctx.fillStyle = mB;
        pix(cX + 1, bY - 24, 2, 2);
        pix(cX + 2, bY - 25, 2, 1);

        ctx.fillStyle = mS;
        pix(cX + 2, bY - 24, 1, 2);

        // Eye (lion faces LEFT)
        ctx.fillStyle = mE;
        pix(cX - 2, bY - 21, 1, 1);

        // Nostril (shifted forward)
        ctx.fillStyle = mD;
        pix(cX - 5, bY - 19, 1, 1);

        // Optional mouth definition (adds realism)
        pix(cX - 5, bY - 20, 1, 1);

        // ── Water spout (DOWNWARD ARC) ───────────────────────
        // starting point (mouth)
        const wx0 = cX - 6;
        const wy0 = bY - 19;

        // arc parameters
        const length = 18;     // how far water travels
        const gravity = 0.08;  // downward curve strength

        for (let i = 0; i < length; i++) {

          // horizontal travel (left)
          const x = wx0 - i;

          // parabolic drop
          const y = wy0 + Math.floor(i * i * gravity);

          // animated wobble (makes water alive)
          const wobble = Math.sin(t * 0.15 + i * 0.6) * 0.5;

          // main water body
          ctx.globalAlpha = 0.75;
          ctx.fillStyle = mW;
          pix(x, y + wobble, 2, 2);

          // highlight sparkle
          ctx.globalAlpha = 1;
          ctx.fillStyle = mW2;
          pix(x, y + wobble, 1, 1);
        }

        // splash at end
        ctx.globalAlpha = 0.6 + 0.3 * Math.sin(t * 0.2);
        ctx.fillStyle = mW2;
        pix(wx0 - length - 1, wy0 + Math.floor(length * length * gravity), 4, 2);
        ctx.globalAlpha = 1;
      }

      // ── SINGAPORE FLYER ──────────────────────────────────
      const fCX    = Math.floor(gw * 0.80);
      const fR     = Math.round(gh * 0.20);
      const fCY    = groundY - fR - 4;
      const fAngle = (t * 0.002) % (Math.PI * 2);

      ctx.fillStyle = "#1A1648";
      pix(fCX, fCY, 3, groundY - fCY);
      for (let row = 0; row < Math.floor((groundY - fCY) * 0.65); row++) {
        pix(fCX - Math.round(row * 0.5), fCY + row, 2, 1);
        pix(fCX + 3 + Math.round(row * 0.5), fCY + row, 2, 1);
      }
      for (let a = 0; a < Math.PI * 2; a += 0.04) {
        const rx = fCX + Math.cos(a) * fR;
        const ry = fCY + Math.sin(a) * fR;
        ctx.fillStyle = "#2A2470";
        ctx.fillRect(Math.round(rx) * p, Math.round(ry) * p, p * 2, p * 2);
      }
      for (let a = 0; a < Math.PI * 2; a += 0.1) {
        const rx = fCX + Math.cos(a) * fR * 0.82;
        const ry = fCY + Math.sin(a) * fR * 0.82;
        ctx.fillStyle = "#201C60";
        ctx.globalAlpha = 0.6;
        ctx.fillRect(Math.round(rx) * p, Math.round(ry) * p, p, p);
      }
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#1E1858";
      ctx.lineWidth = p;
      for (let s = 0; s < 8; s++) {
        const a = fAngle + s * Math.PI / 4;
        ctx.beginPath();
        ctx.moveTo(fCX * p, fCY * p);
        ctx.lineTo((fCX + Math.cos(a) * fR) * p, (fCY + Math.sin(a) * fR) * p);
        ctx.stroke();
      }
      for (let s = 0; s < 16; s++) {
        const a = fAngle + s * Math.PI / 8;
        const gx = fCX + Math.cos(a) * fR * 0.93;
        const gy2 = fCY + Math.sin(a) * fR * 0.93;
        ctx.fillStyle = "#FFE8A0";
        ctx.globalAlpha = 0.65 + 0.25 * Math.sin(a + t * 0.02);
        ctx.fillRect(Math.round(gx) * p - p, Math.round(gy2) * p - p, p * 3, p * 3);
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#303080";
      ctx.fillRect((fCX - 2) * p, (fCY - 2) * p, 5 * p, 5 * p);

      // ── SUPERTREES ───────────────────────────────────────
      for (const st of supertrees) {
        const stBase = groundY;
        const crownY = stBase - st.height;
        const glowPulse = 0.55 + 0.35 * Math.sin(t * 0.04 + st.stx * 0.2);

        // Tapered trunk with branching supports so the silhouette reads more like a real supertree.
        for (let row = 0; row < st.height; row++) {
          const frac = row / st.height;
          const trunkW = frac < 0.35 ? 1 : frac < 0.72 ? 2 : 3;
          const trunkX = st.stx - Math.floor(trunkW / 2);
          const trunkY = stBase - st.height + row;
          ctx.fillStyle = frac < 0.55 ? "#0B0A1F" : "#130F31";
          pix(trunkX, trunkY, trunkW, 1);
          if (row % 5 === 0 && row > st.height * 0.28) {
            ctx.fillStyle = "#1E1848";
            pix(trunkX - 1, trunkY, 1, 1);
            pix(trunkX + trunkW, trunkY, 1, 1);
          }
        }

        // Branch lattice leading into the crown.
        const branchStart = crownY + Math.floor(st.crownR * 0.2);
        for (let row = 0; row < st.crownR; row++) {
          const frac = row / st.crownR;
          const crownWidth = Math.round(st.crownR * (1.2 + 1.15 * frac));
          const crownX = st.stx - Math.floor(crownWidth / 2);
          const y = crownY + row;
          ctx.fillStyle = frac < 0.25 ? "#24135A" : frac < 0.65 ? "#2E1880" : "#4321A2";
          pix(crownX, y, crownWidth, 1);
          if (row >= Math.floor(st.crownR * 0.35) && row % 2 === 0) {
            ctx.fillStyle = "#140B32";
            for (let fx = crownX + 1; fx < crownX + crownWidth - 1; fx += 4) {
              pix(fx, y, 1, 1);
            }
          }
          if (y >= branchStart && row % 3 === 0) {
            ctx.fillStyle = "#1E1848";
            pix(st.stx - 5, y, 2, 1);
            pix(st.stx + 3, y, 2, 1);
          }
        }

        // Hanging light fronds and bright crown points.
        const frondY = crownY + Math.floor(st.crownR * 0.55);
        for (const fr of st.fronds) {
          ctx.fillStyle = "#11082A";
          pix(fr.fx, frondY, 1, fr.flen);
          ctx.fillStyle = "#FFD866";
          if ((fr.fx + st.stx) % 2 === 0) {
            pix(fr.fx, frondY + fr.flen - 1, 1, 1);
          }
        }

        ctx.globalAlpha = glowPulse;
        ctx.fillStyle = st.glowCol;
        const bottomCW = st.crownR * 2;
        for (let gx = st.stx - bottomCW / 2 + 1; gx < st.stx + bottomCW / 2; gx += 2) {
          pix(gx, crownY + st.crownR - 1, 1, 1);
          pix(gx + 1, crownY + Math.floor(st.crownR * 0.65), 1, 1);
        }
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = "#C8A8FF";
        pix(st.stx - 1, crownY + 1, 3, 1);
        pix(st.stx - 2, crownY + 4, 5, 1);
        ctx.globalAlpha = 1;
      }
      if (supertrees.length >= 2) {
        const walkY = groundY - supertrees[1].height + 2;
        ctx.fillStyle = "#1A1040";
        for (let wx = supertrees[0].stx + 1; wx < supertrees[1].stx; wx++) {
          pix(wx, walkY, 1, 1);
        }
      }

      // ── GROUND LINE ──────────────────────────────────────
      ctx.fillStyle = "#0E0A28";
      pix(0, groundY, gw, 2);
      ctx.fillStyle = "rgba(130,110,210,0.15)";
      pix(0, groundY, gw, 1);

      // Promenade shrubbery (deterministic per frame)
      const shrubPrng = makePrng(9999);
      for (let fx = 2; fx < gw - 2; fx += 4 + Math.floor(shrubPrng() * 7)) {
        const fh = 2 + Math.floor(shrubPrng() * 3);
        ctx.fillStyle = shrubPrng() > 0.5 ? "#0D0920" : "#110C2A";
        pix(fx, groundY - fh, 3 + Math.floor(shrubPrng() * 3), fh);
      }

      // ── RIVER — still and glistening ──────────────────────
      // Base water
      ctx.fillStyle = "#06080E";
      ctx.fillRect(0, waterY * p, W, waterH * p);

      // Shore edge fade
      for (let ry = waterY; ry < waterY + 3; ry++) {
        const blend = (ry - waterY) / 3;
        ctx.fillStyle = `rgba(16,22,48,${(0.5 - blend * 0.5).toFixed(3)})`;
        ctx.fillRect(0, ry * p, W, p);
      }

      // Vertical reflection columns from each landmark
      const reflSrc = [
        {
          x: mbsX,
          w: 3 * towerBaseW + 2 * tGap,
          r: 140, g: 120, b: 200, s: 0.10
        },
        { x: fCX - 2,                                           w: 5,                  r: 100, g: 90,  b: 180, s: 0.06 },
        { x: espCX - 15,                                        w: 12,                 r: 180, g: 170, b: 220, s: 0.07 },
        { x: supertrees.length >= 2 ? supertrees[1].stx - 8 : Math.floor(gw * 0.82), w: 8, r: 200, g: 80, b: 255, s: 0.08 },
      ];
      for (const src of reflSrc) {
        for (let ry = waterY; ry < bankY; ry++) {
          const fade = Math.max(0, 1 - (ry - waterY) / waterH * 2.2);
          if (fade <= 0) continue;
          ctx.fillStyle = `rgba(${src.r},${src.g},${src.b},${(src.s * fade).toFixed(3)})`;
          pix(src.x, ry, src.w, 1);
        }
      }

      // Glimmer sparkles — slow twinkle
      for (let gx = 1; gx < gw - 1; gx += 2) {
        for (let ry = waterY; ry < bankY; ry += 3) {
          const g = Math.sin(gx * 2.1 + ry * 1.3 + t * 0.012)
                  * Math.sin(gx * 0.7 + ry * 3.1 + t * 0.007);
          if (g > 0.84) {
            ctx.globalAlpha = (g - 0.84) * 6;
            ctx.fillStyle = "#D8EEFF";
            pix(gx, ry, 1, 1);
            ctx.globalAlpha = 1;
          }
        }
      }

      // Horizon shimmer at water edge
      ctx.fillStyle = "rgba(110,130,200,0.16)";
      pix(0, waterY, gw, 1);

      // ── PARTICLES ────────────────────────────────────────
      particlesRef.current = particlesRef.current.filter((pp) => pp.life > 0.02);
      for (const pp of particlesRef.current) {
        pp.x += pp.vx; pp.y += pp.vy; pp.vy += 0.1; pp.life -= 0.035;
        ctx.globalAlpha = pp.life;
        ctx.fillStyle = pp.color;
        ctx.fillRect(Math.round(pp.x / p) * p, Math.round(pp.y / p) * p, p, p);
      }
      ctx.globalAlpha = 1;

      // ── SCANLINES ────────────────────────────────────────
      ctx.fillStyle = "rgba(0,0,0,0.028)";
      for (let sy = 0; sy < H; sy += 4) ctx.fillRect(0, sy, W, 2);

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el.closest("[data-no-particle]")) spawnParticles(e.clientX, e.clientY);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
