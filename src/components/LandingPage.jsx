import React, { useEffect, useRef } from 'react';
import {
    ArrowRight, Sparkles, Crown, ShieldCheck,
    FileText, Zap, MousePointer2, ChevronRight
} from 'lucide-react';
import brandLogo from '@/assets/brand-logo.png';

const LandingPage = ({ onGetStarted, user, onLogin }) => {
    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-brand-blue/30 selection:text-brand-blue">

            {/* PREMIUM AMBIENT ENVIRONMENT */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Dramatic Gradient Overlays */}
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_100%_0%,rgba(37,99,235,0.15)_0%,transparent_70%)]"></div>
                <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_0%_100%,rgba(245,158,11,0.12)_0%,transparent_70%)]"></div>

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

                {/* Artisan Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-overlay"></div>
            </div>

            {/* PREMIUM NAVBAR */}
            <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
                {/* Glass-morphism background with border */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="relative px-8 md:px-16 py-6 flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-blue/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <img src={brandLogo.src || brandLogo} className="relative w-14 h-14 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-2xl" alt="Imena Logo" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-serif tracking-tight text-white font-bold">Paper</span>
                            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-brand-blue/80">by Imena</span>
                        </div>
                    </div>

                    {/* Premium CTA Button */}
                    <button
                        onClick={onGetStarted}
                        className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 via-brand-blue to-blue-700 text-white text-[11px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-105 rounded-md border border-blue-500/30"
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        {/* Glow layer */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="relative z-10 flex items-center gap-3">
                            Design Now
                            <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                    </button>
                </div>
            </nav>

            {/* ARTISAN HERO STAGE */}
            <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left: Premium Copy */}
                    <div className="text-left space-y-12 animate-fade-in-up">
                        <div className="space-y-8">
                            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-blue flex items-center gap-4">
                                <span className="w-12 h-[2px] bg-brand-blue"></span>
                                Bespoke Design Studio
                            </span>
                            <h1 className="text-5xl md:text-7xl font-serif-soft leading-[0.95] text-balance">
                                Elevate your <br />
                                <span className="italic font-light text-brand-gold">significant</span> moments.
                            </h1>
                            <p className="max-w-lg text-white/60 text-base md:text-lg leading-relaxed tracking-wide text-balance">
                                Professional stationery design for those who value tradition, craftsmanship, and the art of the perfect invitation.
                            </p>
                        </div>

                        <div className="flex justify-center pt-8">
                            <button
                                onClick={onGetStarted}
                                className="group relative px-20 py-7 bg-gradient-to-r from-blue-600 via-brand-blue to-blue-700 text-white text-[13px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:scale-105 rounded-md border-2 border-blue-400/40"
                            >
                                {/* Animated shimmer */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                {/* Inner glow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                {/* Pulse effect on hover */}
                                <div className="absolute inset-0 rounded-md bg-blue-400/20 animate-pulse opacity-0 group-hover:opacity-100"></div>
                                <span className="relative z-10 flex items-center gap-4">
                                    <span className="group-hover:scale-110 transition-transform duration-300">Start New Project</span>
                                    <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Right: Premium CSS Visual Anchor */}
                    <div className="relative h-[500px] hidden lg:flex items-center justify-center animate-fade-in animation-delay-300">
                        {/* Shadow Floor */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-black/5 blur-2xl rounded-[100%]"></div>

                        {/* Card Stack 2 (Bottom) */}
                        <div className="absolute w-[320px] h-[450px] border border-black/[0.03] card-stack-2 rounded-sm flex flex-col p-10 justify-between">
                            <div className="w-12 h-12 border border-black/5 rounded-full self-end opacity-20"></div>
                            <div className="space-y-4">
                                <div className="h-1 w-2/3 bg-black/5"></div>
                                <div className="h-1 w-1/2 bg-black/5"></div>
                            </div>
                        </div>

                        {/* Card Stack 1 (Top) */}
                        <div className="absolute w-[320px] h-[450px] border border-black/[0.05] card-stack-1 rounded-sm flex flex-col items-center justify-center text-center p-12 space-y-8">
                            <img src={brandLogo.src || brandLogo} className="w-12 h-12 object-contain grayscale opacity-10 mb-4" alt="" />
                            <div className="space-y-2">
                                <div className="text-[8px] uppercase tracking-[0.3em] text-black/20">The Anniversary of</div>
                                <div className="font-serif-soft text-2xl text-black/70 italic">Evelyn & James</div>
                            </div>
                            <div className="w-20 h-[1px] bg-black/10"></div>
                            <div className="text-[7px] uppercase tracking-[0.4em] text-black/30 leading-loose">
                                Saturday, June 21st <br />
                                The Glass House, NY
                            </div>
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1 h-1 bg-black/10 rounded-full"></div>
                        </div>

                        {/* Floating Accent Elements */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[radial-gradient(circle,rgba(245,158,11,0.05)_0%,transparent_70%)] animate-pulse"></div>
                    </div>
                </div>

                {/* Premium Feature Strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl mt-24 animate-fade-in animation-delay-600">
                    <div className="flex flex-col items-center gap-6 group cursor-default p-8 rounded-2xl border border-white/5 hover:border-brand-blue/30 hover:bg-white/5 transition-all duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-brand-blue/20 flex items-center justify-center border border-brand-blue/40 group-hover:bg-brand-blue/30 group-hover:border-brand-blue/60 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-brand-blue/10">
                            <ShieldCheck className="w-8 h-8 text-brand-blue" />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-[12px] font-black uppercase tracking-[0.5em] text-white">Guaranteed Quality</h3>
                            <p className="text-[10px] text-white/40 leading-relaxed">Premium templates crafted by professionals</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-6 group cursor-default p-8 rounded-2xl border border-white/5 hover:border-brand-gold/30 hover:bg-white/5 transition-all duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-brand-gold/20 flex items-center justify-center border border-brand-gold/40 group-hover:bg-brand-gold/30 group-hover:border-brand-gold/60 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-brand-gold/10">
                            <Zap className="w-8 h-8 text-brand-gold" />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-[12px] font-black uppercase tracking-[0.5em] text-white">Instant Generation</h3>
                            <p className="text-[10px] text-white/40 leading-relaxed">Create stunning invitations in seconds</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-6 group cursor-default p-8 rounded-2xl border border-white/5 hover:border-brand-blue/30 hover:bg-white/5 transition-all duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-brand-blue/20 flex items-center justify-center border border-brand-blue/40 group-hover:bg-brand-blue/30 group-hover:border-brand-blue/60 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-brand-blue/10">
                            <FileText className="w-8 h-8 text-brand-blue" />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-[12px] font-black uppercase tracking-[0.5em] text-white">Professional PDF</h3>
                            <p className="text-[10px] text-white/40 leading-relaxed">Print-ready output with perfect quality</p>
                        </div>
                    </div>
                </div>

                {/* Vertical Scroll Indicator */}
                <div className="mt-32 pb-20 flex flex-col items-center gap-10 opacity-20 hover:opacity-40 transition-opacity duration-500">
                    <div className="h-24 w-[2px] bg-gradient-to-b from-transparent via-brand-blue/60 to-transparent"></div>
                    <span className="text-[10px] font-black uppercase tracking-[1.5em] mr-[-1.5em] text-brand-blue">Explore</span>
                </div>
            </main>

            {/* PREMIUM DARK FOOTER */}
            <div className="fixed bottom-10 left-10 flex flex-col gap-3 z-50 pointer-events-none opacity-30">
                <span className="text-[10px] font-black uppercase tracking-widest text-white">© 2024</span>
                <div className="h-[2px] w-16 bg-brand-blue"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue">Imena Group</span>
            </div>

            <div className="fixed bottom-10 right-10 flex flex-col items-end gap-3 z-50 pointer-events-none opacity-30">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">Designed for Excellence</span>
                    <MousePointer2 className="w-4 h-4 text-brand-gold" />
                </div>
                <div className="h-[2px] w-16 bg-brand-gold"></div>
            </div>

        </div>
    );
};

export default LandingPage;
