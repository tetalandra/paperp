import React from 'react';

const AnnouncementTemplate = ({ data }) => {
    const { title, subtitle, date, image, message, variant = 0, location, time, phone, backgroundType, backgroundImage } = data;

    const backgroundStyle = backgroundType === 'image' && backgroundImage ? {
        backgroundImage: `url(${backgroundImage.src || backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    } : {};

    const ImenaBranding = () => (
        <div className="absolute bottom-4 right-4 z-[60] flex items-center gap-2 opacity-30 select-none pointer-events-none grayscale">
            <img src="/imena-logo.svg" alt="Imena" className="h-6 w-auto" />
            <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Designed by Imena</span>
        </div>
    );

    // Variant 5: Annual Gala Dinner
    if (variant === 5) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* OPAQUE MASK: Enhanced coverage for a cleaner look */}
                <div className="absolute top-[8%] bottom-[8%] left-[10%] right-[10%] bg-black/95 z-0 border border-amber-500/10 shadow-[0_0_100px_50px_rgba(0,0,0,0.95)]"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-16 text-center">
                    <div className="mb-4 mt-12 bg-black/80 px-4 py-2 border border-amber-500/20 inline-block">
                        <div className="text-[10px] font-black tracking-[0.5em] text-amber-500 uppercase">{subtitle || "COMPANY NAME"}</div>
                    </div>
                    <div className="text-[8px] tracking-[0.4em] uppercase mb-10 opacity-50 font-bold italic">Requests the honor of your presence</div>

                    <h1 className="text-7xl font-cursive text-amber-400 mb-10 leading-none drop-shadow-2xl" style={{ fontFamily: "'Great Vibes', cursive" }}>
                        {title || "Annual Gala Dinner"}
                    </h1>

                    <div className="flex items-center gap-12 border-y border-white/5 py-8 mb-12 w-full justify-center">
                        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-500">SATURDAY</div>
                        <div className="text-6xl font-serif text-amber-500 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>{date?.split(' ')[1] || "17"}</div>
                        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-500">{time || "6:00 PM"}</div>
                    </div>

                    <div className="space-y-6">
                        <div className="text-[11px] font-black tracking-[0.4em] uppercase text-white shadow-sm inline-block">{location || "THE GRAND BALLROOM"}</div>
                        <p className="text-[10px] opacity-60 tracking-[0.1em] max-w-[280px] leading-relaxed italic mx-auto">"{message || "Join us for an evening of celebration and excellence."}"</p>
                        <div className="w-12 h-[1px] bg-amber-500/40 mx-auto mt-6"></div>
                        <div className="text-[9px] text-amber-500 font-black tracking-[0.3em] uppercase opacity-80">{phone || "R.S.V.P REQUIRED"}</div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 6: Luxury Event
    if (variant === 6) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* OPAQUE MASK: Clears the central invitation text block */}
                <div className="absolute top-[35%] bottom-[10%] left-[25%] right-[25%] bg-black z-0"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-14 text-center">
                    <div className="mt-20 mb-8 w-32 h-[1px] bg-white/20"></div>
                    <h2 className="text-white uppercase tracking-[0.6em] text-base font-black mb-6 drop-shadow-lg">
                        {title?.toUpperCase() || "LUXURY EVENT"}
                    </h2>
                    <h1 className="text-6xl font-cursive mb-12 text-white drop-shadow-xl" style={{ fontFamily: "'Great Vibes', cursive" }}>
                        Invitation
                    </h1>

                    <div className="w-full max-w-xs border-t border-white/10 pt-10">
                        <p className="text-white/60 font-medium text-[11px] leading-relaxed uppercase tracking-[0.2em] italic">
                            {message || "We request the pleasure of your company."}
                        </p>
                    </div>

                    <div className="mt-16 py-2 px-6 border border-white/10 bg-black shadow-2xl">
                        <div className="text-[10px] tracking-[0.6em] font-bold text-white/70 uppercase">
                            {date || "RSVP REQUIRED"}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 7: Grand Opening
    if (variant === 7) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* OPAQUE MASK: Clears the center text while keeping the golden ribbons */}
                <div className="absolute top-[20%] bottom-[20%] left-[20%] right-[20%] bg-black z-0"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-14 text-center">
                    <div className="mb-10 bg-black p-5 border border-amber-500/20 rounded-full shadow-2xl">
                        <div className="text-amber-400 font-cursive text-3xl" style={{ fontFamily: "'Great Vibes', cursive" }}>
                            {subtitle || "Ray's Bistro"}
                        </div>
                    </div>

                    <div className="relative">
                        <h1 className="text-9xl font-black text-amber-500 italic leading-none mb-1 transform scale-y-125" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {title?.split(' ')[0] || "Grand"}
                        </h1>
                        <h2 className="text-4xl font-black tracking-[0.5em] text-white uppercase mb-12">Opening</h2>
                    </div>

                    <div className="flex gap-14 mb-14 bg-black p-6 border border-white/5 shadow-2xl">
                        <div className="text-center">
                            <span className="block text-[9px] font-black uppercase tracking-widest text-amber-500 mb-2">DATE:</span>
                            <span className="text-3xl font-black tracking-tighter">{date || "31st"}</span>
                        </div>
                        <div className="w-[1px] h-12 bg-white/20"></div>
                        <div className="text-center">
                            <span className="block text-[9px] font-black uppercase tracking-widest text-amber-500 mb-2">TIME:</span>
                            <span className="text-3xl font-black tracking-tighter">{time || "4pm"}</span>
                        </div>
                    </div>

                    <p className="max-w-[250px] text-[10px] font-bold tracking-[0.2em] italic text-gray-500 mb-6 leading-relaxed">
                        {location}
                    </p>

                    <div className="text-amber-400 text-xs font-black tracking-[0.3em] border-t border-amber-500/10 pt-4 w-full max-w-[200px]">
                        {phone || "R.S.V.P"}
                    </div>
                </div>
            </div>
        );
    }

    // Default / Fallback
    return (
        <div className="relative w-full h-full bg-black text-white flex flex-col items-center justify-center p-12 text-center" style={backgroundStyle}>
            <ImenaBranding />
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
            <div className="relative z-10 border border-white/10 p-12 bg-black/80">
                <div className="w-12 h-1 bg-amber-500 mb-8 mx-auto"></div>
                <h1 className="text-3xl font-black tracking-[0.4em] uppercase mb-6">{title || "Notice"}</h1>
                <p className="text-sm font-medium tracking-[0.2em] text-white/60 mb-10 max-w-xs">{message || "You are cordially invited."}</p>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] border-t border-white/10 pt-8">
                    {date} • {location}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementTemplate;
