import { Link } from "react-router-dom";
import { Frame } from "../components/Layout.jsx";

export default function NotFoundPage() {
  return (
    <Frame className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--soft)]">404</p>
      <h1 className="mt-3 font-serif text-4xl text-[var(--fg)]">Page not found</h1>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-[var(--fg)] px-5 py-2.5 text-[13px] font-semibold text-[var(--bg)] transition-transform duration-200 hover:-translate-y-0.5"
      >
        Back home
      </Link>
    </Frame>
  );
}
