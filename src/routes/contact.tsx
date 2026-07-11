import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bantu Trade Capital" },
      {
        name: "description",
        content:
          "Get in touch with Bantu Trade Capital Asset Management. Investor inquiries, general questions and media contacts.",
      },
      { property: "og:title", content: "Contact — Bantu Trade Capital" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(t("contact.profileInst"));
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${t("contact.mailSubject")} — ${name}`);
    const body = encodeURIComponent(
      `${t("contact.formName")}: ${name}\n${t("contact.formEmail")}: ${email}\n${t("contact.formProfile")}: ${profile}\n\n${message}`,
    );
    window.location.href = `mailto:invest@bantutradecapital.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-32 pt-6">
      <Reveal className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-xs font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t("contact.badge")}
        </span>
        <h1 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.05] md:text-6xl">
          {t("contact.title1")} <span className="text-gradient-gold">{t("contact.title2")}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">{t("contact.subtitle")}</p>
      </Reveal>

      <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="surface-card h-full p-8">
            <h2 className="font-display text-lg font-bold">{t("contact.detailsTitle")}</h2>

            <a
              href="mailto:invest@bantutradecapital.com"
              className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-background/50 p-4 text-sm transition-colors hover:border-gold"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {t("contact.emailLabel")}
                </div>
                <div className="font-semibold">invest@bantutradecapital.com</div>
              </div>
            </a>

            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-border bg-background/50 p-4 text-sm">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {t("contact.locationLabel")}
                </div>
                <div className="font-semibold">{t("ft.location")}</div>
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              {t("contact.responseNote")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="surface-card p-8">
            {!sent ? (
              <form onSubmit={submit} className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                      {t("contact.formName")}
                    </div>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-full border border-border bg-background/60 px-5 py-3 text-sm outline-none focus:border-gold"
                      placeholder={t("contact.formNamePh")}
                    />
                  </label>
                  <label className="block">
                    <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                      {t("contact.formEmail")}
                    </div>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-full border border-border bg-background/60 px-5 py-3 text-sm outline-none focus:border-gold"
                      placeholder="you@company.com"
                    />
                  </label>
                </div>

                <label className="block">
                  <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                    {t("contact.formProfile")}
                  </div>
                  <select
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    className="w-full rounded-full border border-border bg-background/60 px-5 py-3 text-sm outline-none focus:border-gold"
                  >
                    <option>{t("contact.profileInst")}</option>
                    <option>{t("contact.profilePriv")}</option>
                    <option>{t("contact.profilePartner")}</option>
                    <option>{t("contact.profileOther")}</option>
                  </select>
                </label>

                <label className="block">
                  <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                    {t("contact.formMsg")}
                  </div>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full rounded-2xl border border-border bg-background/60 px-5 py-3 text-sm outline-none focus:border-gold"
                    placeholder={t("contact.formMsgPh")}
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.03]"
                >
                  <Send className="h-4 w-4" /> {t("contact.formSubmit")}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-gold">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold">{t("contact.sentTitle")}</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t("contact.sentBody")}</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
