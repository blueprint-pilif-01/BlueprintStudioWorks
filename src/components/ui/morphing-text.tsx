import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const morphTime = 1.5;
const cooldownTime = 0.5;

const DESKTOP_QUERY = "(min-width: 769px) and (prefers-reduced-motion: no-preference)";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

/* ------------------------------------------------------------------
   Desktop: the original gooey morph, per-frame blur crossfade pushed
   through an SVG threshold filter. Pauses when the tab is hidden.
   ------------------------------------------------------------------ */
const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

      current1.textContent = texts[textIndexRef.current % texts.length];
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts],
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current++;
    }
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let animationFrameId = 0;
    let running = true;

    const animate = () => {
      if (!running) return;
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        timeRef.current = new Date();
        running = true;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
};

const GooeyTexts: React.FC<{ texts: string[] }> = ({ texts }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  return (
    <>
      <span className="absolute inset-x-0 top-0 m-auto inline-block w-full" ref={text1Ref} />
      <span className="absolute inset-x-0 top-0 m-auto inline-block w-full" ref={text2Ref} />
    </>
  );
};

const SvgFilters: React.FC = () => (
  <svg id="filters" className="fixed h-0 w-0" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

/* ------------------------------------------------------------------
   Mobile: word swap with a soft fade, no SVG filter, no rAF loop.
   ------------------------------------------------------------------ */
const HOLD_MS = 2000;
const SWAP_MS = 600;

const FadeSwapTexts: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (texts.length < 2) return;
    let swapTimer: ReturnType<typeof setTimeout>;
    const cycle = setInterval(() => {
      setVisible(false);
      swapTimer = setTimeout(() => {
        setIndex(i => (i + 1) % texts.length);
        setVisible(true);
      }, SWAP_MS / 2);
    }, HOLD_MS + SWAP_MS);

    return () => {
      clearInterval(cycle);
      clearTimeout(swapTimer);
    };
  }, [texts.length]);

  return (
    <span
      className="absolute inset-x-0 top-0 m-auto inline-block w-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(0.25em)",
        transition: `opacity ${SWAP_MS / 2}ms ease, transform ${SWAP_MS / 2}ms ease`,
      }}
    >
      {texts[index % texts.length]}
    </span>
  );
};

interface MorphingTextProps {
  className?: string;
  texts: string[];
}

export const MorphingText: React.FC<MorphingTextProps> = ({ texts, className }) => {
  const isDesktop = useIsDesktop();

  return (
    <>
      <div
        className={cn(
          "relative mx-auto h-16 w-full max-w-screen-md text-center font-sans font-bold leading-none md:h-24",
          isDesktop && "[filter:url(#threshold)_blur(0.6px)]",
          className,
        )}
        aria-live="polite"
      >
        {isDesktop ? <GooeyTexts texts={texts} /> : <FadeSwapTexts texts={texts} />}
      </div>
      {isDesktop && <SvgFilters />}
    </>
  );
};
