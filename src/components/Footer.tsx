interface FooterProps {
    logoSrc?: string;
}

export function Footer({ logoSrc = `${import.meta.env.BASE_URL}images/logo 2.png` }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <img src={logoSrc} alt="Frost Pursuit" className="footer-logo" />
                        <p>A Cloud Town Exquisite Craft Production</p>
                    </div>
                    <nav className="footer-links">
                        <a href="#catalog">Catalog</a>
                        <a href="#featured">Featured</a>
                        <a href="#about">About</a>
                        <a href="#download">Download</a>
                    </nav>
                </div>
                <div className="footer-bottom">
                    <p>© {currentYear} Cloud Town Exquisite Craft. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
