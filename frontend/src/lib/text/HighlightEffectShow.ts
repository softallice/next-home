import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

class HighlightEffectShow {
  highlightedElement: HTMLElement;
  highlightedChars: NodeListOf<HTMLElement>;
  highlightedWords: NodeListOf<HTMLElement>;
  animationDefaults: { duration: number; ease: string };

  constructor(el: HTMLElement) {
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error("Invalid element provided.");
    }

    this.highlightedElement = el;
    this.highlightedChars = this.highlightedElement.querySelectorAll(".char");
    this.highlightedWords = this.highlightedElement.querySelectorAll(".word");
    this.animationDefaults = {
      duration: 0.8,
      ease: "power2",
    };

    this.initializeEffect();
  }

  initializeEffect() {
    gsap.set(this.highlightedElement, { perspective: 500 });
    gsap.set(this.highlightedWords, { transformStyle: "preserve-3d" });
    this.scroll();
  }

  scroll() {
    ScrollTrigger.create({
      trigger: this.highlightedElement,
      start: "top bottom",
      onEnter: () => this.animateChars(),
      onEnterBack: () => this.animateChars(),
      onLeave: () => this.resetChars(),
      onLeaveBack: () => this.resetChars(),
    });
  }

  animateChars() {
    gsap.timeline({ defaults: this.animationDefaults }).fromTo(
      this.highlightedChars,
      {
        opacity: 0,
        z: 300,
        rotationX: () => -45,
      },
      {
        stagger: 0.04,
        opacity: 1,
        z: 0,
        rotationX: 0,
      },
      0
    );
  }

  resetChars() {
    gsap.killTweensOf(this.highlightedChars);
    gsap.set(this.highlightedChars, {
      opacity: 1,
      z: 0,
      rotationX: 0,
    });
  }
}

export default HighlightEffectShow;
