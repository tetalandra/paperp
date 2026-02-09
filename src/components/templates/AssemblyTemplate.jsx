import React from 'react';
import brandLogo from '@/assets/brand-logo.png';

const AssemblyTemplate = ({ data }) => {
    const { title, subtitle, date, time, location, message, variant = 1, backgroundImage } = data;

    const ImenaBranding = () => (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-1.5 opacity-60 select-none pointer-events-none hover:opacity-100 transition-opacity">
            <img src={brandLogo.src || brandLogo} alt="Imena" crossOrigin="anonymous" className="h-7 w-auto drop-shadow-lg" />
            <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.3em] whitespace-nowrap">Designed by Imena</span>
        </div>
    );

    // Variant 3: Tuesday Session (Emerald / Social theme)
    if (variant === 3) {
        return (
            <div className="relative w-full h-full bg-[#0a1a0a] text-white flex flex-col items-center justify-center p-12 overflow-hidden font-sans" style={backgroundImage ? { backgroundImage: `url(${backgroundImage.src || backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                <ImenaBranding />

                {/* Visual Depth Overlay */}
                {!backgroundImage && (
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#10b981_0,transparent_50%)]"></div>
                    </div>
                )}

                <div className="relative z-10 w-full flex flex-col items-center text-center">
                    <div className="mb-6 bg-brand-gold/10 px-6 py-1 rounded-full border border-brand-gold/20 backdrop-blur-sm">
                        <span className="text-[10px] font-black tracking-[0.5em] text-brand-gold uppercase">Weekly Assembly</span>
                    </div>

                    <h1 className="text-5xl font-black uppercase tracking-tighter mb-2 text-brand-gold" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Tuesday
                    </h1>
                    <h2 className="text-2xl font-bold tracking-[0.3em] text-brand-gold uppercase mb-8">Session</h2>

                    <div className="w-full max-w-sm mb-10 bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-2xl">
                        <h3 className="text-brand-gold font-bold text-xl mb-4 italic">{title || "Mid-Week Briefing"}</h3>
                        <p className="text-white/60 text-xs mb-8 leading-relaxed uppercase tracking-wider">{message || "Corporate updates and strategy alignment session."}</p>

                        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                            <div>
                                <span className="block text-[8px] text-brand-gold mb-1 font-black uppercase tracking-widest">Time</span>
                                <span className="text-sm font-bold">{time || "9:00 AM"}</span>
                            </div>
                            <div>
                                <span className="block text-[8px] text-brand-gold mb-1 font-black uppercase tracking-widest">Room</span>
                                <span className="text-sm font-bold truncate block">{location || "Executive Suite"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 4: Saturday Session (Ocean / Night theme)
    if (variant === 4) {
        return (
            <div className="relative w-full h-full bg-[#0a0a1a] text-white flex flex-col items-center justify-center p-12 overflow-hidden font-sans" style={backgroundImage ? { backgroundImage: `url(${backgroundImage.src || backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                <ImenaBranding />

                {/* Cinematic Depth Overlay */}
                {!backgroundImage && (
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#2563EB_0,transparent_50%)]"></div>
                    </div>
                )}

                <div className="relative z-10 w-full flex flex-col items-center text-center">
                    <div className="mb-6 bg-brand-blue/10 px-6 py-1 rounded-full border border-brand-blue/20 backdrop-blur-sm">
                        <span className="text-[10px] font-black tracking-[0.5em] text-brand-blue uppercase">Weekend Forum</span>
                    </div>

                    <h1 className="text-5xl font-black uppercase tracking-tighter mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Saturday
                    </h1>
                    <h2 className="text-2xl font-bold tracking-[0.3em] text-brand-blue uppercase mb-8">Session</h2>

                    <div className="w-full max-w-sm mb-10 bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-2xl">
                        <h3 className="text-brand-blue font-bold text-xl mb-4 italic">{title || "Visionary Workshop"}</h3>
                        <p className="text-white/60 text-xs mb-8 leading-relaxed uppercase tracking-wider">{message || "A deep dive into upcoming projects and collaborative brainstorming."}</p>

                        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                            <div>
                                <span className="block text-[8px] text-brand-blue mb-1 font-black uppercase tracking-widest">Time</span>
                                <span className="text-sm font-bold">{time || "2:00 PM"}</span>
                            </div>
                            <div>
                                <span className="block text-[8px] text-brand-blue mb-1 font-black uppercase tracking-widest">Hall</span>
                                <span className="text-sm font-bold truncate block">{location || "Grand Gallery"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default / Fallback (Luxury Stage is usually default, but good to have)
    return (
        <div className="relative w-full h-full bg-neutral-900 text-white flex flex-col items-center justify-center p-12 text-center">
            <ImenaBranding />
            <div className="border-4 border-white/10 p-10 h-full w-full flex flex-col items-center justify-center bg-black/40">
                <span className="text-[10px] font-black uppercase tracking-[1em] opacity-30 mb-8">Assembly</span>
                <h1 className="text-4xl font-serif italic mb-6">{title || "Event Name"}</h1>
                <p className="text-[9px] font-black tracking-[0.4em] uppercase opacity-70 border-y border-white/10 py-6 w-full">{date}</p>
                <p className="text-xs mt-8 italic opacity-50">{location}</p>
            </div>
        </div>
    );
};

export default AssemblyTemplate;
