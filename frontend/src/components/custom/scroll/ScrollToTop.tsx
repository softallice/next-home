"use client"
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[99]">
      {isVisible && (
        <div
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg 
          bg-slate-100 text-gray-500 transition duration-300 ease-in-out hover:bg-opacity-80 
          hover:bg-white hover:drop-shadow-xl"
        >
          <span className="mt-[6px] h-4 w-4 rotate-45 border-l-2 border-t-2 border-gray-700"></span>
        </div>
      )}
    </div>
  );
}
