'use client';

import { gsap } from '@/components/custom/gsap/gsap';
import useIsomorphicLayoutEffect from '@/components/custom/gsap/useIsomorphicLayoutEffect';
import { useRef } from 'react';

interface TitleProps {
  title: string;
  classes: string;
}

const Title = ({
  title, 
  classes
}: TitleProps) => {
  const el = useRef(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(
            '.title-text',
            { opacity: 0, y: '1.5rem' },
            {
                opacity: 1,
                duration: 1.5,
                y: 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el.current,
                    start: 'top 60%',
                    end: 'bottom 60%',
                },
            }
        );
    }, el);
  }, []);
  return (
    <div
        ref={el}
        className={`py-24 text-center text-[clamp(3rem,5vw+.1rem,3.5rem)] font-semibold ${classes}`}
    >
        <p className='title-text'>{title}</p>
    </div>
  );
}

export default Title;