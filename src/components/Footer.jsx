import { useNavigate } from "react-router-dom";
import { CONTACT, FOOTER_SERVICES, NAV_LINKS, SOCIALS } from "../constants";

const NAV_ROUTES = {
  "Início":    { path: "/",          scrollTo: null     },
  "Serviços":  { path: "/servicos",  scrollTo: null     },
  "Portfólio": { path: "/",          scrollTo: "portfolio" },
  "Blog":      { path: "/blog",      scrollTo: null     },
  "Contato":   { path: "/",          scrollTo: "contato" },
};

export default function Footer() {
  const navigate   = useNavigate();
  const hoverGreen = (e) => { e.currentTarget.style.color = "#86EFAC"; };
  const resetColor = (e) => { e.currentTarget.style.color = "#3A5A7A"; };

  const handleNavLink = (label) => {
    const route = NAV_ROUTES[label];
    if (!route) return;
    if (route.scrollTo) {
      navigate(route.path, { state: { scrollTo: route.scrollTo } });
    } else {
      navigate(route.path);
    }
  };

  return (
    <footer id="contato" className="relative z-10 px-8 pt-14 pb-0"
      style={{ background:"rgba(2,8,18,0.95)", borderTop:"1px solid rgba(56,189,248,0.1)" }}
    >
      {/* Right deco */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 font-black leading-tight pointer-events-none select-none hidden lg:block"
        style={{ color:"rgba(56,189,248,0.1)", fontSize:"2.5rem" }}
      >
        &lt;&nbsp;&gt;
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">

        {/* Brand */}
        <div>
          <div className="font-bold text-xl tracking-tight mb-3">
            <span style={{ color:"#86EFAC" }}>MHSilva</span>
            <span className="text-white">Dev</span>
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color:"#3A5A7A" }}>
            Transformando ideias em realidade com tecnologia, inovação e performance
          </p>
          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} title={s.title} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center rounded-md text-xs font-bold transition-all duration-200"
                style={{ width:30, height:30, border:"1px solid rgba(56,189,248,0.18)", background:"rgba(56,189,248,0.04)", color:"#3A5A7A", textDecoration:"none" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(134,239,172,0.4)"; e.currentTarget.style.color="#86EFAC"; e.currentTarget.style.background="rgba(134,239,172,0.07)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(56,189,248,0.18)"; e.currentTarget.style.color="#3A5A7A"; e.currentTarget.style.background="rgba(56,189,248,0.04)"; }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Navegação</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {NAV_LINKS.map((l) => (
              <button key={l}
                onClick={() => handleNavLink(l)}
                className="text-sm transition-colors duration-200 text-left bg-transparent border-none cursor-pointer p-0"
                style={{ color:"#3A5A7A" }} onMouseEnter={hoverGreen} onMouseLeave={resetColor}>{l}</button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Serviços</h4>
          <div className="flex flex-col gap-2">
            {FOOTER_SERVICES.map((s) => (
              <a key={s} href="#" className="text-sm transition-colors duration-200 no-underline"
                style={{ color:"#3A5A7A" }} onMouseEnter={hoverGreen} onMouseLeave={resetColor}>{s}</a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Contato</h4>
          {[
            { icon:"✉", label:CONTACT.email,    href:`mailto:${CONTACT.email}` },
            { icon:"📞", label:CONTACT.phone,    href:`tel:${CONTACT.phone.replace(/\D/g,"")}` },
            { icon:"📍", label:CONTACT.location, href:"#" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 mb-2.5">
              <span className="text-sm">{item.icon}</span>
              <a href={item.href} className="text-sm transition-colors duration-200 no-underline"
                style={{ color:"#3A5A7A" }} onMouseEnter={hoverGreen} onMouseLeave={resetColor}>{item.label}</a>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-6xl mx-auto py-4 text-center text-xs"
        style={{ borderTop:"1px solid rgba(255,255,255,0.05)", color:"#3A5A7A" }}
      >
        © 2025 <span style={{ color:"#86EFAC" }}>MHSilvaDev</span> – Todos os direitos reservados.
      </div>
    </footer>
  );
}
