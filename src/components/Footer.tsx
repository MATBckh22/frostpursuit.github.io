import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
    const { lang } = useLanguage();
    const currentYear = new Date().getFullYear();

    const content = {
        en: {
            contactTitle: 'Contact:',
            ctec: 'Cloud Town Exquisite Craft (CTEC)',
            disclaimer1: 'The map is publicly available, any derivations and customizations are welcomed. However, we prohibit commercialization of our projects in any form.',
            disclaimer2: 'If you see any vendor selling Frost Pursuit, reach out to us immediately.',
            copyright: `© ${currentYear} CTEC. All rights reserved.`
        },
        zh: {
            contactTitle: '聯繫我們：',
            ctec: '雲鎮工藝 Cloud Town Exquisite Craft (CTEC)',
            disclaimer1: '本地圖公開提供，歡迎任何衍生和自訂版本。但我們禁止以任何形式將我們的項目商業化。',
            disclaimer2: '如果您發現任何販售 Frost Pursuit 的商家，請立即與我們聯繫。',
            copyright: `© ${currentYear} CTEC. 版權所有。`
        }
    };

    const t = content[lang];

    return (
        <footer className="footer-large">
            <div className="footer-accent-bar"></div>
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-contact">
                            <h3>{t.contactTitle}</h3>
                            <p className="footer-org">{t.ctec}</p>
                            <a href="https://mc-ctec.org/" target="_blank" rel="noopener noreferrer" className="footer-logo-link">
                                <img
                                    src={`${import.meta.env.BASE_URL}images/logo 2.png`}
                                    alt="CTEC"
                                    className="footer-ctec-logo"
                                />
                            </a>
                        </div>
                        <div className="footer-info">
                            <p>{t.disclaimer1}</p>
                            <p className="footer-warning">{t.disclaimer2}</p>
                        </div>
                        <div className="footer-links-large">
                            <div className="footer-icons">
                                <a href="https://discord.gg/aRUJMvpgNy" target="_blank" rel="noopener noreferrer" title="Discord">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                    </svg>
                                </a>
                                <a href="https://www.youtube.com/@CTEC_" target="_blank" rel="noopener noreferrer" title="YouTube">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                                <a href="https://github.com/mc-cloud-town" target="_blank" rel="noopener noreferrer" title="GitHub">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            </div>
                            <p className="footer-copyright">{t.copyright}</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
