import { useReveal } from '../hooks/useReveal';

export default function ChandigarhSection() {
    const contentRef = useReveal();

    return (
        <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden bg-[#0d0d0d]">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-fit animate-slow-zoom"
                >
                    <source src="images/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlays / Vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-11" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] z-11" />
            </div>

            {/* Content Overlay */}
            <div
                ref={contentRef}
                className="relative z-20 text-center max-w-4xl mx-auto space-y-10 reveal-up"
            >
                <div className="space-y-4">
                    <span
                        className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border uppercase"
                        style={{
                            color: 'var(--accent)',
                            borderColor: 'rgba(226, 180, 154, 0.4)',
                            background: 'rgba(226, 180, 154, 0.08)',
                        }}
                    >
                        2020–2021 – Through Screens to Chandigarh
                    </span>

                    <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white font-serif italic">
                        "Phir aaya 2020… aur duniya ruk si gayi."
                    </h2>
                </div>

                <div className="space-y-10 text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
                    <div className="space-y-4">
                        <p>Hum mil nahi sakte the… bas video calls hi hamara sahara thi.</p>
                    </div>

                    <div className="space-y-4">
                        <p>2020 ne hume door kiya, par dil aur kareeb le aaya.</p>
                    </div>

                    <div className="pt-8">
                        <p className="text-3xl md:text-5xl font-serif text-white italic animate-reveal-text">
                            "Aur phir finally — <span style={{ color: 'var(--accent)' }}>Chandigarh.</span>"
                        </p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slow-zoom {
                    0% { transform: scale(1.05); }
                    100% { transform: scale(1.15); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s linear infinite alternate;
                }
                @keyframes reveal-text {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-reveal-text {
                    animation: reveal-text 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    animation-delay: 0.8s;
                    opacity: 0;
                }
            `}} />
        </section>
    );
}
