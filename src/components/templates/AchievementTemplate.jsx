import React from 'react';

const AchievementTemplate = ({ data }) => {
    const { title, subtitle, date, location, image, message, variant = 1 } = data;

    // Variant 1: Classic Award (Previous) - Enhanced
    if (variant === 1) {
        return (
            <div className="relative w-full h-full bg-neutral-900 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-black via-neutral-800/50 to-transparent opacity-80 z-0"></div>
                <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-black via-neutral-800/50 to-transparent opacity-80 z-0"></div>
                <div className="absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.05 }}></div>

                <div className="relative z-10 text-center px-6 py-12 border-2 border-amber-500/30 m-8 w-[80%] h-[90%] flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm rounded-lg shadow-2xl">
                    <p className="font-serif text-white tracking-[0.3em] uppercase text-[10px] mb-8">Certificate of Recognition</p>
                    <h1 className="font-serif text-4xl text-amber-300 font-bold uppercase tracking-widest mb-2">
                        {title || "Special"}
                    </h1>
                    <h1 className="font-serif text-5xl text-white font-bold uppercase tracking-widest mb-10 border-b-2 border-amber-500 pb-4">
                        {subtitle || "Achievement"}
                    </h1>

                    {image && (
                        <div className="w-24 h-24 rounded-full border-2 border-amber-500 overflow-hidden mb-8 shadow-lg">
                            <img src={image} alt="Achiever" className="w-full h-full object-cover" />
                        </div>
                    )}

                    <p className="font-serif text-amber-100 italic text-base max-w-sm leading-relaxed mb-8">
                        "{message || "In recognition of outstanding dedication and exceptional performance throughout the year."}"
                    </p>

                    <div className="mt-4 space-y-1">
                        <p className="font-sans text-neutral-500 text-[10px] tracking-widest uppercase">Presented To</p>
                        <p className="font-serif text-2xl text-amber-400 capitalize">{location || "Name Here"}</p>
                    </div>

                    <div className="mt-10 pt-4 border-t border-amber-500/20 w-1/2">
                        <p className="font-mono text-amber-600 text-[10px] uppercase tracking-widest">{date || "November 2024"}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 2: Modern Badge (Clean, Luxury)
    if (variant === 2) {
        return (
            <div className="relative w-full h-full bg-white flex flex-col items-center justify-between p-12 overflow-hidden font-sans">
                <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-50 rounded-full -rotate-45 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-neutral-100 rounded-full rotate-12 -translate-x-1/2 translate-y-1/2 opacity-50"></div>

                <div className="relative z-10 w-full flex justify-between items-start">
                    <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">A</div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-neutral-400 tracking-[0.2em] uppercase">Honorable</p>
                        <p className="text-xl font-black text-neutral-900 italic">Distinction</p>
                    </div>
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="relative mb-8">
                        <div className="w-40 h-40 rounded-[2.5rem] bg-neutral-100 overflow-hidden border-4 border-white shadow-2xl rotate-3 transform transition-transform hover:rotate-0 duration-500">
                            {image ? (
                                <img src={image} alt="Achiever" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-neutral-50">
                                    <div className="w-12 h-12 border-2 border-neutral-200 rounded-full"></div>
                                </div>
                            )}
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                            <span className="text-white text-lg">★</span>
                        </div>
                    </div>

                    <h1 className="text-5xl font-black text-neutral-900 uppercase tracking-tighter mb-2 leading-none">
                        {subtitle || "Excellence"}
                    </h1>
                    <div className="h-1 w-12 bg-neutral-900 mb-6"></div>
                    <p className="text-neutral-500 text-sm max-w-xs leading-relaxed font-medium">
                        {message || "Celebrating the remarkable journey and the milestones achieved through persistence."}
                    </p>
                </div>

                <div className="relative z-10 w-full border-t border-neutral-100 pt-8 flex justify-between items-end">
                    <div>
                        <p className="text-[8px] font-bold text-neutral-400 tracking-[0.3em] uppercase mb-1">Presented By</p>
                        <p className="text-sm font-bold text-neutral-900 uppercase">{location || "The Committee"}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-mono font-bold text-neutral-900">{date || "2024"}</p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default AchievementTemplate;
