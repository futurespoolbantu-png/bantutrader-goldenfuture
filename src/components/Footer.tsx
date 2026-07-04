import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, Mail, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-[oklch(0.12_0_0)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Disclaimers */}
        <div className="grid gap-6 md:grid-cols-2">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="mb-1 block font-semibold uppercase tracking-widest text-foreground/80">
              Regulatory Disclosure
            </span>
            Bantu Trader Capital Asset Management does not operate its own strategies or collect
            client capital. All investment activities are conducted under the authority of our
            principal, Sovereign Trust Financial (Category II FSP no. 45219).
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="mb-1 block font-semibold uppercase tracking-widest text-foreground/80">
              Risk Disclosure
            </span>
            Trading and investing in financial markets involves significant risk of loss. Past
            performance is not indicative of future results.
          </p>
        </div>

        {/* Newsletter */}
        <div className="mt-12 rounded-3xl border border-border bg-surface p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Stay Informed
            </span>
            <h3 className="mt-2 text-2xl font-bold">Join Our Mailing List</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Market insights and portfolio commentary — straight to your inbox.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex w-full max-w-md gap-2 md:mt-0"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="min-w-0 flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
            <button className="shrink-0 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold">
              Subscribe
            </button>
          </form>
        </div>

        {/* Columns */}
        <div className="mt-14 grid gap-10 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Precision-managed portfolios with institutional oversight and full client-owned
              accounts.
            </p>
            <a
              href="mailto:invest@bantutradercapital.com"
              className="mt-4 inline-flex items-center gap-2 text-sm text-foreground hover:text-gold"
            >
              <Mail className="h-4 w-4" /> invest@bantutradercapital.com
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <li><Link to="/products" className="hover:text-foreground">Products</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Useful Links
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground">Disclaimer</a></li>
              <li><a href="#" className="hover:text-foreground">Sovereign Trust</a></li>
              <li><a href="#" className="hover:text-foreground">PAIA Manual</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Work Hours
            </h4>
            <p className="text-sm text-muted-foreground">
              8:00 AM – 5:00 PM<br />Monday – Friday
            </p>
            <a
              href="tel:+27110000000"
              className="mt-3 inline-flex items-center gap-2 text-sm text-foreground hover:text-gold"
            >
              <Phone className="h-4 w-4" /> +27 11 000 0000
            </a>
            <div className="mt-5 flex gap-2">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bantu Trader Capital Asset Management. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
