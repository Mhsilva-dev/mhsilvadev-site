import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "../data/blogPosts";
import { WHATSAPP_URL } from "../constants";
import ParticleCanvas from "../components/ParticleCanvas";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LEVEL_COLORS = {
  "Iniciante":     "#86EFAC",
  "Intermediário": "#38BDF8",
  "Avançado":      "#F97316",
};

// Markdown-to-html renderer
function renderMarkdown(md) {
  // 1. Protect code blocks
  const codeBlocks = [];
  let text = md.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push(
      `<pre data-lang="${lang || 'code'}"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
    );
    return `\nCODEBLOCK_PLACEHOLDER_${idx}\n`;
  });

  // 2. Apply inline markup (won't touch code blocks — they're placeholders now)
  text = text
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // 3. Process line by line, building valid block structure
  const lines = text.split('\n');
  const out = [];
  let paraLines = [];
  let inList = false;

  const flushPara = () => {
    const joined = paraLines.join(' ').trim();
    if (joined) out.push(`<p>${joined}</p>`);
    paraLines = [];
  };
  const flushList = () => {
    if (inList) { out.push('</ul>'); inList = false; }
  };

  for (const line of lines) {
    const t = line.trim();

    if (/^CODEBLOCK_PLACEHOLDER_\d+$/.test(t)) {
      flushPara(); flushList();
      out.push(t);
      continue;
    }

    const h2 = t.match(/^## (.+)$/);
    if (h2) { flushPara(); flushList(); out.push(`<h2>${h2[1]}</h2>`); continue; }

    const h3 = t.match(/^### (.+)$/);
    if (h3) { flushPara(); flushList(); out.push(`<h3>${h3[1]}</h3>`); continue; }

    // Checkbox must be checked before plain list item
    const checkbox = t.match(/^- \[ \] (.+)$/);
    if (checkbox) {
      flushPara();
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li class="check">☐ ${checkbox[1]}</li>`);
      continue;
    }

    const li = t.match(/^- (.+)$/);
    if (li) {
      flushPara();
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${li[1]}</li>`);
      continue;
    }

    if (t === '') { flushPara(); flushList(); continue; }

    flushList();
    paraLines.push(t);
  }
  flushPara(); flushList();

  // 4. Restore code blocks
  let result = out.join('\n');
  codeBlocks.forEach((block, idx) => {
    result = result.replace(`CODEBLOCK_PLACEHOLDER_${idx}`, block);
  });

  return result;
}

export default function BlogPost() {
  const { slug }     = useParams();
  const navigate     = useNavigate();
  const [active, setActive] = useState("Blog");
  const [progress, setProgress] = useState(0);

  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    if (!post) return;
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const el  = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(Math.min(pct, 100));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  if (!post) {
    return (
      <div style={{ background:"#020B14", minHeight:"100vh" }} className="flex flex-col items-center justify-center gap-4">
        <ParticleCanvas />
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4">404</div>
          <p className="text-white font-bold text-xl mb-2">Artigo não encontrado</p>
          <Link to="/blog" className="text-sm" style={{ color:"#86EFAC" }}>← Voltar ao Blog</Link>
        </div>
      </div>
    );
  }

  const related = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);
  const lvlColor = LEVEL_COLORS[post.level] || "#86EFAC";

  return (
    <div style={{ background:"#020B14", minHeight:"100vh" }}>
      <ParticleCanvas />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 h-0.5 z-50 transition-all duration-100"
        style={{ width:`${progress}%`, background:`linear-gradient(90deg, ${post.color}, #86EFAC)` }} />

      <Navbar active={active} setActive={setActive} />

      <div className="relative z-10 pt-28 pb-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">

          {/* Back */}
          <Link to="/blog"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-colors duration-200 group"
            style={{ color:"#475569", textDecoration:"none" }}
            onMouseEnter={e=>e.currentTarget.style.color="#86EFAC"}
            onMouseLeave={e=>e.currentTarget.style.color="#475569"}
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            Voltar ao Blog
          </Link>

          {/* Header */}
          <div className="mb-10" style={{ animation:"fadeUp 0.7s ease both" }}>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background:`${post.color}18`, color:post.color, border:`1px solid ${post.color}40` }}>
                {post.category}
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ background:`${lvlColor}15`, color:lvlColor, border:`1px solid ${lvlColor}35` }}>
                {post.level}
              </span>
              <span className="text-xs ml-auto" style={{ color:"#334155" }}>
                {post.readTime} de leitura · {post.date}
              </span>
            </div>

            <h1 className="font-black mb-4 text-white" style={{ fontSize:"clamp(1.6rem,4vw,2.4rem)", lineHeight:1.2 }}>
              {post.title}
            </h1>
            <p className="text-base leading-relaxed" style={{ color:"#64748B" }}>{post.excerpt}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {post.tags.map(t => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-md"
                  style={{ background:"rgba(30,41,59,0.8)", color:"#475569", border:"1px solid rgba(30,41,59,1)", fontFamily:"monospace" }}>
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="mb-10 h-px" style={{ background:`linear-gradient(90deg, ${post.color}40, transparent)` }} />

          {/* Article content */}
          <article
            className="prose-custom"
            style={{ animation:"fadeUp 0.7s 0.15s ease both", opacity:0 }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* Divider */}
          <div className="mt-14 mb-10 h-px" style={{ background:"rgba(30,41,59,0.8)" }} />

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h3 className="font-bold text-white mb-5 text-lg">Artigos relacionados</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map(r => (
                  <Link key={r.id} to={`/blog/${r.slug}`} style={{ textDecoration:"none" }}>
                    <div className="p-4 rounded-xl transition-all duration-200"
                      style={{ background:"rgba(8,22,42,0.75)", border:"1px solid rgba(30,41,59,0.8)" }}
                      onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${r.color}50`; }}
                      onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(30,41,59,0.8)"; }}
                    >
                      <span className="text-xs font-semibold mb-2 block" style={{ color:r.color }}>{r.category}</span>
                      <p className="text-sm font-semibold text-white leading-snug mb-1">{r.title}</p>
                      <span className="text-xs" style={{ color:"#475569" }}>{r.readTime} de leitura</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 rounded-2xl p-8 text-center"
            style={{ background:"rgba(8,22,42,0.75)", border:`1px solid ${post.color}25` }}>
            <p className="text-white font-bold text-lg mb-2">Gostou do conteúdo?</p>
            <p className="text-sm mb-6" style={{ color:"#64748B" }}>
              Precisa de um projeto desenvolvido com qualidade profissional?
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-block font-semibold rounded-lg px-8 py-3 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background:"linear-gradient(135deg,#D97706,#EA580C)", color:"#fff", textDecoration:"none", boxShadow:"0 4px 20px rgba(234,88,12,0.4)" }}>
              Solicitar Orçamento
            </a>
          </div>

        </div>
      </div>

      {/* Prose styles */}
      <style>{`
        .prose-custom { color: #94A3B8; line-height: 1.8; font-size: 0.97rem; }
        .prose-custom h2 { color: #E2E8F0; font-size: 1.5rem; font-weight: 800; margin: 2.5rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(30,41,59,0.8); }
        .prose-custom h3 { color: #CBD5E1; font-size: 1.15rem; font-weight: 700; margin: 2rem 0 0.75rem; }
        .prose-custom p  { margin-bottom: 1.2rem; }
        .prose-custom ul { margin: 1rem 0 1.5rem 1.5rem; list-style: disc; }
        .prose-custom li { margin-bottom: 0.4rem; }
        .prose-custom li.check { list-style: none; margin-left: -0.5rem; }
        .prose-custom strong { color: #E2E8F0; font-weight: 700; }
        .prose-custom pre {
          background: rgba(2,11,20,0.9);
          border: 1px solid rgba(30,41,59,1);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          position: relative;
          font-size: 0.82rem;
          line-height: 1.7;
        }
        .prose-custom pre::before {
          content: attr(data-lang);
          position: absolute; top: 0.5rem; right: 0.75rem;
          font-size: 0.65rem; font-family: monospace;
          color: rgba(134,239,172,0.4); text-transform: uppercase; letter-spacing: 1px;
        }
        .prose-custom pre code { color: #86EFAC; font-family: 'Courier New', monospace; background: none; padding: 0; }
        .prose-custom code.inline-code {
          color: #38BDF8; background: rgba(56,189,248,0.1);
          border: 1px solid rgba(56,189,248,0.2);
          padding: 0.15em 0.45em; border-radius: 4px;
          font-family: 'Courier New', monospace; font-size: 0.88em;
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
      `}</style>

      <Footer />
    </div>
  );
}
