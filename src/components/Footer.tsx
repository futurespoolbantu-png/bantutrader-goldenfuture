import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const socials = [
  {
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.25.07 1.62.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 01-.9 1.38 3.7 3.7 0 01-1.38.9c-.42.16-1.06.36-2.23.41-1.25.06-1.62.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.23 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.77 2.2 12 2.2zm0 5.6a4.2 4.2 0 100 8.4 4.2 4.2 0 000-8.4zm0 6.93a2.73 2.73 0 110-5.46 2.73 2.73 0 010 5.46zm5.35-7.09a.98.98 0 11-1.96 0 .98.98 0 011.96 0z",
  },
  {
    label: "X",
    path: "M18.9 2H22l-7.5 8.57L23 22h-6.9l-5.4-7.05L4.5 22H1.4l8-9.15L1 2h7.05l4.88 6.45L18.9 2zm-1.2 18h1.9L6.4 4H4.4l13.3 16z",
  },
  {
    label: "LinkedIn",
    path: "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 18.34H5.67v-8.66h2.67v8.66zM7 8.44a1.55 1.55 0 110-3.1 1.55 1.55 0 010 3.1zm11.34 9.9h-2.67v-4.2c0-1 0-2.3-1.4-2.3s-1.62 1.1-1.62 2.24v4.26h-2.67v-8.66h2.56v1.18h.04c.36-.68 1.24-1.4 2.55-1.4 2.73 0 3.23 1.8 3.23 4.13v4.75z",
  },
];
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-32 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="mb-1 block font-semibold uppercase tracking-widest text-foreground/80">
              {t("ft.regTitle")}
            </span>
            {t("ft.regBody")}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="mb-1 block font-semibold uppercase tracking-widest text-foreground/80">
              {t("ft.riskTitle")}
            </span>
            {t("ft.riskBody")}
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-surface-2 p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {t("ft.stay")}
            </span>
            <h3 className="mt-2 text-2xl font-bold">{t("ft.join")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t("ft.joinBody")}</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex w-full max-w-md gap-2 md:mt-0">
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="min-w-0 flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
            <button className="shrink-0 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold">
              {t("ft.subscribe")}
            </button>
          </form>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">{t("ft.tagline")}</p>
            <a
              href="mailto:invest@bantutradercapital.com"
              className="mt-4 inline-flex items-center gap-2 text-sm text-foreground hover:text-gold"
            >
              <Mail className="h-4 w-4" /> invest@bantutradercapital.com
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {t("ft.quick")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">{t("nav.home")}</Link></li>
              <li><Link to="/products" className="hover:text-foreground">{t("nav.products")}</Link></li>
              <li><Link to="/about" className="hover:text-foreground">{t("nav.about")}</Link></li>
              <li><Link to="/blog" className="hover:text-foreground">{t("nav.blog")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {t("ft.useful")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">{t("ft.privacy")}</a></li>
              <li><a href="#" className="hover:text-foreground">{t("ft.terms")}</a></li>
              <li><a href="#" className="hover:text-foreground">{t("ft.disc")}</a></li>
              <li><a href="#" className="hover:text-foreground">{t("ft.paia")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {t("ft.hours")}
            </h4>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{t("ft.hoursBody")}</p>
            <a
              href="tel:+27110000000"
              className="mt-3 inline-flex items-center gap-2 text-sm text-foreground hover:text-gold"
            >
              <Phone className="h-4 w-4" /> +27 11 000 0000
            </a>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bantu Trader Capital Asset Management. {t("ft.rights")}
        </div>
      </div>
    </footer>
  );
}
