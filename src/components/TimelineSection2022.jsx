import { useReveal } from '../hooks/useReveal';

const TIMELINE_EVENTS = [
    {
        title: "The Tough Phase",
        description: "2022 started with challenges that tested us in ways we hadn't imagined. Personal struggles and the weight of the world felt heavy, but it was in this darkness that our bond found its truest light.",
        image: "/images/image4.jpeg",
        tone: "cool"
    },
    {
        title: "Emotional Anchor",
        description: "Mujhe yaad hai woh pal jab sab kuch bikhar raha tha, tum mere saath khade rahe. Bina kisi condition ke, bina kisi darr ke. You weren't just my partner; you became my strength.",
        image: "/images/image5.jpeg",
        tone: "cool"
    },
    {
        title: "The Reunion",
        description: "And then, in the middle of all that chaos, we finally met. 2022 brought us back together, face to face. No screens, no distance—just us in the same space, breathing the same air.",
        image: "/images/image6.jpeg",
        tone: "warm",
        rotate: 270
    },
    {
        title: "Meaningful Moments",
        description: "We spent days just talking, walk pe jaana, aur ek dusre ki presence ko appreciate karna. Woh waqt sirf ghoomne ka nahi tha, woh hume heal karne ka waqt tha.",
        image: "/images/image7.jpeg",
        tone: "warm",
        rotate: 270
    },
    {
        title: "Supportive Partnership",
        description: "Humne seekha ki life hamesha perfect nahi hogi, par agar hum saath hain, toh har mushkil chhoti lagti hai. Our love matured into a partnership that could weather any storm.",
        image: "/images/image8.jpeg",
        tone: "warm"
    },
    {
        title: "Stronger",
        description: "Aur phir hume apne apne safar ke liye nikalna tha. Thoda heavy tha. Par is baar hum toot nahi rahe the.",
        image: "/images/image9.jpeg",
        tone: "cool"
    },
    {
        title: "Departing Again",
        description: "Dobaara door jaana mushkil tha, par is baar dukh nahi tha. Ek garv tha. Merchant Navy aur Software Developer—do alag duniya, par ek hi dil. Until we meet again. ❤️",
        image: "/images/image10.jpeg",
        tone: "cool"
    }
];

export default function TimelineSection2022() {
    const sectionRef = useReveal();

    return (
        <section className="relative py-32 px-6 bg-[#0a0a0a] overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div ref={sectionRef} className="text-center mb-24 reveal-up">
                    <span
                        className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest border uppercase mb-6"
                        style={{
                            color: 'var(--accent)',
                            borderColor: 'rgba(226, 180, 154, 0.4)',
                            background: 'rgba(226, 180, 154, 0.08)',
                        }}
                    >
                        Timeline 2022
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif italic text-white">
                        "When You Became My Strength"
                    </h2>
                </div>

                {/* Vertical Timeline Container */}
                <div className="relative">
                    {/* Central Vertical Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

                    <div className="space-y-24 md:space-y-48">
                        {TIMELINE_EVENTS.map((event, index) => (
                            <TimelineItem
                                key={index}
                                event={event}
                                index={index}
                                isLast={index === TIMELINE_EVENTS.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ event, index, isLast }) {
    const itemRef = useReveal();
    const isEven = index % 2 === 0;

    return (
        <div
            ref={itemRef}
            className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 reveal-up ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            {/* Image Side */}
            <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative group">
                    <div
                        className="absolute -inset-2 rounded-[2rem] blur-xl transition-all duration-700 opacity-0 group-hover:opacity-30"
                        style={{ background: event.tone === 'warm' ? 'var(--accent)' : '#60a5fa' }}
                    />
                    <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl border border-white/5 w-full max-w-[400px] aspect-square">
                        <img
                            src={event.image}
                            alt={event.title}
                            className={`w-full h-full object-cover transition-all duration-1000 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105`}
                            style={{
                                filter: event.tone === 'warm'
                                    ? 'sepia(10%) contrast(1.05)'
                                    : 'saturate(0.8) contrast(1.1)',
                                transform: event.rotate ? `rotate(${event.rotate}deg)` : 'none'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Timeline Dot (Desktop only) */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-white/20 bg-[#0a0a0a] z-10 hidden md:block">
                <div
                    className="absolute inset-1 rounded-full animate-pulse"
                    style={{ background: event.tone === 'warm' ? 'var(--accent)' : '#60a5fa' }}
                />
            </div>

            {/* Text Side */}
            <div className={`w-full md:w-1/2 space-y-4 text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                <h3 className="text-2xl md:text-3xl font-serif text-white/90">
                    {event.title}
                </h3>
                <p className="text-lg text-white/60 leading-relaxed font-light">
                    {event.description}
                </p>
                {/* Mobile line indicator */}
                {!isLast && (
                    <div className="w-px h-12 bg-white/10 mx-auto mt-8 md:hidden" />
                )}
            </div>
        </div>
    );
}
