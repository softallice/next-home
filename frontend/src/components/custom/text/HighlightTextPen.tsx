import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import HighlightEffectPen from "@/lib/text/HighlightEffectPen";  // Adjust the path as needed

interface HighlightTextPenProps {
  title: string;
}

const HighlightTextPen = ({ title }: HighlightTextPenProps) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const highlightEffectRef = useRef<HighlightEffectPen | null>(null);

  useEffect(() => {
    if (pRef.current) {
      // Corrected type value to "words,chars"
      splitRef.current = new SplitType(pRef.current, { types: "words,chars" });

      // Initialize the HighlightEffect with the paragraph element
      highlightEffectRef.current = new HighlightEffectPen(pRef.current);
    }

    // Cleanup function to revert the split text and destroy HighlightEffect
    return () => {
      splitRef.current?.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Cleanup ScrollTriggers
    };
  }, [title]);

  return (
    <div className="text-[clamp(2rem,3.5vw+.1rem,4rem)] pt-24 pb-10">
      <p 
        ref={pRef}
        className="relative inline-block bg-left bg-no-repeat bg-gradient-to-r from-green-300 to-green-300 bg-[length:0%_100%] transition-all duration-1000 p-2"
      >
        {title}
      </p>
    </div>
  );
};

export default HighlightTextPen;
