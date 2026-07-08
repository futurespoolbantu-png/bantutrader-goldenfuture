/**
 * AfricanPattern — SVG geométrico inspirado em arte têxtil africana
 * (kente / bogolan / mudcloth), traço fino, sóbrio, institucional.
 *
 * Usa `currentColor` — herda `text-gold`, `text-foreground`, etc.
 * Sem cores hardcoded, sem novos tokens.
 *
 * Variantes:
 *  - "stripe"   : faixa horizontal fina (separador entre secções, 8px)
 *  - "band"     : faixa média (rodapé decorativo, 48–80px)
 *  - "hero"     : marca d'água grande (background do hero, opacity baixa)
 */

import type { CSSProperties } from "react";

type Variant = "stripe" | "band" | "hero";

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  /** opacity 0..1 (default por variante) */
  opacity?: number;
}

/**
 * Tile 120x24 — camadas horizontais onduladas com triângulos alternados,
 * losangos e linhas paralelas finas. Repete horizontalmente.
 */
const TILE_STRIPE = (
  <pattern
    id="bantu-stripe"
    x="0"
    y="0"
    width="120"
    height="24"
    patternUnits="userSpaceOnUse"
  >
    {/* linhas guia superior/inferior */}
    <path d="M0 4 H120" stroke="currentColor" strokeWidth="0.75" fill="none" />
    <path d="M0 20 H120" stroke="currentColor" strokeWidth="0.75" fill="none" />
    {/* triângulos alternados (kente) */}
    <path
      d="M0 12 L6 4 L12 12 L18 20 L24 12 L30 4 L36 12 L42 20 L48 12 L54 4 L60 12 L66 20 L72 12 L78 4 L84 12 L90 20 L96 12 L102 4 L108 12 L114 20 L120 12"
      stroke="currentColor"
      strokeWidth="0.75"
      fill="none"
    />
    {/* pequenos losangos entre picos */}
    {[6, 30, 54, 78, 102].map((x) => (
      <path
        key={x}
        d={`M${x} 10 L${x + 2} 12 L${x} 14 L${x - 2} 12 Z`}
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
    ))}
  </pattern>
);

/**
 * Tile 160x64 — banda mais rica com camadas onduladas + quadrados concêntricos.
 */
const TILE_BAND = (
  <pattern
    id="bantu-band"
    x="0"
    y="0"
    width="160"
    height="64"
    patternUnits="userSpaceOnUse"
  >
    {/* Camadas onduladas (sinusoides suaves) */}
    <path
      d="M0 10 Q20 4 40 10 T80 10 T120 10 T160 10"
      stroke="currentColor"
      strokeWidth="0.75"
      fill="none"
    />
    <path
      d="M0 54 Q20 60 40 54 T80 54 T120 54 T160 54"
      stroke="currentColor"
      strokeWidth="0.75"
      fill="none"
    />
    {/* linha central fina */}
    <path
      d="M0 32 H160"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeDasharray="2 4"
      fill="none"
    />
    {/* triângulos superiores */}
    {[10, 50, 90, 130].map((x) => (
      <path
        key={`t${x}`}
        d={`M${x} 22 L${x + 8} 14 L${x + 16} 22 Z`}
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
      />
    ))}
    {/* triângulos inferiores invertidos, offset */}
    {[30, 70, 110, 150].map((x) => (
      <path
        key={`b${x}`}
        d={`M${x} 42 L${x + 8} 50 L${x + 16} 42 Z`}
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
      />
    ))}
    {/* quadrados concêntricos (bogolan) */}
    {[0, 40, 80, 120].map((x) => (
      <g key={`sq${x}`} transform={`translate(${x + 12}, 26)`}>
        <rect
          x="-6"
          y="-6"
          width="12"
          height="12"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <rect
          x="-3"
          y="-3"
          width="6"
          height="6"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
      </g>
    ))}
  </pattern>
);

/**
 * Tile 240x120 — motivo grande para marca d'água. Combina ondas + rombos.
 */
const TILE_HERO = (
  <pattern
    id="bantu-hero"
    x="0"
    y="0"
    width="240"
    height="120"
    patternUnits="userSpaceOnUse"
  >
    {/* ondas amplas */}
    <path
      d="M0 30 Q60 10 120 30 T240 30"
      stroke="currentColor"
      strokeWidth="0.6"
      fill="none"
    />
    <path
      d="M0 90 Q60 110 120 90 T240 90"
      stroke="currentColor"
      strokeWidth="0.6"
      fill="none"
    />
    {/* losangos centrais alinhados numa grelha isométrica leve */}
    {[
      [40, 60],
      [120, 60],
      [200, 60],
      [0, 60],
      [240, 60],
      [80, 20],
      [160, 20],
      [80, 100],
      [160, 100],
    ].map(([x, y], i) => (
      <g key={i} transform={`translate(${x}, ${y})`}>
        <path
          d="M0 -10 L10 0 L0 10 L-10 0 Z"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d="M0 -4 L4 0 L0 4 L-4 0 Z"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
      </g>
    ))}
    {/* triângulos discretos */}
    {[
      [20, 60],
      [100, 60],
      [180, 60],
    ].map(([x, y], i) => (
      <path
        key={`tri${i}`}
        d={`M${x} ${y - 6} L${x + 6} ${y + 4} L${x - 6} ${y + 4} Z`}
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
    ))}
  </pattern>
);

const DEFAULTS: Record<Variant, { height: string; opacity: number; patternId: string }> = {
  stripe: { height: "8px", opacity: 0.55, patternId: "bantu-stripe" },
  band: { height: "64px", opacity: 0.35, patternId: "bantu-band" },
  hero: { height: "100%", opacity: 0.06, patternId: "bantu-hero" },
};

export function AfricanPattern({
  variant = "stripe",
  className,
  style,
  opacity,
}: Props) {
  const cfg = DEFAULTS[variant];
  const finalOpacity = opacity ?? cfg.opacity;
  const tile =
    variant === "stripe" ? TILE_STRIPE : variant === "band" ? TILE_BAND : TILE_HERO;

  return (
    <svg
      aria-hidden="true"
      role="presentation"
      className={className}
      style={{
        width: "100%",
        height: cfg.height,
        display: "block",
        opacity: finalOpacity,
        pointerEvents: "none",
        ...style,
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>{tile}</defs>
      <rect width="100%" height="100%" fill={`url(#${cfg.patternId})`} />
    </svg>
  );
}

export default AfricanPattern;
