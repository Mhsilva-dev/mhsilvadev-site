// ─────────────────────────────────────────────────────────────
//  CONFIGURAÇÕES DO SITE
// ─────────────────────────────────────────────────────────────

// Os dados de contato vêm do arquivo .env (veja .env.example), para não
// ficarem fixos no código.
const env = import.meta.env;

// WhatsApp: só dígitos, com código do país e DDD (ex.: 5511999999999)
export const WHATSAPP_NUMBER = env.VITE_WHATSAPP_NUMBER || "5500000000000";

export const WHATSAPP_MSG = encodeURIComponent(
  "Olá! Vim pelo site e gostaria de solicitar um orçamento. 🚀"
);

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

// Informações de contato
export const CONTACT = {
  email:    env.VITE_CONTACT_EMAIL    || "contato@exemplo.com",
  phone:    env.VITE_CONTACT_PHONE    || "(00) 00000-0000",
  location: env.VITE_CONTACT_LOCATION || "Brasil",
};

// Links sociais
export const SOCIALS = [
  { label: "in", title: "LinkedIn", href: "https://www.linkedin.com/in/matheus-silva-01b8b3433" },
  { label: "gh", title: "GitHub",   href: "https://github.com/Mhsilva-dev" },
];

// Navegação
export const NAV_LINKS = ["Início", "Serviços", "Portfólio", "Blog", "Contato"];

// Serviços listados no footer
export const FOOTER_SERVICES = [
  "Desenvolvimento Web",
  "Aplicativos",
  "Bots e Automação",
  "Aprender Programação",
];
