import { useState, useEffect } from 'react';

interface NavbarProps {
    logoSrc?: string;
}

export function Navbar({ logoSrc = '/images/logo 1.PNG' }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<'default' | 'cyan' | 'redstone'>('default');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const navbarHeight = 80;

            // Check sections in order of priority
            const showcaseSection = document.getElementById('showcase');
            const featuredSection = document.getElementById('featured');
            const redstoneSection = document.getElementById('redstone');

            const isInSection = (section: HTMLElement | null) => {
                if (!section) return false;
                const rect = section.getBoundingClientRect();
                return rect.top <= navbarHeight && rect.bottom >= navbarHeight;
            };

            if (isInSection(redstoneSection)) {
                setCurrentTheme('redstone');
            } else if (isInSection(showcaseSection) || isInSection(featuredSection)) {
                setCurrentTheme('cyan');
            } else {
                setCurrentTheme('default');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const themeClass = currentTheme !== 'default' ? `${currentTheme}-theme` : '';

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${themeClass}`}>
            <div className="nav-container">
                <a href="#" className="nav-logo">
                    <img src={logoSrc} alt="Frost Pursuit" className="logo-img" />
                </a>
                <ul className="nav-links">
                    <li><a href="#showcase">Showcase</a></li>
                    <li><a href="#highlights">Highlights</a></li>
                    <li><a href="#featured">Featured</a></li>
                    <li><a href="https://www.planetminecraft.com/project/free-to-download-frost-pursuit-a-1k-x-1k-winter-ice-boat-race-map-vanilla-1-20-1/" className="nav-cta" target="_blank" rel="noopener noreferrer">Download</a></li>
                </ul>
                <button className="nav-toggle" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}
