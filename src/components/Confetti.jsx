import { useEffect, useRef } from 'react';

export default function Confetti() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const colors = ['#e2b49a', '#d32f2f', '#fff', '#ffd700', '#ff69b4'];
        const confettiPieces = [];

        for (let i = 0; i < 60; i++) {
            const el = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 4;
            el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        left: ${Math.random() * 100}%;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        opacity: ${Math.random() * 0.7 + 0.3};
        animation: confettiFall ${Math.random() * 4 + 3}s linear ${Math.random() * 5}s infinite;
      `;
            container.appendChild(el);
            confettiPieces.push(el);
        }

        return () => confettiPieces.forEach(el => el.remove());
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        />
    );
}
