import { useReveal } from '../hooks/useReveal';

export default function GrowingTogetherSection() {
    const contentRef = useReveal();
    const bgRef1 = useReveal();
    const bgRef2 = useReveal();
    const bgRef3 = useReveal();

    const images = [
        { url: 'images/image2.jpeg', className: 'w-full h-full object-cover scale-105 transition-all duration-1000' },
        { url: 'images/image-2-1.jpeg', className: 'absolute top-10 left-10 w-1/3 aspect-square object-cover shadow-2xl rotate-[-5deg] animate-float-slow transition-all duration-1000' },
        { url: 'images/image2-3.jpeg', className: 'absolute bottom-10 right-10 w-1/4 aspect-video object-cover shadow-2xl rotate-[3deg] animate-float-slow-reverse transition-all duration-1000' }
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden bg-[#0d0d0d]">
            {/* Layered Background Collage */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Base Image */}
                <div ref={bgRef1} className="absolute inset-0 reveal-up transition-all duration-[2000ms]">
                    <img src={images[0].url} className={images[0].className} alt="" />
                </div>

                {/* Floating Image 1 */}
                <div ref={bgRef2} className="absolute inset-0 reveal-left delay-300 transition-all duration-[1500ms]">
                    <img src={images[1].url} className={images[1].className} alt="" />
                </div>

                {/* Floating Image 2 */}
                <div ref={bgRef3} className="absolute inset-0 reveal-right delay-500 transition-all duration-[1800ms]">
                    <img src={images[2].url} className={images[2].className} alt="" />
                </div>

                {/* Dark Overlays / Vignette */}
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-11" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-11" />
            </div>

            {/* Content Overlay */}
            <div
                ref={contentRef}
                className="relative z-20 text-center max-w-4xl mx-auto space-y-8 reveal-up"
            >
                <div className="space-y-4">
                    <span
                        className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border"
                        style={{
                            color: 'var(--accent)',
                            borderColor: 'rgba(226, 180, 154, 0.4)',
                            background: 'rgba(226, 180, 154, 0.08)',
                        }}
                    >
                        2018–2019 – Growing Together
                    </span>

                    <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white font-serif italic">
                        "Yeh woh saal the jab humne ek dusre ko sach mein samjha…"
                    </h2>
                </div>

                <div className="space-y-8 text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto text-center">
                    <div className="space-y-4">
                        <p>Tab hume nahi pata tha ki zindagi hume itni door le jayegi…<br />
                            Par shayad usse pehle hi zindagi hume strong banana shuru kar chuki thi.</p>
                    </div>

                    <div className="space-y-4">
                        <p>Kabhi misunderstandings hui…<br />
                            Kabhi baatein choti thi par ego thoda bada ho jata tha.<br />
                            Kabhi lagta tha shayad samajh nahi pa rahe ek dusre ko…</p>
                    </div>

                    <div className="space-y-4">
                        <p>Lekin har baar humne give up nahi kiya. Humne baith kar baat ki.<br />
                            Humne apne relationship par consciously work kiya.<br />
                            Humne seekha ki sirf pyaar kaafi nahi hota… samajhna, patience aur effort bhi zaroori hota hai.</p>
                    </div>

                    <div className="space-y-4">
                        <p>Woh saal sirf romance ke nahi the… Woh growth ke saal the.</p>
                        <p>Tum apne career ko shape de rahe the, Main apne sapno ke peeche bhaag rahi thi.<br />
                            Kabhi assignments, kabhi responsibilities, kabhi thakan… kabhi stress.</p>
                    </div>

                    <div className="space-y-4">
                        <p>Hum paas hoke bhi kabhi kabhi mil pate the. Distance tab kilometers ka nahi tha… busy schedules ka tha.</p>
                    </div>

                    <div className="space-y-4">
                        <p>Par phir bhi — Late night talks hoti thi. Choti choti fights hoti thi.<br />
                            Aur un fights ke baad aur zyada pyaar hota tha.</p>
                    </div>

                    <div className="space-y-4 italic" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        <p>Shayad tab hume realise nahi hua tha…<br />
                            Par wahi phase tha jahan hum sirf couple nahi, partners ban rahe the.</p>
                    </div>
                </div>

                <div className="pt-10">
                    <p className="text-2xl md:text-4xl font-serif italic leading-relaxed" style={{ color: 'var(--accent)' }}>
                        "Aur shayad…<br /> hamara bond wahi sabse zyada strong ho raha tha. ❤️"
                    </p>
                </div>
            </div>

            {/* Floating CSS classes for dreamy effect */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0) rotate(-5deg); }
                    50% { transform: translateY(-20px) rotate(-3deg); }
                }
                @keyframes float-slow-reverse {
                    0%, 100% { transform: translateY(0) rotate(3deg); }
                    50% { transform: translateY(20px) rotate(5deg); }
                }
                .animate-float-slow {
                    animation: float-slow 8s ease-in-out infinite;
                }
                .animate-float-slow-reverse {
                    animation: float-slow-reverse 10s ease-in-out infinite;
                }
            `}} />
        </section>
    );
}
