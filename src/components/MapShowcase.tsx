import { useState } from 'react';

interface BlockStat {
    count: string;
    name: string;
    image: string;
}

const blockStats: BlockStat[] = [
    { count: '3,118,723', name: 'Packed Ice', image: '/images/packed ice.webp' },
    { count: '1,479,066', name: 'Blue Ice', image: '/images/blue ice.webp' },
    { count: '1,050,334', name: 'Light Blue Concrete Powder', image: '/images/light blue concrete powder.webp' },
    { count: '823,695', name: 'Stone', image: '/images/stone.webp' },
    { count: '149,209', name: 'Acacia Log', image: '/images/acacia log.png' },
    { count: '138,951', name: 'Tuff', image: '/images/tuff.webp' },
    { count: '121,562', name: 'Snow', image: '/images/snow.webp' },
    { count: '117,669', name: 'Barrier', image: '/images/barrier.webp' },
    { count: '117,254', name: 'Deepslate', image: '/images/deepslate.webp' },
    { count: '75,828', name: 'Andesite', image: '/images/andesite.webp' },
];

type ViewMode = 'isometric' | 'no-balloons' | 'top-down';

export function MapShowcase() {
    const [viewMode, setViewMode] = useState<ViewMode>('isometric');

    return (
        <section className="map-showcase" id="showcase">
            <div className="container">
                {/* Total Count - Centered */}
                <div className="block-stats-total">
                    <span className="total-count">7.5<sup className="asterisk">*</sup> MILLION</span>
                    <span className="total-label">BLOCKS</span>
                    <span className="total-footnote">*Adjusted for SMP</span>
                </div>

                {/* Block Stats Carousel - Infinite Scroll */}
                <div className="block-carousel-wrapper">
                    <div className="block-carousel">
                        {/* Double the items for seamless loop */}
                        {[...blockStats, ...blockStats].map((block, index) => (
                            <div key={`${block.name}-${index}`} className="block-stat-item">
                                <img src={block.image} alt={block.name} className="block-icon" />
                                <span className="block-name">{block.name}</span>
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
                        Isometric
                    </button>
                    <button
                        className={`view-btn ${viewMode === 'no-balloons' ? 'active' : ''}`}
                        onClick={() => setViewMode('no-balloons')}
                    >
                        No Balloons
                    </button>
                    <button
                        className={`view-btn ${viewMode === 'top-down' ? 'active' : ''}`}
                        onClick={() => setViewMode('top-down')}
                    >
                        Top Down
                    </button>
                </div>

                {/* Map Image - Crossfade between views */}
                <div className="map-image-container">
                    <img
                        src="/images/isometric 1.png"
                        alt="Map isometric view"
                        className={`map-image ${viewMode === 'isometric' ? 'active' : ''}`}
                    />
                    <img
                        src="/images/isometric 4.png"
                        alt="Map no-balloons view"
                        className={`map-image ${viewMode === 'no-balloons' ? 'active' : ''}`}
                    />
                    <img
                        src="/images/isometric 2.png"
                        alt="Map top-down view"
                        className={`map-image ${viewMode === 'top-down' ? 'active' : ''}`}
                    />
                </div>
            </div>
        </section>
    );
}
