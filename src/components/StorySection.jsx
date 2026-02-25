import { useReveal } from '../hooks/useReveal';

export default function StorySection({ year, heading, paragraphs, image, alt, reverse = false, quoteOnly = false, grayscale = false }) {
    const imgRef = useReveal();
    const textRef = useReveal();

    return (
        <section className="relative min-h-screen flex items-center py-24 px-6 md:px-[10%] overflow-hidden">
            {/* Section divider */}
            <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center w-full ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>

                {/* Image / Quote side */}
                <div
                    ref={imgRef}
                    className={`reveal-up ${reverse ? 'delay-200' : ''}`}
                >
                    {quoteOnly ? (
                        <div
                            className="h-full min-h-[280px] flex items-center justify-center rounded-3xl p-10 border"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                backdropFilter: 'blur(20px)',
                                borderColor: 'rgba(255,255,255,0.08)',
                            }}
                        >
                            <p
                                className="text-2xl md:text-3xl italic leading-relaxed text-center"
                                style={{ color: 'var(--accent)' }}
                            >
                                {image}
                            </p>
                        </div>
                    ) : typeof image === 'string' ? (
                        <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                            <img
                                src={image}
                                alt={alt}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                style={{
                                    filter: grayscale ? 'grayscale(100%) contrast(1.1) brightness(0.95)' : 'none'
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center min-h-[280px]">
                            {image}
                        </div>
                    )}
                </div>

                {/* Text side */}
                <div
                    ref={textRef}
                    className={`reveal-up delay-200 space-y-5`}
                >
                    <span
                        className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border"
                        style={{
                            color: 'var(--accent)',
                            borderColor: 'rgba(226,180,154,0.4)',
                            background: 'rgba(226,180,154,0.08)',
                        }}
                    >
                        {year}
                    </span>

                    <h2 className="text-3xl md:text-4xl font-bold leading-snug text-white">
                        {heading}
                    </h2>

                    <div className="space-y-3">
                        {paragraphs.map((p, i) => (
                            <p
                                key={i}
                                className="text-base md:text-lg leading-relaxed"
                                style={{ color: i === paragraphs.length - 1 && paragraphs.length > 1 ? 'var(--accent)' : 'rgba(255,255,255,0.6)' }}
                            >
                                {p}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
