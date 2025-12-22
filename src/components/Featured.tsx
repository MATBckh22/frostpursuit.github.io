interface FeaturedProps {
    title?: string;
    description?: string;
    imageSrc?: string;
    label?: string;
}

export function Featured({
    title = 'Crystal Ice Caves',
    description = 'A no-frills experience that brings its ethereal, hand-crafted ice formations to the fore. Designed for racers of every style and skill, Ice Caves are available in a range of difficulties and can be navigated at breakneck speed or explored leisurely.',
    imageSrc = '/images/ice cave main 2.png',
    label = 'Featured Location'
}: FeaturedProps) {
    return (
        <section className="featured" id="featured">
            <div className="container">
                <div className="featured-container">
                    <div className="featured-label">
                        Featured
                    </div>

                    <div className="featured-image">
                        <img src={imageSrc} alt={title} />
                        <div className="featured-image-label">
                            {label}
                        </div>
                    </div>

                    <div className="featured-content">
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
