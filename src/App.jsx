import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage    from "./pages/HomePage";
import BlogPage    from "./pages/BlogPage";
import BlogPost    from "./pages/BlogPost";
import ServicesPage from "./pages/ServicesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<HomePage />} />
        <Route path="/servicos"     element={<ServicesPage />} />
        <Route path="/blog"         element={<BlogPage />} />
        <Route path="/blog/:slug"   element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}
