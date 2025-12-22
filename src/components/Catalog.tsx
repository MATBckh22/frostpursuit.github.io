import { useRef, useState } from 'react';

interface CatalogItem {
    id: string;
    title: string;
    count: number;
    image: string;
}

const catalogItems: CatalogItem[] = [
    {
        id: 'interior',
        title: 'Interior',
        count: 6,
        image: '/images/interior 2nd building 1.png'
    },
    {
        id: 'cable-car',
        title: 'Cable Car',
        count: 3,
        image: '/images/track solas main.png'
    },
    {
        id: 'mountain',
        title: 'Mountain',
        count: 8,
        image: '/images/render 1.png'
    },
    {
        id: 'ice-caves',
        title: 'Ice Caves',
        count: 4,
        image: '/images/ice cave main 1.png'
    },
    {
        id: 'lodge',
        title: 'Lodge',
        count: 5,
        image: '/images/dining hall sun.png'
    }
];

export function Catalog() {
    const cardsRef = useRef<HTMLDivElement>(null);
    const [cursorImage, setCursorImage] = useState<string | null>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const scrollCards = (direction: 'left' | 'right') => {
        if (cardsRef.current) {
            const scrollAmount = 300;
            cardsRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleCardEnter = (image: string) => {
        setCursorImage(image);
    };

    const handleCardLeave = () => {
        setCursorImage(null);
    };

    return (
        <section className="catalog" id="catalog" onMouseMove={handleMouseMove}>
            {/* Custom cursor with image preview */}
            {cursorImage && (
                <div
                    className="catalog-cursor-preview"
                    style={{
                        left: cursorPos.x + 20,
                        top: cursorPos.y + 20
                    }}
                >
                    <img src={cursorImage} alt="Preview" />
                </div>
            )}

            <div className="container">
                <div className="catalog-container">
                    <div className="catalog-header">
                        <span className="catalog-label">Map Highlights</span>
                        <p className="catalog-description">
                            Since our founding in 2024, our map has grown to include stunning
                            locations, intricate details, and immersive environments—crafted for
                            both solo adventurers and multiplayer racing.
                        </p>
                        <span className="catalog-view-all">View All Highlights</span>
                    </div>

                    <div className="catalog-cards-wrapper">
                        <div className="catalog-cards" ref={cardsRef}>
                            {catalogItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="catalog-card"
                                    onMouseEnter={() => handleCardEnter(item.image)}
                                    onMouseLeave={handleCardLeave}
                                >
                                    <div className="catalog-card-image">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="catalog-card-title">
                                        {item.title}
                                        <sup className="catalog-card-count">{item.count}</sup>
                                    </div>
                                    <a href={`#${item.id}`} className="catalog-card-link">
                                        → Explore
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="catalog-nav">
                            <button
                                className="catalog-nav-btn"
                                onClick={() => scrollCards('left')}
                                aria-label="Previous"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                className="catalog-nav-btn"
                                onClick={() => scrollCards('right')}
                                aria-label="Next"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
