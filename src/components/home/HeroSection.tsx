'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroSection.module.css';


gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const heroRef = useRef<HTMLElement | null>(null);
    const image1Ref = useRef<HTMLDivElement | null>(null);
    const image2Ref = useRef<HTMLDivElement | null>(null);
    const image3Ref = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);

    useLayoutEffect(() => {

        const ctx = gsap.context(() => {

            gsap.to(image1Ref.current, {
                y: -150,
                scrollTrigger: {
                    trigger: heroRef.current,
                    scrub: true,
                },
            });

            gsap.to(image2Ref.current, {
                y: -300,
                scrollTrigger: {
                    trigger: heroRef.current,
                    scrub: true,
                },
            });

            gsap.to(image3Ref.current, {
                y: -100,
                scrollTrigger: {
                    trigger: heroRef.current,
                    scrub: true,
                },
            });

            gsap.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

        }, heroRef);


        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.hero} ref={heroRef}>
            <div className={styles.content}>
                <h1 className={styles.title} ref={titleRef}>
                    BELLEZA <br />
                    QUE INSPIRA
                </h1>
                <p className={styles.subtitle}>
                    Vive la experiencia Sisay. Redescubre tu esencia con cada fragancia.
                </p>
            </div>


            <div className={styles.image1} ref={image1Ref}>
                <Image src="/images/hero/perfume-1.png" alt="Perfume flotante 1" width={400} height={400} priority />
            </div>
            <div className={styles.image2} ref={image2Ref}>
                <Image src="/images/hero/crema-2.png" alt="Crema flotante 2" width={350} height={350} priority />
            </div>
            <div className={styles.image3} ref={image3Ref}>
                <Image src="/images/hero/perfume-3.png" alt="Perfume flotante 3" width={300} height={300} priority />
            </div>
        </section>
    );
}