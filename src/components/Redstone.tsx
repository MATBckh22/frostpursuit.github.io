import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const redstoneItems = [
    { src: "Overview-min.webp", label: "Overview" },
    { src: "Main Computations System-min.webp", label: "Main Computations System" },
    { src: "Initial Race Registration UI-min.webp", label: "Initial Race Registration UI" },
    { src: "Race Whitelist Login UI-min.webp", label: "Race Whitelist Login UI" },
    { src: "3-Layer Timer with Shift Registers-min.webp", label: "3-Layer Timer with Shift Registers" },
    { src: "3-bit Adder-min.webp", label: "3-bit Adder" },
    { src: "Insertion Sort Module-min.webp", label: "Insertion Sort Module" },
    { src: "Insertion Sort Unit-min.webp", label: "Insertion Sort Unit" },
    { src: "Generated Box UI Reverse Loader-min.webp", label: "Generated Box UI Reverse Loader" },
    { src: "Analog-7 Segment Display-Binary Converter-min.webp", label: "Analog-7 Segment Display-Binary Converter" },
    { src: "26-Bit Serial Binary Box Transcoder-min.webp", label: "26-Bit Serial Binary Box Transcoder" },
    { src: "26-Bit 4gt Serial Binary Box Decoder-min.webp", label: "26-Bit 4gt Serial Binary Box Decoder" },
    { src: "23-Bit Mini Time Display-min.webp", label: "23-Bit Mini Time Display" },
    { src: "Nether Portal Chunk Loader-min.webp", label: "Nether Portal Chunk Loader" },
    { src: "10-item Simple Reverser-min.webp", label: "10-item Simple Reverser" },
    { src: "Process Manager (Priority Queue Based)-min.webp", label: "Process Manager (Priority Queue Based)" },
    { src: "Modular Display Unit-min.webp", label: "Modular Display Unit" },
    { src: "Low-Latency Comparator Chain Unit-min.webp", label: "Low-Latency Comparator Chain Unit" },
    { src: "Latency-Free Analog Downlink (BED Encoded)-min.webp", label: "Latency-Free Analog Downlink (BED Encoded)" },
    { src: "Instant Item Catcher (Separates Boat and ID)-min.webp", label: "Instant Item Catcher (Separates Boat and ID)" },
];

export function Redstone() {
    const { t } = useLanguage();
    const [activeItem, setActiveItem] = useState(redstoneItems[0]);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Get translated label and description for an item
    const getItemTranslation = (label: string) => {
        const items = t.redstone.items as Record<string, { label: string; description: string }>;
        return items[label] || { label, description: '' };
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
                        if (index !== -1) {
                            setActiveItem(redstoneItems[index]);
                        }
                    }
                });
            },
            {
                threshold: 0.6,
                rootMargin: '-20% 0px -20% 0px'
            }
        );

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const formatLabel = (text: string) => {
        return text.split(/([-()4])/).map((part, index) =>
            /[-()4]/.test(part) ? <span key={index} className="symbol-text">{part}</span> : part
        );
    };

    return (
        <section className="redstone-section" id="redstone">
            <div className="redstone-layout">
                {/* Left scrolling column */}
                <div className="redstone-scroll">
                    {redstoneItems.map((item, index) => (
                        <div
                            key={item.src}
                            className={`redstone-scroll-item ${item.label === "Main Computations System" ? "large" : ""}`}
                            ref={(el) => { itemRefs.current[index] = el; }}
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/frost pursuit redstone/${item.src}`}
                                alt={getItemTranslation(item.label).label}
                            />
                        </div>
                    ))}
                </div>

                {/* Right sticky column */}
                <div className="redstone-sticky">
                    <h2 className="redstone-title">{t.redstone.sectionTitle} <span className="redstone-title-technical">{t.redstone.technicalWord}</span></h2>
                    <p className="redstone-subtitle">{t.redstone.subtitle}</p>
                    <p className="redstone-belief">
                        {t.redstone.belief}
                    </p>
                    <div className="redstone-current-label" key={activeItem.label}>
                        {formatLabel(getItemTranslation(activeItem.label).label)}
                    </div>
                    <p className="redstone-description" key={`desc-${activeItem.label}`}>
                        {getItemTranslation(activeItem.label).description}
                    </p>
                    <Link to="/redstone-blog" className="redstone-cta">
                        {t.redstone.learnMore} <span className="cta-arrow">▷</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
