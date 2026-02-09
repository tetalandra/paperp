import React, { useState, useRef, useEffect } from 'react';
import {
    ChevronRight, Camera, Palette, Layout, Heart,
    Gift, Bell, BookOpen, Users, Feather, Award as AwardIcon, Image as ImageIcon,
    CheckCircle, MessageSquare, Star, PartyPopper, Crown, Scissors, Trophy,
    GraduationCap, Presentation, Flower2, Flame, User, Type, AlignLeft,
    ArrowLeft, Download, Calendar, MapPin, Clock, Phone, FileText, Save, Loader2, Megaphone,
    Cake, Rose, Sparkles, Home
} from 'lucide-react';
import InvitationPreview from './InvitationPreview';
import { downloadPDF, downloadPNG } from '../utils/pdfUtils';
import { createInvitation, uploadImage } from '../utils/api';
import Toast from './Toast';

import birthdayV5 from '../assets/templates/birthday_variant_5.jpg';
import birthdayV6 from '../assets/templates/birthday_variant_6.jpg';
import birthdayV7 from '../assets/templates/birthday_variant_7.jpg';
import noticeV5 from '../assets/templates/notice_variant_5.jpg';
import noticeV6 from '../assets/templates/notice_variant_6.jpg';
import noticeV7 from '../assets/templates/notice_variant_7.jpg';
import assemblyTuesday from '../assets/templates/17.jpg';
import awardBg from '../assets/templates/18.jpg';
import assemblySaturday from '../assets/templates/19.jpg';
import kwibukaBg from '../assets/templates/kwibuka.jpg';
import kwibukaLogo from '../assets/kwibuka.png';
import valentineV10 from '../assets/templates/valentine_v10.jpg';
import valentineV11 from '../assets/templates/valentine_v11.jpg';
import noticeV20 from '../assets/templates/20.jpg';
import awardGraduation from '../assets/templates/21.jpg';
const InputGroup = ({
    label, name, value, onChange, type = "text", icon: Icon, placeholder, multiline = false,
    delay, isFocused, onFocus, onBlur, className, required = false
}) => {
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
        setHasValue(!!value);
    }, [value]);

    return (
        <div
            className={`relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div
                className={`relative group studio-glass studio-border rounded-[1.5rem] overflow-hidden transition-all duration-700
                ${isFocused
                        ? 'border-brand-blue/30 studio-shadow bg-card/80 -translate-y-1'
                        : 'border-white/5 hover:border-white/10'
                    }
            `}
            >
                {/* Floating Label */}
                <label
                    className={`absolute left-14 transition-all duration-700 pointer-events-none z-10 font-semibold tracking-[0.2em] uppercase
                    ${(isFocused || hasValue)
                            ? 'top-4 text-[7px] text-brand-blue'
                            : 'top-1/2 -translate-y-1/2 text-[9px] text-neutral-500'
                        }
                `}
                >
                    {label} {required && <span className="text-red-500/50 transform group-hover:scale-110 inline-block transition-transform">*</span>}
                </label>

                {/* Icon Container */}
                <div className={`absolute top-0 left-0 h-full w-14 flex items-center justify-center transition-all duration-700
                    ${isFocused ? 'text-brand-blue scale-110' : 'text-neutral-600 opacity-40'}
                `}>
                    <div className={`p-2 rounded-full transition-all duration-700 ${isFocused ? 'bg-brand-blue/10' : 'bg-transparent'}`}>
                        {Icon && <Icon className="w-5 h-5" />}
                    </div>
                </div>

                {multiline ? (
                    <textarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        rows="4"
                        className="w-full bg-transparent border-none text-foreground placeholder-transparent focus:ring-0 pt-10 pb-5 pl-14 pr-7 text-[13px] resize-none custom-scrollbar font-medium leading-relaxed tracking-wide"
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
                        className="w-full bg-transparent border-none text-foreground placeholder-transparent focus:ring-0 pt-10 pb-5 pl-14 pr-7 text-[15px] h-[76px] font-medium tracking-wide"
                        placeholder={placeholder}
                    />
                )}

                {/* Elegant Focus Indicator */}
                <div className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent transition-all duration-1000 ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
            </div>
        </div>
    );
};

const EventForm = ({ onBack }) => {
    const previewRef = useRef();
    const [templateType, setTemplateType] = useState('birthday');
    const [focusedField, setFocusedField] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    const initialFormState = {
        title: '',
        subtitle: '',
        date: '',
        time: '',
        location: '',
        phone: '',
        message: '',
        variant: 1,
        backgroundType: 'color',
        backgroundImage: null,
        image: null // Personal photo
    };

    const [formData, setFormData] = useState({
        // Birthdays
        'birthday-5': { ...initialFormState, title: 'John Doe', subtitle: 'Birthday Party', date: 'March 16', variant: 5, backgroundType: 'image', backgroundImage: birthdayV5.src || birthdayV5 },
        'birthday-6': { ...initialFormState, title: 'Modern One', variant: 6, backgroundType: 'image', backgroundImage: birthdayV6.src || birthdayV6 },
        'birthday-7': { ...initialFormState, title: 'Balloon Day', variant: 7, backgroundType: 'image', backgroundImage: birthdayV7.src || birthdayV7 },
        // Announcements
        'announcement-5': { ...initialFormState, title: 'Annual Gala', subtitle: 'Global Solutions', variant: 5, backgroundType: 'image', backgroundImage: noticeV5.src || noticeV5 },
        'announcement-6': { ...initialFormState, title: 'Luxury Event', variant: 6, backgroundType: 'image', backgroundImage: noticeV20.src || noticeV20 },
        'announcement-7': { ...initialFormState, title: 'Grand Opening', subtitle: "Ray's Bistro", variant: 7, backgroundType: 'image', backgroundImage: noticeV7.src || noticeV7 },
        // Achievement
        'achievement-0': { ...initialFormState, title: 'Certificate of Excellence', variant: 0, backgroundType: 'image', backgroundImage: awardBg.src || awardBg },
        'achievement-30': { ...initialFormState, title: 'SOFTWARE ENGINEER', subtitle: 'David Lee', location: 'COMPANY NAME', variant: 30, backgroundType: 'color' },
        'achievement-31': { ...initialFormState, title: 'Class of 2026', subtitle: 'Jordan Jonson', variant: 31, backgroundType: 'image', backgroundImage: awardGraduation.src || awardGraduation },
        // Assembly
        'assembly-3': { ...initialFormState, title: 'Weekly Assembly', variant: 3, backgroundType: 'image', backgroundImage: assemblyTuesday.src || assemblyTuesday },
        'assembly-4': { ...initialFormState, variant: 4, backgroundType: 'image', backgroundImage: assemblySaturday.src || assemblySaturday },
        // Valentine
        'valentine-10': { ...initialFormState, title: "", subtitle: '', variant: 10, backgroundType: 'image', backgroundImage: valentineV10.src || valentineV10 },
        'valentine-11': { ...initialFormState, title: "", subtitle: '', variant: 11, backgroundType: 'image', backgroundImage: valentineV11.src || valentineV11 },
        // Remembering
        'remembering-20': { ...initialFormState, title: "In Memory", subtitle: 'Peaceful Lily', variant: 20 },
        'remembering-21': { ...initialFormState, title: "Kwibuka 31", subtitle: 'Remember-Unite-Renew', variant: 21, backgroundType: 'image', backgroundImage: kwibukaBg.src || kwibukaBg, logo: kwibukaLogo },
    });

    const [currentVariant, setCurrentVariant] = useState(5); // Shared across types but used as key

    const activeKey = `${templateType}-${currentVariant}`;
    const activeData = formData[activeKey] || { ...initialFormState, variant: currentVariant };

    const [templateImages, setTemplateImages] = useState({});
    const [imageFiles, setImageFiles] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [activeKey]: { ...activeData, [name]: value }
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageKey = activeKey;
                setTemplateImages(prev => ({ ...prev, [imageKey]: reader.result }));
                setImageFiles(prev => ({ ...prev, [imageKey]: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    const selectPredefinedTemplate = (bg) => {
        setCurrentVariant(bg.variant);
        // Ensure the data exists for this specific premium choice
        if (!formData[`${templateType}-${bg.variant}`]) {
            setFormData(prev => ({
                ...prev,
                [`${templateType}-${bg.variant}`]: {
                    ...initialFormState,
                    variant: bg.variant,
                    backgroundImage: bg.img,
                    backgroundType: bg.img ? 'image' : 'color'
                }
            }));
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        const { requiredFields } = getFieldConfig();
        const missingFields = requiredFields.filter(f => !activeData[f]);

        if (missingFields.length > 0) {
            showToast(`Missing fields: ${missingFields.join(', ')}`, 'error');
            setIsSaving(false);
            return;
        }

        try {
            let personalImageUrl = activeData.image; // Should be null or existing URL
            const imageKey = `${templateType}-${activeData.variant}`;
            const file = imageFiles[imageKey];

            if (file) {
                const uploadRes = await uploadImage(file);
                personalImageUrl = uploadRes.url;
            }

            await createInvitation({
                ...activeData,
                templateType,
                image: personalImageUrl,
                backgroundImage: activeData.backgroundImage
            });

            showToast('Invitation saved successfully!', 'success');
        } catch (error) {
            console.error(error);
            showToast('Failed to save invitation', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleFocus = (name) => setFocusedField(name);
    const handleBlur = () => setFocusedField(null);

    const handleDownload = async () => {
        try {
            await downloadPDF('invitation-card', `Paper-${activeData.title || 'Invitation'}.pdf`);
            showToast('PDF Downloaded Successfully', 'success');
        } catch (error) {
            console.error(error);
            showToast('Failed to download PDF', 'error');
        }
    };

    const templates = [
        { id: 'birthday', label: 'Birthday', icon: <Gift className="w-10 h-10" />, color: 'from-brand-blue/20' },
        { id: 'announcement', label: 'Notices', icon: <Bell className="w-10 h-10" />, color: 'from-brand-gold/20' },
        { id: 'achievement', label: 'Award', icon: <AwardIcon className="w-10 h-10" />, color: 'from-brand-blue/20' },
        { id: 'assembly', label: 'Assembly', icon: <Users className="w-10 h-10" />, color: 'from-brand-gold/20' },
        { id: 'valentine', label: 'Valentine', icon: <Heart className="w-10 h-10" />, color: 'from-red-500/20' },
        { id: 'remembering', label: 'Remembering', icon: <Flower2 className="w-10 h-10" />, color: 'from-neutral-500/20' },
    ];

    const predefinedBackgrounds = [
        { id: 'b5', label: 'Golden Glitter', img: birthdayV5.src || birthdayV5, variant: 5, category: 'birthday' },
        { id: 'b6', label: 'Modern Photo', img: birthdayV6.src || birthdayV6, variant: 6, category: 'birthday' },
        { id: 'b7', label: 'Balloon Party', img: birthdayV7.src || birthdayV7, variant: 7, category: 'birthday' },
        { id: 'n5', label: 'Annual Gala', img: noticeV5.src || noticeV5, variant: 5, category: 'announcement' },
        { id: 'n6', label: 'Luxury Event', img: noticeV20.src || noticeV20, variant: 6, category: 'announcement' },
        { id: 'n7', label: 'Grand Opening', img: noticeV7.src || noticeV7, variant: 7, category: 'announcement' },
        { id: 'v10', label: 'Velvet Romance', img: valentineV10.src || valentineV10, variant: 10, category: 'valentine' },
        { id: 'v11', label: 'Peony Lace', img: valentineV11.src || valentineV11, variant: 11, category: 'valentine' },
        { id: 'r20', label: 'Peaceful Lily', img: null, variant: 20, category: 'remembering' },
        { id: 'r21', label: 'Candle Light', img: null, variant: 21, category: 'remembering' },
        { id: 'a30', label: 'Employee of Month', img: null, variant: 30, category: 'achievement' },
        { id: 'a31', label: 'Graduation Gratitude', img: null, variant: 31, category: 'achievement' },
    ];

    const getFieldConfig = () => {
        let config = {
            showTime: true,
            showLocation: true,
            locationLabel: 'Location',
            locationIcon: MapPin,
            titleLabel: 'Headline',
            subtitleLabel: 'Name / Subject',
            dateLabel: 'Event Date',
            showPhone: true,
            phoneLabel: 'R.S.V.P',
            showImage: false,
            requiredFields: ['title', 'date', 'location'],
            messagePlaceholder: 'Write a warm invitation message...',
            messageLabel: 'Invitation Message',
            showMessage: true,
            showDate: true,
        };

        switch (templateType) {
            case 'birthday':
                config.showImage = true;
                config.titleLabel = 'Birthday Name';
                config.locationLabel = 'Party Venue';
                config.requiredFields = ['title', 'date', 'location', 'time'];
                config.messagePlaceholder = 'Wishing you a very happy birthday...';
                config.variants = [
                    { id: 5, name: 'Golden Glitter', preview: <Sparkles className="w-7 h-7" />, img: birthdayV5.src || birthdayV5 },
                    { id: 6, name: 'Modern Photo', preview: <Camera className="w-7 h-7" />, img: birthdayV6.src || birthdayV6 },
                    { id: 7, name: 'Balloon Party', preview: <Gift className="w-7 h-7" />, img: birthdayV7.src || birthdayV7 }
                ];
                break;
            case 'announcement':
                config.showImage = false;
                config.titleLabel = 'Event Title';
                config.requiredFields = ['title', 'date', 'location'];
                config.variants = [
                    { id: 5, name: 'Annual Gala', preview: <Bell className="w-7 h-7" />, img: noticeV5.src || noticeV5 },
                    { id: 6, name: 'Luxury Event', preview: <Crown className="w-7 h-7" />, img: noticeV20.src || noticeV20 },
                    { id: 7, name: 'Grand Opening', preview: <AwardIcon className="w-7 h-7" />, img: noticeV7.src || noticeV7 }
                ];

                // Variant Specific Adjustments
                if (currentVariant === 6) {
                    config.showTime = false;
                    config.showPhone = false;
                }
                if (currentVariant === 7) {
                    config.showMessage = false;
                }
                break;
            case 'achievement':
                config.showTime = false;
                config.showPhone = false;
                config.showImage = true; // Enabled for 18.jpg
                config.titleLabel = 'Award Holder';
                config.locationLabel = 'Award Title';
                config.requiredFields = ['title', 'location', 'date'];

                // Variant Specific Adjustments
                if (currentVariant === 30) {
                    config.showImage = true;
                    config.titleLabel = 'Job Role';
                    config.subtitleLabel = 'Employee Name';
                    config.locationLabel = 'Company Name';
                }
                if (currentVariant === 31) {
                    config.titleLabel = 'Graduation Year';
                    config.subtitleLabel = 'Graduate Name';
                    config.dateLabel = 'Class of';
                }

                config.variants = [
                    { id: 0, name: 'Premium Certificate', preview: <AwardIcon className="w-7 h-7" />, img: awardBg.src || awardBg },
                    { id: 30, name: 'Employee Month', preview: <Trophy className="w-7 h-7" /> },
                    { id: 31, name: 'Graduation', preview: <GraduationCap className="w-7 h-7" />, img: awardGraduation.src || awardGraduation }
                ];
                break;
            case 'assembly':
                config.showImage = false;
                config.titleLabel = 'Assembly Name';
                config.requiredFields = ['title', 'date', 'location'];
                config.variants = [
                    { id: 3, name: 'Tuesday Session', preview: <Users className="w-7 h-7" />, img: assemblyTuesday.src || assemblyTuesday },
                    { id: 4, name: 'Saturday Session', preview: <Users className="w-7 h-7" />, img: assemblySaturday.src || assemblySaturday }
                ];

                if (currentVariant === 4) {
                    config.messagePlaceholder = 'Enter the words for inviting people...';
                    config.messageLabel = 'Invitation Words';
                    config.requiredFields = [...config.requiredFields, 'message'];
                }
                break;
            case 'valentine':
                config.showTime = false;
                config.showLocation = false;
                config.showPhone = false;
                config.dateLabel = 'Valentine Date';
                config.titleLabel = 'Romantic Title';
                config.subtitleLabel = 'Couple Names / Subtitle';
                config.requiredFields = ['title']; // simplified
                config.showMessage = true;
                config.messagePlaceholder = 'Enter your heartfelt wishes here...';
                config.messageLabel = 'Your Wishes';
                config.variants = [
                    { id: 10, name: 'Velvet Romance', preview: <Rose className="w-7 h-7" />, img: valentineV10.src || valentineV10 },
                    { id: 11, name: 'Peony Lace', preview: <Heart className="w-7 h-7" />, img: valentineV11.src || valentineV11 }
                ];
                break;
            case 'remembering':
                config.titleLabel = 'Full Name';
                config.subtitleLabel = 'Life Dates (e.g. 1950 - 2026)';
                config.locationLabel = 'Chapel / Location';
                config.phoneLabel = 'Contact Person';
                config.requiredFields = ['title', 'date', 'location'];
                config.messagePlaceholder = 'A tribute to a life well lived...';
                config.variants = [
                    { id: 20, name: 'Peaceful Lily', preview: <Flower2 className="w-7 h-7" /> },
                    { id: 21, name: 'Kwibuka', preview: <Flame className="w-7 h-7" />, img: kwibukaBg.src || kwibukaBg, logo: kwibukaLogo }
                ];

                if (currentVariant === 21) {
                    config.showDate = false;
                    config.showTime = false;
                    config.showLocation = false;
                    config.showPhone = false;
                    config.titleLabel = 'Title';
                    config.subtitleLabel = 'Subtitle / Motto';
                }
                break;
        }
        return config;
    };

    const {
        showTime, showLocation, locationLabel, locationIcon, titleLabel, subtitleLabel, dateLabel,
        showPhone, phoneLabel, showImage, variants, requiredFields, messagePlaceholder, showMessage, showDate,
        messageLabel
    } = getFieldConfig();

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row overflow-hidden font-sans transition-colors duration-500">

            {/* LEFT SIDEBAR: CREATIVE CONTROLS */}
            <div
                onMouseMove={handleMouseMove}
                style={{ '--mouse-x': `${mousePos.x}%`, '--mouse-y': `${mousePos.y}%` }}
                className="w-full lg:w-[600px] h-screen overflow-y-auto bg-card/40 backdrop-blur-[60px] border-r studio-border relative z-20 custom-scrollbar flex flex-col transition-all duration-1000 ease-in-out noise-bg studio-pattern shadow-[30px_0_90px_rgba(0,0,0,0.1)] artisan-spotlight"
            >

                {/* Visual Flair: Top Gradient */}
                <div className={`absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b ${templates.find(t => t.id === templateType)?.color || 'from-brand-blue/10'} to-transparent opacity-40 pointer-events-none z-0 transition-all duration-1000`}></div>

                <div className="p-8 lg:p-12 pb-32 relative z-10">
                    {/* Header Navigation */}
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="group flex items-center gap-3 text-[10px] font-black text-neutral-500 hover:text-foreground transition-all tracking-[0.3em] uppercase"
                            >
                                <Home className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                Home
                            </button>
                            <button onClick={onBack} className="group flex items-center gap-3 text-[10px] font-black text-neutral-500 hover:text-foreground transition-all tracking-[0.3em] uppercase">
                                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                                Studio
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></div>
                            <span className="text-[10px] font-bold text-brand-blue tracking-widest uppercase">Live Draft</span>
                        </div>
                    </div>

                    <header className="mb-14 relative">
                        <h1 className="text-6xl font-serif text-foreground mb-4 leading-[1] tracking-tight studio-text">
                            Craft Your <br />
                            <span className="italic bg-gradient-to-r from-brand-blue via-brand-gold to-brand-blue animate-shine bg-clip-text text-transparent">Digital Couture</span>
                        </h1>
                        <p className="text-[9px] text-neutral-500 font-medium uppercase tracking-[0.5em] opacity-60">Handcrafted detail for every celebration</p>
                    </header>

                    {/* Category Selection: Curated Boutique Grid */}
                    <div className="mb-14 relative group/cat">
                        <div className="flex items-center justify-between mb-8">
                            <label className="text-[10px] text-brand-blue font-bold tracking-[0.4em] uppercase">I. The Collection</label>
                            <Palette className="w-3.5 h-3.5 text-brand-blue/30 group-hover/cat:rotate-180 transition-transform duration-[1.5s]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {templates.map((t, idx) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        setTemplateType(t.id);
                                        const defaultVariantMap = {
                                            birthday: 5,
                                            announcement: 5,
                                            achievement: 0,
                                            assembly: 3,
                                            valentine: 10,
                                            remembering: 20
                                        };
                                        setCurrentVariant(defaultVariantMap[t.id] || 1);
                                    }}
                                    className={`relative flex flex-col items-start p-7 rounded-[2rem] border transition-all duration-700 group overflow-hidden
                                        ${templateType === t.id
                                            ? 'bg-foreground text-background studio-shadow border-foreground scale-[1.02] z-10'
                                            : 'bg-card/20 studio-border text-neutral-500 hover:border-foreground/10 hover:bg-card/40'
                                        }`}
                                >
                                    {templateType === t.id && (
                                        <div className="absolute inset-0 holographic-shimmer opacity-30 pointer-events-none"></div>
                                    )}
                                    <div className="absolute top-5 right-6 text-[8px] font-bold opacity-20 tracking-widest uppercase">
                                        0{idx + 1}
                                    </div>
                                    <div className={`p-6 rounded-[2.5rem] mb-6 transition-all duration-700 
                                        ${templateType === t.id
                                            ? 'bg-background/20 scale-110 rotate-3 shadow-[0_20px_50px_rgba(37,99,235,0.2)]'
                                            : 'bg-foreground/5 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-foreground/10 group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)]'}
                                    `}>
                                        {t.icon}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{t.label}</span>
                                    {templateType === t.id && (
                                        <div className="absolute bottom-4 right-6 w-1 h-1 bg-brand-gold rounded-full shadow-[0_0_10px_2px_rgba(245,158,11,0.5)]"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Collection Gallery: Boutique Horizontal Scroll */}
                    <div className="mb-14 group/gallery">
                        <div className="flex items-center justify-between mb-8">
                            <label className="text-[10px] text-brand-blue font-bold tracking-[0.4em] uppercase">II. The Portfolio</label>
                            <span className="text-[8px] text-brand-gold font-bold uppercase tracking-[0.4em] bg-brand-gold/5 px-4 py-2 rounded-full border border-brand-gold/10 backdrop-blur-3xl studio-shadow">Handcrafted Selection</span>
                        </div>
                        <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar snap-x px-2">
                            {predefinedBackgrounds.filter(bg => bg.category === templateType).map((bg) => (
                                <button
                                    key={bg.id}
                                    onClick={() => selectPredefinedTemplate(bg)}
                                    className={`relative flex-shrink-0 w-36 aspect-[3/4.5] rounded-[1.5rem] overflow-hidden border transition-all duration-700 group snap-start
                                        ${activeData.backgroundImage === bg.img
                                            ? 'border-brand-blue studio-shadow scale-105 z-10'
                                            : 'border-white/5 bg-card/10 hover:border-white/20'
                                        }`}
                                >
                                    {bg.img ? (
                                        <div className="w-full h-full relative overflow-hidden">
                                            <img src={bg.img} alt={bg.label} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-125 group-hover:rotate-2" />
                                            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${activeData.backgroundImage === bg.img ? 'opacity-0' : 'opacity-20 group-hover:opacity-0'}`}></div>
                                        </div>
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center
                                            ${bg.category === 'valentine' ? 'bg-gradient-to-br from-red-950 to-black' :
                                                bg.category === 'remembering' ? 'bg-gradient-to-br from-neutral-900 to-black' :
                                                    'bg-gradient-to-br from-brand-blue/20 to-brand-blue/40'}
                                        `}>
                                            <div className="flex flex-col items-center gap-2 opacity-30 group-hover:opacity-80 transition-all duration-700">
                                                {bg.category === 'valentine' ? <Heart className="w-8 h-8 text-red-400/50" /> :
                                                    bg.category === 'remembering' ? <Feather className="w-8 h-8 text-neutral-400/50" /> :
                                                        <ImageIcon className="w-8 h-8 text-brand-blue/50" />}
                                                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/40">Limited</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                        <span className="text-[10px] text-white font-bold uppercase tracking-[0.2em] leading-none block group-hover:translate-y-[-2px] transition-transform duration-500">{bg.label}</span>
                                    </div>
                                    {activeData.backgroundImage === bg.img && (
                                        <div className="absolute top-4 left-4 w-7 h-7 bg-brand-blue rounded-full border border-white/20 flex items-center justify-center shadow-2xl animate-fade-in">
                                            <CheckCircle className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Style Variant Selector: Professional Brushes */}
                    <div className="mb-14">
                        <div className="flex items-center justify-between mb-8">
                            <label className="text-[10px] text-brand-blue font-bold tracking-[0.4em] uppercase">III. The Crafting Variant</label>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {variants.map((v) => (
                                <button
                                    key={v.id}
                                    onClick={() => {
                                        setCurrentVariant(v.id);
                                        if (!formData[`${templateType}-${v.id}`]) {
                                            setFormData(prev => ({
                                                ...prev,
                                                [`${templateType}-${v.id}`]: {
                                                    ...initialFormState,
                                                    variant: v.id,
                                                    backgroundImage: v.img || initialFormState.backgroundImage,
                                                    backgroundType: v.img ? 'image' : 'color'
                                                }
                                            }));
                                        }
                                    }}
                                    className={`relative flex items-center gap-4 px-5 py-4 rounded-[1.5rem] border transition-all duration-700
                                        ${activeData.variant === v.id
                                            ? 'bg-brand-blue/5 border-brand-blue/40 text-brand-blue studio-shadow scale-[1.02]'
                                            : 'bg-card/20 studio-border text-neutral-500 hover:border-white/10'
                                        }`}
                                >
                                    {activeData.variant === v.id && (
                                        <div className="absolute inset-0 holographic-shimmer opacity-20 pointer-events-none rounded-[1.5rem]"></div>
                                    )}
                                    <div className={`p-4 rounded-2xl transition-all duration-700
                                        ${activeData.variant === v.id ? 'bg-brand-blue/10 scale-110' : 'bg-foreground/5'}
                                    `}>
                                        {v.preview}
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{v.name}</span>
                                        {activeData.variant === v.id && <span className="text-[7px] font-bold text-brand-blue/60 uppercase tracking-widest animate-pulse">Selected Style</span>}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Editor Section: Artisan concentration focus */}
                    <div className="space-y-12 transition-all duration-1000">
                        <section className={`transition-all duration-700 ${focusedField && !['title', 'subtitle'].includes(focusedField) ? 'opacity-30 blur-[2px] scale-[0.98]' : 'opacity-100 scale-100'}`}>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="brush-divider flex-1"></div>
                                <h3 className="text-[9px] font-black text-neutral-600 tracking-[0.4em] uppercase">Core Details</h3>
                                <div className="brush-divider flex-1"></div>
                            </div>
                            <div className="space-y-6">
                                <InputGroup
                                    label={titleLabel}
                                    name="title"
                                    value={activeData.title}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('title')}
                                    onBlur={handleBlur}
                                    isFocused={focusedField === 'title'}
                                    icon={Type}
                                    placeholder={titleLabel}
                                    delay={100}
                                    required={requiredFields.includes('title')}
                                />
                                <InputGroup
                                    label={subtitleLabel}
                                    name="subtitle"
                                    value={activeData.subtitle}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('subtitle')}
                                    onBlur={handleBlur}
                                    isFocused={focusedField === 'subtitle'}
                                    icon={AlignLeft}
                                    placeholder={subtitleLabel}
                                    delay={200}
                                    required={requiredFields.includes('subtitle')}
                                />
                            </div>
                        </section>

                        {(showDate || showTime || showLocation || showPhone) && (
                            <section className={`transition-all duration-700 ${focusedField && !['date', 'time', 'location', 'phone'].includes(focusedField) ? 'opacity-30 blur-[2px] scale-[0.98]' : 'opacity-100 scale-100'}`}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="brush-divider flex-1"></div>
                                    <h3 className="text-[9px] font-black text-neutral-600 tracking-[0.4em] uppercase">Atmosphere & Place</h3>
                                    <div className="brush-divider flex-1"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {showDate && (
                                        <InputGroup
                                            label={dateLabel}
                                            name="date"
                                            value={activeData.date}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('date')}
                                            onBlur={handleBlur}
                                            isFocused={focusedField === 'date'}
                                            icon={Calendar}
                                            placeholder={dateLabel}
                                            delay={300}
                                            required={requiredFields.includes('date')}
                                        />
                                    )}
                                    {showTime && (
                                        <InputGroup
                                            label="Time"
                                            name="time"
                                            value={activeData.time}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('time')}
                                            onBlur={handleBlur}
                                            isFocused={focusedField === 'time'}
                                            icon={Clock}
                                            placeholder="Event Time"
                                            delay={400}
                                            required={requiredFields.includes('time')}
                                        />
                                    )}
                                    {showLocation && (
                                        <div className="md:col-span-2">
                                            <InputGroup
                                                label={locationLabel}
                                                name="location"
                                                value={activeData.location}
                                                onChange={handleChange}
                                                onFocus={() => handleFocus('location')}
                                                onBlur={handleBlur}
                                                isFocused={focusedField === 'location'}
                                                icon={locationIcon}
                                                placeholder={locationLabel}
                                                delay={500}
                                                required={requiredFields.includes('location')}
                                            />
                                        </div>
                                    )}
                                    {showPhone && (
                                        <div className="md:col-span-2">
                                            <InputGroup
                                                label={phoneLabel}
                                                name="phone"
                                                value={activeData.phone}
                                                onChange={handleChange}
                                                onFocus={() => handleFocus('phone')}
                                                onBlur={handleBlur}
                                                isFocused={focusedField === 'phone'}
                                                icon={Phone}
                                                placeholder={phoneLabel}
                                                delay={600}
                                                required={requiredFields.includes('phone')}
                                            />
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {showMessage && (
                            <section className={`transition-all duration-700 ${focusedField && focusedField !== 'message' ? 'opacity-30 blur-[2px] scale-[0.98]' : 'opacity-100 scale-100'}`}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="brush-divider flex-1"></div>
                                    <h3 className="text-[9px] font-black text-neutral-600 tracking-[0.4em] uppercase">Bespoke Narrative</h3>
                                    <div className="brush-divider flex-1"></div>
                                </div>
                                <InputGroup
                                    label={messageLabel}
                                    name="message"
                                    value={activeData.message}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('message')}
                                    onBlur={handleBlur}
                                    isFocused={focusedField === 'message'}
                                    icon={FileText}
                                    placeholder={messagePlaceholder}
                                    multiline={true}
                                    delay={700}
                                    required={requiredFields.includes('message')}
                                />
                            </section>
                        )}
                        {showImage && (
                            <section className={`transition-all duration-700 ${focusedField ? 'opacity-30 blur-[2px] scale-[0.98]' : 'opacity-100 scale-100'}`}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="brush-divider flex-1"></div>
                                    <h3 className="text-[9px] font-black text-neutral-600 tracking-[0.4em] uppercase">Visual Assets</h3>
                                    <div className="brush-divider flex-1"></div>
                                </div>
                                <div className="studio-glass studio-border rounded-[2rem] p-8 group hover:border-brand-blue/20 transition-all duration-700 studio-shadow relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                                        <ImageIcon className="w-24 h-24 rotate-12" />
                                    </div>
                                    <div className="flex items-center gap-8 mb-8 relative z-10">
                                        <div className="w-28 h-28 bg-background/50 rounded-3xl flex items-center justify-center overflow-hidden border studio-border studio-shadow ring-4 ring-white/5">
                                            {templateImages[`${templateType}-${activeData.variant}`] ? (
                                                <img src={templateImages[`${templateType}-${activeData.variant}`]} alt="Preview" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-125" />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 opacity-20 group-hover:opacity-60 transition-all duration-700">
                                                    <Camera className="w-10 h-10 text-foreground" />
                                                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-foreground">Awaiting Asset</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-[11px] font-black text-foreground mb-3 uppercase tracking-[0.3em]">Personal Masterpiece</h4>
                                            <p className="text-[9px] text-neutral-500 font-bold leading-relaxed uppercase tracking-widest opacity-60">Upload a portrait or symbolic image to elevate the design.</p>
                                        </div>
                                    </div>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} id="file-upload" className="hidden" />
                                    <label htmlFor="file-upload" className="flex items-center justify-center gap-4 w-full py-5 bg-foreground text-background rounded-[1.25rem] cursor-pointer transition-all duration-500 border border-foreground/10 active:scale-[0.98] studio-shadow hover:translate-y-[-2px]">
                                        <ImageIcon className="w-6 h-6 text-brand-gold animate-pulse" />
                                        <span className="text-[10px] font-black tracking-[0.4em] uppercase">Select Artisan Asset</span>
                                    </label>
                                </div>
                            </section>
                        )}

                        {/* Relocated Studio Exports: Artisan completed flow */}
                        <div className="mt-20 pt-20 border-t border-white/5 flex flex-col gap-10 animate-fade-in">
                            <div className="flex flex-col items-center gap-4 mb-2">
                                <span className="text-[9px] font-black tracking-[0.6em] uppercase text-neutral-500 opacity-60">Finalize & Export</span>
                                <div className="h-10 w-[1px] bg-gradient-to-b from-neutral-500/20 to-transparent"></div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleDownload}
                                    className="flex-[2] relative group overflow-hidden rounded-[1.5rem] bg-foreground text-background py-6 studio-shadow transition-all duration-700 hover:translate-y-[-4px] active:translate-y-0"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                                    <div className="absolute inset-0 holographic-shimmer opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
                                    <span className="relative z-10 flex items-center justify-center gap-4 tracking-[0.6em] uppercase text-[10px] font-black">
                                        <Download className="w-6 h-6 text-brand-blue" />
                                        Export PDF
                                    </span>
                                </button>
                                <button
                                    onClick={async () => {
                                        try {
                                            await downloadPNG('invitation-card', `Paper-${activeData.title || 'Invitation'}.png`);
                                            showToast('PNG Downloaded Successfully', 'success');
                                        } catch (error) {
                                            console.error(error);
                                            showToast('Failed to download PNG', 'error');
                                        }
                                    }}
                                    className="flex-[1] relative group overflow-hidden rounded-[1.5rem] bg-card/20 studio-border py-6 studio-shadow transition-all duration-700 hover:translate-y-[-4px] active:translate-y-0"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                                    <span className="relative z-10 flex items-center justify-center gap-4 tracking-[0.6em] uppercase text-[10px] font-black">
                                        <ImageIcon className="w-6 h-6 text-brand-gold" />
                                        PNG
                                    </span>
                                </button>
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full relative group overflow-hidden rounded-[1.5rem] bg-card/20 studio-border py-6 studio-shadow transition-all duration-700 hover:translate-y-[-4px] disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-4"
                            >
                                {isSaving ? (
                                    <Loader2 className="w-5 h-5 animate-spin text-brand-blue" />
                                ) : (
                                    <Save className="w-5 h-5 text-brand-blue" />
                                )}
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase">Save to Collection</span>
                            </button>

                            {/* Artisan Signature Flourish */}
                            <div className="flex flex-col items-center animate-fade-in opacity-40 hover:opacity-100 transition-opacity duration-1000 mt-4">
                                <span className="text-[7px] font-bold tracking-[0.4em] text-neutral-500 uppercase mb-2">Handcrafted with passion</span>
                                <svg width="60" height="20" viewBox="0 0 100 30" className="text-brand-gold fill-current">
                                    <path d="M10 20 C 20 10, 40 10, 50 20 S 80 30, 90 20" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="animate-shine" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            {/* RIGHT SIDEBAR: PREVIEW STAGE */}
            <div className="flex-1 relative flex items-center justify-center bg-background overflow-hidden transition-colors duration-500">

                {/* Cinematic Environment */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)] opacity-60 blur-[120px]"></div>
                    <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.04)_0%,transparent_60%)] blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.04)_0%,transparent_60%)] blur-[100px]"></div>
                    {/* Perspective lines/texture */}
                    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    {/* Label/Status: Atelier Branding */}
                    <div className="mb-12 flex flex-col items-center gap-6 animate-fade-in">
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"></div>
                            <span className="text-[10px] font-black text-foreground/40 tracking-[0.8em] uppercase">The Atelier Stage</span>
                            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"></div>
                        </div>
                        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-brand-blue/40 to-transparent opacity-50"></div>
                    </div>

                    {/* The Masterpiece Stage */}
                    <div className="relative group transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu hover:scale-[1.04]">
                        {/* Shadow Diffusion: Deeper and more natural */}
                        <div className="absolute -inset-16 bg-black/40 blur-[80px] rounded-full opacity-40 group-hover:opacity-70 transition-all duration-700"></div>
                        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[80%] h-20 bg-black/40 blur-[50px] rounded-[100%] transition-opacity duration-700 opacity-50 group-hover:opacity-80"></div>

                        {/* Frame and Content: Masterpiece Studio Finish */}
                        <div className="relative shadow-[0_120px_240px_-60px_rgba(0,0,0,1)] rounded-[8px] ring-[1px] ring-white/10 overflow-hidden transform-gpu bg-card">
                            <InvitationPreview
                                ref={previewRef}
                                data={{ ...activeData, image: templateImages[`${templateType}-${activeData.variant}`] }}
                                templateType={templateType}
                            />
                            {/* Pro Soft Light Surface Reflection */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-40 pointer-events-none mix-blend-overlay"></div>
                        </div>

                        {/* Visual Quality Indicator */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-full">
                                <CheckCircle className="w-3 h-3 text-brand-gold" />
                                <span className="text-[9px] font-semibold text-foreground uppercase tracking-widest whitespace-nowrap">Premium Print Quality</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Hint */}
                <div className="absolute bottom-10 right-10 flex items-center gap-4 animate-fade-in animation-delay-700">
                    <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Scroll to Design</span>
                    <div className="w-8 h-[1px] bg-neutral-800"></div>
                </div>
            </div>

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(prev => ({ ...prev, show: false }))}
                />
            )}
        </div>
    );
};

export default EventForm;
