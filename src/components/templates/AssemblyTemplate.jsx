import React from 'react';

const AssemblyTemplate = ({ data }) => {
    const { title, subtitle, date, time, location, image, message, variant = 1 } = data;

    // Variant 1: Luxury Show (Previous) - Enhanced
    if (variant === 1) {
        return (
            <div className="relative w-full h-full bg-neutral-950 overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute inset-0 flex pointer-events-none z-0">
                    <div className="w-1/2 h-full bg-gradient-to-r from-black via-neutral-900 to-black relative shadow-[10px_0_50px_rgba(0,0,0,0.8)]">
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(255,255,255,0.05)_50%,rgba(0,0,0,0.8)_100%)] bg-[length:20%_100%] opacity-40"></div>
                    </div>
                    <div className="w-1/2 h-full bg-gradient-to-l from-black via-neutral-900 to-black relative shadow-[-10px_0_50px_rgba(0,0,0,0.8)]">
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(255,255,255,0.05)_50%,rgba(0,0,0,0.8)_100%)] bg-[length:20%_100%] opacity-40"></div>
                    </div>
                </div>

                <div className="relative z-10 w-[380px] h-[380px] bg-gradient-to-br from-neutral-200 via-neutral-400 to-neutral-600 rounded-full p-[2px] shadow-[0_0_80px_rgba(255,255,255,0.1)]">
                    <div className="w-full h-full bg-black rounded-full border-4 border-neutral-700 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
                        <div className="absolute inset-2 border border-neutral-800 rounded-full"></div>
                        <div className="absolute top-[10%] opacity-20 text-6xl text-neutral-400">♛</div>

                        {image && (
                            <div className="absolute inset-0 opacity-30">
                                <img src={image} alt="Background" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60"></div>
                            </div>
                        )}

                        <div className="relative z-10">
                            <h2 className="font-serif text-white text-3xl tracking-[0.2em] font-light mb-1 mt-4 drop-shadow-md">
                                {title || "PREMIUM"}
                            </h2>
                            <h1 className="font-serif text-neutral-300 text-4xl font-bold tracking-widest mb-6 drop-shadow-lg uppercase">
                                {subtitle || "ASSEMBLY"}
                            </h1>
                            <div className="bg-neutral-800/80 backdrop-blur-md border border-neutral-700 px-6 py-2 rounded-sm shadow-inner">
                                <p className="text-neutral-300 font-serif text-[10px] tracking-widest px-2 uppercase">{date || "SATURDAY, 12 DEC"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-16 text-center px-12">
                    <p className="font-serif text-neutral-400 text-xs max-w-xs mx-auto leading-relaxed border-t border-neutral-800 pt-6">
                        {message || "We cordially invite you to join us for an event of profound significance and communal gathering."}
                    </p>
                    <p className="text-neutral-500 text-[9px] mt-4 tracking-[0.4em] uppercase font-bold">{location || "GRAND HALL"}</p>
                    {time && <p className="text-neutral-600 text-[8px] mt-1 tracking-widest">{time}</p>}
                </div>
            </div>
        );
    }

    // Variant 2: Modern Meet (Clean, Professional)
    if (variant === 2) {
        return (
            <div className="relative w-full h-full bg-white flex flex-col p-0 overflow-hidden font-sans">
                <div className="h-2/5 w-full relative bg-neutral-900 overflow-hidden">
                    {image ? (
                        <img src={image} alt="Assembly" className="w-full h-full object-cover opacity-80" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-20 h-20 border-2 border-white/20 rounded-full flex items-center justify-center text-white/20 text-4xl font-bold">A</div>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>
                    <div className="absolute bottom-6 left-8 text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-4 h-[2px] bg-amber-500"></span>
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">{title || "General"}</span>
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">{subtitle || "Assembly"}</h1>
                    </div>
                </div>

                <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                        <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-6">
                            {message || "Join our community for a vital discussion session. Innovation, progress, and collaboration for the next quarter starts here."}
                        </p>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase mb-1 italic">Date & Time</h3>
                                <p className="text-xs font-bold text-neutral-900">{date || "TBA"}</p>
                                <p className="text-xs font-bold text-neutral-900">{time || "Morning Session"}</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase mb-1 italic">Venue</h3>
                                <p className="text-xs font-bold text-neutral-900">{location || "Headquarters"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-neutral-100 pt-6">
                        <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center text-white text-[10px] font-bold">Pop</div>
                        <p className="text-[10px] text-neutral-400 font-bold tracking-widest uppercase italic">Presence Required</p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default AssemblyTemplate;
