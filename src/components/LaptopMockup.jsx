export default function LaptopMockup() {
  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Floating </> */}
      <div
        className="absolute -top-10 left-4 text-4xl font-black z-10"
        style={{ color:"#86EFAC", textShadow:"0 0 24px rgba(134,239,172,0.7)", animation:"floatY 3.5s ease-in-out infinite" }}
      >
        &lt;/&gt;
      </div>
      {/* Floating <> */}
      <div
        className="absolute top-8 -right-4 text-xl font-bold z-10"
        style={{ color:"rgba(56,189,248,0.5)", animation:"floatY 4s ease-in-out infinite 0.9s" }}
      >
        &lt;&gt;
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 rounded-full"
        style={{ background:"radial-gradient(ellipse,rgba(134,239,172,0.22) 0%,transparent 70%)", filter:"blur(18px)", zIndex:0 }}
      />

      {/* Body */}
      <div className="relative z-10 rounded-xl rounded-b-sm px-5 pt-4 pb-3"
        style={{ background:"linear-gradient(160deg,#0D2640 0%,#071929 70%)", border:"1.5px solid rgba(56,189,248,0.25)", boxShadow:"0 0 0 1px rgba(134,239,172,0.08),0 28px 60px rgba(0,0,0,0.65)", width:380 }}
      >
        {/* Screen */}
        <div className="rounded-md overflow-hidden relative flex flex-col items-center justify-center"
          style={{ background:"#020E1C", border:"1.5px solid rgba(56,189,248,0.18)", minHeight:190 }}
        >
          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage:"repeating-linear-gradient(0deg,rgba(0,200,255,0.015) 0px,rgba(0,200,255,0.015) 1px,transparent 1px,transparent 14px)" }}
          />
          {/* Traffic lights */}
          <div className="absolute top-2.5 left-3 flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 block" />
          </div>
          {/* Blink dots */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            {[0, 400, 800].map((d) => (
              <span key={d} className="w-1.5 h-1.5 rounded-full bg-sky-400 block"
                style={{ animation:`blink 1.2s step-end infinite ${d}ms` }}
              />
            ))}
          </div>
          {/* { MHS } */}
          <div className="relative z-10 font-black tracking-widest"
            style={{ fontFamily:"'Courier New',monospace", fontSize:"2.8rem", color:"#C8FF48", textShadow:"0 0 18px rgba(200,255,72,0.55),0 0 50px rgba(134,239,172,0.25)" }}
          >
            {"{ MHS }"}
          </div>
          {/* Binary */}
          <div className="absolute bottom-2 left-0 right-0 px-3 overflow-hidden font-mono"
            style={{ color:"rgba(56,189,248,0.15)", fontSize:"0.5rem" }}
          >
            01001101 48 53 01001000 53 49 4c 56 41 44 45 56 2f 2f 46 55 4c 4c 53 54 41 43 4b
          </div>
        </div>
      </div>

      {/* Base */}
      <div style={{ height:12, background:"linear-gradient(to bottom,#0D2640,#061526)", border:"1.5px solid rgba(56,189,248,0.2)", borderTop:"none", width:380, marginTop:-1 }} />
      <div style={{ width:220, height:8, background:"linear-gradient(to bottom,#061526,#040E1A)", border:"1px solid rgba(56,189,248,0.12)", borderTop:"none", borderRadius:"0 0 8px 8px" }} />
    </div>
  );
}
