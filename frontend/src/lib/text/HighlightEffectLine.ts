import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ScrollTrigger를 사용하기 위해 플러그인을 등록합니다.
gsap.registerPlugin(ScrollTrigger);

class HighlightEffectLine {
  private highlightedElement: HTMLElement;
  private selectMarker: HTMLElement | null;
  private highlightedChars: NodeListOf<HTMLElement>;
  private animationDefaults: { duration: number; ease: string };

  constructor(el: HTMLElement) {
    // 요소가 유효한지 확인합니다.
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('유효하지 않은 요소가 제공되었습니다.');
    }

    this.highlightedElement = el;
    this.selectMarker = el;
    this.highlightedChars = this.highlightedElement.querySelectorAll('.char');
    this.animationDefaults = {
      duration: 0.4,
      ease: 'power1.inOut',
    };

    // 초기 효과 설정 메서드를 호출합니다.
    this.initializeEffect();
  }

  // 초기 효과를 설정합니다.
  private initializeEffect(): void {
    // 스크롤 효과를 설정합니다.
    this.scroll();
  }

  // 스크롤 효과를 정의합니다.
  private scroll(): void {
    ScrollTrigger.create({
      trigger: this.highlightedElement,
      start: 'top bottom',
      onEnter: () => this.animateChars(),
      onEnterBack: () => this.animateChars(),
      onLeave: () => this.resetChars(),
      onLeaveBack: () => this.resetChars(),
    });
  }

  // 문자 애니메이션을 설정합니다.
  private animateChars(): void {
    gsap.timeline({ defaults: this.animationDefaults })
    .fromTo(this.highlightedChars, {
      willChange: 'filter',
      filter: 'drop-shadow(0px 0px 0px #ffdbf5)'
    }, { 
      stagger: 0.03,
      filter: 'drop-shadow(0px 0px 20px #ffdbf5)'
    })
    .to(this.selectMarker, {
      duration: 0.8,
      ease: 'expo',
      '--select-width': getComputedStyle(this.highlightedElement).getPropertyValue('--select-width-final'),
    }, 0);
  }

  // 문자 상태를 리셋합니다.
  private resetChars(): void {
    gsap.killTweensOf([this.highlightedChars, this.selectMarker]);
    gsap.set(this.selectMarker, {
      '--select-width': '0%',
    });
    gsap.set(this.highlightedChars, {
      filter: 'drop-shadow(0px 0px 0px #ffdbf5)'
    });
  }
}


export default HighlightEffectLine;