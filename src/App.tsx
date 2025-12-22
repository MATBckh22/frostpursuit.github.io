import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MapShowcase } from './components/MapShowcase';
import { MapHighlights } from './components/MapHighlights';
import { Redstone } from './components/Redstone';
import { Footer } from './components/Footer';

function App() {
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

export default App;
