import { useEffect, useState, useRef } from 'react';

interface HeroProps {
    backgroundImage?: string;
    logoSrc?: string;
}

const CELL_SIZE = 50; // Fixed 50x50 pixel squares

// Hotspot bounds as percentages of the wrapper
const HOTSPOTS = [
    { id: 'spectator-loft', top: 0.40, left: 0.27, width: 0.25, height: 0.25, label: 'Spectator Loft' },
    { id: 'main-lounge', top: 0.21, left: 0.495, width: 0.20, height: 0.20, label: 'Main Lounge' },
    { id: 'cable-car', top: 0.85, left: 0.75, width: 0.15, height: 0.20, label: 'Cable Car' },
];

export function Hero({
    backgroundImage = `${import.meta.env.BASE_URL}images/render frost pursuit.webp`,
    logoSrc = `${import.meta.env.BASE_URL}images/logo 2.png`
}: HeroProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isTextHidden, setIsTextHidden] = useState(false);
    const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
    const [gridDimensions, setGridDimensions] = useState({ cols: 0, rows: 0 });
    const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
    const heroRef = useRef<HTMLElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                const heroHeight = heroRef.current.offsetHeight;
                const scrollPosition = window.scrollY;
                setIsTextHidden(scrollPosition > heroHeight * 0.5);
            }
        };

        const updateGridDimensions = () => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setGridDimensions({
                    cols: Math.ceil(rect.width / CELL_SIZE),
                    rows: Math.ceil(rect.height / CELL_SIZE)
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateGridDimensions);
        updateGridDimensions();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateGridDimensions);
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setCursorPos({ x, y });

            // Check if cursor is over any hotspot
            if (wrapperRef.current) {
                const wrapperRect = wrapperRef.current.getBoundingClientRect();
                const relX = (e.clientX - wrapperRect.left) / wrapperRect.width;
                const relY = (e.clientY - wrapperRect.top) / wrapperRect.height;

                let foundHotspot: string | null = null;
                for (const hotspot of HOTSPOTS) {
                    if (
                        relX >= hotspot.left &&
                        relX <= hotspot.left + hotspot.width &&
                        relY >= hotspot.top &&
                        relY <= hotspot.top + hotspot.height
                    ) {
                        foundHotspot = hotspot.id;
                        break;
                    }
                }
                setHoveredHotspot(foundHotspot);
            }
        }
    };

    const handleMouseLeave = () => {
        setCursorPos(null);
        setHoveredHotspot(null);
    };

    // Calculate opacity based on distance from cursor
    const getOpacity = (cellX: number, cellY: number): number => {
        if (!cursorPos) return 0;

        // Center of the cell
        const cellCenterX = cellX * CELL_SIZE + CELL_SIZE / 2;
        const cellCenterY = cellY * CELL_SIZE + CELL_SIZE / 2;

        // Distance from cursor
        const dx = cellCenterX - cursorPos.x;
        const dy = cellCenterY - cursorPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Gradient effect: max opacity at cursor, fading to 0 at maxRadius
        const maxRadius = 120; // pixels - smaller, focused area
        // Sharper falloff for clearer reveal
        const rawOpacity = Math.max(0, 1 - (distance / maxRadius));
        const opacity = Math.pow(rawOpacity, 0.5); // Square root for steeper curve

        return opacity;
    };

    // Generate grid cells
    const gridCells = [];
    for (let y = 0; y < gridDimensions.rows; y++) {
        for (let x = 0; x < gridDimensions.cols; x++) {
            const revealAmount = getOpacity(x, y);
            // Invert: cells near cursor have low opacity (fully reveal original)
            // cells far away have full opacity (show tint)
            const cellOpacity = 1 - revealAmount;

            gridCells.push(
                <div
                    key={`${x}-${y}`}
                    className="grid-cell"
                    style={{
                        left: x * CELL_SIZE,
                        top: y * CELL_SIZE,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        opacity: cellOpacity,
                    }}
                />
            );
        }
    }

    return (
        <section
            className={`hero ${isLoading ? 'loading' : 'loaded'}`}
            id="hero"
            ref={heroRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Loading overlay */}
            {isLoading && (
                <div className="hero-loading">
                    <div className="loading-spinner"></div>
                    <span className="loading-text">Loading Frost Pursuit...</span>
                </div>
            )}
            <div className="hero-bg">
                <div className="hero-map-wrapper" ref={wrapperRef}>
                    <img
                        src={backgroundImage}
                        alt="Frost Pursuit Map"
                        className="hero-image"
                        onLoad={() => setIsLoading(false)}
                    />
                    <img src={backgroundImage} alt="Frost Pursuit Map Original" className="hero-image-original" />
                </div>

                <div className="hero-grid-overlay">
                    {gridCells}
                </div>

                {/* Hotspots layer - sits above grid overlay */}
                <div className="hero-hotspots-layer">
                    {/* Hotspot for Spectator Loft (left building) */}
                    <div className={`hero-hotspot spectator-loft-hotspot ${hoveredHotspot === 'spectator-loft' ? 'hovered' : ''}`}>
                        <span className="waypoint-marker spectator-loft-marker"></span>
                        <span className="hotspot-tooltip">Spectator Loft</span>
                    </div>
                    {/* Hotspot for Main Lounge (right building) */}
                    <div className={`hero-hotspot main-lounge-hotspot ${hoveredHotspot === 'main-lounge' ? 'hovered' : ''}`}>
                        <span className="waypoint-marker main-lounge-marker"></span>
                        <span className="hotspot-tooltip">Main Lounge</span>
                    </div>
                    {/* Hotspot for Cable Car */}
                    <div className={`hero-hotspot cable-car-hotspot ${hoveredHotspot === 'cable-car' ? 'hovered' : ''}`}>
                        <span className="waypoint-marker cable-car-marker"></span>
                        <span className="hotspot-tooltip">Cable Car</span>
                    </div>
                </div>
            </div>
            <div className={`hero-content ${isTextHidden ? 'hidden' : ''}`}>
                <div className="hero-title">
                    <span className="title-frost">Frost</span>
                    <span className="title-pursuit">Pursuit</span>
                </div>
                <p className="hero-subtitle">
                    The Ultimate Ice<br />Boat Racing.
                </p>
                <a href="https://www.planetminecraft.com/project/free-to-download-frost-pursuit-a-1k-x-1k-winter-ice-boat-race-map-vanilla-1-20-1/" className="hero-cta" target="_blank" rel="noopener noreferrer">
                    Download Map <span className="cta-arrow">▷</span>
                </a>
            </div>
            <div className="hero-bottom-logo">
                <img src={logoSrc} alt="Cloud Town Exquisite Craft" />
            </div>
        </section>
    );
}

