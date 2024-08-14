"use client";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { createContext, useState, useEffect, useRef } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import { gsap } from './gsap';

interface SmoothScrollContextType {
  scroll: any | null;
}

export const SmoothScrollContext = createContext<SmoothScrollContextType>({ scroll: null });

interface SmoothScrollingProps {
  children: React.ReactNode;
}

function SmoothScrolling({ children }: SmoothScrollingProps) {
  const lenis = useLenis();
  const lenisRef = useRef<any>(null);

  const [scroll, setScroll] = useState<any | null>(null);

  useEffect(() => {
    if (!lenis) {
      return;
    }
    setScroll(lenis);
    lenisRef.current = { lenis };
  }, [lenis]);

  useIsomorphicLayoutEffect(() => {
    if (!lenisRef.current) return;

    function update(time : any) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scroll }}>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
        {children}
      </ReactLenis>
    </SmoothScrollContext.Provider>
  );
}

export default SmoothScrolling;
