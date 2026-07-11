import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

export function FloatingWidgets() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <Link
        to="/contact"
        aria-label="Contact us"
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-gold text-primary-foreground shadow-gold transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
    </div>
  );
}
