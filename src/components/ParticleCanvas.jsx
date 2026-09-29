import { useEffect, useRef } from "react";

/** Color map: kw=cyan, fn=green, str=amber, cm=muted, op=light, plain=default */
const COLOR = {
  kw:    [56,  189, 248],
  fn:    [134, 239, 172],
  str:   [251, 191,  36],
  cm:    [100, 130, 155],
  op:    [180, 200, 220],
  plain: [155, 185, 210],
};

const CODE_BLOCKS = [
  [
    [{t:"import ",c:"kw"},{t:"{ useState, useEffect }",c:"plain"}],
    [{t:"  from ",c:"kw"},{t:"'react'",c:"str"}],
    [],
    [{t:"export default ",c:"kw"},{t:"function ",c:"kw"},{t:"App",c:"fn"},{t:"() {",c:"op"}],
    [{t:"  const ",c:"kw"},{t:"[data, setData]",c:"plain"},{t:" = ",c:"op"},{t:"useState",c:"fn"},{t:"(",c:"op"},{t:"null",c:"kw"},{t:")",c:"op"}],
    [],
    [{t:"  // fetch on mount",c:"cm"}],
    [{t:"  ",c:"plain"},{t:"useEffect",c:"fn"},{t:"(async () => {",c:"op"}],
    [{t:"    const ",c:"kw"},{t:"res ",c:"plain"},{t:"= await ",c:"op"},{t:"fetch",c:"fn"},{t:"(",c:"op"},{t:"'/api/projects'",c:"str"},{t:")",c:"op"}],
    [{t:"    ",c:"plain"},{t:"setData",c:"fn"},{t:"(await res.",c:"op"},{t:"json",c:"fn"},{t:"())",c:"op"}],
    [{t:"  }, [])",c:"op"}],
    [{t:"}",c:"op"}],
  ],
  [
    [{t:"// MHSilvaDev — API Routes",c:"cm"}],
    [{t:"const ",c:"kw"},{t:"router ",c:"plain"},{t:"= express.",c:"op"},{t:"Router",c:"fn"},{t:"()",c:"op"}],
    [],
    [{t:"router.",c:"plain"},{t:"get",c:"fn"},{t:"(",c:"op"},{t:"'/projects'",c:"str"},{t:", async (req, res) => {",c:"op"}],
    [{t:"  try {",c:"kw"}],
    [{t:"    const ",c:"kw"},{t:"projects ",c:"plain"},{t:"= await ",c:"op"},{t:"Project.",c:"plain"},{t:"findAll",c:"fn"},{t:"()",c:"op"}],
    [{t:"    res.",c:"plain"},{t:"status",c:"fn"},{t:"(",c:"op"},{t:"200",c:"str"},{t:").",c:"op"},{t:"json",c:"fn"},{t:"({ ok: ",c:"op"},{t:"true",c:"kw"},{t:", projects })",c:"op"}],
    [{t:"  } ",c:"kw"},{t:"catch",c:"kw"},{t:"(err) {",c:"op"}],
    [{t:"    res.",c:"plain"},{t:"status",c:"fn"},{t:"(",c:"op"},{t:"500",c:"str"},{t:").",c:"op"},{t:"json",c:"fn"},{t:"({ error: err.",c:"op"},{t:"message",c:"plain"},{t:" })",c:"op"}],
    [{t:"  }",c:"op"}],
    [{t:"})",c:"op"}],
  ],
  [
    [{t:"interface ",c:"kw"},{t:"Project ",c:"fn"},{t:"{",c:"op"}],
    [{t:"  id",c:"plain"},{t:":    ",c:"op"},{t:"number",c:"kw"}],
    [{t:"  name",c:"plain"},{t:":  ",c:"op"},{t:"string",c:"kw"}],
    [{t:"  stack",c:"plain"},{t:": ",c:"op"},{t:"string",c:"kw"},{t:"[]",c:"op"}],
    [{t:"  live",c:"plain"},{t:":  ",c:"op"},{t:"boolean",c:"kw"}],
    [{t:"}",c:"op"}],
    [],
    [{t:"const ",c:"kw"},{t:"projects",c:"plain"},{t:": ",c:"op"},{t:"Project",c:"fn"},{t:"[] = [",c:"op"}],
    [{t:"  { id: ",c:"op"},{t:"1",c:"str"},{t:", name: ",c:"op"},{t:"'Landing Page'",c:"str"},{t:",",c:"op"}],
    [{t:"    stack: [",c:"op"},{t:"'React'",c:"str"},{t:",",c:"op"},{t:"'Tailwind'",c:"str"},{t:"], live: ",c:"op"},{t:"true",c:"kw"},{t:" },",c:"op"}],
    [{t:"  { id: ",c:"op"},{t:"2",c:"str"},{t:", name: ",c:"op"},{t:"'Bot WA'",c:"str"},{t:", live: ",c:"op"},{t:"true",c:"kw"},{t:" }",c:"op"}],
    [{t:"]",c:"op"}],
  ],
  [
    [{t:"# deploy.sh — MHSilvaDev",c:"cm"}],
    [{t:"docker ",c:"fn"},{t:"build ",c:"plain"},{t:"-t ",c:"op"},{t:"mhsilvadev:latest .",c:"str"}],
    [{t:"docker ",c:"fn"},{t:"push ",c:"plain"},{t:"registry/mhsilvadev",c:"str"}],
    [],
    [{t:"kubectl ",c:"fn"},{t:"apply ",c:"plain"},{t:"-f ",c:"op"},{t:"k8s/deploy.yaml",c:"str"}],
    [{t:"kubectl ",c:"fn"},{t:"rollout status ",c:"plain"},{t:"deployment/app",c:"str"}],
    [],
    [{t:"# ✓ 3 pods running",c:"cm"}],
    [{t:"# ✓ DB connected",c:"cm"}],
    [{t:"# ✓ SSL active",c:"cm"}],
  ],
  [
    [{t:"async function ",c:"kw"},{t:"sendMessage",c:"fn"},{t:"(to, text) {",c:"op"}],
    [{t:"  const ",c:"kw"},{t:"client ",c:"plain"},{t:"= ",c:"op"},{t:"new ",c:"kw"},{t:"WASocket",c:"fn"},{t:"(config)",c:"op"}],
    [{t:"  await client.",c:"plain"},{t:"connect",c:"fn"},{t:"()",c:"op"}],
    [],
    [{t:"  await client.",c:"plain"},{t:"sendMessage",c:"fn"},{t:"(",c:"op"}],
    [{t:"    to + ",c:"plain"},{t:"'@s.whatsapp.net'",c:"str"},{t:",",c:"op"}],
    [{t:"    { text }",c:"op"}],
    [{t:"  )",c:"op"}],
    [],
    [{t:"  return ",c:"kw"},{t:"{ ok: ",c:"op"},{t:"true",c:"kw"},{t:", to }",c:"op"}],
    [{t:"}",c:"op"}],
  ],
  [
    [{t:"// tailwind.config.js",c:"cm"}],
    [{t:"export default ",c:"kw"},{t:"{",c:"op"}],
    [{t:"  content",c:"plain"},{t:": [",c:"op"},{t:"'./src/**/*.{jsx,tsx}'",c:"str"},{t:"],",c:"op"}],
    [{t:"  theme",c:"plain"},{t:": { extend: {",c:"op"}],
    [{t:"    colors",c:"plain"},{t:": {",c:"op"}],
    [{t:"      brand",c:"plain"},{t:": ",c:"op"},{t:"'#86EFAC'",c:"str"},{t:",",c:"op"}],
    [{t:"      dark",c:"plain"},{t:":  ",c:"op"},{t:"'#020B14'",c:"str"},{t:",",c:"op"}],
    [{t:"      cta",c:"plain"},{t:":   ",c:"op"},{t:"'#EA580C'",c:"str"}],
    [{t:"    } } },",c:"op"}],
    [{t:"  plugins",c:"plain"},{t:": []",c:"op"}],
    [{t:"}",c:"op"}],
  ],
];

const SINGLES = [
  [{t:"=> ",c:"op"},{t:"realidade",c:"fn"}],
  [{t:"npm ",c:"fn"},{t:"run dev",c:"str"}],
  [{t:"git push ",c:"fn"},{t:"origin main",c:"str"}],
  [{t:"{ ",c:"op"},{t:"MHS",c:"fn"},{t:" }",c:"op"}],
  [{t:"</ ",c:"op"},{t:"App",c:"fn"},{t:">",c:"op"}],
  [{t:"await ",c:"kw"},{t:"deploy",c:"fn"},{t:"()",c:"op"}],
  [{t:"return ",c:"kw"},{t:"true",c:"kw"}],
  [{t:"// built with ❤",c:"cm"}],
  [{t:"200 ",c:"fn"},{t:"OK",c:"kw"}],
  [{t:"@tailwind ",c:"kw"},{t:"utilities",c:"fn"}],
  [{t:"z-index: ",c:"plain"},{t:"100",c:"str"}],
  [{t:"console.",c:"plain"},{t:"log",c:"fn"},{t:"('live!')",c:"str"}],
  [{t:"Promise.",c:"plain"},{t:"all",c:"fn"},{t:"(tasks)",c:"op"}],
  [{t:"const ",c:"kw"},{t:"mhs ",c:"plain"},{t:"= ",c:"op"},{t:"new ",c:"kw"},{t:"Dev",c:"fn"},{t:"()",c:"op"}],
];

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let animId, W, H;

    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    // ── Helpers ──
    const rand = (min, max) => min + Math.random() * (max - min);

    const makeBlock = (ox, oy) => {
      const lines    = CODE_BLOCKS[Math.floor(Math.random() * CODE_BLOCKS.length)];
      const fontSize = rand(9.5, 12);
      const maxAlpha = rand(0.14, 0.27);
      return {
        lines, fontSize, lineH: fontSize * 1.7, maxAlpha, alpha: 0,
        x: ox ?? rand(0, W || 1400),
        y: oy ?? rand(0, H || 900),
        vx: rand(-0.025, 0.025), vy: rand(-0.25, -0.09),
        phase: 0, life: 0,
        fadeDur: rand(80, 150), holdDur: rand(280, 700),
      };
    };

    const makeToken = (ox, oy) => {
      const spans    = SINGLES[Math.floor(Math.random() * SINGLES.length)];
      const fontSize = rand(10, 14);
      const maxAlpha = rand(0.12, 0.26);
      return {
        spans, fontSize, maxAlpha, alpha: 0,
        x: ox ?? rand(0, W || 1400),
        y: oy ?? rand(0, H || 900),
        vx: rand(-0.04, 0.04), vy: rand(-0.4, -0.15),
        phase: 0, life: 0,
        fadeDur: rand(50, 100), holdDur: rand(140, 380),
      };
    };

    const stagger = (item) => {
      item.life  = Math.random() * 350;
      item.phase = Math.random() > 0.4 ? 1 : 0;
      item.alpha = item.phase === 1 ? item.maxAlpha * Math.random() : 0;
      return item;
    };

    const updateLifecycle = (item, respawnFn) => {
      item.x += item.vx; item.y += item.vy; item.life++;
      if (item.phase === 0) {
        item.alpha += item.maxAlpha / item.fadeDur;
        if (item.alpha >= item.maxAlpha) { item.alpha = item.maxAlpha; item.phase = 1; item.life = 0; }
      } else if (item.phase === 1) {
        if (item.life >= item.holdDur) { item.phase = 2; item.life = 0; }
      } else {
        item.alpha -= item.maxAlpha / item.fadeDur;
        if (item.alpha <= 0) Object.assign(item, respawnFn(rand(0, W), H + 40));
      }
    };

    const drawSpans = (spans, x, y, fontSize, alpha) => {
      ctx.save();
      ctx.globalAlpha  = alpha;
      ctx.textBaseline = "top";
      ctx.font         = `${fontSize}px 'Courier New',monospace`;
      let cx = x;
      spans.forEach((s) => {
        const [r, g, b] = COLOR[s.c] || COLOR.plain;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillText(s.t, cx, y);
        cx += ctx.measureText(s.t).width;
      });
      ctx.restore();
    };

    // ── Data ──
    const blocks = Array.from({ length: 14 }, () => stagger(makeBlock()));
    const tokens = Array.from({ length: 20 }, () => stagger(makeToken()));

    const nodes  = Array.from({ length: 60 }, () => ({
      x: rand(0, 2000), y: rand(0, 3000),
      vx: rand(-0.18, 0.18), vy: rand(-0.18, 0.18),
      r: rand(0.4, 1.8),
      color: Math.random() > 0.5 ? "#86EFAC" : "#38BDF8",
    }));

    const traces = Array.from({ length: 30 }, () => ({
      x: rand(0, 2000), y: rand(0, 3000),
      l1: rand(40, 180), l2: rand(25, 115),
      dir: Math.random() > 0.5 ? 1 : -1,
      alpha: rand(0.03, 0.11),
      color: Math.random() > 0.5 ? "134,239,172" : "56,189,248",
    }));

    const pulses = Array.from({ length: 16 }, () => ({
      ti: Math.floor(Math.random() * traces.length),
      p:  Math.random(),
      sp: rand(0.003, 0.008),
      color: Math.random() > 0.5 ? "134,239,172" : "56,189,248",
    }));

    // ── Draw loop ──
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Background
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0,   "#020B14");
      bg.addColorStop(0.5, "#03111F");
      bg.addColorStop(1,   "#020B14");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Traces
      traces.forEach((t) => {
        ctx.strokeStyle = `rgba(${t.color},${t.alpha})`;
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.moveTo(t.x, t.y);
        ctx.lineTo(t.x + t.l1, t.y);
        ctx.lineTo(t.x + t.l1, t.y + t.l2 * t.dir);
        ctx.stroke();
        ctx.fillStyle = `rgba(${t.color},${t.alpha * 2.8})`;
        ctx.beginPath(); ctx.arc(t.x + t.l1, t.y, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2); ctx.fill();
      });

      // Pulses
      pulses.forEach((p) => {
        p.p += p.sp;
        if (p.p > 1) { p.p = 0; p.ti = Math.floor(Math.random() * traces.length); }
        const t  = traces[p.ti];
        const px = p.p < 0.5 ? t.x + t.l1 * (p.p / 0.5) : t.x + t.l1;
        const py = p.p < 0.5 ? t.y : t.y + t.l2 * t.dir * ((p.p - 0.5) / 0.5);
        const g2 = ctx.createRadialGradient(px, py, 0, px, py, 5);
        g2.addColorStop(0, `rgba(${p.color},0.9)`);
        g2.addColorStop(1, `rgba(${p.color},0)`);
        ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = g2; ctx.fill();
      });

      // Particles
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color; ctx.globalAlpha = 0.45; ctx.fill(); ctx.globalAlpha = 1;
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 115) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${(1 - d / 115) * 0.08})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }

      // Code blocks
      blocks.forEach((b) => {
        updateLifecycle(b, makeBlock);
        if (b.alpha <= 0) return;
        b.lines.forEach((spans, li) => {
          if (!spans.length) return;
          drawSpans(spans, b.x, b.y + li * b.lineH, b.fontSize, b.alpha);
        });
      });

      // Single tokens
      tokens.forEach((t) => {
        updateLifecycle(t, makeToken);
        if (t.alpha > 0) drawSpans(t.spans, t.x, t.y, t.fontSize, t.alpha);
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
