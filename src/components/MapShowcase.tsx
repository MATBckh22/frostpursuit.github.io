import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface BlockStat {
    count: string;
    name: string;
    image: string;
}

const blockStats: BlockStat[] = [
    { count: '3,118,723', name: 'Packed Ice', image: `${import.meta.env.BASE_URL}images/packed ice.webp` },
    { count: '1,479,066', name: 'Blue Ice', image: `${import.meta.env.BASE_URL}images/blue ice.webp` },
    { count: '1,050,334', name: 'Light Blue Concrete Powder', image: `${import.meta.env.BASE_URL}images/light blue concrete powder.webp` },
    { count: '823,695', name: 'Stone', image: `${import.meta.env.BASE_URL}images/stone.webp` },
    { count: '149,209', name: 'Acacia Log', image: `${import.meta.env.BASE_URL}images/acacia log.png` },
    { count: '138,951', name: 'Tuff', image: `${import.meta.env.BASE_URL}images/tuff.webp` },
    { count: '121,562', name: 'Snow', image: `${import.meta.env.BASE_URL}images/snow.webp` },
    { count: '117,669', name: 'Barrier', image: `${import.meta.env.BASE_URL}images/barrier.webp` },
    { count: '117,254', name: 'Deepslate', image: `${import.meta.env.BASE_URL}images/deepslate.webp` },
    { count: '75,828', name: 'Andesite', image: `${import.meta.env.BASE_URL}images/andesite.webp` },
];

type ViewMode = 'isometric' | 'no-balloons' | 'top-down';

export function MapShowcase() {
    const { t } = useLanguage();
    const [viewMode, setViewMode] = useState<ViewMode>('isometric');

    return (
        <section className="map-showcase" id="showcase">
            <div className="container">
                {/* Total Count - Centered */}
                <div className="block-stats-total">
                    <span className="total-count">{t.showcase.totalCount}<sup className="asterisk">*</sup> {t.showcase.million}</span>
                    <span className="total-label">{t.showcase.blocks}</span>
                    <span className="total-footnote">{t.showcase.footnote}</span>
                </div>

                {/* Block Stats Carousel - Infinite Scroll */}
                <div className="block-carousel-wrapper">
                    <div className="block-carousel">
                        {/* Double the items for seamless loop */}
                        {[...blockStats, ...blockStats].map((block, index) => (
                            <div key={`${block.name}-${index}`} className="block-stat-item">
                                <img src={block.image} alt={block.name} className="block-icon" />
                                <span className="block-name">{t.showcase.blockNames[block.name as keyof typeof t.showcase.blockNames] || block.name}</span>
                                <span className="block-count">{block.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* View Toggle */}
                <div className="view-toggle">
                    <button
                        className={`view-btn ${viewMode === 'isometric' ? 'active' : ''}`}
                        onClick={() => setViewMode('isometric')}
                    >
                        {t.showcase.viewIsometric}
                    </button>
                    <button
                        className={`view-btn ${viewMode === 'no-balloons' ? 'active' : ''}`}
                        onClick={() => setViewMode('no-balloons')}
                    >
                        {t.showcase.viewNoBalloons}
                    </button>
                    <button
                        className={`view-btn ${viewMode === 'top-down' ? 'active' : ''}`}
                        onClick={() => setViewMode('top-down')}
                    >
                        {t.showcase.viewTopDown}
                    </button>
                </div>

                {/* Map Image - Crossfade between views */}
                <div className="map-image-container">
                    <img
                        src={`${import.meta.env.BASE_URL}images/isometric 1.png`}
                        alt="Map isometric view"
                        className={`map-image ${viewMode === 'isometric' ? 'active' : ''}`}
                    />
                    <img
                        src={`${import.meta.env.BASE_URL}images/isometric 4.png`}
                        alt="Map no-balloons view"
                        className={`map-image ${viewMode === 'no-balloons' ? 'active' : ''}`}
                    />
                    <img
                        src={`${import.meta.env.BASE_URL}images/isometric 2.png`}
                        alt="Map top-down view"
                        className={`map-image ${viewMode === 'top-down' ? 'active' : ''}`}
                    />
                </div>
            </div>
        </section>
    );
}
