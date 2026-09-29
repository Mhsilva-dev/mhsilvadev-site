import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS, CATEGORIES, LEVELS } from "../data/blogPosts";
import ParticleCanvas from "../components/ParticleCanvas";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LEVEL_COLORS = {
  "Iniciante":     { bg: "rgba(134,239,172,0.12)", border: "rgba(134,239,172,0.35)", text: "#86EFAC" },
  "Intermediário": { bg: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.35)",  text: "#38BDF8" },
  "Avançado":      { bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.35)",  text: "#F97316" },
};

function PostCard({ post, index, visible }) {
  const lvl = LEVEL_COLORS[post.level] || LEVEL_COLORS["Iniciante"];
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
      <article
        className="rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer group"
        style={{
          background: "rgba(8,22,42,0.75)",
          border: "1px solid rgba(30,41,59,0.8)",
          backdropFilter: "blur(16px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s, border-color 0.3s, box-shadow 0.3s`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${post.color}55`;
          e.currentTarget.style.boxShadow   = `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${post.color}15`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(30,41,59,0.8)";
          e.currentTarget.style.boxShadow   = "none";
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${post.color}, transparent)` }} />

        <div className="p-6 flex flex-col flex-1">
          {/* Category + Level */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: `${post.color}18`, color: post.color, border: `1px solid ${post.color}40` }}>
              {post.category}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ background: lvl.bg, color: lvl.text, border: `1px solid ${lvl.border}` }}>
              {post.level}
            </span>
            <span className="text-xs ml-auto" style={{ color: "#475569" }}>
              {post.readTime} de leitura
            </span>
          </div>

          {/* Title */}
          <h2 className="font-bold leading-snug mb-3 transition-colors duration-200 group-hover:text-white"
            style={{ color: "#E2E8F0", fontSize: "1.05rem", lineHeight: 1.4 }}>
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "#64748B" }}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded"
                style={{ background: "rgba(30,41,59,0.8)", color: "#475569", border: "1px solid rgba(30,41,59,1)" }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4"
            style={{ borderTop: "1px solid rgba(30,41,59,0.8)" }}>
            <span className="text-xs" style={{ color: "#334155" }}>{post.date}</span>
            <span className="text-xs font-semibold flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
              style={{ color: post.color }}>
              Ler artigo <span>→</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const [active, setActive]   = useState("Blog");
  const [category, setCategory] = useState("Todos");
  const [level, setLevel]     = useState("Todos");
  const [search, setSearch]   = useState("");
  const [visible, setVisible] = useState(true);

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter(p => {
      const matchCat   = category === "Todos" || p.category === category;
      const matchLevel = level    === "Todos" || p.level    === level;
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchLevel && matchSearch;
    });
  }, [category, level, search]);

  const changeFilter = (fn) => {
    setVisible(false);
    setTimeout(() => { fn(); setVisible(true); }, 200);
  };

  return (
    <div style={{ background: "#020B14", minHeight: "100vh" }}>
      <ParticleCanvas />
      <Navbar active={active} setActive={setActive} />

      <div className="relative z-10 pt-28 pb-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-14 text-center"
            style={{ animation: "fadeUp 0.8s ease both" }}>
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-xs font-mono"
              style={{ background: "rgba(134,239,172,0.08)", border: "1px solid rgba(134,239,172,0.2)", color: "#86EFAC" }}>
              <span style={{ animation: "blink 2s infinite" }}>●</span>
              {BLOG_POSTS.length} artigos publicados
            </div>
            <h1 className="font-black mb-4" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", lineHeight: 1.1 }}>
              <span className="text-white">Blog & </span>
              <span style={{ background: "linear-gradient(135deg,#86EFAC,#4ADE80)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Tutoriais
              </span>
            </h1>
            <p className="max-w-xl mx-auto text-base leading-relaxed" style={{ color: "#64748B" }}>
              Conteúdo técnico e prático para desenvolvedores de todos os níveis.
              Desde fundamentos até arquitetura avançada.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-lg mx-auto mb-10 relative" style={{ animation: "fadeUp 0.8s 0.1s ease both", opacity: 0 }}>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: "#334155" }}>🔍</span>
            <input
              type="text"
              placeholder="Buscar artigos, tecnologias..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "rgba(8,22,42,0.8)", border: "1px solid rgba(30,41,59,0.9)",
                color: "#E2E8F0", backdropFilter: "blur(12px)",
              }}
              onFocus={(e) => e.target.style.borderColor = "rgba(134,239,172,0.4)"}
              onBlur={(e)  => e.target.style.borderColor = "rgba(30,41,59,0.9)"}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 mb-12" style={{ animation: "fadeUp 0.8s 0.2s ease both", opacity: 0 }}>
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map(c => (
                <button key={c.name}
                  onClick={() => changeFilter(() => setCategory(c.name))}
                  className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer"
                  style={{
                    background: category === c.name ? `${c.color}20` : "rgba(8,22,42,0.7)",
                    border:     category === c.name ? `1px solid ${c.color}60` : "1px solid rgba(30,41,59,0.9)",
                    color:      category === c.name ? c.color : "#475569",
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
            {/* Levels */}
            <div className="flex flex-wrap gap-2 justify-center">
              {LEVELS.map(l => {
                const lv = LEVEL_COLORS[l] || { text: "#94A3B8", bg: "rgba(8,22,42,0.7)", border: "rgba(30,41,59,0.9)" };
                return (
                  <button key={l}
                    onClick={() => changeFilter(() => setLevel(l))}
                    className="text-xs font-medium px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer"
                    style={{
                      background: level === l ? lv.bg   : "rgba(8,22,42,0.7)",
                      border:     level === l ? `1px solid ${lv.border}` : "1px solid rgba(30,41,59,0.9)",
                      color:      level === l ? lv.text : "#475569",
                    }}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          <p className="text-center text-sm mb-8" style={{ color: "#334155" }}>
            {filtered.length} {filtered.length === 1 ? "artigo encontrado" : "artigos encontrados"}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} visible={visible} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-semibold mb-2" style={{ color: "#E2E8F0" }}>Nenhum artigo encontrado</p>
              <p className="text-sm" style={{ color: "#475569" }}>Tente outros filtros ou termos de busca</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
