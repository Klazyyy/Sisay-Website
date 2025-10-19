'use client';

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import Link from 'next/link';
import Image from 'next/image';
import './CardNavHeader.css';
import Search from '../search/Search';
import ThemeSwitcher from './ThemeSwitcher';


type CardNavLink = { label: string; href: string; ariaLabel: string; };
type CardNavItem = { label: string; bgColor: string; textColor: string; links: CardNavLink[]; };

const menuItems: CardNavItem[] = [
    {
        label: "Tienda",
        bgColor: "#170D27",
        textColor: "#fff",
        links: [
            { label: "Todos", href: "/catalogo", ariaLabel: "Ver catálogo completo" },
            { label: "Mujer", href: "/mujer/catalogo", ariaLabel: "Ver catálogo de mujer" },
            { label: "Hombre", href: "/hombre/catalogo", ariaLabel: "Ver catálogo de hombre" }
        ]
    },
    {
        label: "Nosotros",
        bgColor: "#0D0716",
        textColor: "#fff",
        links: [
            { label: "Servicios", href: "/servicios", ariaLabel: "Nuestros Servicios" },
            { label: "Contacto", href: "/contacto", ariaLabel: "Contacta con nosotros" }
        ]
    },
];

export default function CardNavHeader() {

    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const ease = 'power3.out';
    const pathname = usePathname();

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 260;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                contentEl.style.visibility = 'visible';
                const contentHeight = contentEl.scrollHeight;
                contentEl.style.visibility = wasVisible;
                return 60 + contentHeight + 16;
            }
        }
        return 260;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });
        tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
        tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
        return tl;
    };

    useLayoutEffect(() => {
        const timeoutId = setTimeout(() => {
            tlRef.current = createTimeline();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            tlRef.current?.kill();
        };
    }, []);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (isExpanded && navRef.current) {
                gsap.set(navRef.current, { height: calculateHeight() });
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play();
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    useEffect(() => {
        if (isExpanded) {
            toggleMenu();
        }
    }, [pathname]);

    return (
        <div className="card-nav-container">
            <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`}>
                <div className="card-nav-top">
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? 'Cerrar menú' : 'Abrir menú'}
                    >
                        <div className="hamburger-line" />
                        <div className="hamburger-line" />
                    </div>

                    <div className="logo-container">
                        <Link href="/">
                            <Image src="/logo.svg" alt="Sisay Logo" width={80} height={28} priority />
                        </Link>
                    </div>

                    <div className="actions-container">
                        <Search />
                        <ThemeSwitcher />
                    </div>
                </div>

                <div className="card-nav-content" aria-hidden={!isExpanded}>
                    {menuItems.map((item, idx) => (
                        <div
                            key={item.label}
                            className="nav-card"
                            ref={(el) => { if (el) cardsRef.current[idx] = el; }}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            <div className="nav-card-label">{item.label}</div>
                            <div className="nav-card-links">
                                {item.links.map((lnk) => (
                                    <Link key={lnk.label} className="nav-card-link" href={lnk.href} aria-label={lnk.ariaLabel}>
                                        <GoArrowUpRight className="nav-card-link-icon" />
                                        {lnk.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
}