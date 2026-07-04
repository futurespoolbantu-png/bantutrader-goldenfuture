import { MessageCircle } from "lucide-react";

export function FloatingWidgets() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/27110000000"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.7_0.19_150)] text-black shadow-elegant transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02A9.87 9.87 0 0012.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 01-1.26-4.38c0-4.54 3.69-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.19 8.19 0 012.41 5.83c0 4.54-3.69 8.23-8.22 8.23zm4.51-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.42 1.02 2.58.12.16 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.11-.22-.17-.47-.3z" />
        </svg>
      </a>
      <button
        aria-label="Chat"
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-gold text-primary-foreground shadow-gold transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}
