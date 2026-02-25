export default function Footer() {
    return (
        <footer
            className="py-14 text-center px-6"
            style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
            <div className="space-y-3">
                <p
                    className="text-2xl md:text-3xl font-bold tracking-wider"
                    style={{ color: 'var(--accent)' }}
                >
                    "From 2017… To 9 March… To Forever." ❤️
                </p>
                <p className="text-xs tracking-[4px] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    Made with love, just for you
                </p>
            </div>
        </footer>
    );
}
