import React, { useState, useEffect, useCallback } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    Maximize2,
    Home,
    Building2,
    Users,
    Ticket,
    Shield,
    Brain,
    BarChart3,
    Layers,
    CheckCircle,
    Clock,
    Zap,
    Globe,
    Lock,
    Database,
    Cloud,
    Smartphone,
    MessageSquare,
    TrendingUp,
    Settings,
    FileText,
    AlertTriangle,
    ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Slide data
const slides = [
    {
        id: 1,
        type: 'title',
        title: 'Centralized White-Label Enterprise IT Helpdesk Platform',
        subtitle: 'A Multi-Tenant, Secure & AI-Powered SaaS Solution',
        footer: 'Team MetaMinds | CSE (AI/ML) Department',
    },
    {
        id: 2,
        type: 'content',
        title: 'Problem Statement',
        points: [
            { icon: AlertTriangle, text: 'Fragmented IT support across departments' },
            { icon: Ticket, text: 'No centralized ticketing system' },
            { icon: BarChart3, text: 'Lack of visibility into IT issues' },
            { icon: Clock, text: 'Manual ticket routing causes delays' },
            { icon: TrendingUp, text: 'No analytics or performance insights' },
            { icon: Lock, text: 'Security concerns with shared systems' },
        ],
    },
    {
        id: 3,
        type: 'comparison',
        title: 'Existing Solutions & Limitations',
        left: {
            title: 'Traditional Systems',
            items: ['On-premise only', 'Single tenant', 'Complex setup', 'No AI features', 'Limited customization'],
        },
        right: {
            title: 'Modern Requirements',
            items: ['Cloud-based', 'Multi-tenant', 'Quick deployment', 'AI-powered', 'White-label ready'],
        },
    },
    {
        id: 4,
        type: 'solution',
        title: 'Our Proposed Solution',
        headline: 'One Platform – Multiple Companies',
        features: [
            { icon: Layers, text: 'Multi-Tenant Architecture' },
            { icon: Building2, text: 'White-Label Branding' },
            { icon: Brain, text: 'AI-Powered Automation' },
            { icon: Shield, text: 'Secure Isolation' },
            { icon: BarChart3, text: 'Real-Time Analytics' },
        ],
    },
    {
        id: 5,
        type: 'architecture',
        title: 'Multi-Tenant Architecture',
        description: 'Complete data isolation between tenants',
        tenants: ['Company A', 'Company B', 'Company C'],
        features: ['Complete Data Isolation', 'Separate Databases', 'Individual Configurations', 'Secure Access Control'],
    },
    {
        id: 6,
        type: 'whitelabel',
        title: 'White-Label Branding',
        subtitle: 'Your Brand, Your Platform, Your Customer Experience',
        customizations: [
            { icon: Building2, text: 'Custom Logo' },
            { icon: Settings, text: 'Brand Colors' },
            { icon: Globe, text: 'Own Domain' },
            { icon: FileText, text: 'Company Name' },
        ],
    },
    {
        id: 7,
        type: 'stack',
        title: 'Platform Architecture',
        layers: [
            { name: 'Frontend', tech: 'React + TypeScript', color: '#c4b5fd' },
            { name: 'Backend', tech: 'Node.js + Firebase', color: '#a78bfa' },
            { name: 'Database', tech: 'Firestore', color: '#8b5cf6' },
            { name: 'AI Layer', tech: 'ML Models', color: '#7c3aed' },
        ],
    },
    {
        id: 8,
        type: 'roles',
        title: 'User Roles & Permissions',
        roles: [
            { name: 'Platform Admin', icon: Shield, desc: 'Full system access', color: '#7c3aed' },
            { name: 'Company Admin', icon: Building2, desc: 'Manage organization', color: '#8b5cf6' },
            { name: 'IT Manager', icon: Settings, desc: 'Configure helpdesk', color: '#a78bfa' },
            { name: 'Support Agent', icon: MessageSquare, desc: 'Handle tickets', color: '#c4b5fd' },
            { name: 'Employee', icon: Users, desc: 'Create tickets', color: '#ddd6fe' },
        ],
    },
    {
        id: 9,
        type: 'workflow',
        title: 'Employee Ticket Workflow',
        steps: [
            { num: 1, text: 'Login', icon: Lock },
            { num: 2, text: 'Create Ticket', icon: Ticket },
            { num: 3, text: 'Auto-Assign', icon: Zap },
            { num: 4, text: 'Track Progress', icon: BarChart3 },
            { num: 5, text: 'Resolution', icon: CheckCircle },
        ],
    },
    {
        id: 10,
        type: 'lifecycle',
        title: 'Ticket Lifecycle Management',
        statuses: [
            { name: 'Open', color: '#3b82f6' },
            { name: 'Assigned', color: '#f59e0b' },
            { name: 'In Progress', color: '#f97316' },
            { name: 'Resolved', color: '#22c55e' },
            { name: 'Closed', color: '#6b7280' },
        ],
    },
    {
        id: 11,
        type: 'ai',
        title: 'AI-Powered Features',
        features: [
            { icon: Brain, title: 'Auto Classification', desc: 'AI categorizes tickets by type' },
            { icon: TrendingUp, title: 'Priority Prediction', desc: 'ML predicts urgency level' },
            { icon: MessageSquare, title: 'Smart Chatbot', desc: '24/7 AI assistance' },
            { icon: Zap, title: 'Response Suggestions', desc: 'AI-generated replies' },
        ],
    },
    {
        id: 12,
        type: 'security',
        title: 'Security & Data Protection',
        features: [
            { icon: Shield, title: 'Tenant Isolation', desc: 'Complete data separation' },
            { icon: Lock, title: 'Role-Based Access', desc: 'Granular permissions' },
            { icon: Database, title: 'Encrypted Data', desc: 'At rest & in transit' },
            { icon: FileText, title: 'Audit Logs', desc: 'Complete activity tracking' },
        ],
    },
    {
        id: 13,
        type: 'analytics',
        title: 'Dashboards & Analytics',
        metrics: [
            { label: 'Total Tickets', value: '1,234' },
            { label: 'Open Issues', value: '42' },
            { label: 'SLA Compliance', value: '98%' },
            { label: 'Avg Resolution', value: '4.2h' },
        ],
    },
    {
        id: 14,
        type: 'techstack',
        title: 'Technology Stack',
        technologies: [
            { category: 'Frontend', tech: 'React + TypeScript', icon: Globe },
            { category: 'Backend', tech: 'Node.js + Firebase', icon: Cloud },
            { category: 'Database', tech: 'Firestore', icon: Database },
            { category: 'AI/ML', tech: 'TensorFlow', icon: Brain },
            { category: 'Cloud', tech: 'Vercel + GCP', icon: Cloud },
        ],
    },
    {
        id: 15,
        type: 'advantages',
        title: 'Platform Advantages',
        points: [
            'Scalable Multi-Tenant Architecture',
            'Complete Brand Customization',
            'AI-Powered Automation',
            'Enterprise-Grade Security',
            'Real-Time Analytics',
            'Quick Deployment',
            'Cost-Effective Solution',
            '24/7 AI Assistance',
        ],
    },
    {
        id: 16,
        type: 'usecase',
        title: 'Real-World Use Case',
        company: 'TechCorp Inc.',
        flow: ['Employee submits ticket', 'AI categorizes & routes', 'Agent assigned instantly', 'Resolution tracked', 'Employee notified'],
    },
    {
        id: 17,
        type: 'roadmap',
        title: 'Future Enhancements',
        phases: [
            { phase: 'Phase 1', title: 'Mobile Apps', desc: 'iOS & Android support', icon: Smartphone },
            { phase: 'Phase 2', title: 'Integrations', desc: 'Slack, Teams, Email', icon: MessageSquare },
            { phase: 'Phase 3', title: 'Advanced AI', desc: 'Predictive analytics', icon: Brain },
        ],
    },
    {
        id: 18,
        type: 'conclusion',
        title: 'Conclusion',
        points: [
            'Centralized Enterprise Solution',
            'Multi-Tenant & Secure',
            'AI-Powered Automation',
            'Fully Customizable White-Label',
            'Production-Ready Platform',
        ],
        tagline: 'Empowering enterprises with intelligent IT support',
    },
    {
        id: 19,
        type: 'thankyou',
        title: 'Thank You',
        subtitle: 'Questions?',
        footer: 'Team MetaMinds | CSE (AI/ML) Department',
    },
];

// Slide Components
const TitleSlide: React.FC<{ slide: typeof slides[0] }> = ({ slide }) => (
    <div className="h-full flex flex-col items-center justify-center text-center text-white p-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{slide.title}</h1>
        <p className="text-xl md:text-2xl text-violet-200 mb-12">{slide.subtitle}</p>
        <p className="text-lg text-violet-300 absolute bottom-8">{slide.footer}</p>
    </div>
);

const ContentSlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col p-12">
        <h2 className="text-4xl font-bold text-violet-900 mb-10">{slide.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {slide.points?.map((point: any, i: number) => (
                <div key={i} className="flex items-center gap-4 bg-violet-50 rounded-xl p-5">
                    <div className="p-3 bg-violet-100 rounded-lg">
                        <point.icon className="w-6 h-6 text-violet-600" />
                    </div>
                    <span className="text-lg text-gray-700">{point.text}</span>
                </div>
            ))}
        </div>
    </div>
);

const ComparisonSlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col p-12">
        <h2 className="text-4xl font-bold text-violet-900 mb-10">{slide.title}</h2>
        <div className="flex-1 grid grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-600 mb-4">{slide.left.title}</h3>
                <ul className="space-y-3">
                    {slide.left.items.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-gray-500">
                            <span className="w-2 h-2 bg-gray-400 rounded-full" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-violet-100 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-violet-700 mb-4">{slide.right.title}</h3>
                <ul className="space-y-3">
                    {slide.right.items.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-violet-600">
                            <CheckCircle className="w-5 h-5 text-violet-500" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

const SolutionSlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col items-center justify-center text-center text-white p-12">
        <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
        <p className="text-3xl font-light text-violet-200 mb-12">{slide.headline}</p>
        <div className="flex flex-wrap justify-center gap-4">
            {slide.features?.map((f: any, i: number) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-5 py-3">
                    <f.icon className="w-5 h-5 text-violet-300" />
                    <span>{f.text}</span>
                </div>
            ))}
        </div>
    </div>
);

const ArchitectureSlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col p-12">
        <h2 className="text-4xl font-bold text-violet-900 mb-6">{slide.title}</h2>
        <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="bg-violet-600 text-white rounded-2xl px-8 py-4 text-xl font-semibold mb-8">
                    Central Platform
                </div>
                <div className="flex gap-6">
                    {slide.tenants.map((t: string, i: number) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="w-1 h-8 bg-violet-300" />
                            <div className="bg-violet-100 border-2 border-violet-300 rounded-xl px-6 py-4 text-violet-700 font-medium">
                                {t}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-4 mt-10">
                    {slide.features.map((f: string, i: number) => (
                        <span key={i} className="bg-violet-50 text-violet-600 px-4 py-2 rounded-full text-sm">
                            {f}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const RolesSlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col p-12">
        <h2 className="text-4xl font-bold text-violet-900 mb-10">{slide.title}</h2>
        <div className="flex-1 flex items-center justify-center gap-4">
            {slide.roles.map((role: any, i: number) => (
                <div key={i} className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 w-40" style={{ borderTop: `4px solid ${role.color}` }}>
                    <div className="p-3 rounded-xl mb-3" style={{ backgroundColor: `${role.color}20` }}>
                        <role.icon className="w-8 h-8" style={{ color: role.color }} />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-center text-sm">{role.name}</h3>
                    <p className="text-xs text-gray-500 text-center mt-1">{role.desc}</p>
                </div>
            ))}
        </div>
    </div>
);

const WorkflowSlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col p-12">
        <h2 className="text-4xl font-bold text-violet-900 mb-10">{slide.title}</h2>
        <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-4">
                {slide.steps.map((step: any, i: number) => (
                    <React.Fragment key={i}>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mb-3">
                                <step.icon className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{step.text}</span>
                        </div>
                        {i < slide.steps.length - 1 && <ArrowRight className="w-8 h-8 text-violet-300" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    </div>
);

const LifecycleSlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col p-12">
        <h2 className="text-4xl font-bold text-violet-900 mb-10">{slide.title}</h2>
        <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-3">
                {slide.statuses.map((status: any, i: number) => (
                    <React.Fragment key={i}>
                        <div className="px-6 py-4 rounded-xl text-white font-semibold" style={{ backgroundColor: status.color }}>
                            {status.name}
                        </div>
                        {i < slide.statuses.length - 1 && <ArrowRight className="w-6 h-6 text-gray-400" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    </div>
);

const AISlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col p-12">
        <h2 className="text-4xl font-bold text-violet-900 mb-10">{slide.title}</h2>
        <div className="flex-1 grid grid-cols-2 gap-6">
            {slide.features.map((f: any, i: number) => (
                <div key={i} className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 flex items-start gap-4">
                    <div className="p-3 bg-violet-600 rounded-xl">
                        <f.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-violet-900 text-lg">{f.title}</h3>
                        <p className="text-gray-600">{f.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const AnalyticsSlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col p-12">
        <h2 className="text-4xl font-bold text-violet-900 mb-10">{slide.title}</h2>
        <div className="flex-1 grid grid-cols-4 gap-6">
            {slide.metrics.map((m: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-4xl font-bold text-violet-600">{m.value}</p>
                    <p className="text-gray-500 mt-2">{m.label}</p>
                </div>
            ))}
        </div>
    </div>
);

const TechStackSlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col p-12">
        <h2 className="text-4xl font-bold text-violet-900 mb-10">{slide.title}</h2>
        <div className="flex-1 flex items-center justify-center gap-6">
            {slide.technologies.map((t: any, i: number) => (
                <div key={i} className="bg-violet-50 rounded-2xl p-6 text-center w-36">
                    <div className="p-3 bg-violet-100 rounded-xl inline-flex mb-3">
                        <t.icon className="w-6 h-6 text-violet-600" />
                    </div>
                    <h3 className="font-semibold text-violet-900">{t.category}</h3>
                    <p className="text-sm text-gray-600">{t.tech}</p>
                </div>
            ))}
        </div>
    </div>
);

const AdvantagesSlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col p-12">
        <h2 className="text-4xl font-bold text-violet-900 mb-10">{slide.title}</h2>
        <div className="flex-1 grid grid-cols-2 gap-4">
            {slide.points.map((p: string, i: number) => (
                <div key={i} className="flex items-center gap-3 bg-violet-50 rounded-xl p-4">
                    <CheckCircle className="w-6 h-6 text-violet-600" />
                    <span className="text-gray-700">{p}</span>
                </div>
            ))}
        </div>
    </div>
);

const RoadmapSlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col p-12">
        <h2 className="text-4xl font-bold text-violet-900 mb-10">{slide.title}</h2>
        <div className="flex-1 flex items-center justify-center gap-8">
            {slide.phases.map((p: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 text-center w-56">
                    <span className="text-sm text-violet-500 font-medium">{p.phase}</span>
                    <div className="p-3 bg-violet-100 rounded-xl inline-flex my-3">
                        <p.icon className="w-6 h-6 text-violet-600" />
                    </div>
                    <h3 className="font-semibold text-violet-900">{p.title}</h3>
                    <p className="text-sm text-gray-600">{p.desc}</p>
                </div>
            ))}
        </div>
    </div>
);

const ConclusionSlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col items-center justify-center text-white p-12">
        <h2 className="text-5xl font-bold mb-10">{slide.title}</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
            {slide.points.map((p: string, i: number) => (
                <span key={i} className="bg-white/20 backdrop-blur rounded-full px-5 py-2">{p}</span>
            ))}
        </div>
        <p className="text-xl text-violet-200">{slide.tagline}</p>
    </div>
);

const ThankYouSlide: React.FC<{ slide: any }> = ({ slide }) => (
    <div className="h-full flex flex-col items-center justify-center text-white p-12">
        <h1 className="text-7xl font-bold mb-4">{slide.title}</h1>
        <p className="text-3xl text-violet-200 mb-12">{slide.subtitle}</p>
        <p className="text-lg text-violet-300 absolute bottom-8">{slide.footer}</p>
    </div>
);

// Main component
export const PitchPage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') setIsFullscreen(false);
            if (e.key === 'f') setIsFullscreen((prev) => !prev);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    // Auto-play
    useEffect(() => {
        if (!isPlaying) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [isPlaying, nextSlide]);

    const slide = slides[currentSlide];
    const isGradientBg = ['title', 'solution', 'conclusion', 'thankyou'].includes(slide.type);

    const renderSlide = () => {
        switch (slide.type) {
            case 'title': return <TitleSlide slide={slide} />;
            case 'content': return <ContentSlide slide={slide} />;
            case 'comparison': return <ComparisonSlide slide={slide} />;
            case 'solution': return <SolutionSlide slide={slide} />;
            case 'architecture': return <ArchitectureSlide slide={slide} />;
            case 'whitelabel': return <ContentSlide slide={{ ...slide, points: slide.customizations }} />;
            case 'stack': return <TechStackSlide slide={{ ...slide, technologies: slide.layers?.map((l: any) => ({ ...l, category: l.name, icon: Layers })) }} />;
            case 'roles': return <RolesSlide slide={slide} />;
            case 'workflow': return <WorkflowSlide slide={slide} />;
            case 'lifecycle': return <LifecycleSlide slide={slide} />;
            case 'ai': return <AISlide slide={slide} />;
            case 'security': return <AISlide slide={slide} />;
            case 'analytics': return <AnalyticsSlide slide={slide} />;
            case 'techstack': return <TechStackSlide slide={slide} />;
            case 'advantages': return <AdvantagesSlide slide={slide} />;
            case 'usecase': return <WorkflowSlide slide={{ ...slide, steps: slide.flow?.map((f: string, i: number) => ({ num: i + 1, text: f, icon: i === 0 ? Ticket : i === 4 ? CheckCircle : Zap })) }} />;
            case 'roadmap': return <RoadmapSlide slide={slide} />;
            case 'conclusion': return <ConclusionSlide slide={slide} />;
            case 'thankyou': return <ThankYouSlide slide={slide} />;
            default: return <ContentSlide slide={slide} />;
        }
    };

    return (
        <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gray-100 flex flex-col`}>
            {/* Toolbar */}
            <div className="bg-white shadow-sm px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg">
                        <Home className="w-5 h-5 text-gray-600" />
                    </Link>
                    <span className="text-sm text-gray-500">
                        Slide {currentSlide + 1} of {slides.length}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 hover:bg-gray-100 rounded-lg">
                        {isPlaying ? <Pause className="w-5 h-5 text-gray-600" /> : <Play className="w-5 h-5 text-gray-600" />}
                    </button>
                    <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 hover:bg-gray-100 rounded-lg">
                        <Maximize2 className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Slide Container */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div
                    className={`w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative ${isGradientBg ? 'bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700' : 'bg-white'
                        }`}
                >
                    {renderSlide()}
                </div>
            </div>

            {/* Navigation */}
            <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-center gap-4">
                <button onClick={prevSlide} className="p-2 hover:bg-gray-100 rounded-lg" disabled={currentSlide === 0}>
                    <ChevronLeft className={`w-6 h-6 ${currentSlide === 0 ? 'text-gray-300' : 'text-gray-600'}`} />
                </button>

                <div className="flex gap-1">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-violet-600' : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>

                <button onClick={nextSlide} className="p-2 hover:bg-gray-100 rounded-lg" disabled={currentSlide === slides.length - 1}>
                    <ChevronRight className={`w-6 h-6 ${currentSlide === slides.length - 1 ? 'text-gray-300' : 'text-gray-600'}`} />
                </button>
            </div>
        </div>
    );
};
