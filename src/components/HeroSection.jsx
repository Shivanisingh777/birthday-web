import { useEffect, useRef, useState, useCallback } from 'react';

// ── 22 real collage photos from /public/images/collage ─────────────────────
const PHOTOS = [
    // ── large anchors ──────────────────────────────────────────────────────
    { id: 1, url: 'images/collage/collage22.jpeg', t: 28, l: 36, w: 22, r: 0, z: 8, fd: 7, fdy: 0, warm: true },
    { id: 2, url: 'images/collage/collage21.jpeg', t: 18, l: 12, w: 18, r: -5, z: 6, fd: 9, fdy: 0.8, warm: true },
    { id: 3, url: 'images/collage/collage18.jpeg', t: 20, l: 64, w: 17, r: 6, z: 6, fd: 8, fdy: 1.2, warm: true },
    // ── medium cards ───────────────────────────────────────────────────────
    { id: 4, url: 'images/collage/collage17.jpeg', t: 52, l: 8, w: 14, r: -7, z: 5, fd: 10, fdy: 0.5, warm: false },
    { id: 5, url: 'images/collage/collage9.jpeg', t: 55, l: 70, w: 14, r: 7, z: 5, fd: 11, fdy: 0.3, warm: true },
    { id: 6, url: 'images/collage/collage12.jpeg', t: 5, l: 28, w: 13, r: 4, z: 4, fd: 9, fdy: 0.9, warm: false },
    { id: 7, url: 'images/collage/collage3.jpeg', t: 7, l: 55, w: 13, r: -6, z: 4, fd: 12, fdy: 0.2, warm: false },
    { id: 8, url: 'images/collage/collage5.jpeg', t: 60, l: 42, w: 13, r: 3, z: 5, fd: 8, fdy: 1.5, warm: true },
    { id: 9, url: 'images/collage/collage16.jpeg', t: 38, l: 76, w: 12, r: -4, z: 4, fd: 10, fdy: 0.7, warm: false },
    { id: 10, url: 'images/collage/collage2.jpeg', t: 40, l: 2, w: 12, r: 5, z: 4, fd: 11, fdy: 0.4, warm: false },
    // ── small accent cards ─────────────────────────────────────────────────
    { id: 11, url: 'images/collage/collage6.jpeg', t: 2, l: 76, w: 10, r: 8, z: 3, fd: 13, fdy: 1.0, warm: false },
    { id: 12, url: 'images/collage/collage4.jpeg', t: 1, l: 4, w: 10, r: -8, z: 3, fd: 14, fdy: 0.6, warm: false },
    { id: 13, url: 'images/collage/collage19.jpeg', t: 72, l: 18, w: 10, r: 6, z: 3, fd: 12, fdy: 1.1, warm: false },
    { id: 14, url: 'images/collage/collage7.jpeg', t: 73, l: 60, w: 10, r: -5, z: 3, fd: 9, fdy: 0.8, warm: false },
    { id: 15, url: 'images/collage/collage11.jpeg', t: 22, l: 88, w: 9, r: 7, z: 2, fd: 15, fdy: 0.2, warm: false },
    { id: 16, url: 'images/collage/collage13.jpeg', t: 48, l: 90, w: 9, r: -3, z: 2, fd: 10, fdy: 1.3, warm: false },
    { id: 17, url: 'images/collage/collage20.jpeg', t: 80, l: 78, w: 9, r: 5, z: 2, fd: 13, fdy: 0.5, warm: false },
    { id: 18, url: 'images/collage/collage1.jpeg', t: 82, l: 2, w: 9, r: -6, z: 2, fd: 11, fdy: 0.9, warm: false },
    { id: 19, url: 'images/collage/collage8.jpeg', t: 85, l: 38, w: 8, r: 2, z: 2, fd: 14, fdy: 0.4, warm: false },
    { id: 20, url: 'images/collage/collage10.jpeg', t: 10, l: 44, w: 8, r: -2, z: 3, fd: 16, fdy: 0.3, warm: false },
    { id: 21, url: 'images/collage/collage14.jpeg', t: 65, l: 88, w: 8, r: 5, z: 2, fd: 12, fdy: 1.2, warm: false },
    { id: 22, url: 'images/collage/collage15.jpeg', t: 90, l: 55, w: 7, r: -4, z: 2, fd: 15, fdy: 0.6, warm: false },
];

// Torn paper clip‑path pool
const CLIPS = [
    'polygon(2% 1%,97% 0%,100% 3%,99% 97%,100% 100%,2% 99%,0% 97%,1% 3%)',
    'polygon(1% 2%,98% 0%,100% 4%,97% 98%,99% 100%,3% 100%,0% 96%,2% 4%)',
    'polygon(3% 0%,100% 1%,98% 5%,100% 96%,97% 100%,1% 99%,0% 95%,1% 2%)',
    'polygon(0% 2%,96% 0%,100% 2%,99% 98%,100% 100%,4% 100%,0% 98%,2% 3%)',
];

// Inject per‑photo floating keyframes once
function injectKeyframes() {
    if (document.getElementById('hero-kf')) return;
    const rules = PHOTOS.map(p => `
    @keyframes hfloat${p.id} {
      0%,100% { transform: translateY(0px) rotate(${p.r}deg); }
      50% { transform: translateY(-${6 + (p.id % 5)}px) rotate(${p.r + (p.id % 2 === 0 ? 0.6 : -0.6)}deg); }
    }
  `).join('\n');
    const style = document.createElement('style');
    style.id = 'hero-kf';
    style.textContent = rules;
    document.head.appendChild(style);
}

// ── Dust particle canvas ───────────────────────────────────────────────────
function Particles() {
    const ref = useRef(null);
    useEffect(() => {
        const c = ref.current; if (!c) return;
        const ctx = c.getContext('2d');
        let raf, W = (c.width = c.offsetWidth), H = (c.height = c.offsetHeight);
        const pts = Array.from({ length: 80 }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            r: Math.random() * 1.3 + 0.2,
            vx: (Math.random() - 0.5) * 0.15,
            vy: -(Math.random() * 0.22 + 0.04),
            a: Math.random() * 0.4 + 0.06,
        }));
        const tick = () => {
            ctx.clearRect(0, 0, W, H);
            pts.forEach(p => {
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${p.a})`; ctx.fill();
                p.x += p.vx; p.y += p.vy;
                if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
                if (p.x < -4) p.x = W + 4; if (p.x > W + 4) p.x = -4;
            });
            raf = requestAnimationFrame(tick);
        };
        tick();
        const onResize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
        window.addEventListener('resize', onResize);
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
    }, []);
    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }} />;
}

// ── Main Hero ──────────────────────────────────────────────────────────────
export default function HeroSection() {
    const [hovered, setHovered] = useState(false); // desktop hover
    const [revealed, setRevealed] = useState(false); // mobile tap
    const [isMobile, setIsMobile] = useState(false);
    const [px, setPx] = useState(0);
    const [py, setPy] = useState(0);
    const [lineW, setLineW] = useState(0);
    const secRef = useRef(null);

    useEffect(() => {
        injectKeyframes();
        const mql = window.matchMedia('(max-width: 768px)');
        setIsMobile(mql.matches);
        const handler = (e) => setIsMobile(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    const active = hovered || revealed;

    useEffect(() => {
        if (active) setTimeout(() => setLineW(72), 400);
        else setLineW(0);
    }, [active]);

    const onMouseMove = useCallback((e) => {
        if (isMobile) return;
        const rect = secRef.current?.getBoundingClientRect(); if (!rect) return;
        setPx(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 18);
        setPy(((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 12);
    }, [isMobile]);

    const onMouseLeave = useCallback(() => {
        if (isMobile) return;
        setHovered(false); setPx(0); setPy(0);
    }, [isMobile]);

    return (
        <section
            ref={secRef}
            id="hero"
            className="relative w-full overflow-hidden cursor-pointer select-none"
            style={{ minHeight: '100svh', background: '#0f0f0f' }}
            onMouseMove={onMouseMove}
            onMouseEnter={() => { if (!isMobile) setHovered(true); }}
            onMouseLeave={onMouseLeave}
            onClick={() => { if (isMobile) setRevealed(v => !v); }}
            aria-label="Hero section – hover or tap to reveal"
        >
            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0) 20%, rgba(0,0,0,0.94) 100%)' }} />

            {/* Grain */}
            <div className="absolute inset-0 pointer-events-none" style={{
                zIndex: 2, opacity: 0.055,
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundSize: '180px 180px'
            }} />

            {/* Particles */}
            <Particles />

            {/* ── 22 floating scrapbook photos ── */}
            {PHOTOS.map((p, i) => {
                const depth = 0.3 + (p.z / 10) * 0.8; // stronger parallax for higher z
                const tx = px * depth;
                const ty = py * depth;

                // Mobile Optimization: Pull towards center and increase size
                const finalW = isMobile ? p.w * 1.35 : p.w;
                const finalT = isMobile ? (p.t - 45) * 0.7 + 45 : p.t;
                const finalL = isMobile ? (p.l - 50) * 0.7 + 50 : p.l;
                const finalR = isMobile ? (p.r * 0.6) : p.r; // gentler rotation on mobile

                return (
                    <div
                        key={p.id}
                        className="absolute"
                        style={{
                            top: `${finalT}%`,
                            left: `${finalL}%`,
                            width: `${finalW}vw`,
                            zIndex: p.z + 12,
                            // floating anim (use rotation based on finalR)
                            animation: `hfloat${p.id} ${p.fd}s ease-in-out ${p.fdy}s infinite`,
                            // parallax offset + mobile centering
                            transform: isMobile
                                ? `translate(${tx}px, ${ty}px) translate(-50%, -50%)`
                                : `translate(${tx}px, ${ty}px)`,
                            transition: 'filter 1.0s ease, transform 0.08s linear, box-shadow 0.6s ease',
                            filter: active && p.warm
                                ? 'grayscale(0%) sepia(25%) brightness(1.08) contrast(0.95)'
                                : 'grayscale(100%) brightness(0.82)',
                            boxShadow: active
                                ? `0 ${12 + p.z * 4}px ${40 + p.z * 12}px rgba(0,0,0,0.9)`
                                : `0 ${8 + p.z * 3}px ${24 + p.z * 8}px rgba(0,0,0,0.75)`,
                        }}
                    >
                        <img
                            src={p.url}
                            alt=""
                            aria-hidden="true"
                            loading={i < 4 ? 'eager' : 'lazy'}
                            decoding="async"
                            style={{
                                display: 'block',
                                width: '100%',
                                aspectRatio: i % 5 === 0 ? '2/3' : '3/4',
                                objectFit: 'cover',
                                clipPath: CLIPS[p.id % CLIPS.length],
                                transition: 'transform 0.7s cubic-bezier(.16,1,.3,1)',
                                transform: active ? `scale(${p.z >= 6 ? 1.06 : 1.03}) rotate(${finalR}deg)` : `scale(1) rotate(${finalR}deg)`,
                            }}
                        />
                    </div>
                );
            })}

            {/* Gradient overlays – top & bottom fade */}
            <div className="absolute inset-0 pointer-events-none" style={{
                zIndex: 20,
                background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.65) 100%)'
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
                zIndex: 20,
                background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.72) 100%)'
            }} />

            {/* Darkness overlay on hover */}
            <div className="absolute inset-0 pointer-events-none" style={{
                zIndex: 21,
                background: 'rgba(0,0,0,0.28)',
                opacity: active ? 1 : 0,
                transition: 'opacity 0.8s ease',
            }} />

            {/* Torn bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ zIndex: 22 }}>
                <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,0 L0,44 Q48,62 96,40 Q144,18 192,44 Q240,64 288,46 Q336,28 384,52 Q432,64 480,42 Q528,22 576,50 Q624,64 672,44 Q720,24 768,50 Q816,64 864,44 Q912,24 960,52 Q1008,64 1056,44 Q1104,22 1152,50 Q1200,64 1248,42 Q1296,20 1344,48 L1440,48 L1440,0 Z"
                        fill="#0f0f0f" />
                </svg>
            </div>

            {/* ── Overlay content ── */}
            <div
                className="absolute inset-0 flex flex-col justify-end items-center pb-14 md:pb-20 px-6"
                style={{ zIndex: 30, pointerEvents: 'none' }}
            >
                {/* Top "SINCE 2017" tag */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4"
                    style={{ opacity: active ? 1 : 0, transform: active ? 'translate(-50%,0)' : 'translate(-50%,-14px)', transition: 'all 0.8s cubic-bezier(.16,1,.3,1)' }}>
                    <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.22)' }} />
                    <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.62rem', letterSpacing: '5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>SINCE 2017</span>
                    <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.22)' }} />
                </div>

                {/* Main content block */}
                <div className="text-center"
                    style={{ opacity: active ? 1 : 0, transform: active ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.9s cubic-bezier(.16,1,.3,1) 0.1s' }}>

                    <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 'clamp(0.6rem,1.1vw,0.73rem)', letterSpacing: '5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.36)', marginBottom: '1.1rem' }}>
                        9 March – The day my favorite person was born
                    </p>

                    <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(2.8rem,7vw,7rem)', fontWeight: 300, lineHeight: 1.07, color: '#fff', textShadow: '0 6px 50px rgba(0,0,0,0.85)', letterSpacing: '-0.5px' }}>
                        From 2017<br /><em>to Forever</em>
                    </h1>

                    {/* animated rule */}
                    <div className="mx-auto my-6 h-px" style={{ width: `${lineW}px`, background: 'linear-gradient(to right,transparent,rgba(255,220,175,0.65),transparent)', transition: 'width 0.9s ease 0.3s' }} />

                    {/* CTA */}
                    <a
                        href="#story"
                        onClick={e => e.stopPropagation()}
                        style={{
                            pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: '10px',
                            fontFamily: 'Inter,sans-serif', fontSize: '0.68rem', letterSpacing: '3.5px', textTransform: 'uppercase', color: '#fff',
                            border: '1px solid rgba(255,255,255,0.22)', padding: '12px 34px', borderRadius: '2px',
                            background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', textDecoration: 'none',
                            transition: 'all 0.45s ease'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 28px 4px rgba(255,196,130,0.22),0 0 0 1px rgba(255,196,130,0.42)'; e.currentTarget.style.borderColor = 'rgba(255,196,130,0.5)'; e.currentTarget.style.background = 'rgba(255,196,130,0.07)'; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                    >
                        Open Our Story
                        <svg width="13" height="9" viewBox="0 0 13 9" fill="none" style={{ transition: 'transform 0.3s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateX(3px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
                            <path d="M8 1L12.5 4.5L8 8M0.5 4.5H12.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

                {/* Mobile hint */}
                <p className="absolute bottom-5 left-1/2 -translate-x-1/2 md:hidden"
                    style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', opacity: revealed ? 0 : 1, transition: 'opacity 0.5s' }}>
                    Tap to reveal
                </p>
            </div>

            {/* Desktop hover hint */}
            {!hovered && (
                <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none" style={{ zIndex: 30 }}>
                    <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.16)' }}>
                        hover to reveal
                    </p>
                </div>
            )}
        </section>
    );
}
