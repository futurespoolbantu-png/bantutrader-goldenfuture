import { Reveal } from "@/components/Reveal";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-32 pt-6">
      <Reveal>
        <h1 className="font-display text-3xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{updated}</p>
        <div className="prose-legal mt-10 space-y-6 text-[15px] leading-relaxed text-muted-foreground">
          {children}
        </div>
      </Reveal>
    </section>
  );
}
