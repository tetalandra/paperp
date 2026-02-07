import React, { useEffect, useState } from 'react';
import {
    ArrowRight, Sparkles, Crown, ShieldCheck,
    FileText, Zap, MousePointer2, ChevronRight,
    Users, BookOpen, Layers
} from 'lucide-react';
import brandLogo from '@/assets/brand-logo.png';

const LandingPage = ({ onGetStarted, user, onLogin }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-brand-blue/30 selection:text-brand-blue scroll-smooth">

            {/* PREMIUM AMBIENT ENVIRONMENT */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_100%_0%,rgba(37,99,235,0.15)_0%,transparent_70%)]"></div>
                <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_0%_100%,rgba(245,158,11,0.12)_0%,transparent_70%)]"></div>
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-overlay"></div>
            </div>

            {/* PREMIUM NAVBAR */}
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
                <div className={`absolute inset-0 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/50' : 'bg-transparent'}`}></div>

                <div className="relative max-w-7xl mx-auto px-8 md:px-16 flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-blue/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <img src={brandLogo.src || brandLogo} className="relative w-12 h-12 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" alt="IMENA Family Logo" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-serif tracking-tight text-white font-bold leading-none">Paper</span>
                            <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-brand-blue/80 mt-1">IMENA Family</span>
                        </div>
                    </div>

                    {/* Centered Navigation Tabs */}
                    <div className="hidden md:flex items-center gap-12">
                        {['Home', 'About Us', 'How It Works'].map((item) => (
                            <button
                                key={item}
                                onClick={() => item === 'Home' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                                className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 hover:text-brand-blue transition-all duration-300 relative group"
                            >
                                {item}
                                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-500 shadow-[0_0_10px_rgba(37,99,235,0.8)]"></span>
                            </button>
                        ))}
                    </div>

                    {/* Premium CTA Button */}
                    <button
                        onClick={onGetStarted}
                        className="group relative px-8 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:border-brand-blue/50 hover:bg-brand-blue/10 rounded-full"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Design Now
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </button>
                </div>
            </nav>

            {/* ARTISAN HERO STAGE */}
            <main id="home" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-32">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left: Copy */}
                    <div className="text-left space-y-12 animate-fade-in-up">
                        <div className="space-y-8">
                            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-blue flex items-center gap-4">
                                <span className="w-12 h-[2px] bg-brand-blue"></span>
                                Bespoke Design Studio
                            </span>
                            <h1 className="text-6xl md:text-8xl font-serif-soft leading-[0.9] text-balance">
                                Elevate your <br />
                                <span className="italic font-light text-brand-gold">significant</span> moments.
                            </h1>
                            <p className="max-w-lg text-white/50 text-base md:text-lg leading-relaxed tracking-wide text-balance">
                                Professional stationery design for those who value tradition, craftsmanship, and the art of the perfect invitation.
                            </p>
                        </div>

                        <div className="flex gap-8 pt-8 items-center">
                            <button
                                onClick={onGetStarted}
                                className="group relative px-12 py-6 bg-brand-blue text-white text-[12px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:scale-105 rounded-md"
                            >
                                <span className="relative z-10 flex items-center gap-4">
                                    Start Project
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                            <button
                                onClick={() => scrollToSection('how-it-works')}
                                className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors"
                            >
                                Watch Process
                            </button>
                        </div>
                    </div>

                    {/* Right: Visual */}
                    <div className="relative h-[550px] hidden lg:flex items-center justify-center">
                        <div className="absolute w-[360px] h-[500px] bg-white/5 border border-white/10 rounded-sm card-stack-2 rotate-[-5deg] backdrop-blur-sm shadow-2xl"></div>
                        <div className="absolute w-[360px] h-[500px] bg-white border border-white/[0.05] card-stack-1 flex flex-col items-center justify-center text-center p-14 space-y-10 shadow-2xl">
                            <img src={brandLogo.src || brandLogo} className="w-16 h-16 object-contain grayscale opacity-20 mb-4" alt="" />
                            <div className="space-y-3">
                                <div className="text-[10px] uppercase tracking-[0.5em] text-black/30 font-bold">The Anniversary of</div>
                                <div className="font-serif-soft text-4xl text-black/80 italic leading-tight">Evelyn & James</div>
                            </div>
                            <div className="w-24 h-[1px] bg-black/10"></div>
                            <div className="text-[9px] uppercase tracking-[0.4em] text-black/40 leading-loose font-medium">
                                Saturday, June 21st <br />
                                The Glass House, NY
                            </div>
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1">
                                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-black/10 rounded-full"></div>)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Scroll Indicator */}
                <div className="mt-40 pb-20 flex flex-col items-center gap-8 animate-bounce transition-opacity duration-1000">
                    <div className="h-16 w-[1px] bg-gradient-to-b from-brand-blue to-transparent"></div>
                    <span className="text-[9px] font-black uppercase tracking-[1.5em] mr-[-1.5em] text-brand-blue/60">Discover</span>
                </div>
            </main>

            {/* ABOUT US SECTION */}
            <section id="about-us" className="relative z-10 py-40 bg-black">
                <div className="max-w-7xl mx-auto px-8 md:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <div className="space-y-12">
                            <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-brand-gold flex items-center gap-4">
                                <span className="w-12 h-[2px] bg-brand-gold"></span>
                                Our Philosophy
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                                Merging <span className="italic font-light">Heritage</span> with Global Excellence.
                            </h2>
                            <p className="text-white/50 text-lg leading-relaxed font-light">
                                Built on the strong legacy of the IMENA Family, our studio combines classic hand-crafted design with modern technology. We create beautiful invitations that honor your special moments.
                            </p>
                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                                        <Users className="w-6 h-6 text-brand-gold" />
                                    </div>
                                    <h4 className="text-[11px] font-black uppercase tracking-widest">IMENA Family</h4>
                                    <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-tighter">A community built on strength and unity</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20">
                                        <BookOpen className="w-6 h-6 text-brand-blue" />
                                    </div>
                                    <h4 className="text-[11px] font-black uppercase tracking-widest">Timeless Design</h4>
                                    <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-tighter">Curated aesthetics for modern heritage</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-brand-gold/20 blur-[120px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="relative aspect-square border border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-3xl p-1 flex flex-col overflow-hidden group-hover:border-brand-gold/30 transition-all duration-700">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"></div>
                                <div className="flex-1 flex items-center justify-center text-center p-20 space-y-10 group-hover:scale-105 transition-transform duration-700">
                                    <div className="space-y-6">
                                        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-brand-gold/40">Legacy & Strength</span>
                                        <p className="text-5xl font-serif text-white leading-tight italic font-black tracking-tighter">
                                            "SHINGA ICUMU NAHAKOMEYE RIRINJIRA"
                                        </p>
                                        <div className="pt-6">
                                            <div className="h-[2px] w-20 bg-brand-gold/40 mx-auto"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section id="how-it-works" className="relative z-10 py-40 border-t border-white/5 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.03)_0%,transparent_100%)]">
                <div className="max-w-7xl mx-auto px-8 md:px-16 space-y-32">
                    <div className="text-center space-y-8">
                        <span className="text-[11px] font-bold uppercase tracking-[0.8em] text-brand-blue">The Creative Process</span>
                        <h2 className="text-4xl md:text-6xl font-serif">Three Steps to <span className="text-brand-blue">Perfection.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            { step: '01', title: 'Select Your Base', desc: 'Choose from our curated collection of artisan templates, each designed with unique architectural logic.', icon: Layers },
                            { step: '02', title: 'Curate Content', desc: 'Input your event details through our fluid design studio. Personalize every word of your heartfelt narrative.', icon: MousePointer2 },
                            { step: '03', title: 'Instant Artifact', desc: 'Generate your high-resolution, print-ready PDF invitation in seconds. Ready for digital sharing or luxury printing.', icon: Crown }
                        ].map((item, i) => (
                            <div key={i} className="group relative space-y-10 p-12 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-blue/30 transition-all duration-500 hover:-translate-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20 group-hover:bg-brand-blue group-hover:scale-110 transition-all duration-500 shadow-xl shadow-brand-blue/10">
                                        <item.icon className="w-8 h-8 text-brand-blue group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-4xl font-serif text-white/5 group-hover:text-brand-blue/20 transition-colors font-black">{item.step}</span>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold uppercase tracking-widest text-white group-hover:text-brand-blue transition-colors">{item.title}</h3>
                                    <p className="text-white/40 text-[11px] leading-relaxed tracking-wide font-light">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Final CTA Strip */}
                    <div className="pt-20 text-center animate-fade-in">
                        <button
                            onClick={onGetStarted}
                            className="group relative px-20 py-8 border-2 border-brand-blue text-white text-[13px] font-black uppercase tracking-[0.5em] overflow-hidden transition-all duration-700 hover:bg-brand-blue rounded-sm"
                        >
                            <span className="relative z-10">Start Your Legacy Now</span>
                            <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-brand-blue transition-all duration-500 -z-0"></div>
                        </button>
                    </div>
                </div>
            </section>

            {/* PREMIUM DARK FOOTER */}
            <footer className="relative z-10 py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex flex-col gap-3 opacity-40">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">© 2024 Paper Studio</span>
                        <div className="h-[2px] w-16 bg-brand-blue"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue">AERG IMENA Family</span>
                    </div>

                    <div className="flex gap-12 text-[9px] uppercase tracking-[0.4em] font-bold text-white/30">
                        <a href="#" className="hover:text-brand-blue transition-colors">Privacy</a>
                        <a href="#" className="hover:text-brand-blue transition-colors">Terms</a>
                        <a href="#" className="hover:text-brand-blue transition-colors">Support</a>
                    </div>

                    <div className="flex flex-col items-end gap-3 opacity-40">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">Crafted with Purpose</span>
                            <Crown className="w-4 h-4 text-brand-gold" />
                        </div>
                        <div className="h-[2px] w-16 bg-brand-gold"></div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;
