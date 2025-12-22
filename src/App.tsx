import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MapShowcase } from './components/MapShowcase';
import { MapHighlights } from './components/MapHighlights';
import { Redstone } from './components/Redstone';
import { Featured } from './components/Featured';
import { Footer } from './components/Footer';

function App() {
    return (
        <>
            <Navbar />
            <Hero />
            <MapShowcase />
            <MapHighlights />
            <Redstone />
            <Featured />
            <Footer />
        </>
    );
}

export default App;
