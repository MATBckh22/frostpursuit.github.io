import { useState, useEffect, useRef } from 'react';

const redstoneItems = [
    { src: "Overview.png", label: "Overview", description: "A complete view of the Frost Pursuit redstone system, featuring the decoupled timer, sorting algorithm, and display modules working in unison." },
    { src: "Main Computations System.png", label: "Main Computations System", description: "The central logic hub handling 15+48 item categorization for player IDs and ranking data, ensuring seamless race management." },
    { src: "Initial Race Registration UI.png", label: "Initial Race Registration UI", description: "The starting point for new racers. Accepts 63 named items, splitting them into ID cards and sorting placeholders for the system." },
    { src: "Race Whitelist Login UI.png", label: "Race Whitelist Login UI", description: "Validates returning players. Functions as a whitelist checker at the finish line to verify ID cards before recording scores." },
    { src: "3-Layer Timer with Shift Registers.png", label: "3-Layer Timer with Shift Registers", description: "A high-precision clock split into minutes, tens-of-seconds, and seconds. Uses synchronous carry logic to prevent display ghosting." },
    { src: "3-bit Adder.png", label: "3-bit Adder", description: "A core logic component used within the timer and calculation modules to handle binary addition and signal processing." },
    { src: "Insertion Sort Module.png", label: "Insertion Sort Module", description: "The system's brain. Automatically compares new race times against top 10 records, inserting better scores and shifting others down." },
    { src: "Insertion Sort Unit.png", label: "Insertion Sort Unit", description: "A single 5x5 sorting cell. Stores one player's data and handles the comparison logic to determine rank placement." },
    { src: "Generated Box UI Reverse Loader.png", label: "Generated Box UI Reverse Loader", description: "Manually triggers the generation of the leaderboard chest, organizing player items into the correct ranking order." },
    { src: "Analog-7 Segment Display-Binary Converter.png", label: "Analog-7 Segment Display-Binary Converter", description: "Converts internal binary signals into readable analog formats for the seven-segment display units." },
    { src: "26-Bit Serial Binary Box Transcoder.png", label: "26-Bit Serial Binary Box Transcoder", description: "Encodes complex race data into a serial binary format for reliable transmission across dimensions or long distances." },
    { src: "26-Bit 4gt Serial Binary Box Decoder.png", label: "26-Bit 4gt Serial Binary Box Decoder", description: "Decodes the 26-bit serial signal back into usable parallel data for the display or storage systems with 4-gametick precision." },
    { src: "23-Bit Mini Time Display.png", label: "23-Bit Mini Time Display", description: "A compact display module handling precise time visualizations for specific tracking segments." },
    { src: "Nether Portal Chunk Loader.png", label: "Nether Portal Chunk Loader", description: "Keeps the redstone chunks loaded via Nether portals, ensuring the system runs continuously even when players are far away." },
    { src: "10-item Simple Reverser.png", label: "10-item Simple Reverser", description: "A utility module that reverses item streams, used for organizing data or resetting system states." },
    { src: "Process Manager (Priority Queue Based).png", label: "Process Manager (Priority Queue Based)", description: "Prevents logic conflicts by queuing tasks like queries, inputs, and syncs, ensuring only one runs at a time." },
    { src: "Modular Display Unit.png", label: "Modular Display Unit", description: "A standalone digit unit for the main display, designed to be stackable and easily linked for multi-digit time keeping." },
    { src: "Low-Latency Comparator Chain Unit.png", label: "Low-Latency Comparator Chain Unit", description: "Uses comparator logic to transmit analog signals instantly over vertical distances, bypassing standard redstone delay." },
    { src: "Latency-Free Analog Downlink (BED Encoded).png", label: "Latency-Free Analog Downlink (BED Encoded)", description: "Uses Block Event Delay (BED) encoding to send signals downwards instantly, crucial for the \"Nether Display\" system." },
    { src: "Instant Item Catcher (Separates Boat and ID).png", label: "Instant Item Catcher (Separates Boat and ID)", description: "The finish line mechanism. Instantly separates the player's boat from their ID card to trigger the finish logic." },
];

export function Redstone() {
    const [activeItem, setActiveItem] = useState(redstoneItems[0]);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
                                src={`/images/frost pursuit redstone/${item.src}`}
                                alt={item.label}
                            />
                        </div>
                    ))}
                </div>

                {/* Right sticky column */}
                <div className="redstone-sticky">
                    <h2 className="redstone-title">Going <span className="redstone-title-technical">Technical</span></h2>
                    <p className="redstone-subtitle">Powered by redstone</p>
                    <p className="redstone-belief">
                        CTEC believes that incorporating redstone makes a build come alive
                        as players can interact with it.
                    </p>
                    <div className="redstone-current-label" key={activeItem.label}>
                        {formatLabel(activeItem.label)}
                    </div>
                    <p className="redstone-description" key={`desc-${activeItem.label}`}>
                        {activeItem.description}
                    </p>
                </div>
            </div>
        </section>
    );
}
