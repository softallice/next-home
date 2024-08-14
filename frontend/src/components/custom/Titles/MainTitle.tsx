'use client';

import { gsap } from '@/components/custom/gsap/gsap';
import useIsomorphicLayoutEffect from '@/components/custom/gsap/useIsomorphicLayoutEffect';
import { useRef } from 'react';

interface MainTitleProps {
  title: string;
  description?: string;
  classes?: string;
}


const MainTitle = ({
  title, 
  description,
  classes
}: MainTitleProps) => {
  const el = useRef(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(
            '.title-text',
            { opacity: 0, y: '1.5rem' },
            {
                opacity: 1,
                duration: 2.2,
                y: 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el.current,
                    start: 'top 70%',
                    end: 'bottom 70%',
                },
            }
        );
    }, el);
  }, []);
  return (

    <div
        ref={el}
        className={`text-[clamp(2rem,3.5vw+.1rem,4rem)] pt-24 pb-10 ${classes}`}
        style={{ whiteSpace: 'pre-line' }}
    >
        <p className='title-text font-bold'>{title}</p>
        <p className='title-text text-[1.25rem] font-semibold text-[#777] pl-2 xs:pl-0 tracking-[-0.02rem]' style={{ whiteSpace: 'pre-line' }}> {description} </p>
    </div>
  );
}

export default MainTitle;