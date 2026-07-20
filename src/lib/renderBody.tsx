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
  const isList = lines.length > 0 && lines.every((l) => /^[*-]\s+/.test(l));
  if (isList) {
    return (
      <ul key={key} className="list-disc space-y-2 pl-5">
        {lines.map((l, i) => (
          <li key={i}>{renderInline(l.replace(/^[*-]\s+/, ""))}</li>
        ))}
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
