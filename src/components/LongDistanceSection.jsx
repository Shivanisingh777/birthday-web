import { useReveal } from '../hooks/useReveal';

const OCEAN_URL = 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80';

export default function LongDistanceSection() {
    const ref = useReveal();

    return (
        <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
            {/* Parallax background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url('${OCEAN_URL}')` }}
            />
            <div className="absolute inset-0 bg-black/65" />

            <div
                ref={ref}
                className="reveal-up relative z-10 max-w-3xl text-center space-y-6"
            >
                <span
                    className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border"
                    style={{
                        color: 'var(--accent)',
                        borderColor: 'rgba(226,180,154,0.4)',
                        background: 'rgba(0,0,0,0.5)',
                    }}
                >
                    🌍 The Distance Phase
                </span>

                <h2 className="text-4xl md:text-5xl font-black leading-tight">
                    "Distance sirf kilometers ka tha…{' '}
                    <span style={{ color: 'var(--accent)' }}>Dil kabhi door nahi hue.</span>"
                </h2>

                <div className="space-y-4 text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    <p>Ek din zindagi ne hume alag shehron hi nahi… alag countries mein la khada kiya.</p>

                    <div
                        className="flex flex-col sm:flex-row justify-center gap-8 py-6 my-4 rounded-2xl border"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            backdropFilter: 'blur(10px)',
                            borderColor: 'rgba(255,255,255,0.08)',
                        }}
                    >
                        <div className="text-center">
                            <div className="text-3xl mb-2">🇮🇳</div>
                            <p className="font-semibold text-white">Main</p>
                            <p style={{ color: 'var(--accent)' }}>Patna, India</p>
                        </div>
                        <div className="flex items-center text-white/30 text-4xl font-light">
                            ···
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">🇧🇪</div>
                            <p className="font-semibold text-white">Tum</p>
                            <p style={{ color: 'var(--accent)' }}>Belgium</p>
                        </div>
                    </div>

                    <p>Merchant Navy ki job, samundar ke beech… Phir software developer ban kar ek naye safar par.</p>
                    <p className="text-xl font-semibold" style={{ color: 'var(--accent)' }}>
                        Time zones alag the, schedules alag the… Par ek cheez same thi —
                        Hum dono ka ek dusre ke liye pyaar.
                    </p>
                </div>
            </div>
        </section>
    );
}
