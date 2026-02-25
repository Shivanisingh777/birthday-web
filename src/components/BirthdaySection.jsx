import { useReveal } from '../hooks/useReveal';
import Confetti from './Confetti';

export default function BirthdaySection() {
    const ref = useReveal();

    return (
        <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #1a0707 50%, #0d0d0d 100%)' }}
        >
            <Confetti />

            {/* Glowing orbs */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full -top-40 -left-40 opacity-10 blur-[120px]"
                style={{ background: 'var(--highlight)' }}
            />
            <div
                className="absolute w-[400px] h-[400px] rounded-full -bottom-20 -right-20 opacity-10 blur-[100px]"
                style={{ background: 'var(--accent)' }}
            />

            <div
                ref={ref}
                className="reveal-up relative z-10 text-center max-w-3xl mx-auto space-y-8"
            >
                {/* Card */}
                <div
                    className="rounded-3xl p-10 md:p-16 border space-y-8"
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(20px)',
                        borderColor: 'rgba(226,180,154,0.2)',
                        boxShadow: '0 0 80px rgba(211,47,47,0.1)',
                    }}
                >
                    <div className="flex justify-center mb-6">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#e2b49a]/30 shadow-2xl animate-heartbeat">
                            <img src="images/airport.jpeg" alt="Special moment" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div>
                        <span
                            className="text-sm font-bold tracking-[6px] uppercase block mb-3"
                            style={{ color: 'var(--accent)' }}
                        >
                            9 March
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black leading-tight animate-shimmer">
                            Happy Birthday My Forever ❤️
                        </h1>
                    </div>

                    <div className="space-y-5 text-base md:text-lg" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        <p>"Woh din jis din duniya ko tum mile the, aur kuch saalon baad mujhe."</p>
                        <p>
                            "Main har saal tumhara birthday celebrate karti hoon,{' '}
                            <span className="font-semibold text-white">chahe tum paas ho ya hazaron kilometers door.</span>"
                        </p>
                        <p
                            className="text-lg md:text-xl italic font-medium"
                            style={{ color: 'var(--accent)' }}
                        >
                            "Meri dua hai — tumhara har sapna poora ho, tumhara har din successful ho,
                            aur tumhari har muskaan hamesha meri wajah se ho."
                        </p>
                    </div>

                    {/* Permanent stamp */}
                    <div
                        className="pt-6 border-t text-xl md:text-2xl font-bold text-white"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                    >
                        "Distance temporary hai… Par{' '}
                        <span style={{ color: 'var(--accent)' }}>hum permanent hain.</span>"
                    </div>

                    {/* Stars */}
                    <div className="flex justify-center gap-3">
                        {['✦', '✦', '✦', '✦', '✦'].map((s, i) => (
                            <span
                                key={i}
                                className="text-sm"
                                style={{
                                    color: 'var(--accent)',
                                    animation: `sparkle ${1 + i * 0.3}s ease-in-out infinite`,
                                }}
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
