import { useEffect, useState } from 'react';

export default function ProgressBar() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setWidth(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-50">
            <div
                className="h-full transition-all duration-75"
                style={{
                    width: `${width}%`,
                    background: 'linear-gradient(to right, #e2b49a, #d32f2f)',
                }}
            />
        </div>
    );
}
