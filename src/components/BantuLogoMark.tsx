import logoSvgRaw from "@/assets/bantu-logo-vector.svg?raw";

// The vector logo has two fills: a fixed gold tone and a black silhouette.
// We swap the black fill for "currentColor" so it can be styled via CSS
// (white in dark mode, black in light mode) while the gold stays constant.
const themedLogoSvg = logoSvgRaw.replace(/fill="#0D0904"/g, 'fill="currentColor"');

export function BantuLogoMark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`text-foreground [&>svg]:h-full [&>svg]:w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: themedLogoSvg }}
    />
  );
}
