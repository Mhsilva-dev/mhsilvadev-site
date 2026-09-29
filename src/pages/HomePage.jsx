import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ParticleCanvas from "../components/ParticleCanvas";
import Navbar         from "../components/Navbar";
import LaptopMockup   from "../components/LaptopMockup";
import Footer         from "../components/Footer";
import { WHATSAPP_URL } from "../constants";
import { useIntersection } from "../hooks/useIntersection";
import { BLOG_POSTS } from "../data/blogPosts";
import { PROJECTS } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

/* ── Icons ── */
function IconCode() {
  return (
    <div className="relative inline-flex items-center justify-center mb-1">
      <div className="flex items-center justify-center rounded-xl font-black text-xl"
        style={{ width:64, height:56, background:"rgba(134,239,172,0.08)", border:"2px solid rgba(134,239,172,0.5)", color:"#86EFAC", fontFamily:"monospace",
          boxShadow:"0 0 20px rgba(134,239,172,0.12)" }}>
        &lt;/&gt;
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full" style={{ width:32, height:3, background:"linear-gradient(90deg,#86EFAC,transparent)" }} />
    </div>
  );
}
function IconServices() {
  return (
    <div className="relative mb-1" style={{ width:64, height:56 }}>
      <div className="absolute bottom-0 left-0 rounded-lg"
        style={{ width:46, height:36, border:"2.5px solid rgba(249,115,22,0.6)", background:"rgba(249,115,22,0.06)", boxShadow:"0 0 16px rgba(249,115,22,0.1)" }}>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2" style={{ width:14, height:4, background:"#F97316", borderRadius:2 }} />
      </div>
      <div className="absolute top-0 right-0 text-2xl leading-none" style={{ color:"#F97316", textShadow:"0 0 14px rgba(249,115,22,0.5)" }}>⚙</div>
    </div>
  );
}
function IconBlog() {
  return (
    <div className="relative flex items-center justify-center mb-1" style={{ width:64, height:56 }}>
      <div className="absolute left-0 top-1 flex flex-col gap-1.5">
        {[0,1,2].map(i => <span key={i} className="block rounded-full" style={{ width:5, height:5, background:"#86EFAC", opacity:0.6+i*0.15 }} />)}
      </div>
      <div className="text-4xl leading-none" style={{ color:"#86EFAC", textShadow:"0 0 16px rgba(134,239,172,0.45)" }}>⚙</div>
    </div>
  );
}

/* ── Services data ── */
const SERVICES = [
  { icon:"🌐", title:"Desenvolvimento Web",   desc:"Sites, landing pages e sistemas web responsivos e modernos.", color:"#38BDF8" },
  { icon:"📱", title:"Aplicativos Mobile",    desc:"Apps iOS e Android com React Native de alta performance.",    color:"#86EFAC" },
  { icon:"🤖", title:"Bots e Automação",      desc:"Chatbots e automações para otimizar processos do negócio.",   color:"#F97316" },
  { icon:"⚡", title:"APIs e Integrações",    desc:"APIs RESTful e integrações com sistemas externos.",           color:"#818CF8" },
  { icon:"🎓", title:"Mentoria & Ensino",     desc:"Aulas personalizadas do zero ao avançado.",                   color:"#86EFAC" },
  { icon:"☁️", title:"Deploy e DevOps",       desc:"CI/CD, Docker e hospedagem na nuvem.",                        color:"#38BDF8" },
];


/* ── Section wrapper ── */
function Section({ id, children, className="", style={} }) {
  const [ref, vis] = useIntersection(0.08);
  return (
    <section id={id} ref={ref} className={`relative z-10 ${className}`}
      style={{ opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(30px)", transition:"opacity 0.7s ease, transform 0.7s ease", ...style }}>
      {children}
    </section>
  );
}

export default function HomePage() {
  const [active, setActive] = useState("Início");
  const navigate = useNavigate();
  const location = useLocation();
  const latestPosts = BLOG_POSTS.slice(0, 3);

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state]);

  return (
    <div style={{ background:"#020B14", minHeight:"100vh" }}>
      <ParticleCanvas />
      <Navbar active={active} setActive={setActive} />

      {/* ── HERO ── */}
      <section id="inicio" className="relative z-10 min-h-screen flex flex-col justify-between px-6 md:px-10 pt-20"
        style={{ animation:"fadeIn 0.8s ease both" }}>
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 pt-14 flex-1">
          {/* Left */}
          <div className="flex-1 max-w-xl" style={{ animation:"fadeUp 0.8s 0.1s ease both", opacity:0 }}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-mono"
              style={{ background:"rgba(134,239,172,0.07)", border:"1px solid rgba(134,239,172,0.2)", color:"#86EFAC" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#86EFAC", display:"inline-block", animation:"blink 2s infinite" }}/>
              Disponível para projetos
            </div>
            <h1 className="font-black leading-tight mb-5" style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)" }}>
              <span className="text-white">Transformando<br/>suas </span>
              <span style={{ background:"linear-gradient(135deg,#86EFAC,#4ADE80)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>ideias</span>
              <span className="text-white"> em<br/></span>
              <span style={{ background:"linear-gradient(135deg,#86EFAC,#4ADE80)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>realidades.</span>
            </h1>
            <p className="mb-4 font-light leading-relaxed text-base" style={{ color:"#64748B" }}>
              Desenvolvedor Full Stack | Web, Apps, Bots e Automação
            </p>
            <p className="mb-9 text-sm leading-relaxed" style={{ color:"#475569" }}>
              Transformo ideias em produtos digitais reais com código limpo, design moderno e entrega pontual.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-block font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{ background:"linear-gradient(135deg,#D97706,#EA580C)", color:"#fff", padding:"13px 32px", fontSize:"0.97rem", boxShadow:"0 4px 24px rgba(234,88,12,0.4)", textDecoration:"none" }}>
                Solicitar Orçamento
              </a>
              <a href="#portfolio"
                className="inline-block font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background:"rgba(134,239,172,0.06)", color:"#86EFAC", padding:"13px 32px", fontSize:"0.97rem", border:"1px solid rgba(134,239,172,0.25)", textDecoration:"none" }}>
                Ver projetos
              </a>
            </div>
          </div>
          {/* Right */}
          <div className="flex-shrink-0" style={{ animation:"fadeUp 0.8s 0.3s ease both", opacity:0 }}>
            <LaptopMockup />
          </div>
        </div>

{/* Scroll down */}
        <div className="max-w-6xl mx-auto w-full text-center pb-8">
          <a href="#ver-mais" className="inline-flex flex-col items-center gap-2 no-underline" style={{ color:"#334155" }}>
            <span className="text-sm font-semibold">Ver mais</span>
            <span style={{ width:20, height:20, borderRight:"2px solid rgba(134,239,172,0.3)", borderBottom:"2px solid rgba(134,239,172,0.3)", transform:"rotate(45deg)", animation:"bounceArrow 1.8s ease-in-out infinite" }} />
          </a>
        </div>
      </section>

      {/* ── CARDS ── */}
      <Section id="ver-mais" className="px-6 md:px-10 py-20"
        style={{ background:"rgba(4,16,32,0.7)", borderTop:"1px solid rgba(30,41,59,0.6)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color:"#38BDF8" }}>// explore</span>
            <h2 className="font-black text-white text-3xl mb-3">O que você <span style={{ color:"#86EFAC" }}>encontra aqui</span></h2>
            <p className="text-sm" style={{ color:"#475569", maxWidth:480, margin:"0 auto" }}>Tudo que você precisa para transformar sua ideia em produto digital real.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon:<IconCode />,     title:"Portfolio", desc:"Cases reais e soluções entregues para clientes de diferentes segmentos.", btn:"Ver Projetos", href:"#portfolio" },
              { icon:<IconServices />, title:"Serviços",  desc:"Soluções completas de desenvolvimento para cada necessidade do negócio.", btn:"Saiba Mais",   href:"/servicos", isRoute:true },
              { icon:<IconBlog />,     title:"Blog",      desc:"Tutoriais e conteúdos técnicos para devs de todos os níveis.",           btn:"Acessar Blog", href:"/blog", isRoute:true },
            ].map((c,i) => (
              <div key={i} className="rounded-2xl p-8 flex flex-col transition-all duration-300 cursor-pointer group"
                style={{ background:"rgba(8,20,38,0.8)", border:"1px solid rgba(30,41,59,0.8)", backdropFilter:"blur(16px)" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(134,239,172,0.3)"; e.currentTarget.style.boxShadow="0 20px 50px rgba(0,0,0,0.3),0 0 30px rgba(134,239,172,0.05)"; e.currentTarget.style.transform="translateY(-5px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(30,41,59,0.8)"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}
              >
                <div className="mb-6">{c.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{c.title}</h3>
                <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color:"#475569" }}>{c.desc}</p>
                {c.isRoute
                  ? <button onClick={()=>navigate(c.href)}
                      className="self-start text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 cursor-pointer"
                      style={{ background:"transparent", border:"1.5px solid rgba(56,189,248,0.35)", color:"#38BDF8" }}
                      onMouseEnter={e=>{ e.currentTarget.style.background="rgba(56,189,248,0.1)"; e.currentTarget.style.borderColor="rgba(56,189,248,0.7)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(56,189,248,0.35)"; }}
                    >{c.btn}</button>
                  : <a href={c.href}
                      className="self-start text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 no-underline"
                      style={{ background:"transparent", border:"1.5px solid rgba(56,189,248,0.35)", color:"#38BDF8" }}
                      onMouseEnter={e=>{ e.currentTarget.style.background="rgba(56,189,248,0.1)"; e.currentTarget.style.borderColor="rgba(56,189,248,0.7)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(56,189,248,0.35)"; }}
                    >{c.btn}</a>
                }
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PORTFOLIO ── */}
      <Section id="portfolio" className="px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color:"#38BDF8" }}>// portfólio</span>
            <h2 className="font-black text-white text-3xl mb-3">Projetos que <span style={{ color:"#86EFAC" }}>desenvolvi</span></h2>
            <p className="text-sm" style={{ color:"#475569", maxWidth:520, margin:"0 auto" }}>Sistemas que desenvolvi do zero, do banco de dados ao deploy. Todos com o código aberto no GitHub.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map(p => <ProjectCard key={p.title} p={p} />)}
          </div>
        </div>
      </Section>

      {/* ── SERVICES ── */}
      <Section id="servicos" className="px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color:"#38BDF8" }}>// services</span>
            <h2 className="font-black text-white text-3xl mb-3">Meus <span style={{ color:"#86EFAC" }}>Serviços</span></h2>
            <p className="text-sm" style={{ color:"#475569", maxWidth:480, margin:"0 auto" }}>Soluções completas para cada necessidade do seu negócio digital.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s,i) => (
              <div key={i} className="rounded-xl p-6 flex gap-4 items-start transition-all duration-200 group cursor-default"
                style={{ background:"rgba(8,20,38,0.7)", border:"1px solid rgba(30,41,59,0.8)", backdropFilter:"blur(12px)" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${s.color}40`; e.currentTarget.style.transform="translateX(4px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(30,41,59,0.8)"; e.currentTarget.style.transform="none"; }}
              >
                <div className="text-2xl flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background:`${s.color}12`, border:`1px solid ${s.color}25` }}>{s.icon}</div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{s.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color:"#475569" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── BLOG PREVIEW ── */}
      <Section className="px-6 md:px-10 py-20"
        style={{ background:"rgba(4,16,32,0.7)", borderTop:"1px solid rgba(30,41,59,0.6)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color:"#38BDF8" }}>// blog</span>
              <h2 className="font-black text-white text-3xl">Últimas <span style={{ color:"#86EFAC" }}>Publicações</span></h2>
            </div>
            <button onClick={()=>navigate("/blog")}
              className="text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 cursor-pointer"
              style={{ background:"transparent", border:"1.5px solid rgba(134,239,172,0.3)", color:"#86EFAC" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(134,239,172,0.08)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; }}>
              Ver todos →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post,i) => (
              <div key={post.id} className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group"
                style={{ background:"rgba(8,20,38,0.8)", border:"1px solid rgba(30,41,59,0.8)", backdropFilter:"blur(16px)" }}
                onClick={()=>navigate(`/blog/${post.slug}`)}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${post.color}50`; e.currentTarget.style.transform="translateY(-5px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(30,41,59,0.8)"; e.currentTarget.style.transform="none"; }}
              >
                <div className="h-1" style={{ background:`linear-gradient(90deg,${post.color},transparent)` }}/>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background:`${post.color}18`, color:post.color, border:`1px solid ${post.color}35` }}>{post.category}</span>
                    <span className="text-xs ml-auto" style={{ color:"#334155" }}>{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm leading-snug mb-3 group-hover:text-white transition-colors" style={{ color:"#CBD5E1" }}>{post.title}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color:"#475569" }}>{post.excerpt.substring(0,80)}...</p>
                  <span className="text-xs font-semibold flex items-center gap-1" style={{ color:post.color }}>
                    Ler artigo <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
