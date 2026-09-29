// Card de um projeto da seção de portfólio: print, descrição, tecnologias e links.
export default function ProjectCard({ p }) {
  const btn = "text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 no-underline";
  return (
    <div className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
      style={{ background:"rgba(8,20,38,0.8)", border:"1px solid rgba(30,41,59,0.8)", backdropFilter:"blur(16px)" }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${p.color}55`; e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 20px 50px rgba(0,0,0,0.3)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(30,41,59,0.8)"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}
    >
      <a href={p.live || p.repo} target="_blank" rel="noopener noreferrer" className="block" style={{ aspectRatio:"16/10", borderBottom:"1px solid rgba(30,41,59,0.8)" }}>
        <img src={p.img} alt={`Tela do ${p.title}`} loading="lazy" className="w-full h-full object-cover block" />
      </a>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-2" style={{ color:"#fff" }}>{p.title}</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color:"#64748B" }}>{p.desc}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {p.tags.map(t => (
            <span key={t} className="text-xs font-mono px-2 py-1 rounded-md"
              style={{ color:p.color, background:`${p.color}14`, border:`1px solid ${p.color}33` }}>{t}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-auto">
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className={btn}
              style={{ background:"#86EFAC", color:"#020B14", border:"1.5px solid #86EFAC" }}>Ver sistema</a>
          )}
          <a href={p.repo} target="_blank" rel="noopener noreferrer" className={btn}
            style={{ background:"transparent", border:"1.5px solid rgba(56,189,248,0.35)", color:"#38BDF8" }}
            onMouseEnter={e=>{ e.currentTarget.style.background="rgba(56,189,248,0.1)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; }}
          >Código no GitHub</a>
        </div>
      </div>
    </div>
  );
}
