import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
    logoSrc?: string;
    forceTheme?: 'default' | 'cyan' | 'redstone';
}

export function Navbar({ logoSrc = `${import.meta.env.BASE_URL}images/logo 1.PNG`, forceTheme }: NavbarProps) {
    const { lang, setLang, t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<'default' | 'cyan' | 'redstone'>(forceTheme || 'default');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Skip theme detection if forceTheme is set
            if (forceTheme) return;

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
    }, [forceTheme]);

    const themeClass = currentTheme !== 'default' ? `${currentTheme}-theme` : '';

    const handleMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${themeClass} ${mobileMenuOpen ? 'menu-open' : ''}`}>
            <div className="nav-container">
                <a href="https://mc-ctec.org/" className="nav-logo" target="_blank" rel="noopener noreferrer">
                    <img src={logoSrc} alt="Frost Pursuit" className="logo-img" />
                </a>

                <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                    <li><a href="#showcase" onClick={handleLinkClick}>{t.nav.showcase}</a></li>
                    <li><a href="#highlights" onClick={handleLinkClick}>{t.nav.highlights}</a></li>
                    <li><a href="#redstone" onClick={handleLinkClick}>{t.nav.redstone}</a></li>
                    <li><a href="https://www.planetminecraft.com/project/free-to-download-frost-pursuit-a-1k-x-1k-winter-ice-boat-race-map-vanilla-1-20-1/" className="nav-cta" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>{t.nav.download}</a></li>
                    <li className="nav-lang-toggle">
                        <button
                            className={lang === 'en' ? 'active' : ''}
                            onClick={() => setLang('en')}
                        >
                            EN
                        </button>
                        <span className="lang-sep">/</span>
                        <button
                            className={lang === 'zh' ? 'active' : ''}
                            onClick={() => setLang('zh')}
                        >
                            繁中
                        </button>
                    </li>
                </ul>
                <button className={`nav-toggle ${mobileMenuOpen ? 'active' : ''}`} aria-label="Toggle menu" onClick={handleMenuToggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}
