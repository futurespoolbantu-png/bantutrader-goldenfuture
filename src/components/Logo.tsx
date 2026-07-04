import logoAsset from "@/assets/bantu-logo.png.asset.json";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={logoAsset.url}
        alt="Bantu Trader Capital"
        className="h-10 w-10 shrink-0 object-contain"
      />
      {!compact && (
        <div className="flex flex-col leading-none">
          <div className="font-display text-base font-bold tracking-tight">
            <span className="text-foreground">Bantu Trader</span>{" "}
            <span className="text-gold">Capital</span>
          </div>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Asset Management
          </span>
        </div>
      )}
    </div>
  );
}
