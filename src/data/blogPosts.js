export const BLOG_POSTS = [
  {
    id: 1,
    slug: "react-19-novidades-completo",
    title: "React 19: Todas as novidades que vão mudar sua forma de codar",
    excerpt: "Server Components estáveis, Actions, use() hook, melhorias no hydration e muito mais. Guia completo com exemplos práticos.",
    category: "React",
    level: "Intermediário",
    readTime: "12 min",
    date: "15 Jan 2025",
    tags: ["React", "JavaScript", "Frontend"],
    color: "#38BDF8",
    content: `
## O que mudou no React 19?

O React 19 trouxe mudanças significativas que simplificam muito o desenvolvimento. Vamos explorar cada uma delas com exemplos práticos.

### 1. Actions — Adeus ao useState para forms

Antes, para lidar com formulários, precisávamos de muito boilerplate:

\`\`\`jsx
// React 18 — muito código
function Form() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError]         = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsPending(true);
    try {
      await submitData(new FormData(e.target));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  }
  return <form onSubmit={handleSubmit}>...</form>;
}
\`\`\`

Com React 19 Actions:

\`\`\`jsx
// React 19 — limpo e direto
function Form() {
  const [error, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await submitData(formData);
      if (!result.ok) return result.error;
      return null;
    },
    null
  );

  return (
    <form action={submitAction}>
      {error && <p className="text-red-500">{error}</p>}
      <button disabled={isPending}>
        {isPending ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
\`\`\`

### 2. O novo hook use()

O \`use()\` permite consumir Promises e Context dentro de condicionais:

\`\`\`jsx
import { use, Suspense } from 'react';

function UserProfile({ userPromise }) {
  const user = use(userPromise);
  return <h1>Olá, {user.name}!</h1>;
}

function App() {
  const userPromise = fetchUser(1);
  return (
    <Suspense fallback={<Skeleton />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
\`\`\`

### 3. Server Components — Agora estável

\`\`\`jsx
async function ProductList() {
  const products = await db.query('SELECT * FROM products');
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name} — R$ {p.price}</li>
      ))}
    </ul>
  );
}
\`\`\`

### 4. Melhorias no ref

\`\`\`jsx
// React 19 — ref como prop direto, sem forwardRef
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
\`\`\`

### Conclusão

React 19 simplifica muito o código, especialmente para formulários e data fetching. Se você está num projeto novo, já use React 19. Para migrar projetos existentes, o guia oficial tem um codemod automático.
    `,
  },
  {
    id: 2,
    slug: "nodejs-api-rest-jwt-completo",
    title: "Node.js: Crie uma API REST profissional com JWT do zero",
    excerpt: "Autenticação segura, refresh tokens, middleware de autorização, rate limiting e boas práticas de segurança em produção.",
    category: "Node.js",
    level: "Intermediário",
    readTime: "18 min",
    date: "28 Jan 2025",
    tags: ["Node.js", "API", "JWT", "Backend"],
    color: "#86EFAC",
    content: `
## Construindo uma API REST segura com Node.js + JWT

Vamos construir uma API completa com autenticação JWT, refresh tokens e boas práticas de segurança.

### Setup inicial

\`\`\`bash
mkdir api-jwt && cd api-jwt
npm init -y
npm install express jsonwebtoken bcryptjs express-rate-limit helmet cors dotenv
npm install -D nodemon
\`\`\`

### Estrutura do projeto

\`\`\`
src/
├── controllers/
│   └── authController.js
├── middleware/
│   ├── auth.js
│   └── rateLimit.js
├── models/
│   └── User.js
├── routes/
│   └── auth.js
└── app.js
\`\`\`

### Configurando segurança base

\`\`\`js
import express  from 'express';
import helmet   from 'helmet';
import cors     from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json({ limit: '10kb' }));
\`\`\`

### Gerando tokens JWT

\`\`\`js
export const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
};
\`\`\`

### Middleware de autenticação

\`\`\`js
export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Não autorizado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
\`\`\`

### Boas práticas de segurança

1. **Nunca** armazene JWT no localStorage — use cookies httpOnly
2. Mantenha o accessToken com expiração curta (15min)
3. Use HTTPS em produção sempre
4. Valide e sanitize todos os inputs
5. Implemente rate limiting nas rotas de autenticação
    `,
  },
  {
    id: 3,
    slug: "typescript-guia-completo-iniciantes",
    title: "TypeScript do zero: Guia completo para quem vem do JavaScript",
    excerpt: "Types, Interfaces, Generics, Utility Types e como configurar TypeScript em projetos React e Node. Com exemplos reais.",
    category: "TypeScript",
    level: "Iniciante",
    readTime: "15 min",
    date: "10 Fev 2025",
    tags: ["TypeScript", "JavaScript", "Frontend", "Backend"],
    color: "#818CF8",
    content: `
## Por que aprender TypeScript em 2025?

TypeScript virou padrão no mercado. Praticamente toda vaga sênior exige. Se você já sabe JavaScript, aprender TypeScript é muito mais simples do que parece.

### Types vs Interfaces

\`\`\`ts
interface User {
  id:    number;
  name:  string;
  email: string;
  role:  'admin' | 'user';
}

type Status  = 'pending' | 'active' | 'inactive';
type ApiResponse<T> = { data: T; ok: boolean; message: string };
\`\`\`

### Generics — o poder do TypeScript

\`\`\`ts
async function fetchData<T>(url: string): Promise<T> {
  const res  = await fetch(url);
  return res.json() as T;
}

const user    = await fetchData<User>('/api/user/1');
const product = await fetchData<Product>('/api/product/5');
\`\`\`

### Utility Types — produtividade real

\`\`\`ts
type UpdateUser = Partial<User>;          // todos opcionais (PATCH)
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;
type SafeUser   = Omit<User, 'password'>;
type ConstUser  = Readonly<User>;
\`\`\`

### TypeScript no React

\`\`\`tsx
interface ButtonProps {
  label:    string;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick:  () => void;
}

const Button = ({ label, variant = 'primary', onClick }: ButtonProps) => (
  <button onClick={onClick} className={\`btn btn-\${variant}\`}>{label}</button>
);

const [user, setUser]   = useState<User | null>(null);
const inputRef          = useRef<HTMLInputElement>(null);
\`\`\`

### Dica final

Não tente tipar tudo de uma vez em projetos existentes. Comece pelos arquivos mais críticos e vá migrando aos poucos.
    `,
  },
  {
    id: 4,
    slug: "docker-guia-pratico-devs",
    title: "Docker na prática: Do zero ao deploy em produção",
    excerpt: "Containers, imagens, Docker Compose, volumes e deploy na nuvem. Tudo que você precisa para containerizar qualquer aplicação.",
    category: "DevOps",
    level: "Intermediário",
    readTime: "20 min",
    date: "20 Fev 2025",
    tags: ["Docker", "DevOps", "Deploy", "Linux"],
    color: "#38BDF8",
    content: `
## Docker do zero ao deploy

Docker é a habilidade que separa o dev que "funciona na minha máquina" do dev que entrega em produção com confiança.

### Seu primeiro Dockerfile

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]
\`\`\`

### Docker Compose

\`\`\`yaml
services:
  api:
    build: .
    ports: ["3000:3000"]
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER:     user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB:       mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      retries:  5

volumes:
  postgres_data:
\`\`\`

### Multi-stage build — imagem pequena

\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
USER node
CMD ["node", "dist/server.js"]
\`\`\`

Resultado: ~150MB ao invés de ~900MB.
    `,
  },
  {
    id: 5,
    slug: "git-workflow-times-profissionais",
    title: "Git Flow profissional: Como times de alto nível usam Git",
    excerpt: "Conventional commits, branching strategy, Pull Requests, code review, hooks com Husky e automação com GitHub Actions.",
    category: "Git",
    level: "Iniciante",
    readTime: "10 min",
    date: "05 Mar 2025",
    tags: ["Git", "GitHub", "DevOps", "Boas Práticas"],
    color: "#F97316",
    content: `
## Git como os profissionais usam

### Conventional Commits

\`\`\`bash
git commit -m "feat(auth): adiciona login com Google OAuth"
git commit -m "fix(api): corrige timeout na rota de produtos"
git commit -m "docs(readme): atualiza instruções de setup"
git commit -m "refactor(utils): simplifica função de formatação"
\`\`\`

### Branching Strategy

\`\`\`
main        → produção (nunca commita direto)
develop     → integração
feature/xxx → nova funcionalidade
fix/xxx     → correção de bug
hotfix/xxx  → correção urgente em produção
\`\`\`

### GitHub Actions — CI/CD básico

\`\`\`yaml
name: CI
on:
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
\`\`\`

### Dicas de code review

- Faça PRs pequenos (< 400 linhas) — mais fácil revisar
- Descreva **o quê** e **por quê** mudou
- Responda todos os comentários antes de fazer merge
    `,
  },
  {
    id: 6,
    slug: "performance-react-otimizacoes-avancadas",
    title: "Performance em React: Técnicas avançadas de otimização",
    excerpt: "memo, useMemo, useCallback, lazy loading, Code Splitting, virtualização de listas e como medir performance com DevTools.",
    category: "React",
    level: "Avançado",
    readTime: "16 min",
    date: "18 Mar 2025",
    tags: ["React", "Performance", "Otimização"],
    color: "#86EFAC",
    content: `
## Otimização de performance em React

Antes de otimizar, **meça**. Otimização prematura é a raiz de todos os males.

### React.memo

\`\`\`jsx
const ProductCard = React.memo(
  ({ product }) => <div>{product.name}</div>,
  (prev, next) => prev.product.id === next.product.id
);
\`\`\`

### useMemo e useCallback

\`\`\`jsx
const filtered = useMemo(
  () => products.filter(p => p.category === filter),
  [products, filter]
);

const handleClick = useCallback((id) => {
  console.log(id);
}, []);
\`\`\`

### Code Splitting com lazy()

\`\`\`jsx
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Blog      = lazy(() => import('./pages/Blog'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog"      element={<Blog />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

### Checklist de performance

- [ ] Use React.memo em componentes puros
- [ ] Evite criar objetos/arrays inline nas props
- [ ] Implemente lazy loading em rotas e imagens
- [ ] Use virtualização para listas > 100 itens
    `,
  },

  // ── NOVOS ARTIGOS ──────────────────────────────────────────────────────────

  {
    id: 7,
    slug: "python-do-zero-para-devs-javascript",
    title: "Python do zero: Guia completo para quem vem do JavaScript",
    excerpt: "Sintaxe, listas, dicionários, funções, classes, async/await e as diferenças chave para quem já programa em JS. Com projetos práticos.",
    category: "Python",
    level: "Iniciante",
    readTime: "14 min",
    date: "02 Abr 2025",
    tags: ["Python", "Backend", "Iniciante"],
    color: "#FACC15",
    content: `
## Python para quem já sabe JavaScript

Python é a linguagem mais popular do mundo e domina áreas como IA, Data Science e automação. Se você já sabe JS, vai pegar rápido.

### Diferenças básicas de sintaxe

\`\`\`python
# Python usa indentação, não chaves
# Sem ponto-e-vírgula no final

# JavaScript
if (x > 10) {
  console.log("maior");
}

# Python
if x > 10:
    print("maior")
\`\`\`

### Tipos de dados essenciais

\`\`\`python
# Listas (como arrays no JS)
frutas = ["maçã", "banana", "uva"]
frutas.append("manga")       # push
frutas.pop()                  # pop
frutas[0]                     # acesso por índice

# Dicionários (como objetos no JS)
usuario = {
    "nome": "Maria",
    "idade": 28,
    "ativo": True
}
usuario["nome"]               # "Maria"
usuario.get("email", "N/A")   # valor padrão

# Tuplas — imutáveis
coordenadas = (10.5, -23.4)

# Sets — sem duplicatas
tags = {"python", "backend", "python"}  # {"python", "backend"}
\`\`\`

### Funções e List Comprehensions

\`\`\`python
# Função simples
def saudacao(nome, prefixo="Olá"):
    return f"{prefixo}, {nome}!"

print(saudacao("João"))          # Olá, João!
print(saudacao("Ana", "Oi"))     # Oi, Ana!

# List comprehension — substitui map/filter
numeros = [1, 2, 3, 4, 5, 6]

pares    = [n for n in numeros if n % 2 == 0]     # [2, 4, 6]
dobrados = [n * 2 for n in numeros]               # [2, 4, 6, 8, 10, 12]

# Equivalente em JS:
# numeros.filter(n => n % 2 === 0)
# numeros.map(n => n * 2)
\`\`\`

### Classes em Python

\`\`\`python
class Animal:
    def __init__(self, nome, especie):
        self.nome    = nome
        self.especie = especie

    def apresentar(self):
        return f"Eu sou {self.nome}, um {self.especie}"

    def __repr__(self):
        return f"Animal({self.nome!r})"

class Cachorro(Animal):
    def __init__(self, nome):
        super().__init__(nome, "cachorro")

    def latir(self):
        return f"{self.nome} diz: Au au!"

rex = Cachorro("Rex")
print(rex.apresentar())   # Eu sou Rex, um cachorro
print(rex.latir())        # Rex diz: Au au!
\`\`\`

### Async/Await em Python

\`\`\`python
import asyncio
import aiohttp

async def buscar_usuario(id: int):
    async with aiohttp.ClientSession() as session:
        async with session.get(f"https://api.exemplo.com/users/{id}") as resp:
            return await resp.json()

async def main():
    # Busca múltiplos usuários em paralelo
    usuarios = await asyncio.gather(
        buscar_usuario(1),
        buscar_usuario(2),
        buscar_usuario(3),
    )
    for u in usuarios:
        print(u["name"])

asyncio.run(main())
\`\`\`

### Manipulação de arquivos

\`\`\`python
import json

# Leitura
with open("dados.json", "r", encoding="utf-8") as f:
    dados = json.load(f)

# Escrita
with open("resultado.json", "w", encoding="utf-8") as f:
    json.dump(dados, f, ensure_ascii=False, indent=2)

# CSV
import csv
with open("relatorio.csv", "r") as f:
    reader = csv.DictReader(f)
    for linha in reader:
        print(linha["nome"], linha["valor"])
\`\`\`

### Onde usar Python

| Área | Bibliotecas |
|------|-------------|
| APIs | FastAPI, Django, Flask |
| IA / ML | TensorFlow, PyTorch, scikit-learn |
| Data Science | Pandas, NumPy, Matplotlib |
| Automação | Selenium, Playwright, BeautifulSoup |
| Scripts | Click, Rich, Typer |

### Dica de aprendizado

Comece com scripts de automação do dia a dia (renomear arquivos, processar CSVs, fazer chamadas de API). Você sentirá o poder do Python em minutos.
    `,
  },
  {
    id: 8,
    slug: "javascript-moderno-dicas-essenciais",
    title: "JavaScript moderno: 15 recursos que todo dev precisa dominar",
    excerpt: "Destructuring, spread, optional chaining, nullish coalescing, Promises, async/await, módulos ES6 e muito mais. Com casos de uso reais.",
    category: "JavaScript",
    level: "Iniciante",
    readTime: "13 min",
    date: "10 Abr 2025",
    tags: ["JavaScript", "ES6", "Frontend", "Backend"],
    color: "#FBBF24",
    content: `
## JavaScript moderno em 2025

JavaScript evoluiu muito. Esses são os recursos que você mais vai usar no dia a dia.

### 1. Destructuring

\`\`\`js
// Objetos
const { nome, idade, cidade = "São Paulo" } = usuario;

// Arrays
const [primeiro, segundo, ...resto] = [1, 2, 3, 4, 5];

// Em parâmetros de função
function exibir({ nome, email }) {
  console.log(\`\${nome} — \${email}\`);
}
\`\`\`

### 2. Spread e Rest

\`\`\`js
// Clonar e mesclar objetos
const base    = { cor: "azul", tamanho: "M" };
const premium = { ...base, material: "seda", preco: 299 };

// Clonar arrays sem mutação
const original  = [1, 2, 3];
const copia     = [...original, 4, 5]; // [1, 2, 3, 4, 5]

// Rest params
function soma(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}
soma(1, 2, 3, 4, 5); // 15
\`\`\`

### 3. Optional Chaining (?.)

\`\`\`js
// Antes — verboso e frágil
const cidade = usuario && usuario.endereco && usuario.endereco.cidade;

// Agora — limpo e seguro
const cidade = usuario?.endereco?.cidade;

// Com métodos e arrays
const primeiroItem = lista?.[0]?.nome;
const resultado    = objeto?.metodo?.();
\`\`\`

### 4. Nullish Coalescing (??)

\`\`\`js
// ?? só considera null/undefined (não 0, "" ou false)
const nome  = usuario.nome ?? "Anônimo";
const porta = config.porta ?? 3000;

// Diferença do ||
const qtd1 = 0 || 10;   // 10 ← errado! 0 é falsy
const qtd2 = 0 ?? 10;   // 0  ← correto!
\`\`\`

### 5. Promises e async/await

\`\`\`js
// Promise encadeada
fetch('/api/users')
  .then(res  => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// async/await — muito mais legível
async function buscarUsuarios() {
  try {
    const res   = await fetch('/api/users');
    const users = await res.json();
    return users;
  } catch (err) {
    console.error('Erro:', err);
    throw err;
  }
}

// Paralelo com Promise.all
const [users, products] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/products').then(r => r.json()),
]);
\`\`\`

### 6. Array Methods modernos

\`\`\`js
const produtos = [
  { nome: "Camiseta", preco: 59, categoria: "roupas" },
  { nome: "Notebook", preco: 3500, categoria: "tech" },
  { nome: "Tênis",    preco: 299, categoria: "roupas" },
];

// filter + map + reduce encadeados
const totalRoupa = produtos
  .filter(p => p.categoria === "roupas")
  .map(p => p.preco)
  .reduce((acc, preco) => acc + preco, 0); // 358

// find — retorna o objeto, não o índice
const notebook = produtos.find(p => p.nome === "Notebook");

// every / some
const todosBaratos = produtos.every(p => p.preco < 100);  // false
const algumBarato  = produtos.some(p  => p.preco < 100);  // true

// flatMap
const tags = [["js","react"], ["python","fastapi"]];
tags.flatMap(t => t); // ["js", "react", "python", "fastapi"]
\`\`\`

### 7. Módulos ES6

\`\`\`js
// utils.js — named exports
export const formatar = (valor) => \`R$ \${valor.toFixed(2)}\`;
export const validarEmail = (email) => /^[^@]+@[^@]+\\.[^@]+$/.test(email);

// api.js — default export
export default class Api {
  constructor(baseUrl) { this.base = baseUrl; }
  async get(path) { return fetch(this.base + path).then(r => r.json()); }
}

// main.js — import
import Api from './api.js';
import { formatar, validarEmail } from './utils.js';
\`\`\`

### 8. Map e Set

\`\`\`js
// Map — chaves de qualquer tipo
const cache = new Map();
cache.set('usuario:1', { nome: 'Ana' });
cache.get('usuario:1'); // { nome: 'Ana' }
cache.has('usuario:1'); // true

// Set — coleção sem duplicatas
const ids     = new Set([1, 2, 2, 3, 3, 3]);
ids.size;         // 3
ids.has(2);       // true

// Remover duplicatas de array
const unicos = [...new Set([1, 2, 2, 3, 3])]; // [1, 2, 3]
\`\`\`

Domine esses recursos e seu código vai ficar muito mais limpo, legível e eficiente.
    `,
  },
  {
    id: 9,
    slug: "sql-pratico-devs",
    title: "SQL na prática: Tudo que um dev precisa saber",
    excerpt: "SELECT, JOINs, subqueries, índices, transactions e otimização de queries. Com exemplos reais de um sistema de e-commerce.",
    category: "Banco de Dados",
    level: "Iniciante",
    readTime: "17 min",
    date: "18 Abr 2025",
    tags: ["SQL", "PostgreSQL", "Backend", "Banco de Dados"],
    color: "#34D399",
    content: `
## SQL: A habilidade que todo dev backend precisa

SQL é a língua dos dados. Independente do stack, você vai precisar consultar bancos relacionais.

### Modelo de exemplo — E-commerce

\`\`\`sql
CREATE TABLE usuarios (
  id         SERIAL PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  criado_em  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE produtos (
  id         SERIAL PRIMARY KEY,
  nome       VARCHAR(200) NOT NULL,
  preco      DECIMAL(10,2) NOT NULL,
  estoque    INT DEFAULT 0,
  categoria  VARCHAR(50)
);

CREATE TABLE pedidos (
  id          SERIAL PRIMARY KEY,
  usuario_id  INT REFERENCES usuarios(id),
  total       DECIMAL(10,2),
  status      VARCHAR(20) DEFAULT 'pendente',
  criado_em   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE itens_pedido (
  id          SERIAL PRIMARY KEY,
  pedido_id   INT REFERENCES pedidos(id),
  produto_id  INT REFERENCES produtos(id),
  quantidade  INT NOT NULL,
  preco_unit  DECIMAL(10,2) NOT NULL
);
\`\`\`

### SELECT com filtros

\`\`\`sql
-- Básico
SELECT nome, email FROM usuarios WHERE criado_em >= '2025-01-01';

-- LIKE para buscas parciais
SELECT * FROM produtos WHERE nome ILIKE '%camiseta%';

-- IN e BETWEEN
SELECT * FROM pedidos WHERE status IN ('pendente', 'processando');
SELECT * FROM produtos WHERE preco BETWEEN 50 AND 300;

-- ORDER e LIMIT
SELECT * FROM produtos ORDER BY preco DESC LIMIT 10 OFFSET 20;
\`\`\`

### JOINs — relacionando tabelas

\`\`\`sql
-- INNER JOIN — só registros com correspondência
SELECT
  p.id,
  u.nome AS cliente,
  p.total,
  p.status,
  p.criado_em
FROM pedidos p
INNER JOIN usuarios u ON u.id = p.usuario_id
WHERE p.status = 'pago'
ORDER BY p.criado_em DESC;

-- LEFT JOIN — todos os usuários, mesmo sem pedidos
SELECT
  u.nome,
  COUNT(p.id)      AS total_pedidos,
  COALESCE(SUM(p.total), 0) AS valor_total
FROM usuarios u
LEFT JOIN pedidos p ON p.usuario_id = u.id
GROUP BY u.id, u.nome
ORDER BY valor_total DESC;

-- JOIN múltiplo — itens de um pedido
SELECT
  pr.nome      AS produto,
  ip.quantidade,
  ip.preco_unit,
  (ip.quantidade * ip.preco_unit) AS subtotal
FROM itens_pedido ip
JOIN produtos pr ON pr.id = ip.produto_id
WHERE ip.pedido_id = 42;
\`\`\`

### Aggregations e GROUP BY

\`\`\`sql
-- Vendas por categoria
SELECT
  pr.categoria,
  COUNT(DISTINCT p.id)    AS num_pedidos,
  SUM(ip.quantidade)      AS unidades_vendidas,
  SUM(ip.quantidade * ip.preco_unit) AS receita
FROM itens_pedido ip
JOIN produtos pr ON pr.id = ip.produto_id
JOIN pedidos p  ON p.id  = ip.pedido_id
WHERE p.status = 'pago'
GROUP BY pr.categoria
HAVING SUM(ip.quantidade * ip.preco_unit) > 1000
ORDER BY receita DESC;
\`\`\`

### Subqueries e CTEs

\`\`\`sql
-- CTE (Common Table Expression) — muito mais legível
WITH vendas_usuario AS (
  SELECT
    usuario_id,
    COUNT(*) AS num_pedidos,
    SUM(total) AS total_gasto
  FROM pedidos
  WHERE status = 'pago'
  GROUP BY usuario_id
),
ranking AS (
  SELECT
    u.nome,
    v.num_pedidos,
    v.total_gasto,
    RANK() OVER (ORDER BY v.total_gasto DESC) AS posicao
  FROM vendas_usuario v
  JOIN usuarios u ON u.id = v.usuario_id
)
SELECT * FROM ranking WHERE posicao <= 10;
\`\`\`

### Índices — performance real

\`\`\`sql
-- Sempre crie índices em colunas de busca e JOIN
CREATE INDEX idx_pedidos_usuario   ON pedidos(usuario_id);
CREATE INDEX idx_pedidos_status    ON pedidos(status);
CREATE INDEX idx_pedidos_criado    ON pedidos(criado_em DESC);
CREATE INDEX idx_produtos_categoria ON produtos(categoria);

-- Índice composto (para queries com múltiplos filtros)
CREATE INDEX idx_pedidos_status_data ON pedidos(status, criado_em DESC);

-- Verificar se a query usa o índice
EXPLAIN ANALYZE
SELECT * FROM pedidos WHERE status = 'pago' AND criado_em >= '2025-01-01';
\`\`\`

### Transactions — atomicidade

\`\`\`sql
BEGIN;

  -- Cria o pedido
  INSERT INTO pedidos (usuario_id, total, status)
  VALUES (1, 299.90, 'pago')
  RETURNING id INTO pedido_id;

  -- Adiciona os itens
  INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unit)
  VALUES (pedido_id, 5, 1, 299.90);

  -- Decrementa o estoque
  UPDATE produtos SET estoque = estoque - 1 WHERE id = 5;

  -- Se chegou aqui, tudo certo
COMMIT;

-- Se der erro em qualquer passo, nada é salvo
-- ROLLBACK;
\`\`\`

### Dicas de otimização

- Use \`EXPLAIN ANALYZE\` para entender o plano de execução
- Evite \`SELECT *\` em produção — especifique as colunas
- Paginação com \`OFFSET\` é lenta em tabelas grandes — use cursor-based pagination
- Use \`LIMIT\` sempre que possível
    `,
  },
  {
    id: 10,
    slug: "css-moderno-guia-completo",
    title: "CSS moderno: Flexbox, Grid, variáveis e animações do zero",
    excerpt: "Tudo que você precisa para dominar layouts modernos. Flexbox vs Grid, custom properties, animações com @keyframes e CSS responsivo.",
    category: "CSS",
    level: "Iniciante",
    readTime: "16 min",
    date: "25 Abr 2025",
    tags: ["CSS", "Frontend", "Design", "Responsivo"],
    color: "#F472B6",
    content: `
## CSS moderno — layouts que impressionam

CSS evoluiu muito. Com Flexbox, Grid e Custom Properties, você cria layouts complexos com muito menos código.

### Flexbox — alinhamento em uma dimensão

\`\`\`css
.container {
  display: flex;
  justify-content: space-between; /* eixo principal */
  align-items: center;            /* eixo cruzado */
  gap: 1rem;
  flex-wrap: wrap;
}

/* Centralizar perfeitamente */
.centralizado {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Flex item que ocupa o espaço restante */
.navbar-logo  { flex: 0 0 auto; }
.navbar-links { flex: 1; }
.navbar-cta   { flex: 0 0 auto; }
\`\`\`

### CSS Grid — layouts em duas dimensões

\`\`\`css
/* Grid responsivo sem media queries */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Layout de página completo */
.app {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main   main"
    "footer footer footer";
  grid-template-columns: 260px 1fr;
  grid-template-rows: 60px 1fr 60px;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
\`\`\`

### Custom Properties (Variáveis CSS)

\`\`\`css
:root {
  /* Design tokens */
  --color-primary:   #38BDF8;
  --color-secondary: #86EFAC;
  --color-bg:        #020B14;
  --color-text:      #E2E8F0;
  --color-muted:     #64748B;

  --spacing-sm:  0.5rem;
  --spacing-md:  1rem;
  --spacing-lg:  2rem;
  --spacing-xl:  4rem;

  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-full: 9999px;

  --font-size-sm:  0.875rem;
  --font-size-base: 1rem;
  --font-size-lg:  1.125rem;
  --font-size-xl:  1.5rem;
}

/* Tema escuro/claro automático */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:   #0f172a;
    --color-text: #f8fafc;
  }
}

.botao {
  background: var(--color-primary);
  color: var(--color-bg);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-lg);
}
\`\`\`

### Animações com @keyframes

\`\`\`css
/* Fade in de baixo para cima */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeUp 0.6s ease both;
}

/* Delay escalonado para listas */
.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 80ms; }
.card:nth-child(3) { animation-delay: 160ms; }

/* Loader spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255,255,255,0.1);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Pulse (indicador online) */
@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.15); }
}
\`\`\`

### Media Queries e Design Responsivo

\`\`\`css
/* Mobile-first — padrão atual */
.container {
  width: 100%;
  padding: 0 1rem;
}

@media (min-width: 640px)  { .container { max-width: 640px;  margin: 0 auto; } }
@media (min-width: 768px)  { .container { max-width: 768px;  } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }

/* Tipografia fluida sem media queries */
h1 {
  font-size: clamp(1.8rem, 5vw, 3.5rem);
}
\`\`\`

### Pseudo-classes úteis

\`\`\`css
/* Estilizar listas sem adicionar classes */
li:first-child  { border-top: none; }
li:last-child   { border-bottom: none; }
li:nth-child(odd)  { background: rgba(255,255,255,0.02); }

/* :not() — exclui elementos */
.botao:not(:disabled):hover {
  transform: translateY(-2px);
}

/* :is() — agrupa seletores */
:is(h1, h2, h3) {
  font-weight: 800;
  line-height: 1.2;
}
\`\`\`
    `,
  },
  {
    id: 11,
    slug: "golang-introducao-backend",
    title: "Go (Golang): Por que está dominando o backend moderno",
    excerpt: "Goroutines, channels, HTTP server nativo, structs, interfaces e como construir APIs ultrarrápidas com Go. Para devs JavaScript e Python.",
    category: "Go",
    level: "Intermediário",
    readTime: "15 min",
    date: "02 Mai 2025",
    tags: ["Go", "Golang", "Backend", "Performance"],
    color: "#22D3EE",
    content: `
## Go: Simples, rápido e feito para escala

Go foi criado pelo Google e hoje alimenta projetos como Docker, Kubernetes, Terraform e Twitch. É compilado, tem garbage collection e concorrência nativa.

### Por que Go?

- Compilado em binário único — zero dependências em produção
- Goroutines — milhares de tarefas concorrentes com poucos recursos
- Tipagem estática + inferência de tipo
- Startup em milissegundos (ideal para containers)
- Stdlib poderosa — HTTP server sem frameworks externos

### Sintaxe básica

\`\`\`go
package main

import (
    "fmt"
    "strings"
)

func main() {
    // Declaração curta
    nome := "Maria"
    idade := 28

    // Array e Slice
    frutas := []string{"maçã", "banana", "uva"}
    frutas = append(frutas, "manga")

    // Map (dicionário)
    capitais := map[string]string{
        "BR": "Brasília",
        "US": "Washington",
        "JP": "Tóquio",
    }

    fmt.Printf("Olá %s, %d anos\\n", nome, idade)
    fmt.Println(strings.Join(frutas, ", "))
    fmt.Println(capitais["BR"])
}
\`\`\`

### Structs e Interfaces

\`\`\`go
// Struct — equivalente a classe
type Usuario struct {
    ID    int
    Nome  string
    Email string
}

// Método no struct
func (u Usuario) Apresentar() string {
    return fmt.Sprintf("%s <%s>", u.Nome, u.Email)
}

// Interface — duck typing
type Animal interface {
    Falar() string
    Mover() string
}

type Cachorro struct{ Nome string }
func (c Cachorro) Falar() string { return "Au au!" }
func (c Cachorro) Mover() string { return "correndo" }

type Peixe struct{ Nome string }
func (p Peixe) Falar() string { return "..." }
func (p Peixe) Mover() string { return "nadando" }

func descrever(a Animal) {
    fmt.Printf("Fala: %s, Move: %s\\n", a.Falar(), a.Mover())
}
\`\`\`

### HTTP Server nativo

\`\`\`go
package main

import (
    "encoding/json"
    "log"
    "net/http"
)

type Produto struct {
    ID    int     \`json:"id"\`
    Nome  string  \`json:"nome"\`
    Preco float64 \`json:"preco"\`
}

func listaProdutos(w http.ResponseWriter, r *http.Request) {
    produtos := []Produto{
        {1, "Camiseta", 59.90},
        {2, "Notebook", 3500.00},
    }
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(produtos)
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("GET /api/produtos", listaProdutos)

    log.Println("Servidor na porta 8080")
    log.Fatal(http.ListenAndServe(":8080", mux))
}
\`\`\`

### Goroutines — concorrência real

\`\`\`go
package main

import (
    "fmt"
    "sync"
    "time"
)

func buscarDados(id int, wg *sync.WaitGroup, resultados chan<- string) {
    defer wg.Done()
    time.Sleep(100 * time.Millisecond) // simula I/O
    resultados <- fmt.Sprintf("dados do usuário %d", id)
}

func main() {
    var wg sync.WaitGroup
    resultados := make(chan string, 5)

    // Dispara 5 goroutines em paralelo
    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go buscarDados(i, &wg, resultados)
    }

    // Fecha o canal quando todas terminarem
    go func() {
        wg.Wait()
        close(resultados)
    }()

    for r := range resultados {
        fmt.Println(r)
    }
    // Tempo total: ~100ms (não 500ms!)
}
\`\`\`

### Tratamento de erros em Go

\`\`\`go
// Go não tem exceções — erros são valores
func dividir(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("divisão por zero")
    }
    return a / b, nil
}

resultado, err := dividir(10, 0)
if err != nil {
    log.Printf("Erro: %v", err)
    return
}
fmt.Println(resultado)
\`\`\`

### Quando usar Go

- APIs de alta performance com muita concorrência
- CLIs e ferramentas de linha de comando
- Microserviços
- Processos em background (workers, queues)
    `,
  },
  {
    id: 12,
    slug: "linux-terminal-comandos-essenciais",
    title: "Terminal Linux: 30 comandos que vão turbinar sua produtividade",
    excerpt: "Navegação, manipulação de arquivos, processos, redes, pipes e scripts shell. O guia definitivo para devs que querem dominar o terminal.",
    category: "Linux",
    level: "Iniciante",
    readTime: "12 min",
    date: "08 Mai 2025",
    tags: ["Linux", "Terminal", "Shell", "DevOps"],
    color: "#A3E635",
    content: `
## Domine o terminal e multiplique sua produtividade

O terminal é a ferramenta mais poderosa de um desenvolvedor. Aprenda os comandos certos e você vai resolver em segundos o que levaria minutos na interface gráfica.

### Navegação

\`\`\`bash
pwd               # Diretório atual
ls -la            # Lista todos os arquivos (incluindo ocultos)
ls -lh            # Tamanho legível por humanos
cd ~              # Vai para home
cd -              # Volta ao diretório anterior
tree -L 2         # Árvore de diretórios (2 níveis)
\`\`\`

### Manipulação de arquivos

\`\`\`bash
# Criar
touch arquivo.txt
mkdir -p projetos/novo/src   # Cria diretórios aninhados

# Copiar e mover
cp -r origem/ destino/       # Copia diretório inteiro
mv arquivo.txt novo-nome.txt
mv *.js src/                 # Move todos os .js para src/

# Remover (cuidado!)
rm arquivo.txt
rm -rf pasta/                # Remove pasta e tudo dentro

# Ler
cat arquivo.txt              # Exibe tudo
head -20 arquivo.txt         # Primeiras 20 linhas
tail -f logs/app.log         # Acompanha em tempo real (ótimo para logs!)
less arquivo.txt             # Paginado (q para sair)
\`\`\`

### Busca com find e grep

\`\`\`bash
# find — busca por arquivo
find . -name "*.env"                     # Encontra todos os .env
find . -name "*.log" -mtime -7           # Logs dos últimos 7 dias
find . -size +100M                       # Arquivos maiores que 100MB
find . -type f -name "*.js" -not -path "*/node_modules/*"

# grep — busca no conteúdo
grep -r "WHATSAPP_NUMBER" src/           # Busca recursiva
grep -rn "TODO" . --include="*.ts"       # Com número de linha
grep -v "node_modules" arquivo.txt       # Exclui linhas com padrão
grep -E "erro|warning" logs/app.log      # Regex — erro OU warning
\`\`\`

### Pipes e redirecionamento

\`\`\`bash
# Pipe | — passa saída de um para outro
ls -la | grep ".js"           # Lista só arquivos .js
cat access.log | grep "404" | wc -l    # Conta erros 404
ps aux | grep node            # Processos node rodando

# Redirecionamento
echo "texto" > arquivo.txt    # Sobrescreve
echo "mais"  >> arquivo.txt   # Adiciona ao final
comando 2> erros.log          # Redireciona stderr
comando > saida.log 2>&1      # Redireciona tudo

# xargs — aplica comando a cada linha
cat ids.txt | xargs -I{} curl https://api.exemplo.com/user/{}
\`\`\`

### Processos

\`\`\`bash
ps aux                        # Lista todos os processos
top                           # Monitor em tempo real
htop                          # Versão melhorada do top
kill -9 PID                   # Mata processo pelo PID
pkill -f "node server.js"     # Mata por nome
lsof -i :3000                 # Quem está usando a porta 3000

# Rodar em background
nohup node server.js &        # Continua após fechar terminal
comando &                     # Background (termina com o terminal)
\`\`\`

### Rede

\`\`\`bash
curl -s https://api.exemplo.com/users | jq '.data[]'
curl -X POST -H "Content-Type: application/json" \\
     -d '{"nome":"João"}' https://api.exemplo.com/users

wget https://exemplo.com/arquivo.zip    # Download de arquivo

ping google.com -c 4          # Testa conectividade
traceroute google.com         # Rota dos pacotes
netstat -tlnp                 # Portas em uso
ss -tlnp                      # Alternativa moderna ao netstat
\`\`\`

### SSH e servidores

\`\`\`bash
# Conectar
ssh usuario@servidor.com
ssh -i ~/.ssh/chave.pem usuario@ip-servidor

# Copiar arquivos
scp arquivo.txt usuario@servidor.com:/home/usuario/
scp -r pasta/ usuario@servidor.com:/var/www/

# Gerar chave SSH
ssh-keygen -t ed25519 -C "seu@email.com"
cat ~/.ssh/id_ed25519.pub     # Copia para adicionar no servidor
\`\`\`

### Scripts Shell básicos

\`\`\`bash
#!/bin/bash
# deploy.sh — script de deploy simples

set -e  # Para em caso de erro

echo "🚀 Iniciando deploy..."

# Variáveis
APP_DIR="/var/www/meuapp"
BRANCH="main"

# Pull das mudanças
cd $APP_DIR
git pull origin $BRANCH

# Instala dependências
npm ci --production

# Build
npm run build

# Reinicia o serviço
pm2 restart meuapp

echo "✅ Deploy concluído!"
\`\`\`

### Aliases úteis — adicione no ~/.bashrc

\`\`\`bash
alias ll='ls -lah'
alias gs='git status'
alias gp='git push'
alias gc='git commit -m'
alias ports='lsof -i -P -n | grep LISTEN'
alias myip='curl -s ifconfig.me'
alias reload='source ~/.bashrc'
\`\`\`
    `,
  },
  {
    id: 13,
    slug: "clean-code-principios-praticos",
    title: "Clean Code: Princípios que separam código bom de código excelente",
    excerpt: "Nomes significativos, funções pequenas, DRY, SOLID, comentários úteis e como fazer code review eficaz. Com exemplos antes/depois.",
    category: "Boas Práticas",
    level: "Intermediário",
    readTime: "14 min",
    date: "15 Mai 2025",
    tags: ["Clean Code", "Boas Práticas", "Arquitetura", "Refatoração"],
    color: "#C084FC",
    content: `
## Clean Code — Código que outros devs vão agradecer

"Qualquer um pode escrever código que computadores entendem. Bons programadores escrevem código que humanos entendem." — Martin Fowler

### 1. Nomes que revelam intenção

\`\`\`js
// ❌ Ruim — o que é isso?
function d(u, t) {
  return u.filter(x => x.s === t);
}

// ✅ Bom — auto-documentado
function filtrarUsuariosPorStatus(usuarios, status) {
  return usuarios.filter(usuario => usuario.status === status);
}

// ❌ Ruim
const arr = [1, 2, 3];
const x = new Date();
let flag = false;

// ✅ Bom
const diasDaSemana = [1, 2, 3];
const dataDeNascimento = new Date();
let usuarioEstaLogado = false;
\`\`\`

### 2. Funções pequenas e com uma responsabilidade

\`\`\`js
// ❌ Ruim — faz tudo
async function processarPedido(pedidoId) {
  const pedido = await db.pedidos.findById(pedidoId);
  if (!pedido) throw new Error('Pedido não encontrado');

  // Calcula desconto
  let desconto = 0;
  if (pedido.usuario.plano === 'premium') desconto = 0.1;
  if (pedido.total > 500) desconto += 0.05;
  pedido.total = pedido.total * (1 - desconto);

  // Envia email
  const html = \`<h1>Pedido #\${pedido.id} confirmado!</h1>\`;
  await sendmail({ to: pedido.usuario.email, subject: 'Pedido confirmado', html });

  // Atualiza banco
  await db.pedidos.update({ id: pedidoId, total: pedido.total, status: 'confirmado' });
  await db.estoque.decrementar(pedido.itens);
}

// ✅ Bom — cada função tem uma responsabilidade
function calcularDesconto(usuario, total) {
  let desconto = 0;
  if (usuario.plano === 'premium') desconto += 0.1;
  if (total > 500)                 desconto += 0.05;
  return desconto;
}

async function enviarConfirmacao(pedido) {
  const html = templates.confirmacaoPedido(pedido);
  return email.enviar({ to: pedido.usuario.email, subject: 'Pedido confirmado', html });
}

async function atualizarEstoque(itens) {
  return Promise.all(itens.map(item =>
    db.estoque.decrementar(item.produtoId, item.quantidade)
  ));
}

async function processarPedido(pedidoId) {
  const pedido   = await db.pedidos.findById(pedidoId);
  if (!pedido) throw new Error('Pedido não encontrado');

  const desconto  = calcularDesconto(pedido.usuario, pedido.total);
  const totalFinal = pedido.total * (1 - desconto);

  await Promise.all([
    enviarConfirmacao({ ...pedido, total: totalFinal }),
    atualizarEstoque(pedido.itens),
    db.pedidos.update({ id: pedidoId, total: totalFinal, status: 'confirmado' }),
  ]);
}
\`\`\`

### 3. DRY — Don't Repeat Yourself

\`\`\`js
// ❌ Ruim — lógica duplicada
function validarEmail(email) {
  if (!email) return false;
  if (email.length > 150) return false;
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

function validarEmailCadastro(email) {
  if (!email) return false;
  if (email.length > 150) return false;
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email); // duplicado!
}

// ✅ Bom — fonte única da verdade
const EMAIL_REGEX = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
const EMAIL_MAX_LENGTH = 150;

function validarEmail(email) {
  return Boolean(email) &&
    email.length <= EMAIL_MAX_LENGTH &&
    EMAIL_REGEX.test(email);
}
\`\`\`

### 4. Guard Clauses — evite ifs aninhados

\`\`\`js
// ❌ Ruim — pirâmide da maldição
function processarPagamento(pedido) {
  if (pedido) {
    if (pedido.usuario) {
      if (pedido.usuario.ativo) {
        if (pedido.total > 0) {
          // lógica aqui — difícil de ler
          return realizarCobranca(pedido);
        }
      }
    }
  }
  return null;
}

// ✅ Bom — falha cedo, código principal no fundo
function processarPagamento(pedido) {
  if (!pedido)              throw new Error('Pedido inválido');
  if (!pedido.usuario)      throw new Error('Usuário não encontrado');
  if (!pedido.usuario.ativo) throw new Error('Usuário inativo');
  if (pedido.total <= 0)    throw new Error('Total inválido');

  return realizarCobranca(pedido);
}
\`\`\`

### 5. Comentários — quando e quando não usar

\`\`\`js
// ❌ Ruim — comenta o óbvio
// Incrementa o contador
contador++;

// Retorna o nome do usuário
return usuario.nome;

// ✅ Bom — explica o PORQUÊ, não o O QUÊ
// Usamos SHA-256 ao invés de MD5 por requisito de segurança (RFC-2025)
const hash = sha256(senha);

// Tolerância de 500ms para compensar desync de relógio entre servidores
const CLOCK_SKEW_MS = 500;
if (token.exp + CLOCK_SKEW_MS < Date.now()) throw new Error('Token expirado');
\`\`\`

### 6. Princípios SOLID em JavaScript

\`\`\`js
// S — Single Responsibility
class RelatorioVendas { gerar() { ... } }
class EmailService    { enviar() { ... } }
// Não misture as duas responsabilidades numa classe só

// O — Open/Closed — aberto para extensão, fechado para modificação
// ❌
function calcularPreco(produto, tipo) {
  if (tipo === 'desconto') return produto.preco * 0.9;
  if (tipo === 'premium')  return produto.preco * 1.2;
  // adicionar novo tipo = modificar a função
}

// ✅
const estrategias = {
  desconto: (preco) => preco * 0.9,
  premium:  (preco) => preco * 1.2,
  normal:   (preco) => preco,
};
const calcularPreco = (produto, tipo) =>
  (estrategias[tipo] ?? estrategias.normal)(produto.preco);
// Novo tipo = adicionar ao objeto, sem tocar no código existente
\`\`\`

### Checklist de code review

- [ ] O nome da variável/função revela claramente sua intenção?
- [ ] A função faz apenas uma coisa?
- [ ] Há código duplicado que pode ser extraído?
- [ ] Os comentários explicam o porquê, não o quê?
- [ ] Os erros estão sendo tratados adequadamente?
- [ ] A lógica está testável (sem dependências ocultas)?
    `,
  },
  {
    id: 14,
    slug: "nextjs-14-app-router-completo",
    title: "Next.js 14: App Router, Server Actions e o futuro do React",
    excerpt: "Pages vs App Router, Server e Client Components, Server Actions, caching avançado, metadata API e deploy na Vercel. Guia completo 2025.",
    category: "Next.js",
    level: "Intermediário",
    readTime: "19 min",
    date: "22 Mai 2025",
    tags: ["Next.js", "React", "Frontend", "Full-stack"],
    color: "#E2E8F0",
    content: `
## Next.js 14 — O framework React mais usado do mundo

Next.js transformou como construímos aplicações React. Com o App Router, a divisão entre cliente e servidor ficou muito mais clara.

### App Router vs Pages Router

\`\`\`
app/                         pages/ (legado)
├── layout.tsx               ├── _app.tsx
├── page.tsx                 ├── index.tsx
├── loading.tsx              └── products/
├── error.tsx                    └── [id].tsx
└── products/
    ├── page.tsx
    ├── loading.tsx
    └── [id]/
        └── page.tsx
\`\`\`

### Server vs Client Components

\`\`\`tsx
// Server Component — padrão no App Router
// Roda no servidor, acesso direto ao banco, sem bundle no cliente
async function ProductList() {
  // Busca direto no banco — sem useEffect, sem loading state manual
  const products = await db.products.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>
          <span>{p.name}</span>
          <span>R$ {p.price}</span>
        </li>
      ))}
    </ul>
  );
}

// Client Component — use apenas quando necessário
'use client';
import { useState } from 'react';

function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');

  return (
    <input
      value={query}
      onChange={e => { setQuery(e.target.value); onSearch(e.target.value); }}
      placeholder="Buscar produtos..."
    />
  );
}
\`\`\`

### Server Actions — forms sem API

\`\`\`tsx
// actions.ts — roda no servidor, chamado pelo cliente
'use server';
import { revalidatePath } from 'next/cache';

export async function criarProduto(formData: FormData) {
  const nome  = formData.get('nome') as string;
  const preco = Number(formData.get('preco'));

  // Validação
  if (!nome || preco <= 0) {
    return { erro: 'Dados inválidos' };
  }

  // Salva no banco
  await db.products.create({
    data: { nome, preco },
  });

  // Invalida o cache da lista
  revalidatePath('/produtos');
  return { sucesso: true };
}

// page.tsx — form sem useState, sem fetch manual
import { criarProduto } from './actions';

export default function NovoProduto() {
  return (
    <form action={criarProduto}>
      <input name="nome"  placeholder="Nome" required />
      <input name="preco" type="number" placeholder="Preço" required />
      <button type="submit">Criar Produto</button>
    </form>
  );
}
\`\`\`

### Data Fetching e Cache

\`\`\`tsx
// Revalidação por tempo (ISR)
async function getProdutos() {
  const res = await fetch('https://api.exemplo.com/produtos', {
    next: { revalidate: 60 }, // Revalida a cada 60 segundos
  });
  return res.json();
}

// Sem cache (sempre busca dado fresco)
async function getPedido(id: string) {
  const res = await fetch(\`/api/pedidos/\${id}\`, {
    cache: 'no-store',
  });
  return res.json();
}

// Cache permanente (gerado no build)
async function getPost(slug: string) {
  const res = await fetch(\`/api/posts/\${slug}\`, {
    cache: 'force-cache',
  });
  return res.json();
}
\`\`\`

### Metadata API — SEO moderno

\`\`\`tsx
// app/produtos/[id]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const produto = await getProduto(params.id);

  return {
    title:       produto.nome,
    description: produto.descricao,
    openGraph: {
      title:  produto.nome,
      images: [{ url: produto.imagem }],
    },
  };
}

// app/layout.tsx — metadata global
export const metadata: Metadata = {
  title:    { default: 'Minha Loja', template: '%s | Minha Loja' },
  description: 'Os melhores produtos com entrega rápida',
};
\`\`\`

### Loading e Error boundaries

\`\`\`tsx
// app/produtos/loading.tsx — mostrado enquanto carrega
export default function Loading() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />
      ))}
    </div>
  );
}

// app/produtos/error.tsx — boundary de erro
'use client';
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Algo deu errado!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Tentar novamente</button>
    </div>
  );
}
\`\`\`
    `,
  },
  {
    id: 15,
    slug: "fastapi-python-api-moderna",
    title: "FastAPI: Construa APIs modernas com Python em minutos",
    excerpt: "Rotas, validação com Pydantic, autenticação JWT, banco de dados com SQLAlchemy, docs automáticas e deploy. O framework Python mais rápido.",
    category: "Python",
    level: "Intermediário",
    readTime: "16 min",
    date: "30 Mai 2025",
    tags: ["Python", "FastAPI", "API", "Backend"],
    color: "#FACC15",
    content: `
## FastAPI — Python para APIs de alta performance

FastAPI é o framework Python mais moderno. Performance comparável ao Node.js, validação automática com Pydantic e docs interativas geradas automaticamente.

### Setup

\`\`\`bash
pip install fastapi uvicorn[standard] sqlalchemy pydantic python-jose[cryptography] passlib[bcrypt]
\`\`\`

### Hello World e rotas básicas

\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional

app = FastAPI(title="Minha API", version="1.0.0")

# Modelo Pydantic — validação automática
class Usuario(BaseModel):
    nome:  str
    email: EmailStr
    idade: int
    bio:   Optional[str] = None

class UsuarioResposta(BaseModel):
    id:    int
    nome:  str
    email: str

# Banco em memória (demo)
usuarios_db: list[dict] = []

@app.get("/")
def raiz():
    return {"status": "online", "versao": "1.0.0"}

@app.get("/usuarios", response_model=list[UsuarioResposta])
def listar_usuarios():
    return usuarios_db

@app.get("/usuarios/{id}", response_model=UsuarioResposta)
def buscar_usuario(id: int):
    usuario = next((u for u in usuarios_db if u["id"] == id), None)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario

@app.post("/usuarios", response_model=UsuarioResposta, status_code=201)
def criar_usuario(usuario: Usuario):
    novo = {"id": len(usuarios_db) + 1, **usuario.dict()}
    usuarios_db.append(novo)
    return novo
\`\`\`

### Autenticação JWT

\`\`\`python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

SECRET_KEY = "sua-chave-secreta-aqui"
ALGORITHM  = "HS256"
TOKEN_EXPIRA_EM = timedelta(minutes=30)

pwd_context   = CryptContext(schemes=["bcrypt"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def criar_token(dados: dict) -> str:
    payload = dados.copy()
    payload["exp"] = datetime.utcnow() + TOKEN_EXPIRA_EM
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verificar_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Token inválido")
        return int(user_id)
    except JWTError:
        raise HTTPException(status_code=401, detail="Token expirado ou inválido")

@app.post("/auth/login")
def login(form: OAuth2PasswordRequestForm = Depends()):
    usuario = buscar_por_email(form.username)
    if not usuario or not pwd_context.verify(form.password, usuario["senha_hash"]):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = criar_token({"sub": str(usuario["id"])})
    return {"access_token": token, "token_type": "bearer"}

# Rota protegida
@app.get("/perfil")
def meu_perfil(user_id: int = Depends(verificar_token)):
    return buscar_usuario(user_id)
\`\`\`

### Banco de dados com SQLAlchemy

\`\`\`python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi import Depends

DATABASE_URL = "postgresql://user:senha@localhost/mydb"
engine       = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base         = declarative_base()

class UsuarioModel(Base):
    __tablename__ = "usuarios"
    id     = Column(Integer, primary_key=True)
    nome   = Column(String(100), nullable=False)
    email  = Column(String(150), unique=True, nullable=False)

Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/usuarios/{id}")
def buscar_usuario(id: int, db: Session = Depends(get_db)):
    usuario = db.query(UsuarioModel).filter(UsuarioModel.id == id).first()
    if not usuario:
        raise HTTPException(404, "Usuário não encontrado")
    return usuario
\`\`\`

### Rodando em produção

\`\`\`bash
# Desenvolvimento
uvicorn main:app --reload

# Produção
uvicorn main:app --workers 4 --host 0.0.0.0 --port 8000

# Com Gunicorn (mais robusto)
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
\`\`\`

Acesse \`http://localhost:8000/docs\` — FastAPI gera documentação interativa automaticamente!
    `,
  },
  {
    id: 16,
    slug: "algoritmos-estruturas-dados-javascript",
    title: "Algoritmos e Estruturas de Dados: O que todo dev precisa saber",
    excerpt: "Big O Notation, Arrays, Linked Lists, Stacks, Queues, Hash Tables, Binary Search, Sorting e como isso aparece em entrevistas técnicas.",
    category: "Fundamentos",
    level: "Intermediário",
    readTime: "18 min",
    date: "05 Jun 2025",
    tags: ["Algoritmos", "JavaScript", "Entrevistas", "CS"],
    color: "#FB923C",
    content: `
## Algoritmos e Estruturas de Dados

Não precisa de faculdade de CS para dominar esses conceitos. Mas você precisa deles para entrevistas nas melhores empresas e para escrever código eficiente.

### Big O Notation — mede a eficiência

\`\`\`
O(1)      → Constante   — acesso a array por índice
O(log n)  → Logarítmico — binary search
O(n)      → Linear      — percorrer array
O(n log n)→ n log n     — merge sort, quick sort
O(n²)     → Quadrático  — dois for aninhados
O(2^n)    → Exponencial — subconjuntos de um set
\`\`\`

### Arrays — operações e complexidade

\`\`\`js
const arr = [1, 2, 3, 4, 5];

// O(1) — acesso direto
arr[2];

// O(1) amortizado — adiciona no final
arr.push(6);

// O(n) — remove do início (desloca todos)
arr.shift();

// O(n) — busca linear
arr.find(x => x === 3);

// O(1) — tamanho
arr.length;
\`\`\`

### Hash Table — O(1) para busca

\`\`\`js
// JavaScript Object e Map são hash tables
const cache = new Map();

// O(1) — inserção
cache.set('usuario:1', { nome: 'Ana', idade: 28 });

// O(1) — busca
cache.get('usuario:1');

// Exemplo: contar frequência de palavras
function contarPalavras(texto) {
  const frequencia = new Map();

  texto.split(' ').forEach(palavra => {
    frequencia.set(palavra, (frequencia.get(palavra) ?? 0) + 1);
  });

  return frequencia;
}

// Exemplo: two sum com hash table — O(n)
function doisNumeros(nums, alvo) {
  const vistos = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complemento = alvo - nums[i];

    if (vistos.has(complemento)) {
      return [vistos.get(complemento), i];
    }
    vistos.set(nums[i], i);
  }
  return [];
}

doisNumeros([2, 7, 11, 15], 9); // [0, 1]
\`\`\`

### Stack (Pilha) — LIFO

\`\`\`js
class Stack {
  #items = [];

  push(item)  { this.#items.push(item); }
  pop()       { return this.#items.pop(); }
  peek()      { return this.#items.at(-1); }
  isEmpty()   { return this.#items.length === 0; }
  get size()  { return this.#items.length; }
}

// Caso de uso real: verificar parênteses balanceados
function parentesesValidos(str) {
  const stack = new Stack();
  const pares = { ')': '(', ']': '[', '}': '{' };

  for (const char of str) {
    if ('([{'.includes(char)) {
      stack.push(char);
    } else if (')]}'.includes(char)) {
      if (stack.peek() !== pares[char]) return false;
      stack.pop();
    }
  }
  return stack.isEmpty();
}

parentesesValidos("({[]})"); // true
parentesesValidos("({[})");  // false
\`\`\`

### Binary Search — O(log n)

\`\`\`js
function binarySearch(arr, alvo) {
  let esq = 0;
  let dir = arr.length - 1;

  while (esq <= dir) {
    const meio = Math.floor((esq + dir) / 2);

    if (arr[meio] === alvo) return meio;
    if (arr[meio] < alvo)   esq = meio + 1;
    else                    dir = meio - 1;
  }

  return -1; // não encontrado
}

// Array DEVE estar ordenado
binarySearch([1, 3, 5, 7, 9, 11, 13], 7); // 3 (índice)
// Em array de 1 bilhão de itens: no máximo 30 comparações!
\`\`\`

### Sorting — quando usar cada um

\`\`\`js
// Array.sort() nativo — O(n log n) — use para a maioria dos casos
const numeros = [5, 3, 8, 1, 9, 2];
numeros.sort((a, b) => a - b); // [1, 2, 3, 5, 8, 9]

const usuarios = [
  { nome: "Carlos", idade: 30 },
  { nome: "Ana",    idade: 25 },
];
usuarios.sort((a, b) => a.nome.localeCompare(b.nome)); // por nome

// Merge Sort manual — estável, O(n log n)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const meio    = Math.floor(arr.length / 2);
  const esq     = mergeSort(arr.slice(0, meio));
  const dir     = mergeSort(arr.slice(meio));

  return merge(esq, dir);
}

function merge(esq, dir) {
  const resultado = [];
  let i = 0, j = 0;

  while (i < esq.length && j < dir.length) {
    if (esq[i] <= dir[j]) resultado.push(esq[i++]);
    else                   resultado.push(dir[j++]);
  }

  return [...resultado, ...esq.slice(i), ...dir.slice(j)];
}
\`\`\`

### Dicas para entrevistas técnicas

1. **Pense em voz alta** — o processo importa tanto quanto o resultado
2. **Comece com força bruta** — depois otimize
3. **Identifique o Big O** da sua solução
4. **Teste com casos extremos**: array vazio, um elemento, todos iguais
5. **Conheça:** Two Pointers, Sliding Window, Hash Table, BFS/DFS
    `,
  },
];

export const CATEGORIES = [
  { name: "Todos",         color: "#94A3B8" },
  { name: "JavaScript",    color: "#FBBF24" },
  { name: "Python",        color: "#FACC15" },
  { name: "React",         color: "#38BDF8" },
  { name: "Next.js",       color: "#E2E8F0" },
  { name: "Node.js",       color: "#86EFAC" },
  { name: "TypeScript",    color: "#818CF8" },
  { name: "CSS",           color: "#F472B6" },
  { name: "Go",            color: "#22D3EE" },
  { name: "Banco de Dados",color: "#34D399" },
  { name: "DevOps",        color: "#38BDF8" },
  { name: "Linux",         color: "#A3E635" },
  { name: "Git",           color: "#F97316" },
  { name: "Boas Práticas", color: "#C084FC" },
  { name: "Fundamentos",   color: "#FB923C" },
];

export const LEVELS = ["Todos", "Iniciante", "Intermediário", "Avançado"];
