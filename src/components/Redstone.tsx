export function Redstone() {
    return (
        <section className="redstone-section" id="redstone">
            <div className="redstone-layout">
                {/* Left scrolling column */}
                <div className="redstone-scroll">
                    <div className="redstone-scroll-item">
                        <img
                            src="/images/frost pursuit redstone/redstone 2.png"
                            alt="Redstone mechanism"
                        />
                    </div>
                    <div className="redstone-scroll-item">
                        <img
                            src="/images/frost pursuit redstone/redstone 3.png"
                            alt="Redstone system"
                        />
                    </div>
                </div>

                {/* Right sticky column */}
                <div className="redstone-sticky">
                    <h2 className="redstone-title">Going Technical</h2>
                    <p className="redstone-subtitle">Powered by redstone</p>
                    <p className="redstone-belief">
                        CTEC believes that incorporating redstone makes a build come alive
                        as players can interact with it.
                    </p>
                    <div className="redstone-featured">
                        <img
                            src="/images/frost pursuit redstone/redstone 1.png"
                            alt="Redstone circuitry"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
