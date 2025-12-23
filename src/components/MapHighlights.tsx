import { useState, useCallback, useEffect } from 'react';

interface HighlightCard {
    id: string;
    title: string;
    description: string;
    thumbnailDay: string;
    thumbnailNight: string;
    dayImages: string[];
    nightImages: string[];
}

const highlights: HighlightCard[] = [
    {
        id: 'track',
        title: 'Track',
        description: 'Experience the thrilling ice boat racing track with dynamic loops and challenging turns.',
        thumbnailDay: `${import.meta.env.BASE_URL}images/track/day 1.png`,
        thumbnailNight: `${import.meta.env.BASE_URL}images/track/night 1.png`,
        dayImages: [
            `${import.meta.env.BASE_URL}images/track/day 1.png`,
            `${import.meta.env.BASE_URL}images/track/day 2.png`,
            `${import.meta.env.BASE_URL}images/track/day 3.png`,
            `${import.meta.env.BASE_URL}images/track/day 4.png`,
            `${import.meta.env.BASE_URL}images/track/day 5.png`,
            `${import.meta.env.BASE_URL}images/track/day 6.png`,
            `${import.meta.env.BASE_URL}images/track/day 7.png`,
            `${import.meta.env.BASE_URL}images/track/day 8.png`,
        ],
        nightImages: [
            `${import.meta.env.BASE_URL}images/track/night 1.png`,
            `${import.meta.env.BASE_URL}images/track/night 2.png`,
            `${import.meta.env.BASE_URL}images/track/night 3.png`,
            `${import.meta.env.BASE_URL}images/track/night 4.png`,
            `${import.meta.env.BASE_URL}images/track/night 5.png`,
            `${import.meta.env.BASE_URL}images/track/night 6.png`,
            `${import.meta.env.BASE_URL}images/track/night 7.png`,
            `${import.meta.env.BASE_URL}images/track/night 8.png`,
        ]
    },
    {
        id: 'main-lounge',
        title: 'Main Lounge',
        description: 'A cozy gathering space for players to relax and socialize between races.',
        thumbnailDay: `${import.meta.env.BASE_URL}images/main lounge/day 1.png`,
        thumbnailNight: `${import.meta.env.BASE_URL}images/main lounge/night 1.png`,
        dayImages: [
            `${import.meta.env.BASE_URL}images/main lounge/day 1.png`,
            `${import.meta.env.BASE_URL}images/main lounge/day 2.png`,
            `${import.meta.env.BASE_URL}images/main lounge/day 3.png`,
            `${import.meta.env.BASE_URL}images/main lounge/day 4.png`,
            `${import.meta.env.BASE_URL}images/main lounge/day 5.png`,
            `${import.meta.env.BASE_URL}images/main lounge/day 6.png`,
        ],
        nightImages: [
            `${import.meta.env.BASE_URL}images/main lounge/night 1.png`,
            `${import.meta.env.BASE_URL}images/main lounge/night 2.png`,
            `${import.meta.env.BASE_URL}images/main lounge/night 3.png`,
            `${import.meta.env.BASE_URL}images/main lounge/night 4.png`,
            `${import.meta.env.BASE_URL}images/main lounge/night 5.png`,
            `${import.meta.env.BASE_URL}images/main lounge/night 6.png`,
        ]
    },
    {
        id: 'spectator-loft',
        title: 'Spectator Loft',
        description: 'Watch the races unfold from the best seats in the house.',
        thumbnailDay: `${import.meta.env.BASE_URL}images/spectator loft/day 1.png`,
        thumbnailNight: `${import.meta.env.BASE_URL}images/spectator loft/night 1.png`,
        dayImages: [
            `${import.meta.env.BASE_URL}images/spectator loft/day 1.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/day 2.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/day 3.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/day 4.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/day 5.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/day 6.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/day 7.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/day 8.png`,
        ],
        nightImages: [
            `${import.meta.env.BASE_URL}images/spectator loft/night 1.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/night 2.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/night 3.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/night 4.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/night 5.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/night 6.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/night 7.png`,
            `${import.meta.env.BASE_URL}images/spectator loft/night 8.png`,
        ]
    },
    {
        id: 'ice-caves',
        title: 'Ice Caves',
        description: 'Explore the mysterious frozen caverns beneath the racing grounds.',
        thumbnailDay: `${import.meta.env.BASE_URL}images/ice caves/2025-12-20_01.19.00.png`,
        thumbnailNight: `${import.meta.env.BASE_URL}images/ice caves/2025-12-20_01.19.00.png`,
        dayImages: [
            `${import.meta.env.BASE_URL}images/ice caves/2025-11-18_23.47.28.png`,
            `${import.meta.env.BASE_URL}images/ice caves/2025-11-18_23.49.01.png`,
            `${import.meta.env.BASE_URL}images/ice caves/2025-11-18_23.49.24_2.png`,
            `${import.meta.env.BASE_URL}images/ice caves/2025-12-20_01.19.00.png`,
            `${import.meta.env.BASE_URL}images/ice caves/2025-12-20_01.19.18.png`,
            `${import.meta.env.BASE_URL}images/ice caves/2025-12-20_01.19.31.png`,
        ],
        nightImages: [
            `${import.meta.env.BASE_URL}images/ice caves/2025-11-18_23.47.28.png`,
            `${import.meta.env.BASE_URL}images/ice caves/2025-11-18_23.49.01.png`,
            `${import.meta.env.BASE_URL}images/ice caves/2025-11-18_23.49.24_2.png`,
            `${import.meta.env.BASE_URL}images/ice caves/2025-12-20_01.19.00.png`,
            `${import.meta.env.BASE_URL}images/ice caves/2025-12-20_01.19.18.png`,
            `${import.meta.env.BASE_URL}images/ice caves/2025-12-20_01.19.31.png`,
        ]
    },
    {
        id: 'cable-car',
        title: 'Cable Car',
        description: 'Scenic transportation system connecting different areas of the map.',
        thumbnailDay: `${import.meta.env.BASE_URL}images/cable car/day 1.png`,
        thumbnailNight: `${import.meta.env.BASE_URL}images/cable car/night 1.png`,
        dayImages: [
            `${import.meta.env.BASE_URL}images/cable car/day 1.png`,
            `${import.meta.env.BASE_URL}images/cable car/day 2.png`,
            `${import.meta.env.BASE_URL}images/cable car/day 3.png`,
            `${import.meta.env.BASE_URL}images/cable car/day 4.png`,
        ],
        nightImages: [
            `${import.meta.env.BASE_URL}images/cable car/night 1.png`,
            `${import.meta.env.BASE_URL}images/cable car/night 2.png`,
            `${import.meta.env.BASE_URL}images/cable car/night 3.png`,
            `${import.meta.env.BASE_URL}images/cable car/night 4.png`,
        ]
    },
    {
        id: 'miscellaneous',
        title: 'Miscellaneous',
        description: 'Discover hidden details and decorative elements throughout the map.',
        thumbnailDay: `${import.meta.env.BASE_URL}images/miscellaneous/day 1.png`,
        thumbnailNight: `${import.meta.env.BASE_URL}images/miscellaneous/night 1.png`,
        dayImages: [
            `${import.meta.env.BASE_URL}images/miscellaneous/day 1.png`,
            `${import.meta.env.BASE_URL}images/miscellaneous/day 2.png`,
        ],
        nightImages: [
            `${import.meta.env.BASE_URL}images/miscellaneous/night 1.png`,
            `${import.meta.env.BASE_URL}images/miscellaneous/night 2.png`,
        ]
    },
];

export function MapHighlights() {
    const [selectedCard, setSelectedCard] = useState<HighlightCard | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isLightMode, setIsLightMode] = useState(true);
    const [hoveredCard, setHoveredCard] = useState<{ card: HighlightCard; previewImage: string } | null>(null);

    const openGallery = (card: HighlightCard) => {
        setSelectedCard(card);
        setSelectedImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const closeGallery = useCallback(() => {
        setSelectedCard(null);
        document.body.style.overflow = '';
    }, []);

    // Handle ESC key to close gallery
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedCard) {
                closeGallery();
            }
            if (e.key === 'ArrowRight' && selectedCard) {
                const images = isLightMode ? selectedCard.dayImages : selectedCard.nightImages;
                setSelectedImageIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
            }
            if (e.key === 'ArrowLeft' && selectedCard) {
                const images = isLightMode ? selectedCard.dayImages : selectedCard.nightImages;
                setSelectedImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCard, closeGallery, isLightMode]);

    // Get current images based on mode
    const getCurrentImages = useCallback((card: HighlightCard) => {
        return isLightMode ? card.dayImages : card.nightImages;
    }, [isLightMode]);

    // Get a random image for hover preview (skip first image which is the thumbnail)
    const getRandomPreview = useCallback((card: HighlightCard) => {
        const images = getCurrentImages(card);
        if (images.length <= 1) return images[0];
        // Skip index 0 (thumbnail), pick from remaining images
        const randomIndex = 1 + Math.floor(Math.random() * (images.length - 1));
        return images[randomIndex];
    }, [getCurrentImages]);

    const handleMouseEnter = (card: HighlightCard) => {
        setHoveredCard({ card, previewImage: getRandomPreview(card) });
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    const nextImage = () => {
        if (selectedCard) {
            const images = getCurrentImages(selectedCard);
            setSelectedImageIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedCard) {
            const images = getCurrentImages(selectedCard);
            setSelectedImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
            );
        }
    };

    return (
        <section className={`map-highlights ${isLightMode ? 'light-mode' : 'dark-mode'}`} id="highlights">
            <div className="container">
                <div className="highlights-header">
                    <div className="highlights-title-group">
                        <h2 className="highlights-title">Map Highlights</h2>
                        <p className="highlights-subtitle">in-game screenshots</p>
                    </div>

                    {/* Day/Night Toggle */}
                    <div className="mode-toggle">
                        <span className={`mode-label ${isLightMode ? 'active' : ''}`}>☀️</span>
                        <button
                            className="toggle-switch"
                            onClick={() => setIsLightMode(!isLightMode)}
                            aria-label="Toggle day/night mode"
                        >
                            <span className={`toggle-slider ${isLightMode ? '' : 'night'}`}></span>
                        </button>
                        <span className={`mode-label ${!isLightMode ? 'active' : ''}`}>🌙</span>
                    </div>
                </div>

                <div className="highlights-grid">
                    {highlights.map((card) => (
                        <div
                            key={card.id}
                            className="highlight-card"
                            onClick={() => openGallery(card)}
                            onMouseEnter={() => handleMouseEnter(card)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="card-image">
                                {/* Preload both images, crossfade on toggle */}
                                <img
                                    src={card.thumbnailDay}
                                    alt={card.title}
                                    className={`card-img-day ${isLightMode ? 'active' : ''}`}
                                />
                                <img
                                    src={card.thumbnailNight}
                                    alt={card.title}
                                    className={`card-img-night ${!isLightMode ? 'active' : ''}`}
                                />
                            </div>
                            <div className="card-overlay">
                                <h3 className="card-title">{card.title}</h3>
                            </div>

                            {/* Hover Preview Popup */}
                            {hoveredCard?.card.id === card.id && (
                                <div className="card-hover-preview">
                                    <img
                                        src={hoveredCard.previewImage}
                                        alt={`${card.title} preview`}
                                        loading="lazy"
                                    />
                                    <div className="preview-info">
                                        <span className="preview-title">{card.title}</span>
                                        <span className="preview-explore">→ Explore</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Gallery Modal */}
            {selectedCard && (
                <div className="gallery-modal" onClick={closeGallery}>
                    <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
                        <button className="gallery-close" onClick={closeGallery}>×</button>

                        <div className="gallery-header">
                            <h2 className="gallery-title">{selectedCard.title}</h2>
                            <p className="gallery-description">{selectedCard.description}</p>
                        </div>

                        {/* Desktop view: Single image with navigation arrows */}
                        <div className="gallery-main gallery-desktop">
                            <button className="gallery-nav prev" onClick={prevImage}>‹</button>
                            <div className="gallery-image-container">
                                <img
                                    src={getCurrentImages(selectedCard)[selectedImageIndex]}
                                    alt={`${selectedCard.title} ${selectedImageIndex + 1}`}
                                    className="gallery-main-image"
                                    loading="lazy"
                                />
                            </div>
                            <button className="gallery-nav next" onClick={nextImage}>›</button>
                        </div>

                        {/* Desktop: Counter and thumbnails */}
                        <div className="gallery-desktop">
                            <div className="gallery-counter">
                                {selectedImageIndex + 1} / {getCurrentImages(selectedCard).length}
                            </div>

                            <div className="gallery-thumbnails">
                                {getCurrentImages(selectedCard).map((img, index) => (
                                    <div
                                        key={index}
                                        className={`gallery-thumb ${index === selectedImageIndex ? 'active' : ''}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    >
                                        <img src={img} alt={`Thumbnail ${index + 1}`} loading="lazy" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile view: All images as scrollable list */}
                        <div className="gallery-mobile-list">
                            {getCurrentImages(selectedCard).map((img, index) => (
                                <div key={index} className="gallery-list-item">
                                    <img
                                        src={img}
                                        alt={`${selectedCard.title} ${index + 1}`}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
