import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MapShowcase } from './components/MapShowcase';
import { MapHighlights } from './components/MapHighlights';
import { Redstone } from './components/Redstone';
import { Footer } from './components/Footer';
import { RedstoneBlog } from './pages/RedstoneBlog';

function HomePage() {
    return (
        <>
            <Navbar />
            <Hero />
            <MapShowcase />
            <MapHighlights />
            <Redstone />
            <Footer />
        </>
    );
}

function AppContent() {
    const { lang } = useLanguage();

    return (
        <div data-lang={lang}>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/redstone-blog" element={<RedstoneBlog />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

function App() {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
}

export default App;

