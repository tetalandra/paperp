import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Star, Crown, LayoutTemplate } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
    const containerRef = useRef(null);

    // Parallax mouse move effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const x = (clientX / innerWidth - 0.5) * 20;
            const y = (clientY / innerHeight - 0.5) * 20;

            containerRef.current.style.setProperty('--mouse-x', `${x}px`);
            containerRef.current.style.setProperty('--mouse-y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center perspective-1000">

            {/* Dynamic Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Animated Gradient Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gold-600/20 rounded-full blur-[120px] animate-float animation-delay-2000 mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-yellow-600/10 rounded-full blur-[150px] animate-float animation-delay-4000 mix-blend-screen"></div>
                <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold-400/10 rounded-full blur-[100px] animate-pulse"></div>

                {/* Grid Texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

                {/* Floating Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-gold-400 rounded-full animate-float"
                        style={{
                            width: Math.random() * 4 + 1 + 'px',
                            height: Math.random() * 4 + 1 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDuration: Math.random() * 5 + 5 + 's',
                            animationDelay: Math.random() * 5 + 's',
                            opacity: Math.random() * 0.5 + 0.2
                        }}
                    ></div>
                ))}
            </div>

            {/* Main Content Container with Tilt Effect */}
            <div
                ref={containerRef}
                className="relative z-10 max-w-5xl mx-auto px-4 w-full flex flex-col items-center justify-center text-center transition-transform duration-200 ease-out"
                style={{ transform: 'translate(var(--mouse-x, 0px), var(--mouse-y, 0px))' }}
            >

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold-500/30 rounded-full bg-gold-500/5 backdrop-blur-md mb-8 animate-fade-in-up">
                    <Crown className="w-4 h-4 text-gold-400" />
                    <span className="text-gold-300 text-xs font-bold tracking-[0.2em] uppercase">The Premium Collection</span>
                </div>

                {/* Hero Title */}
                <h1 className="relative font-cursive text-8xl md:text-9xl lg:text-[10rem] leading-none mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-gold-200 via-gold-400 to-gold-700 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                        Paper Pop
                    </span>
                    {/* Shine effect overlay */}
                    <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-transparent via-white/50 to-transparent bg-[length:200%_auto] animate-shine pointer-events-none" aria-hidden="true">
                        Paper Pop
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="font-serif text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Craft <span className="text-gold-300 italic">exquisite</span> digital stationery. <br className="hidden md:block" />
                    Elevate your family gatherings with Imena-branded invitations.
                </p>

                {/* Call to Action Area */}
                <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    {/* Button Glow Background */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-300 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>

                    <button
                        onClick={onGetStarted}
                        className="relative flex items-center gap-4 bg-black border border-gold-500/50 px-10 py-5 rounded-full text-gold-200 font-bold text-lg tracking-wider overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(217,119,6,0.4)]"
                    >
                        {/* Button Background Hover Fill */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Text Content */}
                        <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors duration-300">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            CREATE INVITATION
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </div>

                {/* Bottom Features/Stats */}
                <div className="mt-20 grid grid-cols-3 gap-12 border-t border-gold-900/50 pt-8 animate-fade-in text-gold-500/60" style={{ animationDelay: '0.5s' }}>
                    <div className="flex flex-col items-center gap-2 group cursor-default hover:text-gold-300 transition-colors">
                        <Star className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-xs tracking-widest uppercase font-bold">Premium Quality</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-default hover:text-gold-300 transition-colors">
                        {/* Custom Icon for 'Instant' */}
                        <svg className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-xs tracking-widest uppercase font-bold">Instant Download</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-default hover:text-gold-300 transition-colors">
                        <LayoutTemplate className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-xs tracking-widest uppercase font-bold">Multiple Templates</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LandingPage;
