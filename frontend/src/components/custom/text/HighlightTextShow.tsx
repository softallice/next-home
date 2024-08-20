import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import HighlightEffect from "@/lib/text/HighlightEffectShow";  // Adjust the path as needed

interface HighlightTextShowProps {
  title: string;
}

const HighlightTextShow = ({ title }: HighlightTextShowProps) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const highlightEffectRef = useRef<HighlightEffect | null>(null);

  useEffect(() => {
    if (pRef.current) {
      // Corrected type value to "words,chars"
      splitRef.current = new SplitType(pRef.current, { types: "words,chars" });

      // Initialize the HighlightEffect with the paragraph element
      highlightEffectRef.current = new HighlightEffect(pRef.current);
    }

    // Cleanup function to revert the split text and destroy HighlightEffect
    return () => {
      splitRef.current?.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Cleanup ScrollTriggers
    };
  }, [title]);

  return (
    <div className="text-[clamp(2rem,3.5vw+.1rem,4rem)] pt-24 pb-10">
      <p ref={pRef}>{title}</p>
    </div>
  );
};

export default HighlightTextShow;
