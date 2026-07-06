import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Menu, X, Sun, Moon, Languages } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const { t, theme, toggleTheme, lang, toggleLang } = useI18n();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/products", label: t("nav.products") },
    { to: "/global-markets", label: t("nav.markets") },
    { to: "/about", label: t("nav.about") },
    { to: "/blog", label: t("nav.blog") },
  ] as const;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          className={`glass flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-300 ${
            scrolled ? "shadow-elegant" : ""
          }`}
        >
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-foreground/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              aria-label={t("nav.toggleLang")}
              title={t("nav.toggleLang")}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-gold hover:border-gold transition-colors"
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === "en" ? "EN" : "PT"}
            </button>
            <button
              onClick={toggleTheme}
              aria-label={t("nav.toggleTheme")}
              title={t("nav.toggleTheme")}
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground hover:text-gold hover:border-gold transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to={isHome ? "/products" : "/about"}
              className="hidden items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.02] md:inline-flex"
            >
              {isHome ? (
                <>
                  <Lock className="h-3.5 w-3.5" />
                  {t("nav.consult")}
                </>
              ) : (
                t("nav.contact")
              )}
            </Link>
            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label={t("nav.toggleMenu")}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-x-4 top-24 z-40 glass rounded-3xl p-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground hover:bg-foreground/5"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex gap-2">
              <button
                onClick={toggleTheme}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-xs font-semibold"
              >
                {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                {theme === "dark" ? "Light" : "Dark"}
              </button>
              <button
                onClick={toggleLang}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-xs font-semibold"
              >
                <Languages className="h-3.5 w-3.5" />
                {lang === "en" ? "EN" : "PT"}
              </button>
            </li>
            <li className="mt-1">
              <Link
                to="/products"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Lock className="h-3.5 w-3.5" /> {t("nav.consult")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
