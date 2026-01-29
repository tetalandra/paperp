import React from 'react';

const AnnouncementTemplate = ({ data }) => {
    const { title, subtitle, date, time, location, phone, image, message, variant = 1 } = data;

    // Variant 1: Official Board
    if (variant === 1) {
        return (
            <div className="relative w-full h-full bg-neutral-950 flex flex-col items-center p-8 border-[12px] border-neutral-900 border-double outline outline-1 outline-amber-500">
                <div className="w-full bg-amber-600 py-3 text-center mb-10 shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 skew-x-[-20deg] translate-x-[-100%] hover:translate-x-[200%] transition-transform duration-1000"></div>
                    <p className="text-black font-black tracking-[0.5em] uppercase text-xs">Official Announcement</p>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center w-full px-4 text-center">
                    <h1 className="font-serif text-4xl text-white mb-2 tracking-wide font-bold uppercase">
                        {title || "Urgent"}
                    </h1>
                    <h2 className="font-serif italic text-5xl text-amber-400 mb-8">
                        {subtitle || "Notice"}
                    </h2>

                    {image && (
                        <div className="w-full h-40 mb-8 rounded-lg overflow-hidden border-2 border-amber-900/50 grayscale hover:grayscale-0 transition-all duration-700">
                            <img src={image} alt="Announcement" className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="w-16 h-1 bg-amber-600 mb-8 rounded-full"></div>

                    <p className="font-serif text-base text-neutral-400 leading-relaxed max-w-sm mb-8">
                        {message || "Important updates following our recent deliberations. Please review for compliance."}
                    </p>

                    <div className="w-full border-t border-b border-neutral-800 py-6 mb-8 bg-neutral-900/40">
                        <div className="space-y-2">
                            <p className="text-amber-200 font-serif text-sm"><span className="text-amber-600 font-bold mr-2 uppercase text-[10px]">When:</span> {date} {time && `at ${time}`}</p>
                            <p className="text-amber-200 font-serif text-sm"><span className="text-amber-600 font-bold mr-2 uppercase text-[10px]">Where:</span> {location}</p>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-between items-end border-t border-amber-900/30 pt-4">
                    <div className="text-left">
                        <p className="text-[9px] text-neutral-600 uppercase tracking-widest font-bold">Authorized By Board</p>
                    </div>
                    <div className="text-right">
                        <p className="text-amber-500 font-mono text-[10px]">{phone}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 2: Bold News (Newsletter style)
    if (variant === 2) {
        return (
            <div className="relative w-full h-full bg-white flex flex-col p-8 overflow-hidden font-sans">
                {/* News Header */}
                <div className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end">
                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">THE BULLETIN</h2>
                    <p className="text-[10px] font-bold text-neutral-500 text-right">{date || "VOL. 24"}</p>
                </div>

                <div className="flex-1 flex flex-col">
                    <h1 className="text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                        {title || "Special"} <br />
                        <span className="text-neutral-500">{subtitle || "Edition"}</span>
                    </h1>

                    {image && (
                        <div className="w-full h-48 bg-neutral-100 mb-6 relative group overflow-hidden">
                            <img src={image} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute bottom-2 left-2 bg-black text-white px-2 py-1 text-[8px] font-bold tracking-widest uppercase">LATEST STORY</div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-8 flex-1">
                        <div className="border-r border-neutral-200 pr-4">
                            <p className="text-xs font-bold uppercase mb-3 tracking-widest text-neutral-400">Headlines</p>
                            <p className="text-sm font-medium leading-relaxed text-neutral-800">
                                {message || "Groundbreaking developments that change everything we thought we knew about our community."}
                            </p>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1 italic">Location</p>
                                    <p className="text-xs font-bold">{location || "Central Plaza"}</p>
                                </div>
                                {time && (
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1 italic">Time</p>
                                        <p className="text-xs font-bold">{time}</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 pt-4 border-t border-dotted border-neutral-300">
                                <p className="text-[10px] font-bold">{phone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="w-full bg-black h-[1px]"></div>
                </div>
            </div>
        );
    }

    return null;
};

export default AnnouncementTemplate;
