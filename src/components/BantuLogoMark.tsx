import logoSvgRaw from "@/assets/bantu-logo-vector.svg?raw";

export function BantuLogoMark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`[&>svg]:h-full [&>svg]:w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: logoSvgRaw }}
    />
  );
}
