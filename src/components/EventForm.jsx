import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Download, Calendar, MapPin, Clock, Type, AlignLeft, Phone, FileText, Sparkles, User, UserCheck } from 'lucide-react';
import InvitationPreview from './InvitationPreview';
import { downloadPDF } from '../utils/pdfUtils';

// Animated Input Group with Floating Label & Spotlight Support
const InputGroup = ({
    label, name, value, onChange, type = "text", icon: Icon, placeholder, multiline = false,
    delay, isFocused, onFocus, onBlur, className
}) => {
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
        setHasValue(!!value);
    }, [value]);

    return (
        <div
            className={`relative transition-all duration-300 ease-out ${className}
        ${isFocused ? 'z-50' : 'z-0 opacity-100'} 
      `}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div
                className={`relative group bg-neutral-900/60 backdrop-blur-md border rounded-xl overflow-hidden transition-all duration-300
            ${isFocused
                        ? 'border-gold-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-neutral-900/90 -translate-y-1'
                        : 'border-neutral-800 hover:border-neutral-700'
                    }
        `}
            >
                {/* Floating Label */}
                <label
                    className={`absolute left-10 transition-all duration-300 pointer-events-none z-10
                ${(isFocused || hasValue)
                            ? 'top-2 text-[9px] text-gold-500 font-bold tracking-[0.2em] uppercase'
                            : 'top-4 text-sm text-neutral-500 font-medium tracking-wide'
                        }
            `}
                >
                    {label}
                </label>

                {/* Icon */}
                <div className={`absolute top-0 left-0 h-full w-10 flex items-center justify-center transition-colors duration-300
            ${isFocused ? 'text-gold-400' : 'text-neutral-600'}
        `}>
                    {Icon && <Icon className="w-4 h-4" />}
                </div>

                {multiline ? (
                    <textarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        rows="4"
                        className="w-full bg-transparent border-none text-gold-100 placeholder-transparent focus:ring-0 pt-7 pb-3 pl-10 pr-4 text-sm resize-none custom-scrollbar"
                        placeholder={placeholder}
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        className="w-full bg-transparent border-none text-gold-100 placeholder-transparent focus:ring-0 pt-7 pb-3 pl-10 pr-4 text-sm h-[60px]"
                        placeholder={placeholder}
                    />
                )}

                {/* Focus Glow Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-gold-500/5 opacity-0 transition-opacity duration-500 pointer-events-none ${isFocused ? 'opacity-100' : ''}`} />
            </div>
        </div>
    );
};

const EventForm = ({ onBack }) => {
    const previewRef = useRef();
    const [templateType, setTemplateType] = useState('birthday');
    const [focusedField, setFocusedField] = useState(null);

    const [formData, setFormData] = useState({
        title: 'Happy Birthday',
        subtitle: 'Sarah!',
        date: 'March 16, 2024',
        time: 'At 5:00 PM',
        location: '123 Anywhere St., Any City',
        phone: '+123-456-7890',
        message: 'Wishing you a day filled with love and laughter!',
        variant: 1
    });

    const [templateImages, setTemplateImages] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageKey = `${templateType}-${formData.variant}`;
                setTemplateImages(prev => ({ ...prev, [imageKey]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFocus = (name) => setFocusedField(name);
    const handleBlur = () => setFocusedField(null);

    const handleDownload = () => {
        downloadPDF('invitation-card', `PaperPop-${formData.title}.pdf`);
    };

    const templates = [
        { id: 'birthday', label: 'Birthday', icon: '🎂' },
        { id: 'assembly', label: 'Assembly', icon: '🏛️' },
        { id: 'announcement', label: 'Notices', icon: '📢' },
        { id: 'achievement', label: 'Award', icon: '🎓' },
    ];

    // Dynamic field configuration based on template
    const getFieldConfig = () => {
        // Defaults
        let config = {
            showTime: true,
            showLocation: true,
            locationLabel: 'Venue Location',
            locationIcon: MapPin,
            titleLabel: 'Event Title',
            showPhone: true,
            phoneLabel: 'Contact / RSVP',
            showImage: false,
            variants: [
                { id: 1, name: 'Classic', preview: '✨' },
                { id: 2, name: 'Modern', preview: '💫' }
            ]
        };

        switch (templateType) {
            case 'birthday':
                config.showTime = false;
                config.showLocation = false;
                config.showPhone = true;
                config.showImage = true;
                config.titleLabel = 'Greeting';
                config.variants = [
                    { id: 1, name: 'Royal Gold', preview: '👑' },
                    { id: 2, name: 'Floral Dream', preview: '🌸' },
                    { id: 3, name: 'Minimal Dark', preview: '🖤' },
                    { id: 4, name: 'Festive Balloons', preview: '🎈' },
                    { id: 5, name: 'Golden Invite', preview: '✉️' }
                ];
                break;
            case 'achievement':
                config.showTime = false;
                config.locationLabel = 'Sender / From';
                config.locationIcon = User;
                config.titleLabel = 'Award / Title';
                config.phoneLabel = 'Date / Year';
                config.showPhone = false;
                config.showImage = true;
                config.variants = [
                    { id: 1, name: 'Classic Award', preview: '🏆' },
                    { id: 2, name: 'Modern Badge', preview: '🏅' }
                ];
                break;
            case 'announcement':
                config.titleLabel = 'Headline';
                config.showImage = true;
                config.variants = [
                    { id: 1, name: 'Official', preview: '📋' },
                    { id: 2, name: 'Bold News', preview: '🗞️' }
                ];
                break;
            case 'assembly':
                config.showImage = true;
                config.variants = [
                    { id: 1, name: 'Scholarly', preview: '📚' },
                    { id: 2, name: 'Modern Meet', preview: '🤝' }
                ];
                break;
            default:
                break;
        }

        return config;
    };

    const { showTime, showLocation, locationLabel, locationIcon, titleLabel, showPhone, phoneLabel, showImage, variants } = getFieldConfig();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-gold-500/30 selection:text-gold-200">

            {/* LEFT PANEL: Controls */}
            <div className="w-full lg:w-[480px] h-screen overflow-y-auto bg-neutral-950 border-r border-gold-900/20 relative z-20 custom-scrollbar flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.5)]">

                {/* Dim overlay when focusing */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-[1px] transition-opacity duration-500 pointer-events-none z-40
                ${focusedField ? 'opacity-100' : 'opacity-0'}
            `}
                />

                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0" />

                <div className="p-8 lg:p-10 pb-32 relative z-10">
                    <button
                        onClick={onBack}
                        className="group flex items-center text-xs font-bold text-neutral-500 hover:text-gold-400 transition-colors mb-8 tracking-[0.2em] uppercase"
                    >
                        <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>

                    <header className="mb-8 animate-fade-in-up">
                        <h2 className="text-3xl font-serif text-white mb-2 drop-shadow-md">
                            Design <span className="italic text-gold-400">Stationery</span>
                        </h2>
                        <div className="w-8 h-1 bg-gold-600 rounded-full mb-4"></div>
                    </header>

                    {/* Template Selector */}
                    <div className="mb-8 animate-fade-in-up animation-delay-200">
                        <label className="text-[10px] text-neutral-500 font-bold tracking-[0.2em] uppercase mb-3 block">Category</label>
                        <div className="grid grid-cols-4 gap-2 bg-neutral-900/50 p-1 rounded-2xl border border-neutral-800">
                            {templates.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        setTemplateType(t.id);
                                        setFormData(prev => ({ ...prev, variant: 1 }));
                                    }}
                                    className={`relative flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 group
                                ${templateType === t.id
                                            ? 'bg-neutral-800 shadow-lg ring-1 ring-gold-500/50'
                                            : 'hover:bg-neutral-800/50'
                                        }`}
                                >
                                    <span className={`text-xl mb-1 transform transition-transform duration-300 ${templateType === t.id ? 'scale-110' : 'scale-100 grayscale group-hover:grayscale-0'}`}>
                                        {t.icon}
                                    </span>
                                    <span className={`text-[9px] font-bold tracking-wider uppercase ${templateType === t.id ? 'text-gold-400' : 'text-neutral-500'}`}>
                                        {t.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Variant Selector */}
                    <div className="mb-8 animate-fade-in-up animation-delay-300">
                        <label className="text-[10px] text-neutral-500 font-bold tracking-[0.2em] uppercase mb-3 block">Style Variant</label>
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                            {variants.map((v) => (
                                <button
                                    key={v.id}
                                    onClick={() => setFormData(prev => ({ ...prev, variant: v.id }))}
                                    className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300
                                ${formData.variant === v.id
                                            ? 'bg-gold-500/10 border-gold-500 text-gold-400'
                                            : 'bg-neutral-900/40 border-neutral-800 text-neutral-500 hover:border-neutral-700'
                                        }`}
                                >
                                    <span className="text-lg">{v.preview}</span>
                                    <span className="text-[10px] font-bold tracking-widest uppercase truncate max-w-[80px]">
                                        {v.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Smart Form Inputs */}
                    <div className="space-y-8">
                        {/* Section: Core Content */}
                        <section className="space-y-4">
                            <h3 className="text-[10px] font-bold text-neutral-600 tracking-[0.3em] uppercase border-b border-neutral-900 pb-2 mb-4">Core Content</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup
                                    delay={300} icon={Type} label={titleLabel} name="title"
                                    value={formData.title} onChange={handleChange} placeholder="e.g. Birthday"
                                    isFocused={focusedField === 'title'} onFocus={() => handleFocus('title')} onBlur={handleBlur}
                                />
                                <InputGroup
                                    delay={350} icon={AlignLeft} label="Subtitle" name="subtitle"
                                    value={formData.subtitle} onChange={handleChange} placeholder="e.g. Sarah!"
                                    isFocused={focusedField === 'subtitle'} onFocus={() => handleFocus('subtitle')} onBlur={handleBlur}
                                />
                            </div>

                            <InputGroup
                                delay={400} icon={FileText} label="Message & Details" name="message"
                                value={formData.message} onChange={handleChange} placeholder="Custom message..." multiline
                                isFocused={focusedField === 'message'} onFocus={() => handleFocus('message')} onBlur={handleBlur}
                            />
                        </section>

                        {/* Section: Visuals */}
                        {showImage && (
                            <section className="space-y-4 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
                                <div className="flex justify-between items-center border-b border-neutral-900 pb-2 mb-4">
                                    <h3 className="text-[10px] font-bold text-neutral-600 tracking-[0.3em] uppercase">Visuals</h3>
                                    <span className="text-[8px] text-gold-500 font-bold tracking-widest uppercase bg-gold-500/10 px-2 py-0.5 rounded-full">Local Upload</span>
                                </div>
                                <div className="relative group">
                                    <div className="flex flex-col gap-4 bg-neutral-900/40 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 hover:border-gold-500/30 transition-all duration-300 shadow-xl">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 bg-neutral-800 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-neutral-700 shadow-inner group-hover:border-gold-500/50 transition-colors">
                                                {templateImages[`${templateType}-${formData.variant}`] ? (
                                                    <img src={templateImages[`${templateType}-${formData.variant}`]} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-1">
                                                        <User className="w-8 h-8 text-neutral-600" />
                                                        <span className="text-[8px] text-neutral-600 font-bold uppercase tracking-widest">No Image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-white mb-1">Upload Photo</h4>
                                                <p className="text-[10px] text-neutral-500 leading-relaxed font-medium">Choose a photo from your computer storage to personalize your card.</p>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                id="file-upload"
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="file-upload"
                                                className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl cursor-pointer transition-all duration-200 border border-neutral-700 active:scale-[0.98]"
                                            >
                                                <Sparkles className="w-4 h-4 text-gold-500" />
                                                <span className="text-xs font-bold tracking-widest uppercase">Browse Files</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Section: Logistics */}
                        <section className="space-y-4 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                            <h3 className="text-[10px] font-bold text-neutral-600 tracking-[0.3em] uppercase border-b border-neutral-900 pb-2 mb-4">Logistics</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup
                                    delay={550} icon={Calendar} label="Date" name="date"
                                    value={formData.date} onChange={handleChange} placeholder="Date"
                                    isFocused={focusedField === 'date'} onFocus={() => handleFocus('date')} onBlur={handleBlur}
                                />

                                {showTime && (
                                    <InputGroup
                                        delay={600} icon={Clock} label="Time" name="time"
                                        value={formData.time} onChange={handleChange} placeholder="Time"
                                        isFocused={focusedField === 'time'} onFocus={() => handleFocus('time')} onBlur={handleBlur}
                                    />
                                )}
                            </div>

                            {showLocation && (
                                <InputGroup
                                    delay={650} icon={locationIcon} label={locationLabel} name="location"
                                    value={formData.location} onChange={handleChange} placeholder="Address or Name..."
                                    isFocused={focusedField === 'location'} onFocus={() => handleFocus('location')} onBlur={handleBlur}
                                />
                            )}

                            {showPhone && (
                                <InputGroup
                                    delay={700} icon={Phone} label={phoneLabel} name="phone"
                                    value={formData.phone} onChange={handleChange} placeholder="Contact info"
                                    isFocused={focusedField === 'phone'} onFocus={() => handleFocus('phone')} onBlur={handleBlur}
                                />
                            )}
                        </section>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="sticky bottom-0 left-0 w-full p-6 bg-neutral-950 border-t border-neutral-900 z-[100] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                    <button
                        onClick={handleDownload}
                        className="w-full relative group overflow-hidden rounded-xl bg-gold-500 text-black font-bold py-4 shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:-translate-y-1 active:translate-y-0"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 flex items-center justify-center gap-2 tracking-[0.2em] uppercase text-xs">
                            <Download className="w-4 h-4" />
                            Generate & Download PDF
                        </span>
                    </button>
                    <p className="text-center text-neutral-600 text-[8px] font-bold tracking-[0.2em] uppercase mt-4">Premium PaperPop Stationery</p>
                </div>
            </div>

            {/* RIGHT PANEL: Preview */}
            <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden perspective-1000">

                {/* Cinematic Backdrop */}
                <div className="absolute inset-0">
                    <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-gradient-radial from-gold-900/20 to-transparent opacity-50 blur-[100px] animate-pulse"></div>
                    {/* Floating Dust */}
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-white/10 rounded-full"
                            style={{
                                width: Math.random() * 2 + 'px',
                                height: Math.random() * 2 + 'px',
                                top: Math.random() * 100 + '%',
                                left: Math.random() * 100 + '%',
                                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                                animationDelay: `-${Math.random() * 10}s`
                            }}
                        />
                    ))}
                </div>

                {/* 3D Card Stage */}
                <div className="relative z-10 transition-transform duration-700 ease-out transform hover:scale-[1.02] hover:rotate-y-2 hover:rotate-x-2">

                    {/* Spotlight on Card */}
                    <div className="absolute inset-0 bg-gold-400/5 blur-3xl rounded-full transform scale-150"></div>

                    <div className="relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] rounded-sm border-[0.5px] border-white/10 ring-1 ring-black/50">
                        <InvitationPreview
                            ref={previewRef}
                            data={{ ...formData, image: templateImages[`${templateType}-${formData.variant}`] }}
                            templateType={templateType}
                        />
                    </div>

                    {/* Glass Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 pointer-events-none mix-blend-overlay rounded-sm"></div>
                </div>

            </div>
        </div>
    );
};

export default EventForm;
