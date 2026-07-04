import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1600,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: Props) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(value * eased);
              if (p < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
