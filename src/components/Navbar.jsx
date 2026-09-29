import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../constants";
import { WHATSAPP_URL } from "../constants";

export default function Navbar({ active, setActive }) {
  const [open, setOpen] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();
  const isBlog    = location.pathname.startsWith("/blog") || location.pathname.startsWith("/servicos");

  const handleNav = (l) => {
    setActive(l);
    setOpen(false);
    if (l === "Blog")     { navigate("/blog");     return; }
    if (l === "Serviços") { navigate("/servicos"); return; }

    const id = l === "Início"    ? "inicio"
             : l === "Portfólio" ? "portfolio"
             : l === "Contato"   ? "contato" : null;

    if (isBlog) {
      navigate("/", id ? { state: { scrollTo: id } } : {});
      return;
    }
    if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-3.5"
        style={{ background:"rgba(2,11,20,0.85)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(30,41,59,0.6)" }}>

        <Link to="/" className="font-black text-xl tracking-tight no-underline">
          <span style={{ color:"#86EFAC" }}>MHSilva</span><span className="text-white">Dev</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex gap-6 list-none m-0 p-0 items-center">
          {NAV_LINKS.map(l => (
            <li key={l}>
              <button onClick={()=>handleNav(l)}
                className="text-sm font-medium transition-colors duration-200 relative pb-1 bg-transparent border-none cursor-pointer"
                style={{ color: active===l ? "#fff" : "#64748B" }}>
                {l}
                {active===l && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background:"#86EFAC" }}/>}
              </button>
            </li>
          ))}
          <li>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="text-sm font-semibold px-4 py-2 rounded-lg no-underline transition-all duration-200 hover:-translate-y-0.5"
              style={{ background:"linear-gradient(135deg,#D97706,#EA580C)", color:"#fff", boxShadow:"0 2px 12px rgba(234,88,12,0.35)" }}>
              Orçamento
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1"
          onClick={()=>setOpen(!open)} aria-label="Menu">
          {[0,1,2].map(i => (
            <span key={i} className="block rounded-sm"
              style={{ width:24, height:2, background:"#94A3B8",
                transform: open&&i===0?"rotate(45deg) translate(3px,3px)":open&&i===2?"rotate(-45deg) translate(3px,-3px)":"none",
                opacity: open&&i===1?0:1, transition:"all 0.3s" }}/>
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed top-14 left-0 right-0 z-40 flex flex-col px-6 py-4 gap-1"
          style={{ background:"rgba(2,11,20,0.98)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(30,41,59,0.6)" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={()=>handleNav(l)}
              className="text-left text-base py-3 bg-transparent border-none cursor-pointer transition-colors"
              style={{ color:active===l?"#86EFAC":"#64748B", borderBottom:"1px solid rgba(30,41,59,0.5)" }}>
              {l}
            </button>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="mt-2 text-center font-semibold py-3 rounded-xl no-underline"
            style={{ background:"linear-gradient(135deg,#D97706,#EA580C)", color:"#fff" }}>
            Solicitar Orçamento
          </a>
        </div>
      )}
    </>
  );
}
