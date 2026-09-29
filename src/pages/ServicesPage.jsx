import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ParticleCanvas from "../components/ParticleCanvas";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WHATSAPP_URL } from "../constants";
import { useIntersection } from "../hooks/useIntersection";

const SERVICES = [
  {
    id: 1,
    icon: "🌐",
    color: "#38BDF8",
    title: "Desenvolvimento Web",
    tagline: "Sites e sistemas que convertem e impressionam",
    desc: "Criação de sites institucionais, landing pages de alta conversão, sistemas web completos e e-commerces. Cada projeto é desenvolvido com código limpo, performance máxima, SEO técnico e experiência de usuário impecável.",
    features: [
      "Landing pages otimizadas para conversão",
      "Sites institucionais responsivos e modernos",
      "E-commerce completo com painel administrativo",
      "Sistemas web sob medida (SaaS, CRM, ERP)",
      "Integração com APIs e gateways de pagamento",
      "Otimização SEO técnico e Core Web Vitals",
      "Acessibilidade (WCAG) e performance 90+ no Lighthouse",
    ],
    techs: ["React", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL", "Vercel"],
    deliverables: ["Código-fonte completo", "Deploy configurado", "Documentação técnica", "30 dias de suporte"],
    time: "2–6 semanas",
    highlight: true,
  },
  {
    id: 2,
    icon: "📱",
    color: "#86EFAC",
    title: "Aplicativos Mobile",
    tagline: "Apps nativos para iOS e Android",
    desc: "Desenvolvimento de aplicativos móveis completos com React Native. Desde o design até a publicação nas lojas. Interface nativa, performance real e experiência fluida em qualquer dispositivo — com um único código.",
    features: [
      "Apps iOS e Android com um único código-base",
      "Interface nativa, fluida e responsiva",
      "Notificações push e deep linking",
      "Integração com câmera, GPS, biometria e NFC",
      "Autenticação social (Google, Apple, Facebook)",
      "Modo offline com sincronização automática",
      "Publicação na App Store e Google Play",
    ],
    techs: ["React Native", "Expo", "Firebase", "Redux", "TypeScript", "Node.js"],
    deliverables: ["App publicado nas lojas", "Painel de analytics", "Código-fonte", "30 dias de suporte"],
    time: "4–10 semanas",
    highlight: false,
  },
  {
    id: 3,
    icon: "🤖",
    color: "#F97316",
    title: "Bots e Automação",
    tagline: "Automatize o que é repetitivo, foque no que importa",
    desc: "Criação de bots inteligentes para WhatsApp, Telegram e redes sociais. Automações de processos internos, web scraping, integração entre sistemas e workflows que economizam horas por semana.",
    features: [
      "Bot para WhatsApp Business com IA integrada",
      "Automação de atendimento ao cliente 24/7",
      "Bots para Telegram, Discord e Slack",
      "Automação de postagens e relatórios",
      "Web scraping e coleta de dados",
      "Integração entre sistemas (ERP, CRM, planilhas)",
      "Workflows automáticos com n8n ou Make",
    ],
    techs: ["Node.js", "Baileys", "Python", "Puppeteer", "OpenAI API", "n8n"],
    deliverables: ["Bot configurado e rodando", "Painel de controle", "Documentação de uso", "Treinamento da equipe"],
    time: "1–3 semanas",
    highlight: false,
  },
  {
    id: 4,
    icon: "⚡",
    color: "#818CF8",
    title: "APIs e Integrações",
    tagline: "Conecte sistemas, elimine trabalho manual",
    desc: "Desenvolvimento de APIs RESTful e GraphQL de alta performance. Integrações com ERPs, CRMs, gateways de pagamento, marketplaces e qualquer sistema que tenha API — documentadas e testadas.",
    features: [
      "APIs RESTful com documentação Swagger/OpenAPI",
      "GraphQL para consultas flexíveis e eficientes",
      "Integração com Stripe, PagSeguro, Mercado Pago, Asaas",
      "Webhooks, eventos em tempo real e websockets",
      "Integração com ERPs (SAP, TOTVS) e CRMs",
      "Autenticação OAuth2, JWT e API Keys",
      "Rate limiting, cache e monitoramento",
    ],
    techs: ["Node.js", "Express", "FastAPI", "GraphQL", "PostgreSQL", "Redis", "Docker"],
    deliverables: ["API documentada (Swagger)", "Testes automatizados", "Deploy em produção", "Monitoramento configurado"],
    time: "1–4 semanas",
    highlight: false,
  },
  {
    id: 5,
    icon: "🧠",
    color: "#A78BFA",
    title: "Inteligência Artificial",
    tagline: "IA aplicada que resolve problemas reais",
    desc: "Integração de IA generativa em produtos e processos. Chatbots inteligentes, processamento de documentos, análise de dados com LLMs, geração de conteúdo automatizada e sistemas de recomendação.",
    features: [
      "Chatbots com GPT-4 e Claude personalizados",
      "Processamento e extração de dados de documentos (PDF, imagens)",
      "RAG (Retrieval-Augmented Generation) com base de conhecimento",
      "Análise de sentimento e classificação de textos",
      "Geração automática de relatórios e conteúdo",
      "Fine-tuning de modelos para casos específicos",
      "Integração com OpenAI, Anthropic e modelos open-source",
    ],
    techs: ["Python", "OpenAI API", "LangChain", "Pinecone", "FastAPI", "Node.js"],
    deliverables: ["Sistema de IA integrado", "API documentada", "Dashboard de uso", "Treinamento da equipe"],
    time: "2–5 semanas",
    highlight: false,
  },
  {
    id: 6,
    icon: "☁️",
    color: "#38BDF8",
    title: "Deploy e DevOps",
    tagline: "Seu projeto no ar, seguro e escalável",
    desc: "Configuração completa de infraestrutura em nuvem com foco em disponibilidade, segurança e escalabilidade. CI/CD automatizado, containers, monitoramento e resposta a incidentes.",
    features: [
      "Configuração de servidores (AWS, GCP, DigitalOcean, Hetzner)",
      "Containerização com Docker e Kubernetes",
      "CI/CD com GitHub Actions ou GitLab CI",
      "SSL, firewall, fail2ban e hardening de segurança",
      "Monitoramento com Grafana, Prometheus ou Datadog",
      "Backup automático com retenção configurável",
      "Migração de infraestrutura legada para nuvem",
    ],
    techs: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "Nginx", "Terraform", "Redis"],
    deliverables: ["Infraestrutura configurada", "Pipeline CI/CD", "Runbook de operações", "Treinamento da equipe"],
    time: "1–3 semanas",
    highlight: false,
  },
  {
    id: 7,
    icon: "🔍",
    color: "#34D399",
    title: "Consultoria Técnica",
    tagline: "Decisões certas desde o início",
    desc: "Revisão de arquitetura, auditoria de código, mentoria de times e planejamento técnico de produtos. Ideal para startups que querem construir certo desde o início ou empresas que precisam escalar com segurança.",
    features: [
      "Revisão de arquitetura e decisões técnicas",
      "Auditoria de código e segurança",
      "Definição de stack tecnológico ideal",
      "Planejamento de roadmap técnico",
      "Mentoria para times de desenvolvimento",
      "Preparação para entrevistas técnicas",
      "Code review e pair programming",
    ],
    techs: ["JavaScript", "TypeScript", "Python", "React", "Node.js", "SQL", "Docker"],
    deliverables: ["Relatório técnico detalhado", "Recomendações priorizadas", "Plano de ação", "Sessões de acompanhamento"],
    time: "Sob consulta",
    highlight: false,
  },
  {
    id: 8,
    icon: "🎓",
    color: "#86EFAC",
    title: "Mentoria & Ensino",
    tagline: "Do zero ao mercado com acompanhamento real",
    desc: "Mentoria individual e em grupo para quem quer entrar na área de tecnologia ou alcançar o próximo nível na carreira. Aulas práticas com projetos reais, code review personalizado e acompanhamento contínuo.",
    features: [
      "Aulas ao vivo personalizadas via Google Meet",
      "Plano de estudos adaptado ao seu nível e objetivo",
      "Projetos práticos com tecnologias do mercado",
      "Code review detalhado e feedback construtivo",
      "Preparação para entrevistas técnicas (live coding)",
      "Suporte via WhatsApp durante todo o período",
      "Indicação para oportunidades de trabalho",
    ],
    techs: ["JavaScript", "React", "Node.js", "TypeScript", "Python", "Git", "SQL"],
    deliverables: ["Plano de estudos personalizado", "Materiais exclusivos", "Certificado de conclusão", "Indicação profissional"],
    time: "Sob consulta",
    highlight: false,
  },
];

const PROCESS = [
  { step: "01", icon: "💬", title: "Briefing", desc: "Entendemos seu projeto, objetivos, prazo e orçamento em uma conversa pelo WhatsApp ou videochamada." },
  { step: "02", icon: "📋", title: "Proposta", desc: "Enviamos uma proposta detalhada com escopo, prazo, tecnologias e investimento. Sem surpresas." },
  { step: "03", icon: "⚡", title: "Desenvolvimento", desc: "Desenvolvemos com atualizações semanais. Você acompanha o progresso em tempo real." },
  { step: "04", icon: "🚀", title: "Entrega", desc: "Deploy em produção, código-fonte entregue, documentação completa e 30 dias de suporte inclusos." },
];

const FAQS = [
  { q: "Quanto tempo leva para desenvolver um site?", a: "Depende da complexidade. Uma landing page simples fica pronta em 1 semana. Um sistema completo pode levar de 4 a 8 semanas. Na proposta, informamos o prazo exato." },
  { q: "Qual é o investimento mínimo?", a: "Cada projeto é orçado individualmente. Uma landing page começa a partir de R$ 800. Entre em contato para um orçamento personalizado sem compromisso." },
  { q: "Preciso ter conhecimento técnico para contratar?", a: "Não. Explicamos tudo de forma clara, sem jargões. Você só precisa saber o que quer — nós cuidamos da parte técnica." },
  { q: "Você tem contrato?", a: "Sim, todos os projetos são formalizados com contrato detalhando escopo, prazo, valores e responsabilidades de ambas as partes." },
  { q: "O que está incluído no suporte de 30 dias?", a: "Correção de bugs, pequenos ajustes e dúvidas sobre o sistema entregue. Alterações de escopo são orçadas separadamente." },
  { q: "Posso solicitar alterações durante o desenvolvimento?", a: "Sim, dentro do escopo definido em contrato. Alterações fora do escopo são orçadas e acordadas antes de serem executadas." },
];

function ServiceCard({ service, index }) {
  const [ref, vis] = useIntersection(0.08);
  return (
    <div ref={ref} className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(8,20,38,0.8)",
        border: `1px solid ${service.highlight ? service.color + "40" : "rgba(30,41,59,0.8)"}`,
        backdropFilter: "blur(16px)",
        boxShadow: service.highlight ? `0 0 40px ${service.color}15` : "none",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${index * 0.1}s, transform 0.65s ease ${index * 0.1}s`,
        position: "relative",
      }}
    >
      {service.highlight && (
        <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: `${service.color}20`, color: service.color, border: `1px solid ${service.color}40` }}>
          ⭐ Mais solicitado
        </div>
      )}

      {/* Top bar */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }} />

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="text-3xl w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${service.color}12`, border: `1px solid ${service.color}25` }}>
            {service.icon}
          </div>
          <div>
            <h3 className="font-black text-white text-xl mb-1">{service.title}</h3>
            <p className="text-sm font-medium" style={{ color: service.color }}>{service.tagline}</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748B" }}>{service.desc}</p>

        {/* Features */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#334155", fontFamily: "monospace" }}>O que está incluído</p>
          <ul className="space-y-2">
            {service.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "#94A3B8" }}>
                <span className="mt-0.5 flex-shrink-0 text-xs font-bold" style={{ color: service.color }}>✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Techs */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#334155", fontFamily: "monospace" }}>Tecnologias</p>
          <div className="flex flex-wrap gap-2">
            {service.techs.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-md font-mono"
                style={{ background: "rgba(30,41,59,0.9)", color: "#64748B", border: "1px solid rgba(30,41,59,1)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Deliverables + time */}
        <div className="grid grid-cols-2 gap-4 mb-7 p-4 rounded-xl"
          style={{ background: "rgba(4,16,32,0.6)", border: "1px solid rgba(30,41,59,0.8)" }}>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#334155", fontFamily: "monospace" }}>Entregáveis</p>
            {service.deliverables.map((d, i) => (
              <p key={i} className="text-xs mb-1" style={{ color: "#475569" }}>· {d}</p>
            ))}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#334155", fontFamily: "monospace" }}>Prazo estimado</p>
            <p className="font-bold text-white text-sm">{service.time}</p>
          </div>
        </div>

        {/* CTA */}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 no-underline"
          style={{
            background: service.highlight ? `linear-gradient(135deg, #D97706, #EA580C)` : "transparent",
            color: service.highlight ? "#fff" : service.color,
            border: service.highlight ? "none" : `1.5px solid ${service.color}40`,
            boxShadow: service.highlight ? "0 4px 20px rgba(234,88,12,0.35)" : "none",
          }}
          onMouseEnter={(e) => { if (!service.highlight) e.currentTarget.style.background = `${service.color}10`; }}
          onMouseLeave={(e) => { if (!service.highlight) e.currentTarget.style.background = "transparent"; }}
        >
          Solicitar orçamento para {service.title.split(" ")[0]}
        </a>
      </div>
    </div>
  );
}

function ProcessStep({ step, index }) {
  const [ref, vis] = useIntersection(0.1);
  return (
    <div ref={ref} className="flex flex-col items-center text-center"
      style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `all 0.6s ease ${index * 0.12}s` }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-4 relative"
        style={{ background: "rgba(134,239,172,0.08)", border: "1px solid rgba(134,239,172,0.2)" }}>
        {step.icon}
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
          style={{ background: "#86EFAC", color: "#020B14" }}>{step.step}</span>
      </div>
      <h4 className="font-bold text-white mb-2">{step.title}</h4>
      <p className="text-sm leading-relaxed" style={{ color: "#475569", maxWidth: 220 }}>{step.desc}</p>
    </div>
  );
}

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  const [ref, vis] = useIntersection(0.1);
  return (
    <div ref={ref} className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: "rgba(8,20,38,0.7)", border: "1px solid rgba(30,41,59,0.8)",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer bg-transparent border-none"
        style={{ fontFamily: "inherit" }}>
        <span className="font-semibold text-sm text-white pr-4">{faq.q}</span>
        <span className="text-xl flex-shrink-0 transition-transform duration-200"
          style={{ color: "#86EFAC", transform: open ? "rotate(45deg)" : "rotate(0)" }}>+</span>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  const [active, setActive] = useState("Serviços");
  const [heroRef, heroVis] = useIntersection(0.05);

  return (
    <div style={{ background: "#020B14", minHeight: "100vh" }}>
      <ParticleCanvas />
      <Navbar active={active} setActive={setActive} />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative z-10 text-center pt-32 pb-20 px-6 md:px-10"
        style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-mono"
            style={{ background: "rgba(134,239,172,0.07)", border: "1px solid rgba(134,239,172,0.2)", color: "#86EFAC" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#86EFAC", display: "inline-block", animation: "pulse 2s infinite" }} />
            {SERVICES.length} serviços disponíveis
          </div>
          <h1 className="font-black mb-5" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
            <span className="text-white">Soluções </span>
            <span style={{ background: "linear-gradient(135deg,#86EFAC,#4ADE80)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              completas
            </span>
            <br />
            <span className="text-white">para o seu negócio</span>
          </h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#64748B", maxWidth: 520, margin: "0 auto 2rem" }}>
            Do planejamento ao deploy. Cada projeto é desenvolvido com código limpo,
            design moderno e foco total no resultado que você precisa.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-block font-bold rounded-xl no-underline transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#D97706,#EA580C)", color: "#fff", padding: "13px 32px", fontSize: "0.97rem", boxShadow: "0 4px 24px rgba(234,88,12,0.4)" }}>
              Solicitar orçamento grátis
            </a>
            <a href="#servicos-grid"
              className="inline-block font-semibold rounded-xl no-underline transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "rgba(134,239,172,0.06)", color: "#86EFAC", padding: "13px 32px", fontSize: "0.97rem", border: "1px solid rgba(134,239,172,0.25)" }}>
              Ver todos os serviços ↓
            </a>
          </div>
        </div>
      </section>

{/* ── TECH STACK ── */}
      <section className="relative z-10 px-6 md:px-10 pb-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-mono tracking-widest uppercase mb-5" style={{ color: "#334155" }}>// tecnologias que domino</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["React","Next.js","Node.js","TypeScript","Python","FastAPI","Go","PostgreSQL","MongoDB","Redis","Docker","Kubernetes","AWS","Tailwind CSS","GraphQL","OpenAI API","LangChain","GitHub Actions","Nginx","Linux"].map(t => (
              <span key={t} className="text-xs px-3 py-1.5 rounded-full font-mono"
                style={{ background: "rgba(8,22,42,0.8)", color: "#64748B", border: "1px solid rgba(30,41,59,0.9)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section id="servicos-grid" className="relative z-10 px-6 md:px-10 py-16"
        style={{ background: "rgba(4,16,32,0.6)", borderTop: "1px solid rgba(30,41,59,0.6)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: "#38BDF8" }}>// services</span>
            <h2 className="font-black text-white text-3xl mb-3">O que eu <span style={{ color: "#86EFAC" }}>desenvolvo</span></h2>
            <p className="text-sm" style={{ color: "#475569", maxWidth: 480, margin: "0 auto" }}>
              Cada serviço inclui entregáveis claros, prazo definido e suporte pós-entrega.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative z-10 px-6 md:px-10 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: "#38BDF8" }}>// process</span>
            <h2 className="font-black text-white text-3xl mb-3">Como <span style={{ color: "#86EFAC" }}>funciona</span></h2>
            <p className="text-sm" style={{ color: "#475569", maxWidth: 440, margin: "0 auto" }}>
              Processo simples e transparente do início ao fim.
            </p>
          </div>
          {/* Arrow connector grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
            {/* connector line (desktop) */}
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px hidden md:block"
              style={{ background: "linear-gradient(90deg, transparent, rgba(134,239,172,0.2), rgba(134,239,172,0.2), transparent)" }} />
            {PROCESS.map((p, i) => <ProcessStep key={i} step={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-10 px-6 md:px-10 py-20"
        style={{ background: "rgba(4,16,32,0.6)", borderTop: "1px solid rgba(30,41,59,0.6)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: "#38BDF8" }}>// faq</span>
            <h2 className="font-black text-white text-3xl mb-3">Perguntas <span style={{ color: "#86EFAC" }}>frequentes</span></h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => <FaqItem key={i} faq={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative z-10 px-6 md:px-10 py-20">
        <div className="max-w-3xl mx-auto text-center rounded-3xl p-12"
          style={{ background: "rgba(8,20,38,0.85)", border: "1px solid rgba(134,239,172,0.15)", boxShadow: "0 0 60px rgba(134,239,172,0.04)" }}>
          <div className="text-4xl mb-5">🚀</div>
          <h2 className="font-black text-white text-2xl mb-3">Pronto para começar?</h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "#64748B", maxWidth: 420, margin: "0 auto 2rem" }}>
            Me conta a sua ideia no WhatsApp. Em menos de 24 horas você recebe uma proposta completa, sem compromisso.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="inline-block font-bold rounded-xl no-underline transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{ background: "linear-gradient(135deg,#D97706,#EA580C)", color: "#fff", padding: "14px 40px", fontSize: "1rem", boxShadow: "0 4px 28px rgba(234,88,12,0.45)" }}>
            Solicitar Orçamento Grátis
          </a>
          <p className="text-xs mt-4" style={{ color: "#334155" }}>Resposta em até 24 horas · Sem compromisso · 100% gratuito</p>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes pulse { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
      `}</style>
    </div>
  );
}
