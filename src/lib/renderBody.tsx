import type { ReactNode } from "react";

/**
 * Very small, purpose-built renderer for blog post body blocks.
 * Each entry in the body array is one "block" (separated by a blank line
 * in the editor). Supports:
 *   ![alt](url)      -> image
 *   ---               -> horizontal rule
 *   # / ## / ###      -> headings
 *   * item / - item    -> bullet list (one block can contain several lines)
 *   **bold**          -> <strong> (inline, anywhere)
 * Anything else renders as a normal paragraph.
 */

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function renderBodyBlock(block: string, key: number): ReactNode {
  const trimmed = block.trim();

  const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
  if (imgMatch) {
    const [, alt, src] = imgMatch;
    return (
      <img
        key={key}
        src={src}
        alt={alt}
        loading="lazy"
        className="!mt-8 w-full rounded-2xl border border-border"
      />
    );
  }

  if (/^-{3,}$/.test(trimmed)) {
    return <hr key={key} className="!my-10 border-border" />;
  }

  const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);

  // Markdown table: header row, separator row (---|---|...), then data rows
  const isTable =
    lines.length >= 2 &&
    lines[0].includes("|") &&
    /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(lines[1]);
  if (isTable) {
    const splitRow = (row: string) =>
      row
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim());
    const header = splitRow(lines[0]);
    const dataRows = lines.slice(2).map(splitRow);
    return (
      <div key={key} className="!mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-foreground/5">
              {header.map((h, i) => (
                <th key={i} className="border-b border-border px-4 py-3 text-left font-display font-bold text-foreground">
                  {renderInline(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, ri) => (
              <tr key={ri} className="border-b border-border last:border-b-0">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3">
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const isList = lines.length > 0 && lines.every((l) => /^[*✓✗-]\s+/.test(l));
  if (isList) {
    return (
      <ul key={key} className="space-y-2 pl-1">
        {lines.map((l, i) => {
          const isCheck = /^✓\s+/.test(l);
          const isCross = /^✗\s+/.test(l);
          const text = l.replace(/^[*✓✗-]\s+/, "");
          return (
            <li key={i} className="flex items-start gap-2">
              {isCheck ? (
                <span className="mt-0.5 text-[oklch(0.55_0.18_155)]">✓</span>
              ) : isCross ? (
                <span className="mt-0.5 text-destructive">✗</span>
              ) : (
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              )}
              <span>{renderInline(text)}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  const h3 = trimmed.match(/^###\s+(.*)$/);
  if (h3) {
    return (
      <h4 key={key} className="!mt-10 font-display text-lg font-bold text-foreground">
        {renderInline(h3[1])}
      </h4>
    );
  }
  const h2 = trimmed.match(/^##\s+(.*)$/);
  if (h2) {
    return (
      <h3 key={key} className="!mt-10 font-display text-xl font-bold text-foreground">
        {renderInline(h2[1])}
      </h3>
    );
  }
  const h1 = trimmed.match(/^#\s+(.*)$/);
  if (h1) {
    return (
      <h2 key={key} className="!mt-12 font-display text-2xl font-bold text-foreground">
        {renderInline(h1[1])}
      </h2>
    );
  }

  // Multi-line block without list markers: preserve line breaks
  if (lines.length > 1) {
    return (
      <p key={key}>
        {lines.map((l, i) => (
          <span key={i}>
            {renderInline(l)}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  }

  return <p key={key}>{renderInline(trimmed)}</p>;
}
