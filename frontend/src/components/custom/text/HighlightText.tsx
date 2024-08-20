"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

interface HighlightTextProps {
  text: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ text }) => {
  const wrapperRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;

    if (wrapper) {
      gsap.fromTo(
        wrapper,
        { backgroundSize: "0% 100%" },
        {
          backgroundSize: "100% 100%",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
          duration: 0.8,
          ease: "power1.inOut",
        }
      );
    }
  }, { scope: wrapperRef });

  return (
    <section className="p-8">
      <p
        ref={wrapperRef}
        className="relative inline-block bg-left bg-no-repeat bg-gradient-to-r from-green-300 to-green-300 bg-[length:0%_100%] transition-all duration-1000 p-2"
      >
        {text}
      </p>
    </section>
  );
};

export default HighlightText;
