import React from 'react';
import { User, Gift, Star, Sparkles } from 'lucide-react';

const BirthdayTemplate = ({ data }) => {
    const { title, subtitle, date, image, message, variant = 1, location, time, phone } = data;

    // Variant 1: Royal Gold (Previous) - Enhanced
    if (variant === 1) {
        return (
            <div className="relative w-full h-full bg-white flex overflow-hidden">
                <div className="w-[35%] h-full bg-neutral-900 relative flex flex-col justify-between p-6 z-10">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[-50px] left-[-50px] w-[150px] h-[150px] border-[20px] border-amber-500 rounded-full opacity-20"></div>
                        <div className="absolute bottom-[20%] right-[-40px] w-[100px] h-[100px] bg-amber-600/20 transform rotate-45"></div>
                    </div>

                    <div className="relative z-10 pt-10">
                        <div className="w-12 h-1 bg-amber-500 mb-6"></div>
                        <div className="space-y-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                            <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
                            <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
                        </div>
                    </div>

                    <div className="relative z-10 mb-10">
                        <div className="bg-amber-600 text-black font-bold text-center py-2 px-4 uppercase tracking-[0.2em] text-[10px] shadow-lg mb-4 transform -skew-x-12 inline-block">
                            {date || "Celebrate"}
                        </div>
                        <h1 className="text-amber-400 font-bold text-5xl uppercase tracking-tighter leading-[0.9] break-words font-serif max-w-full drop-shadow-sm">
                            {subtitle || "Name"}
                        </h1>
                    </div>
                </div>

                <div className="w-[65%] h-full relative bg-white flex flex-col">
                    <div className="flex-1 p-8 flex flex-col items-start justify-center relative bg-white">
                        <h2 className="font-serif italic text-6xl text-black z-10 relative">
                            {title || "Happy"} <br />
                            <span className="text-7xl font-black uppercase tracking-tighter text-neutral-900 block mt-[-5px] not-italic leading-none">Birthday</span>
                        </h2>
                        <p className="mt-4 text-neutral-500 text-xs max-w-xs leading-relaxed border-l-4 border-amber-500 pl-4 italic">
                            {message || "Wishing you yet the most amazing birthday ever. Live long and prosper in your new age."}
                        </p>
                        <div className="absolute top-10 right-10 w-20 h-20 bg-black rounded-full flex items-center justify-center border-4 border-amber-500 shadow-xl transform rotate-12">
                            <span className="text-amber-400 font-bold text-2xl">+1</span>
                        </div>
                    </div>

                    <div className="h-[55%] w-full relative p-4 pl-0">
                        <div className="w-full h-full relative overflow-hidden rounded-l-[50px] shadow-2xl border-4 border-white">
                            {image ? (
                                <img src={image} alt="Birthday Person" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400">
                                    <span className="text-sm uppercase tracking-widest">No Image Uploaded</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        <div className="absolute top-[-20px] left-10 w-16 h-16 bg-amber-500 rounded-full border-4 border-white z-20 shadow-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 2: Floral Dream (Soft, Beautiful)
    if (variant === 2) {
        return (
            <div className="relative w-full h-full bg-[#fffcf9] flex flex-col p-8 overflow-hidden font-sans">
                {/* Decorative Flowers (SVG or Gradient circles) */}
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-pink-100 rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-amber-100 rounded-full opacity-50 blur-3xl"></div>

                <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
                    <div className="mb-4">
                        <span className="text-pink-400 uppercase tracking-[0.4em] text-[10px] font-bold">In Honor Of</span>
                        <div className="h-[1px] w-12 bg-pink-200 mx-auto mt-2"></div>
                    </div>

                    <h1 className="font-serif text-6xl text-neutral-800 mb-2 leading-tight px-4 break-words">
                        {subtitle || "Sarah Jane"}
                    </h1>
                    <h2 className="font-serif italic text-2xl text-pink-500 mb-6 drop-shadow-sm">
                        {title || "Happy Birthday"}
                    </h2>

                    <div className="w-48 h-48 relative mb-6">
                        <div className="absolute inset-0 border-4 border-white shadow-xl rounded-full overflow-hidden rotate-3">
                            {image ? (
                                <img src={image} alt="Birthday Person" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-pink-50 flex items-center justify-center">
                                    <User className="w-12 h-12 text-pink-100" />
                                </div>
                            )}
                        </div>
                        {/* Floral Decoration */}
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce duration-[3000ms]">✨</div>
                    </div>

                    <p className="max-w-xs text-neutral-600 text-xs leading-relaxed mb-6 italic px-4">
                        "{message || "A beautiful soul like yours deserves a beautiful day like today. Have the best one yet!"}"
                    </p>

                    <div className="flex items-center gap-4 text-neutral-300">
                        <div className="h-[1px] w-12 bg-neutral-200"></div>
                        <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-500">{date || "March 16, 2024"}</span>
                        <div className="h-[1px] w-12 bg-neutral-200"></div>
                    </div>
                </div>

                <div className="absolute bottom-8 right-8">
                    <div className="text-pink-300 font-serif text-6xl opacity-20 select-none">Rose</div>
                </div>
            </div>
        );
    }

    // Variant 3: Minimal Dark (Modern & Sleek)
    if (variant === 3) {
        return (
            <div className="relative w-full h-full bg-neutral-950 text-white flex flex-col p-0 overflow-hidden font-sans">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    {image ? (
                        <img src={image} alt="Background" className="w-full h-full object-cover opacity-50 grayscale" />
                    ) : (
                        <div className="w-full h-full bg-neutral-900 opacity-40"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent"></div>
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-end p-12">
                    <div className="mb-10">
                        <div className="w-16 h-[2.5px] bg-white mb-6"></div>
                        <h2 className="text-white/60 uppercase tracking-[0.5em] text-[10px] font-bold mb-4 drop-shadow-md">{title || "Happy Birthday"}</h2>
                        <h1 className="text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-6 max-w-sm break-words drop-shadow-2xl">
                            {subtitle || "BRIAN"}
                        </h1>
                        <p className="max-w-xs text-neutral-300 text-xs font-medium leading-relaxed border-l-2 border-white/20 pl-6 drop-shadow-md">
                            {message || "Pushing boundaries. Embracing growth. Another year of excellence starts now."}
                        </p>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <span className="block text-[8px] uppercase tracking-[0.3em] text-neutral-500 font-bold">Commencement</span>
                            <span className="block text-xs font-bold tracking-widest opacity-80">{date || "OCTOBER 12, 2024"}</span>
                        </div>
                        <div className="w-14 h-14 border-2 border-white/30 rounded-full flex items-center justify-center font-bold text-[10px] backdrop-blur-sm">
                            {new Date().getFullYear()}
                        </div>
                    </div>
                </div>

                {/* Vertical Stripe */}
                <div className="absolute top-0 right-12 w-[1px] h-full bg-white/5"></div>
            </div>
        );
    }

    // Variant 4: Festive Balloons (Balloons, Gifts, Black & Gold)
    if (variant === 4) {
        return (
            <div className="relative w-full h-full bg-black text-white p-0 overflow-hidden font-sans">
                {/* Background Confetti/Stars */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-amber-400 rounded-full"
                            style={{
                                width: Math.random() * 3 + 'px',
                                height: Math.random() * 3 + 'px',
                                top: Math.random() * 100 + '%',
                                left: Math.random() * 100 + '%',
                                opacity: Math.random(),
                                transform: `rotate(${Math.random() * 360}deg)`
                            }}
                        />
                    ))}
                    <div className="absolute top-10 left-10 text-amber-500/20"><Star className="w-20 h-20 rotate-12" /></div>
                    <div className="absolute top-[40%] right-20 text-amber-500/20"><Star className="w-12 h-12 -rotate-12" /></div>
                </div>

                <div className="relative z-10 h-full flex flex-col p-10">
                    <div className="mt-12">
                        <h2 className="text-amber-500 font-bold tracking-[0.4em] uppercase text-sm mb-2 drop-shadow-md">
                            {title || "HAPPY"}
                        </h2>
                        <h1 className="text-7xl font-serif italic text-white leading-none mb-8 drop-shadow-xl">
                            {subtitle?.split(' ')[0] || "Birthday"}
                        </h1>
                        <p className="max-w-[240px] text-gray-300 text-xs leading-relaxed font-medium">
                            {message || "Wishing you a day filled with love, laughter, and all the things that make birthdays extraordinary."}
                        </p>
                    </div>

                    <div className="flex-1 flex items-end justify-between pb-10">
                        {/* Gifts at bottom */}
                        <div className="flex gap-2">
                            <div className="w-16 h-12 bg-neutral-800 border-t-4 border-amber-600 rounded-sm shadow-lg relative flex items-center justify-center">
                                <div className="absolute -top-3 w-4 h-4 bg-amber-500 rotate-45"></div>
                                <Gift className="w-6 h-6 text-amber-500/50" />
                            </div>
                            <div className="w-12 h-16 bg-neutral-900 border-t-4 border-amber-500 rounded-sm shadow-lg relative flex items-center justify-center">
                                <div className="absolute -top-3 w-4 h-4 bg-amber-400 rotate-45"></div>
                                <Gift className="w-4 h-4 text-amber-400/50" />
                            </div>
                        </div>

                        {/* Image Frame */}
                        <div className="w-32 h-44 bg-neutral-900 border-2 border-amber-500 rounded-xl overflow-hidden shadow-2xl rotate-3 relative">
                            {image ? (
                                <img src={image} alt="Celebrant" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-amber-900/40">
                                    <User className="w-10 h-10" />
                                    <span className="text-[8px] font-bold uppercase mt-2 italic">Your Photo</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Balloons on the Right */}
                <div className="absolute top-[20%] right-[-40px] flex flex-col gap-[-20px] pointer-events-none">
                    {/* Gold Balloon */}
                    <div className="w-24 h-32 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 rounded-full shadow-[0_10px_30px_rgba(251,191,36,0.5)] animate-bounce duration-[4000ms] relative">
                        <div className="absolute top-4 left-4 w-4 h-8 bg-white/20 rounded-full blur-sm"></div>
                    </div>
                    {/* Black Balloon */}
                    <div className="w-24 h-32 bg-gradient-to-br from-neutral-700 via-neutral-900 to-black rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] mt-[-40px] ml-10 animate-bounce duration-[5000ms] relative">
                        <div className="absolute top-4 left-4 w-4 h-8 bg-white/10 rounded-full blur-sm"></div>
                    </div>
                    {/* Gold Balloon */}
                    <div className="w-20 h-28 bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 rounded-full shadow-[0_10px_30px_rgba(251,191,36,0.3)] mt-[-30px] ml-[-10px] animate-bounce duration-[4500ms] relative">
                        <div className="absolute top-3 left-3 w-3 h-6 bg-white/20 rounded-full blur-sm"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 5: Golden Invite (Glitter Border, Diamond Frame)
    if (variant === 5) {
        return (
            <div className="relative w-full h-full bg-neutral-950 text-white flex flex-col items-center p-8 overflow-hidden font-sans border-[1px] border-amber-900/30">
                {/* Glitter Border Effect */}
                <div className="absolute inset-2 border border-amber-500/30 opacity-50 pointer-events-none"></div>
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 100 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-amber-400 rounded-full"
                            style={{
                                width: '1px',
                                height: '1px',
                                top: (i % 2 === 0 ? 0 : 100) + (Math.random() * 5 * (i % 2 === 0 ? 1 : -1)) + '%',
                                left: Math.random() * 100 + '%',
                                boxShadow: '0 0 5px #fbbf24'
                            }}
                        />
                    ))}
                    {Array.from({ length: 100 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-amber-400 rounded-full"
                            style={{
                                width: '1px',
                                height: '1px',
                                left: (i % 2 === 0 ? 0 : 100) + (Math.random() * 5 * (i % 2 === 0 ? 1 : -1)) + '%',
                                top: Math.random() * 100 + '%',
                                boxShadow: '0 0 5px #fbbf24'
                            }}
                        />
                    ))}
                </div>

                {/* Top Diamond Frame */}
                <div className="relative mt-8 mb-4">
                    <div className="w-48 h-12 border border-amber-500/50 flex items-center justify-center transform skew-x-[-20deg]">
                        <span className="transform skew-x-[20deg] text-[10px] uppercase font-bold tracking-[0.3em] text-amber-500 drop-shadow-md">
                            YOU ARE INVITED TO MY
                        </span>
                    </div>
                    {/* Diamond Decoration behind */}
                    <div className="absolute inset-0 w-32 h-32 border border-amber-500/20 rotate-45 -top-10 left-8 pointer-events-none"></div>
                </div>

                <h1 className="text-6xl font-serif italic text-white drop-shadow-2xl mb-1 tracking-tight">
                    {subtitle || "Birthday"}
                </h1>
                <h2 className="text-2xl font-bold tracking-[0.5em] text-amber-500 uppercase mb-8">
                    PARTY
                </h2>

                <div className="w-40 h-40 relative mb-8">
                    <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="w-full h-full rounded-full border-4 border-amber-600/50 p-2 relative z-10">
                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-2xl relative">
                            {image ? (
                                <img src={image} alt="Birthday Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                                    <User className="w-12 h-12 text-neutral-700" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        </div>
                    </div>
                    {/* Balloons on sides of image */}
                    <div className="absolute -left-12 top-0 w-10 h-14 bg-gradient-to-b from-amber-400 to-amber-700 rounded-full shadow-lg rotate-[-20deg]"></div>
                    <div className="absolute -right-12 top-0 w-10 h-14 bg-neutral-800 rounded-full shadow-lg rotate-[20deg] border border-amber-500/30"></div>
                </div>

                <div className="text-center space-y-4">
                    <div className="flex flex-col items-center">
                        <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-4"></div>
                        <p className="text-base font-bold tracking-[0.2em]">{date || "MARCH 16, 2024"}</p>
                        <p className="text-xs font-medium tracking-[0.3em] text-amber-500 mt-1 uppercase">{time || "AT 5:00 PM"}</p>
                        <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-4"></div>
                    </div>

                    <div className="space-y-1 pt-2">
                        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{location || "123 Anywhere St., Any City"}</p>
                        {phone && <p className="text-[9px] font-bold tracking-widest text-amber-500/60">{phone}</p>}
                    </div>
                </div>

                <div className="absolute bottom-6 left-6 opacity-30"><Sparkles className="w-6 h-6 text-amber-500" /></div>
                <div className="absolute bottom-6 right-6 opacity-30"><Sparkles className="w-6 h-6 text-amber-500" /></div>
            </div>
        );
    }

    return null;
};

export default BirthdayTemplate;
